import React from 'react';
import { Modal, Tabs, Tab, ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { login } from '../../../model/store';
import { appUrls } from '../../../config/config';
import { postOptions } from '../../../config/fetchConfig';

import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css!';
import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';

export class ManageFeaturesModal extends React.Component<any, any> {
  private pointTable: BootstrapTable;
  private lineTable: BootstrapTable;
  private areaTable: BootstrapTable;

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

    this.updateChanges = this.updateChanges.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
  }

  componentDidMount() {
    this.sendApiCall('POST', null, appUrls.pointsAll).then(response => response.json())
      .then((response) => {
        this.setState({ points: response, loading: false });
      }).catch(e => console.log(e));

    this.sendApiCall('POST', null, appUrls.linesAll).then(response => response.json())
      .then((response) => {
        this.setState({ lines: response, loading: false });
      }).catch(e => console.log(e));

    this.sendApiCall('POST', null, appUrls.areasAll).then(response => response.json())
      .then((response) => {
        this.setState({ areas: response, loading: false });
      }).catch(e => console.log(e));
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

  onAfterSaveCell(row, cellName, cellValue) {
    if (row.geom.type === 'Point') {
      this.setState({ modifiedPoints: this.state.modifiedPoints.concat(row) });
    } else if (row.geom.type === 'MultiLineString') {
      this.setState({ modifiedLines: this.state.modifiedLines.concat(row) });
    } else if (row.geom.type === 'MultiPolygon') {
      this.setState({ modifiedAreas: this.state.modifiedAreas.concat(row) });
    }
  }

  updateChanges() {
    const featureLength = this.state.modifiedPoints.length + this.state.modifiedLines.length + this.state.modifiedAreas.length;
    if (confirm(`Haluatko päivittää päivittäjätunnukset ${featureLength} kohteelle?`)) {
      if (this.state.modifiedPoints.length !== 0) {
        this.state.modifiedPoints.forEach(point => {
          this.sendApiCall('POST', point, appUrls.alterUpdaterPoint).then(response => response.json())
            .then(() => {
              this.setState({ modifiedPoints: [] });
            }).catch(e => console.log(e));
        });
      }

      if (this.state.modifiedLines.length !== 0) {
        this.state.modifiedLines.forEach(line => {
          this.sendApiCall('POST', line, appUrls.alterUpdaterLine).then(response => response.json())
            .then(() => {
              this.setState({ modifiedLines: [] });
            }).catch(e => console.log(e));
        });
      }

      if (this.state.modifiedAreas.length !== 0) {
        this.state.modifiedAreas.forEach(area => {
          this.sendApiCall('POST', area, appUrls.alterUpdaterArea).then(response => response.json())
            .then(() => {
              this.setState({ modifiedAreas: [] });
            }).catch(e => console.log(e));
        });
      }
    }
  }

  handleTabSelect(key) {
    this.setState({ tabKey: key });
  }

  rowClassNameFormat(row, rowIdx) {
    return rowIdx % 2 === 0 ? 'td-columnn-even' : 'td-column-odd';
  }

  customClearButton = (onClick) => {
    return (
      <ClearSearchButton
        id={"square-button-table-warning-without-margin"}
        btnText='Tyhjennä haku'
      />
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
    const {
      showManageFeaturesModal,
      hideManageFeaturesModal,
    } = this.props;

    const cellEditProp: any = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    const options: any = {
      defaultSortName: "gid",
      defaultSortOrder: "asc",
      noDataText: this.state.loading ? "Kohteita ladataan" : "Kohteita ei pystytty hakemaan",

      sizePerPage: 50,
      sizePerPageList: [
        {text: '50', value: 50},
        {text: '100', value: 100},
        {text: 'Kaikki', value: this.getTabListLength()}
      ],

      clearSearch: true,
      clearSearchBtn: this.customClearButton
    };

    return (
      <div>
        <Modal backdrop={"static"} bsSize={"large"} show={showManageFeaturesModal} onHide={hideManageFeaturesModal}>
          <Modal.Header>
            <Modal.Title>
              <b>Hallitse kohteiden muokkausoikeuksia</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={"manageFeaturesModalBody"}>
            <p>
              Kunkin kohteen kohdalla on mahdollista muokata "Päivittäjätunnus" -kentän tietoa. Jos haluat lisätä useamman päivittäjätunnuksen voit erottaa ne pilkulla esim. "admin, testi".
              Tietoja voi muokata valitsemalla "Päivittäjätunnus" -sarakkeen kohdalla solun ja kirjoittamalla halutun arvon. Muutokset tallentuvat valitsemalla "Päivitä kohteet" -painikkeella.
            </p>

            <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id={'approveTabs'} bsStyle={"tabs"}>
              <Tab eventKey={1} title={"Pisteet"}>
                <br />
                <BootstrapTable
                  ref={(pointTable) => { this.pointTable = pointTable; }}
                  data={this.state.points}
                  cellEdit={cellEditProp}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} width={"130"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={2} title={"Reitit"}>
                <br />
                <BootstrapTable
                  ref={(lineTable) => { this.lineTable = lineTable; }}
                  data={this.state.lines}
                  cellEdit={cellEditProp}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} width={"130"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={3} title={"Alueet"}>
                <br />
                <BootstrapTable
                  ref={(areaTable) => { this.areaTable = areaTable; }}
                  data={this.state.areas}
                  cellEdit={cellEditProp}
                  options={options}
                  pagination
                  search
                  searchPlaceholder={"Anna hakusana..."}
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort editable={false}>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort editable={false}>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort editable={false}>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort editable={false}>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} width={"130"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>
              <Button id={"square-button-primary"} bsStyle={"primary"} onClick={(e) => this.updateChanges()}>Päivitä kohteet</Button>
              <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideManageFeaturesModal(e)}>Sulje</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
