import React from 'react';
import { Modal, Tabs, Tab, ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn,SelectRow , SelectRowMode, Options as TableOptions } from 'react-bootstrap-table';

import { layer, login, map } from '../../model/store';
import { appUrls } from '../../config/config';
import { postOptions } from '../../config/fetchConfig';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css!';
import '../../../css/modal.css!';
import '../../../css/customBootstrap.css!';

export class SearchTargetsModal extends React.Component<any, any> {
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
    this.sendApiCall('POST', null, appUrls.pointsAll).then(response => response.json())
      .then((response) => this.setState({ points: response, loading: false }))
      .catch(e => console.log(e));

    this.sendApiCall('POST', null, appUrls.linesAll).then(response => response.json())
      .then((response) => this.setState({ lines: response, loading: false }))
      .catch(e => console.log(e));

    this.sendApiCall('POST', null, appUrls.areasAll).then(response => response.json())
      .then((response) => this.setState({ areas: response, loading: false }))
      .catch(e => console.log(e));
  }

  sendApiCall(method, body, url) {
    const queryOptions: any = postOptions;
    queryOptions.method = method;

    if (body) {
      queryOptions.body = JSON.stringify({ body: body, user: login.loggedUser });
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
      {'Tyhjennä haku (mahd. rikki)'}
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
  render() {
    const { tabKey, loading, points, lines, areas } = this.state;
    const {
      showSearchModal,
      hideSearchTargetsModal,
    } = this.props;

    const cellEditProp: any = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    const onRowClick = function(row: any,colid,rowid,e) {
      console.log(row);
      hideSearchTargetsModal();
      const bounds = "?";
      map.fitBounds(row.geom.coordinates);
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
    const TIMESTAMP = 'Aikaleima';
    const UPDATER = 'Päivittäjätunnus';
    const selectRow: SelectRow = {
      mode: "radio",
      bgColor: '#faa'
    }
    return (
      <div>
        <Modal backdrop={"static"} bsSize={"large"} show={showSearchModal} onHide={hideSearchTargetsModal}>
          <Modal.Header>
            <Modal.Title>
              <b>{'Hae kohteita'}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={"searchFeaturesModalBody"}>
            
            <Tabs activeKey={tabKey} onSelect={this.handleTabSelect} id={'approveTabs'} bsStyle={"tabs"}>
              <Tab eventKey={1} title={"Pisteet"}>
                <br />
                <BootstrapTable
                  ref={(pointTable) => { this.pointTable = pointTable; }}
                  data={points}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} dataSort editable={false}>{ID}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={2} title={"Reitit"}>
                <br />
                <BootstrapTable
                  ref={(lineTable) => { this.lineTable = lineTable; }}
                  data={lines}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={3} title={"Alueet"}>
                <br />
                <BootstrapTable
                  ref={(areaTable) => { this.areaTable = areaTable; }}
                  data={areas}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>{NAME}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>{CLASS1}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>{CLASS2}</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>{TIMESTAMP}</TableHeaderColumn>
                </BootstrapTable>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>

              <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideSearchTargetsModal(e)}>
                {'Sulje'}
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
