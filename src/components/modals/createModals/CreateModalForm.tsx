import React from 'react';
import geojsonBounds from 'geojson-bounds';
import { observer } from 'mobx-react';
import { Modal, Tabs, Tab, Button, Form, ButtonToolbar, Alert } from 'react-bootstrap';
import validator from 'validator';

import reproject from 'reproject';
const crss = {
  "EPSG:3067": '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  "urn:ogc:def:crs:EPSG::3067": '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
}

import { map, modal } from '../../../model/store';
import {
  EMAIL,
  TELEPHONE,
  ZIP,
  UPKEEPCLAS,
  UNDEFINED,
  CIRCLE_MARKER,
  POLYLINE,
  POLYGON,
  POINT,
  LINESTRING,
  MapFeatureTypes
} from '../../../config/constants';

import { BasicInfo } from './formTabs/BasicInfo';
import { OtherInfo } from './formTabs/OtherInfo';
import { ContactInfo } from './formTabs/ContactInfo';

import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';
import L from 'leaflet';
import { UpdateGeomPost } from '../../../utils';

@observer
export class CreateModalForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      tabKey: 1,
      showAlert: false,
      formConfig: []
    };
  }

  componentWillReceiveProps(prevProps) {
    this.setState({ formConfig: prevProps.formConfig, showAlert: false });
    prevProps.formConfig.map((info) => {
      let content = prevProps.parentState[info.attr] + '';
      let ml = info["maxLength"];
      if (content.length > ((ml && ml > 1) ? ml : 253)) {
        console.log("MAx", ml, content.length);
        info.formError = true;
        return;
      }

      // Check if field is added to form and it cannot be undefined -> some content needs to be there
      if (info.addedToForm && !info.canBeUndefined) {
        if (content.indexOf(UNDEFINED) >= 0 || validator.isEmpty(content)) {
          info.formError = true;
          return;
        }
      }

      // Validate every field that content needs to be in some specific form
      if (info.addedToForm && content.length !== 0 && content.indexOf(UNDEFINED) === -1) {
        if (info.attr.indexOf(EMAIL) >= 0) {
          if (content.indexOf(UNDEFINED) >= 0 || !validator.isEmail(content)) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf(TELEPHONE) >= 0) {
          if (content.indexOf(UNDEFINED) >= 0 || content.indexOf('+358') < 0) { // || !validator.isMobilePhone(content, 'any') -> doesn't work for every number for some reason
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf('www') >= 0) {
          if (content.indexOf(UNDEFINED) >= 0 || !validator.isURL(content)) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf(ZIP) >= 0) {
          if (content.indexOf(UNDEFINED) >= 0 || !validator.isNumeric(content) || !validator.isLength(content, { min: 5, max: 5 })) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf(UPKEEPCLAS) >= 0) {
          if (content.indexOf('Valitse') >= 0) {
            info.formError = true;
            return;
          }
        }
      }

      info.formError = false;
    });
  }

  handleTabSelect = (key) => {
    this.setState({ tabKey: key });
  }

  validateForm() {
    let errors = [];
    this.state.formConfig.map((info) => {
      if (info.formError) {
        console.log("Alerting due to:", info.attr, info);
        errors.push(info.desc || info.attr);
      }
    });

    errors.length > 0 ? this.setState({
      showAlert:
        "Virhekentät: " + errors.join(", ")
    }) :
      this.props.sendPost(this.props.createType, this.props.feature.feature);
  }

  hideCreateModal = () => {
    this.handleTabSelect(1);
    this.props.unsetFeature();
    this.props.hideModal();
  }

  sortTabContent(a, b) {
    if (a !== null || b !== null) {
      if (a.order < b.order) { return -1; }
      if (a.order > b.order) { return 1; }
    }

    return 0;
  }

  getConfirmText() {
    return this.props.feature.featureDetails ? 'Päivitä kohteen tiedot' : 'Vahvista ehdotus';
  }

  getHeaderText() {
    const { createType, feature } = this.props;

    if (createType === CIRCLE_MARKER) {
      if (feature.featureDetails) { return <b>{`Muokkaa kohteen "${feature.featureDetails.name_fi}" tietoja`}</b>; }
      return <b>{'Lisää uuden kohteen tiedot'}</b>;
    } else if (createType === POLYLINE) {
      if (feature.featureDetails) { return <b>{`Muokkaa reitin "${feature.featureDetails.name_fi}" tietoja`}</b>; }
      return <b>{'Lisää uuden reitin tiedot'}</b>;
    } else if (createType === POLYGON) {
      if (feature.featureDetails) { return <b>{`Muokkaa alueen "${feature.featureDetails.name_fi}" tietoja`}</b>; }
      return <b>{'Lisää uuden alueen tiedot'}</b>;
    }

    return null;
  }

  getAlert = () => {
    return (
      <Alert className={"formErrorAlert"} bsStyle={"danger"} onDismiss={() => { this.setState({ showAlert: false }); }}>
        <div className={"formErrorMsg"}>
          {'Lomakkeessa on vielä kohtia, jotka pitää täyttää tai niiden sisällössä on jotain vialla.\nViesti: ' + this.state.showAlert}
        </div>
      </Alert>
    );
  }

  render() {
    const {
      createType,
      formConfig,
      layers,
      showCreateModal,
      hideModal,
      feature,
      handleFormChange,
      parentState,
      startEdit,
      removeNewTarget,
      removeTarget,
      unsetFeature,
      resetFeatureCoords
    } = this.props;

    let type: MapFeatureTypes = null;
    if (createType === CIRCLE_MARKER) type = MapFeatureTypes.point;
    else if (createType === POLYLINE) type = MapFeatureTypes.line;
    else if (createType === POLYGON) type = MapFeatureTypes.polygon;
    else throw ("unknown type:" + createType);

    return (
      <div>
        <Modal backdrop={"static"} show={showCreateModal} onHide={this.hideCreateModal} bsSize={'large'}>
          <Modal.Header>
            <Modal.Title>
              {this.getHeaderText()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={'createModalBody'}>
            {this.state.showAlert && this.getAlert()}
            <Form>
              <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id={'createTabs'} bsStyle={"tabs"}>
                <Tab eventKey={1} title={"Perustiedot"}>
                  <BasicInfo
                    formType={type}
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    layers={layers}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>

                <Tab eventKey={2} title={"Lisätiedot"}>
                  <OtherInfo
                    formType={type}
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>

                <Tab eventKey={3} title={"Yhteystiedot"}>
                  <ContactInfo
                    formType={type}
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>
              </Tabs>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>
              {<Button id={"square-button-primary"} bsStyle={"primary"} onClick={() => { this.importFeature(feature, type) }}>
                {'Korvaa Geometria'}
              </Button>}
              <Button id={"square-button-primary"} bsStyle={"primary"} onClick={() => { this.exportFeature(feature, type) }}>
                {'Lataa geometria'}
              </Button>
              <div style={{ width: "24px", float: "left", margin: "1px" }}></div>
              <Button id={"square-button-success"} bsStyle={"success"} onClick={() => this.validateForm()}>
                {this.getConfirmText()}
              </Button>
              <Button id={"square-button-primary"} bsStyle={"primary"} onClick={() => { startEdit(feature); map.toggleFormEdit(true, parentState); }}>
                {'Muokkaa sijaintia'}
              </Button>

              {feature.featureDetails &&
                <Button id={"square-button-danger"} bsStyle={"danger"} onClick={() => { hideModal(); removeTarget(feature); }}>
                  {'Poista kohde'}
                </Button>
              }

              {feature.featureDetails &&
                <Button id={"square-button-warning"} bsStyle={"warning"} onClick={() => { unsetFeature(); hideModal(); this.setState({ tabKey: 1 }); resetFeatureCoords(feature); }}>
                  {'Peruuta'}
                </Button>
              }

              {!feature.featureDetails &&
                <Button id={"square-button-danger"} bsStyle={"danger"} onClick={() => { hideModal(); removeNewTarget(feature); this.setState({ tabKey: 1 }); }}>
                  {'Poista ehdotus'}
                </Button>
              }
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  exportFeature(feature: any, type: string) {
    var geom = feature.featureDetails.geom;
    geom["properties"] = Object.assign({}, feature.featureDetails);
    geom["properties"]["geom"] = undefined;
    const data = JSON.stringify(geom, null, '\t');


    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', (feature.featureDetails ? feature.featureDetails.gid ? feature.featureDetails.gid : "geom" : "geom") + ".json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  }
  importFeature(feature: any, type: MapFeatureTypes) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
      const target = e.target as HTMLInputElement;

      var file = target.files[0];

      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = readerEvent => {
        try {
          let content = reader.result as any;
          let json = JSON.parse(content);
          let geojson_standard = reproject.reproject(json, undefined, "WGS84", crss);
          let geojson_nonstandard = reproject.reproject(json, undefined, "EPSG:3067", crss);

          let geo = L.geoJSON(json);
          let crs = geojson_nonstandard["crs"];
          if (geojson_nonstandard["type"] == "FeatureCollection") {
            let features = geojson_nonstandard["features"];

            if (features.length != 1) {
              throw "Features count must be exactly 1, not " + features.length;
            };

            // Flatten
            geojson_nonstandard = features[0];

            // We need to dig CRS from somewhere, though it should be EPSG:3067 now
            crs = geojson_nonstandard["crs"] || crs;

          }
          crs = crs || { type: 'name', properties: { name: 'EPSG:3067' } };

          geojson_nonstandard.geometry["crs"] = geojson_nonstandard.geometry["crs"] || crs;

          //console.log(geojson_nonstandard);
          //feature.featureDetails.geom = geojson;
          //feature.feature = geojson;
          let extents = geojsonBounds.extent(geojson_standard);

          //console.log(extents);
          if (extents[0] < 20.5 || extents[1] < 59 || extents[2] > 31.6 || extents[3] > 70.1) {
            throw ("GeoJSON out of bounds? " + extents);
          }
          let bodyContent = {};
          bodyContent["geom"] = geojson_nonstandard.geometry;
          bodyContent["gid"] = feature.featureDetails.gid;


          this.hideCreateModal();
          this.props.hideModal();

          UpdateGeomPost(type, bodyContent).then((updated) => {
            if (!updated) return;
            //TODO: updateFeaturesToMap(type, selectedLayer, featureDetails);
            //feature.feature.setLatLngs();
            //window.location.reload();
            feature.feature.remove();
          }).catch((e) => {

            modal.showErrorAlert("Tuntematon virhe: \n" + e.message);

          });

        } catch (e) {
          alert(e);
          throw e;
        }
      }

    }

    input.click();
  }
}
