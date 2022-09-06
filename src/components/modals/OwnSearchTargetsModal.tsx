import React from 'react';
import { Modal, Tabs, Tab, ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn,SelectRow , SelectRowMode, Options as TableOptions } from 'react-bootstrap-table';

import moment from 'moment';
import {
    TIMESTAMP, DATE_FORMAT
} from '../../config/constants';
import { layer, login, map, modal } from '../../model/store';
import { appUrls } from '../../config/config';
import { postOptions } from '../../config/fetchConfig';

import { fixSimpleCoords, handleHttpErrorsGeneric } from '../../utils';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css!';
import '../../../css/modal.css!';
import '../../../css/customBootstrap.css!';
import L from 'leaflet';

export class OwnSearchTargetsModal extends React.Component<any, any> {
  private pointTable: any;
  private lineTable: any;
  private areaTable: any;

  constructor(props: any) {
    super(props);

    this.state = {
      tabKey: 1,
      loading: true,
      points: [],
      lines: [],
      areas: [],
      modifiedPoints: [],
      modifiedLines: [],
      modifiedAreas: []
    };
  }

  componentDidMount() {
    this.sendApiCall('POST', true, appUrls.pointsUser).then(handleHttpErrorsGeneric).then(response => response.json())
      .then((response) => this.setState({ points: response, loading: false }))
      .catch(e => console.log(e));

    this.sendApiCall('POST', true, appUrls.linesUser).then(handleHttpErrorsGeneric).then(response => response.json())
      .then((response) => this.setState({ lines: response, loading: false }))
      .catch(e => console.log(e));

    this.sendApiCall('POST', true, appUrls.areasUser).then(handleHttpErrorsGeneric).then(response => response.json())
      .then((response) => this.setState({ areas: response, loading: false }))
      .catch(e => console.log(e));
  }

  sendApiCall(method, body, url) {
    const queryOptions: any = postOptions;
    queryOptions.method = method;

    if (body) {
      queryOptions.body = JSON.stringify({ body: body, user: login.loggedUser, updater_id: login.updater_id, isAdmin: login.isAdmin });
    } else {
      delete queryOptions.body;
    }

    return fetch(url, queryOptions);
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
    if (row.geom.type === 'Point') {
      this.setState({ modifiedPoints: this.state.modifiedPoints.concat(row) });
    } else if (row.geom.type === 'MultiLineString') {
      this.setState({ modifiedLines: this.state.modifiedLines.concat(row) });
    } else if (row.geom.type === 'MultiPolygon') {
      this.setState({ modifiedAreas: this.state.modifiedAreas.concat(row) });
    }
  }

  handleTabSelect = (key) => {
    this.setState({ tabKey: key });
  }

  rowClassNameFormat(row, rowIdx) {
    return rowIdx % 2 === 0 ? 'td-columnn-even' : 'td-column-odd';
  }

  customClearButton = (onClick) => {
    return (
      <Button 
      id={"square-button-table-warning-without-margin"}>
      {'Tyhjennä haku'}
    </Button>

    );
  }

  getTabListLength() {
    const selectedTab = this.state.tabKey;
    if (selectedTab === 1) {
      return this.state.points.length;
    } else if (selectedTab === 2) {
      return this.state.lines.length;
    } else if (selectedTab === 3) {
      return this.state.areas.length;
    }

    return 100;
  }
    markRowsUpdated = async (endpoint, rows) => {
        var virhekohde = -1;
        try {
            for (let gid of rows[0]) {
                console.log(gid);
                virhekohde = gid;
                const resp = await this.sendApiCall('POST', { "gid": gid, "timestamp": moment().format(DATE_FORMAT) }, endpoint)
                    .then(handleHttpErrorsGeneric)
                    .then(response => response.json());
                console.log("update resp", resp);
            }
            modal.showSuccessAlert("Kohteet päivitetty onnistuneesti");
        } catch (e) {
            modal.showErrorAlert("Massahyväksyntä epäonnistui kohteessa: " + endpoint + "@" + virhekohde + ": " + e);
        }
    }

  render() {
    const { tabKey, loading, points, lines, areas } = this.state;
    const {
      showOwnSearchModal,
      hideOwnSearchTargetsModal,
    } = this.props;

    const cellEditProp: any = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    const selectRowProp: any = {
        mode: "checkbox",
        bgColor: "lightBlue"
      };
  
    const onRowClick = function(row: any,colid,rowid,e) {
  
      //hideOwnSearchTargetsModal();
      try {
        const bounds = L.geoJSON(row.geom).getBounds();
        console.log("clickbounds",bounds);
        map.fitBounds(bounds);
      } catch (e) {
        modal.showErrorAlert("Tuntematon virhe: "+e);
        console.error(e);
      }
    }

    const options: TableOptions = {
      defaultSortName: "name_fi",
      defaultSortOrder: "asc",
      noDataText: loading ? "Kohteita ladataan" : "Kohteita ei pystytty hakemaan",

      sizePerPage: 50,
      sizePerPageList: [
        {text: '50', value: 50},
        {text: '100', value: 100},
        {text: 'Kaikki', value: this.getTabListLength()}
      ],
      clearSearch: true,
      onRowClick: onRowClick,
      clearSearchBtn: this.customClearButton
    };

    const ID = 'ID';
    const CLASS1 = 'Pääluokitus';
    const CLASS2 = 'Aliluokitus';
    const NAME = 'Kohteen nimi';
    const TIMESTAMP = 'Päivitetty';
    const UPDATER = 'Päivittäjätunnus';
    const selectRow: SelectRow = {
      mode: "radio",
      bgColor: '#faa'
    }
    return (
      <div>
        <Modal backdrop={"static"} bsSize={"large"} show={showOwnSearchModal} onHide={hideOwnSearchTargetsModal}>
          <Modal.Header>
            <Modal.Title>
              <b>{'Kuittaa useita kohteita ajantasaisiksi'}</b>
            </Modal.Title>
            <span>Tällä työkalulla voit kuitata yhden tai useamman kohteen tiedot ajantasaisiksi.  <br/>Valitse tarkastamasi kohteet valintaruuduista ja klikkaa "merkitse kohteet tarkastetuiksi", jonka jälkeen kohteiden aikaleimat muuttuvat tälle päivälle.
            <br/><br/>
Jos haluat päivittää yksittäisen kohteen muita tietoja, klikkaa kohteen nimeä ja palaa kartalle painamalla sulje-painiketta. Tämän jälkeen voit muokata kyseistä kohdetta.</span>
          </Modal.Header>
          <Modal.Body className={"searchFeaturesModalBody"}>
            
            <Tabs activeKey={tabKey} onSelect={this.handleTabSelect} id={'approveTabs'} bsStyle={"tabs"}>
              <Tab eventKey={1} title={"Pisteet"}>
                <br />
                <BootstrapTable
                  ref={(pointTable) => { this.pointTable = pointTable; }}
                  data={points}
                  selectRow={selectRowProp}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                </BootstrapTable>
                <Button id={"square-button-table-primary"} onClick={() => { this.markRowsUpdated(appUrls.updatePoint,[this.pointTable.state.selectedRowKeys]);}}>Merkitse kohteet tarkastetuiksi</Button>
              
              </Tab>

              <Tab eventKey={2} title={"Reitit"}>
                <br />
                <BootstrapTable
                  ref={(lineTable) => { this.lineTable = lineTable; }}
                  data={lines}
                  options={options}
                  selectRow={selectRowProp}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                </BootstrapTable>
                <Button id={"square-button-table-primary"} onClick={() => { this.markRowsUpdated(appUrls.updateLine,[this.lineTable.state.selectedRowKeys]);}}>Merkkaa kohteet tarkastetuiksi</Button>
               </Tab>

              <Tab eventKey={3} title={"Alueet"}>
                <br />
                <BootstrapTable
                  ref={(areaTable) => { this.areaTable = areaTable; }}
                  data={areas}
                  options={options}
                  selectRow={selectRowProp}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                </BootstrapTable>
                <Button id={"square-button-table-primary"} onClick={() => { this.markRowsUpdated(appUrls.updateArea,[this.areaTable.state.selectedRowKeys]);}}>Merkkaa kohteet tarkastetuiksi</Button>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>

              <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideOwnSearchTargetsModal(e)}>
                {'Sulje'}
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
