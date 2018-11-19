import React from 'react';
import { Modal, Tabs, Tab, ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { login, form } from '../../../model/store';
import { appUrls } from '../../../config/config';
import { postOptions } from '../../../config/fetchConfig';

import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css!';
import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';

export class ApproveFeaturesModal extends React.Component<any, any> {
  private pointTable: BootstrapTable;
  private lineTable: BootstrapTable;
  private areaTable: BootstrapTable;

  constructor(props: any) {
    super(props);

    this.state = {
      tabKey: 1,
      loading: true,
      approving: true,
      approvePoints: [],
      approveLines: [],
      approveAreas: []
    };

    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.customConfirm = this.customConfirm.bind(this);
    this.approveFeaturesButton = this.approveFeaturesButton.bind(this);
    this.removeFeaturesButton = this.removeFeaturesButton.bind(this);
    this.sendApproval = this.sendApproval.bind(this);
    this.removeFeatureFromState = this.removeFeatureFromState.bind(this);
  }

  componentDidMount() {
    const options: any = postOptions;
    options['body'] = JSON.stringify({ loggedUser: 'admin', isAdmin: login.isAdmin });

    fetch(appUrls.pointApprovals, options).then(response => response.json())
      .then((response) => {
        this.setState({ approvePoints: response, loading: false });
      }).catch(e => console.log(e));

    fetch(appUrls.lineApprovals, options).then(response => response.json())
      .then((response) => {
        this.setState({ approveLines: response, loading: false });
      }).catch(e => console.log(e));

    fetch(appUrls.areaApprovals, options).then(response => response.json())
      .then((response) => {
        this.setState({ approveAreas: response, loading: false });
      }).catch(e => console.log(e));
  }

  handleTabSelect(key) {
    this.setState({ tabKey: key });
  }

  approveFeaturesButton = (removeRowEvent) => {
    return (<Button id={"square-button-table-primary"} onClick={() => { this.setState({ approving: true }, () => { removeRowEvent([this.state.selectedUserKey]); }); }}>Hyväksytä kohteet</Button>)
  }

  removeFeaturesButton = (removeRowEvent) => {
    return (<Button id={"square-button-table-danger"} onClick={() => { this.setState({ approving: false }, () => {
      if (this.state.tabKey === 1) {
        this.pointTable.handleDropRow(this.pointTable.state.selectedRowKeys);
      } else if (this.state.tabKey === 2) {
        this.lineTable.handleDropRow(this.lineTable.state.selectedRowKeys);
      } else if (this.state.tabKey === 3) {
        this.areaTable.handleDropRow(this.areaTable.state.selectedRowKeys);
      }
    }); }}>Poista kohteet</Button>)
  }

  sendApproval(form, type, feature, addUrl, removeUrl, layerType) {
    const bodyContent = this.getPostBodyContent(form, feature, type, layerType);
    const options: any = postOptions;

    if (this.state.approving) {
      // 1. Add the desired feature to the corresponding table
      options.body = JSON.stringify({ user: login.loggedUser, body: bodyContent }); 

      fetch(addUrl, options).then(response => response.json())
        .then(() => {
          // 2. Remove the feature from the approval table
          options.body = JSON.stringify({ id: feature.gid, type: layerType, name: feature.name_fi, user: login.loggedUser });

          fetch(removeUrl, options).then(response => response.json())
            .then(() => this.removeFeatureFromState(type, feature)).catch(e => console.log(e));
        }).catch(e => console.log(e));
    } else {
      // Remove feature for approving table
      options.body = JSON.stringify({ id: feature.gid, type: layerType, name: feature.name_fi, user: login.loggedUser }); 

      fetch(removeUrl, options).then(response => response.json())
        .then(() => this.removeFeatureFromState(type, feature)).catch(e => console.log(e));
    }
  }

  getPostBodyContent(form, feature, type, layerType) {
    let bodyContent = {};
    form.map(item => {
      if (feature[item.attr] !== null) { bodyContent[item.attr] = feature[item.attr]; }
    });

    const geomFeature = {
      type: type,
      coordinates: feature.geom.coordinates,
      crs: { type: 'name', properties: { name: 'EPSG:3067' } }
    }

    delete bodyContent['gid'];
    bodyContent['geom'] = geomFeature;
    bodyContent['type'] = layerType;

    return bodyContent;
  }

  removeFeatureFromState(type, feature) {
    if (type === 'Point') {
      const newPoints = this.filterFeatureArray(this.state.approvePoints, feature.gid);
      this.setState({ approvePoints: newPoints });
    } else if (type === 'MultiLineString') {
      const newLines = this.filterFeatureArray(this.state.approveLines, feature.gid);
      this.setState({ approveLines: newLines });
    } else if (type === 'MultiPolygon') {
      const newAreas = this.filterFeatureArray(this.state.approveAreas, feature.gid);
      this.setState({ approveAreas: newAreas });
    }
  }

  filterFeatureArray(features, removeId) {
    return features.filter(feature => {
      if (feature.gid === removeId) { return false; }
      return true;
    });
  }

  customConfirm(next) {
    if (this.state.approving ? confirm('Haluatko lisätä kohteet kantaan?') : confirm('Haluatko poistaa kohteet pysyvästi?')) {
      if (this.state.tabKey === 1) {
        this.pointTable.state.selectedRowKeys.forEach(key => {
          this.state.approvePoints.forEach(point => {
            if (key === point.gid) {
              this.sendApproval(form.pointFormConfig, 'Point', point, appUrls.createPoint, appUrls.removePoint, 'pointApprovalFeatures');
            }
          });
        });
      } else if (this.state.tabKey === 2) {
        this.lineTable.state.selectedRowKeys.forEach(key => {
          this.state.approveLines.forEach(line => {
            if (key === line.gid) {
              this.sendApproval(form.lineFormConfig, 'MultiLineString', line, appUrls.createLine, appUrls.removeLine, 'lineApprovalFeatures');
            }
          });
        });
      } else if (this.state.tabKey === 3) {
        this.areaTable.state.selectedRowKeys.forEach(key => {
          this.state.approveAreas.forEach(area => {
            if (key === area.gid) {
              this.sendApproval(form.areaFormConfig, 'MultiPolygon', area, appUrls.createArea, appUrls.removeArea, 'areaApprovalFeatures');
            }
          });
        });
      }

      next();
    }
  }

  rowClassNameFormat(row, rowIdx) {
    return rowIdx % 2 === 0 ? 'td-columnn-even' : 'td-column-odd';
  }

  render() {
    const {
      showApproveFeaturesModal,
      hideApproveFeaturesModal,
    } = this.props;

    const selectRowProp: any = {
      mode: "checkbox",
      bgColor: "lightBlue"
    };

    const options: any = {
      noDataText: this.state.loading ? "Hyväksyttäviä kohteita ladataan" : "Hyväksyttäviä kohteita ei ole",
      deleteBtn: this.approveFeaturesButton,
      insertBtn: this.removeFeaturesButton,
      handleConfirmDeleteRow: this.customConfirm,
      defaultSortName: "timestamp",
      defaultSortOrder: "desc"
    };

    return (
      <div>
        <Modal backdrop={"static"} bsSize={"large"} show={showApproveFeaturesModal} onHide={hideApproveFeaturesModal}>
          <Modal.Header>
            <Modal.Title>
              <b>Hyväksytä lisättyjä kohteita</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={"approveFeaturesModalBody"}>
            <p>
              Hyväksytä kohteita valitsemalla ne ja painamalla "Hyväksytä kohteet". Jos kohteita haluta hyväksyä ollenkaan on mahdollista valita halutut kohteet ja
              painamalla "Poista kohteet" tällöin ne poistuvat lopullisesti.
            </p>

            <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id={'approveTabs'} bsStyle={"tabs"}>
              <Tab eventKey={1} title={"Pisteet"}>
                <br />
                <BootstrapTable
                  ref={(pointTable) => { this.pointTable = pointTable; }}
                  data={this.state.approvePoints}
                  selectRow={selectRowProp}
                  options={options}
                  deleteRow
                  insertRow
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={2} title={"Reitit"}>
                <br />
                <BootstrapTable
                  ref={(lineTable) => { this.lineTable = lineTable; }}
                  data={this.state.approveLines}
                  selectRow={selectRowProp}
                  options={options}
                  deleteRow
                  insertRow
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>

              <Tab eventKey={3} title={"Alueet"}>
                <br />
                <BootstrapTable
                  ref={(areaTable) => { this.areaTable = areaTable; }}
                  data={this.state.approveAreas}
                  selectRow={selectRowProp}
                  options={options}
                  deleteRow
                  insertRow
                  keyField={"gid"}
                >
                  <TableHeaderColumn dataField={"gid"} width={"50"} dataSort>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class1_fi"} dataSort>Pääluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"class2_fi"} dataSort>Aliluokitus</TableHeaderColumn>
                  <TableHeaderColumn dataField={"name_fi"} dataSort>Kohteen nimi</TableHeaderColumn>
                  <TableHeaderColumn dataField={"timestamp"} width={"100"} dataSort>Aikaleima</TableHeaderColumn>
                  <TableHeaderColumn dataField={"updater_id"} dataSort>Päivittäjätunnus</TableHeaderColumn>
                </BootstrapTable>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>
              <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideApproveFeaturesModal(e)}>Sulje</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
