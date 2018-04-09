import React from 'react';
import { observer } from 'mobx-react';
import { Map, FeatureGroup } from 'react-leaflet';
import { Projection, CRS } from 'charto-leaflet';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import 'leaflet-draw';
import 'whatwg-fetch';

declare const L: any; // Some hack that works for including L & L.draw

import { data, map, layer, modal, messages, login } from '../model/store';
import { appUrls, mapUrls } from '../config';

import Dummy from './Dummy';
import { CreateModalContainer } from './modals/CreateModalContainer';
import UtilModalContainer from './modals/UtilModalContainer';

import { AreaFeatures } from './layers/featureLayers/AreaFeatures';
import { LineFeatures } from './layers/featureLayers/LineFeatures';
import { PointFeatures } from './layers/featureLayers/PointFeatures';
import { AreaApprovalFeatures } from './layers/approvalLayers/AreaApprovalFeatures';
import { LineApprovalFeatures } from './layers/approvalLayers/LineApprovalFeatures';
import { PointApprovalFeatures } from './layers/approvalLayers/PointApprovalFeatures';
import { AreaUserFeatures } from './layers/userLayers/AreaUserFeatures';
import { LineUserFeatures } from './layers/userLayers/LineUserFeatures';
import { PointUserFeatures } from './layers/userLayers/PointUserFeatures';

import '../../css/map.css!';
import '../../css/mapFeature.css!';

@observer
export class LeafletMap extends React.Component<any, any> {

  private leafletMap: Map;
  private pointfeatures: FeatureGroup;
  private linefeatures: FeatureGroup;
  private areafeatures: FeatureGroup;

  constructor(props: any) {
    super(props);

    this.state = {
      layer: null,
      lat: 6711406,
      lng: 239534,
      zoom: 6,

      selectedFeature: {
        feature: null,
        featureDetails: null
      },
      selectedLayer: null,

      showCreateModal: false,
      addingFeature: false,
      manageOn: false,
      editOn: false,
      editStopOn: false,

      creatingFeature: null,
      createType: null,

      drawOptions: {
        circlemarker: {
          radius: 8,
          color: 'black',
          fillColor: 'grey',
          weight: 1.5,
          fillOpacity: 0.8
        },

        polyline: {
          allowIntersection: false,
          icon: new L.DivIcon({
            iconSize: new L.Point(30, 30),
            className: 'leaflet-div-icon leaflet-editing-icon'
          }),
          shapeOptions: {
            color: 'grey',
            weight: 3
          },
          drawError: {
            color: 'red',
            message: 'Viiva ei saa leikata itseään!'
          }
        },

        polygon: {
          allowIntersection: false,
          icon: new L.DivIcon({
            iconSize: new L.Point(30, 30),
            className: 'leaflet-div-icon leaflet-editing-icon'
          }),
          shapeOptions: {
            color: 'grey',
            weight: 1.5,
            fillOpacity: 0.4
          },
          drawError: {
            color: 'red',
            message: 'Poligoni ei saa leikata itseään!'
          }
        }
      }
    };

    this.setSelectedFeature = this.setSelectedFeature.bind(this);
    this.unsetSelectedFeature = this.unsetSelectedFeature.bind(this);

    this.manageFeature = this.manageFeature.bind(this);
    this.startEditFeature = this.startEditFeature.bind(this);
    this.stopAddingFeature = this.stopAddingFeature.bind(this);
    this.stopEditFeature = this.stopEditFeature.bind(this);
    this.removeNewTargetFeature = this.removeNewTargetFeature.bind(this);
    this.removeTargetFeature = this.removeTargetFeature.bind(this);
    this.removeTargetFeatureFetch = this.removeTargetFeatureFetch.bind(this);

    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);

    this.switchLayer = this.switchLayer.bind(this);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    map.mapReference = leafletMap; // This is used elsewhere from this class
    const JHS180 = new CRS('EPSG:3067', new Projection(L.bounds([ -548576, 6291456 ], [ 1548576, 8388608 ])));

    leafletMap.options.maxZoom = 15;
    leafletMap.options.minZoom = 3;
    leafletMap.options.crs = JHS180;

    // Disable keyboard interaction, since +, - are used for zooming (inteferes form)
    leafletMap.keyboard.disable();

    const taustakartta = L.tileLayer(mapUrls.taustakartta, {
      minZoom: 0,
      maxZoom: Infinity,
      continuousWorld: true,
      noWrap: true
    });

    leafletMap.addLayer(taustakartta);
    this.setState({ layer: taustakartta });

    setTimeout(() => {
			leafletMap.invalidateSize(false);
      leafletMap.setView(L.latLng(this.state.lat, this.state.lng), this.state.zoom, { animate: false });
		}, 200);

    // Modify the english suggestions onCreate
    L.drawLocal.draw.handlers.circlemarker.tooltip.start = 'Klikkaa karttaa lisätäksesi kohteen';

    L.drawLocal.draw.handlers.polyline.tooltip.start = 'Klikkaa karttaa aloittaaksesi reitin tekemisen';
    L.drawLocal.draw.handlers.polyline.tooltip.cont = 'Lisää toinen piste muodostaaksesi reitin';
    L.drawLocal.draw.handlers.polyline.tooltip.end = 'Klikkaa viimeistä pistettä lopettaaksesi reitin';
    L.drawLocal.draw.handlers.polyline.tooltip.cont = 'Lisää kaksi pistettä muodostaaksesi reitin';

    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Klikkaa karttaa aloittaaksesi alueen tekemisen';
    L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Klikkaa jatkaaksesi muodon piirtämistä';
    L.drawLocal.draw.handlers.polygon.tooltip.end = 'Klikkaa aloituspistettä lopettaaksesi alueen';

    // Disable esc button -> default is to cancel editing, but it breaks new feature creation
    L.Draw.Feature.prototype._cancelDrawing = function(e) {
      if (e.keyCode === 27) {}
    };

    // Map click for reseting the selection of feature
    leafletMap.on('click', (e) => {
      if (!this.state.editOn) { // This for disabling map click on moving feature on the map when editing is on..
        if (!(e.target instanceof L.CircleMarker) && !((e.target instanceof L.Polyline) && !(e.target instanceof L.Polygon)) && !((e.target instanceof L.Polygon) && !(e.target instanceof L.Rectangle))) {
          this.setSelectedFeature(e.target, null);
        }
      }
    });

    // Map click for triggering map.on for the newly created feature
    leafletMap.on('draw:created', (e) => {
      // Toggle off button styling, since new feature has been created
      map.createOffButtonStyling();

      this.setState({ addingFeature: false }); // Feature was added so the drawing instance can be done again
      const createType = e.layerType;

      // Check linestring editing bug where starting and ending points are the same
      if (!(createType === 'polyline' && e.layer.editing.latlngs[0].length === 1)) {
        // Set the feature selected
        this.setSelectedFeature(e.layer, null, 'newFeature');

        // Set the recently create feature as selected
        this.setState({
          selectedFeature: { feature: e.layer, featureDetails: null },
          createType: createType
        });

        this.showCreateModal();

        // For the different types of features add the recently added feature to the correct layer
        if (createType === 'circlemarker') {
          this.pointfeatures.leafletElement.addLayer(e.layer);
        } else if (createType === 'polyline') {
          this.linefeatures.leafletElement.addLayer(e.layer);
        } else if (createType === 'polygon') {
          this.areafeatures.leafletElement.addLayer(e.layer);
        }

        // Draw layer click is for selecting it and setting its styling
        e.layer.on('click', (e) => {
          L.DomEvent.stop(e); // This prevents the layer click call to trigger the map click also!
          this.setSelectedFeature(e.target, null, 'newFeature');
        });
      }
    });
  }

  componentWillReact() {
    if (map.manageFeature && !this.state.manageOn) {
      this.setState({ manageOn: true });
      this.manageFeature(this.state.selectedFeature);
    }

    if (map.stopEdit && !this.state.editStopOn) {
      this.setState({ editStopOn: true });
      this.showCreateModal();
      this.stopEditFeature(this.state.selectedFeature);
    }

    if (map.isCreateOn && !this.state.addingFeature) {
      this.setState({ addingFeature: true }); // addingFeature is true, so that another drawing instance cannot be started

      if (map.createType === 'point') {
        const drawCircle = new L.Draw.CircleMarker(this.leafletMap.leafletElement, this.state.drawOptions.circlemarker);
        this.setState({ creatingFeature: drawCircle });
        drawCircle.enable();
      } else if (map.createType === 'line') {
        const drawPolyline = new L.Draw.Polyline(this.leafletMap.leafletElement, this.state.drawOptions.polyline);
        this.setState({ creatingFeature: drawPolyline });
        drawPolyline.enable();
      } else if (map.createType === 'polygon') {
        const drawPolygon = new L.Draw.Polygon(this.leafletMap.leafletElement, this.state.drawOptions.polygon);
        this.setState({ creatingFeature: drawPolygon });
        drawPolygon.enable();
      }
    }

    map.createOff(); // Turn off feature create
  }

  // This is passed to featurePopup that opens CreateModal
  manageFeature(e) {
    if (e.feature) {
      this.showCreateModal();
      e.feature.editing.disable();
      map.manageTargetFeature();
    }

    this.setState({ manageOn: false });
  }

  removeNewTargetFeature(e) {
    if (confirm('Haluatko varmasti poistaa keskeneräisen kohteen ehdotuksen?')) {
      e.feature.options.editing || (e.feature.options.editing = {}); // Hack that works...
      e.feature.editing.disable();
      e.feature.remove();
      this.setState({ selectedFeature: { feature: null, featureDetails: null } });
    } else {
      this.setSelectedFeature(null, null);
    }
  }

  removeTargetFeature(e) {
    if (confirm('Oletko varma, että haluat poistaa kohteen?')) {

      // This is only called when the feature is already in db
      if (e.feature && e.featureDetails) {
        const queryOptions: any = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: e.featureDetails.gid, type: this.state.selectedLayer, name: e.featureDetails.name_fi, user: login.loggedUser })
        };

        if (e.feature instanceof L.CircleMarker) {
          this.removeTargetFeatureFetch(appUrls.removePoint, queryOptions, messages.mapMessages.removePointSuccess, messages.mapMessages.removePointFailure, e.feature);
        } else if ((e.feature instanceof L.Polyline) && !(e.feature instanceof L.Polygon)) {
          this.removeTargetFeatureFetch(appUrls.removeLine, queryOptions, messages.mapMessages.removeLineSuccess, messages.mapMessages.removeLineFailure, e.feature);
        } else if ((e.feature instanceof L.Polygon) && !(e.feature instanceof L.Rectangle)) {
          this.removeTargetFeatureFetch(appUrls.removeArea, queryOptions, messages.mapMessages.removeAreaSuccess, messages.mapMessages.removeAreaFailure, e.feature);
        }
      } else { // Just for case if the feature somehow doesn't have any information...
        e.feature.options.editing || (e.feature.options.editing = {}); // Hack that works...
        e.feature.editing.disable();
        e.feature.remove();
        this.setState({ selectedFeature: { feature: null, featureDetails: null } });
      }
    }

    this.setSelectedFeature(null, null);
  }

  removeTargetFeatureFetch(url, options, successMessage, failureMessage, feature) {
    fetch(url, options).then(response => response.json()).then(response => {
      feature.options.editing || (feature.options.editing = {}); // Hack that works...
      feature.editing.disable();
      feature.remove();
      this.setState({ selectedFeature: { feature: null, featureDetails: null } });

      modal.showSuccessAlert(successMessage);
    }).catch(error => {
      console.log(error);
      modal.showErrorAlert(failureMessage);
    });
  }

  startEditFeature(e) {
    this.leafletMap.leafletElement.closePopup();

    if (!this.state.editOn) {
      e.feature.options.editing || (e.feature.options.editing = {}); // Hack that works...

      if (e.feature instanceof L.CircleMarker) {
        e.feature.editing.enable();
      } else {
        // Feature can have multiple lines or polygons, therefore it is necessary to loop them through and manually start editing to each of them
        // If feature is newly created, it has only simple array (not MultiLineString or MultiPolygon)
        if (this.state.selectedFeature.featureDetails) {
          if ((e.feature instanceof L.Polyline) && !(e.feature instanceof L.Polygon) && e.feature.editing.latlngs[0].length > 1) {
            modal.showErrorAlert('Viivakohde on liian monimutkainen muokattavaksi sovelluksessa.');
            return;
          } else if ((e.feature instanceof L.Polygon) && !(e.feature instanceof L.Rectangle) && (e.feature.editing.latlngs[0].length > 1 || e.feature.editing.latlngs[0][0].length > 1)) {
            modal.showErrorAlert('Aluekohde on liian monimutkainen muokattavaksi sovelluksessa.');
            return;
          } else {
            let coordinates = [];
            for (let i = 0; i < e.feature.editing.latlngs.length; i++) {
              const coords = e.feature.editing.latlngs[i];
              e.feature.editing.latlngs = coords;
              coordinates[i] = coords;
              e.feature.editing.enable();
            }

            e.feature.editing.latlngs = coordinates;
          }
        } else {
          e.feature.editing.enable();
        }
      }

      map.startEditFeature();
      this.hideCreateModal();
      this.setState({ editOn: true, editStopOn: false });
    }
  }

  stopAddingFeature(e) {
    e.preventDefault();
    this.state.creatingFeature.disable();
    this.setState({ addingFeature: false, creatingFeature: null });
    map.createOffButtonStyling();
  }

  deleteLastVertex(e) {
    e.preventDefault();
    if (this.state.createType !== 'point') {
      this.state.creatingFeature.deleteLastVertex();
    }
  }

  stopEditFeature(e) {
    e.feature.options.editing || (e.feature.options.editing = {}); // Hack that works...
    e.feature.editing.disable();
    map.stopEditFeature();
    this.setState({ editOn: false, editStopOn: false });
  }

  unsetSelectedFeature() {
    this.leafletMap.leafletElement.closePopup();
    this.setState({ selectedFeature: { feature: null, featureDetails: null } });
    this.setSelectedFeature(null, null);
  }

  setSelectedFeature(feature, featureDetails, selectedLayer = null) {
    // Set the selectedLayer type -> needed for forms etc.
    this.setState({ selectedLayer: selectedLayer });

    if (!this.state.editOn) {
      // If feature was already selected set its style to default, refactoring needed...
      if (this.state.selectedFeature.feature) {
        if (this.state.selectedFeature.feature.hasOwnProperty('options')) {
          if (this.state.selectedFeature.feature.options.hasOwnProperty('children')) {
            if (this.state.selectedFeature.feature.options.children.hasOwnProperty('props')) {
              if (this.state.selectedFeature.feature.options.children.props.type.indexOf('approved') < 0) {
                this.setStylingToDefault();
              } else {
                if (this.state.selectedFeature.feature.options.children.props.type.indexOf('Point') >= 0 || this.state.selectedFeature.feature.options.children.props.type.indexOf('Area') >= 0) {
                  this.state.selectedFeature.feature.setStyle({ "fillColor": "black", "weight": 1.5 });
                } else {
                  this.state.selectedFeature.feature.setStyle({ "color": "black", "weight": 3 });
                }
              }
            } else {
              this.setStylingToDefault();
            }
          } else {
            this.setStylingToDefault();
          }
        } else {
          this.setStylingToDefault();
        }
      }

      // Now that the previous feature's color reseted, now select the new feature to state. First check if click was targeted towards map or not
      if (!(feature instanceof L.CircleMarker) && !((feature instanceof L.Polyline) && !(feature instanceof L.Polygon)) && !((feature instanceof L.Polygon) && !(feature instanceof L.Rectangle))) {
        // Since map was clicked reset the selected feature
        map.setFeatureSelected(false);
        this.setState({ selectedFeature: { feature: null, featureDetails: null } });
      } else {
        // Since we selected the currently clicked feature as selectedFeature, we can now apply some styling on it. Also, return the selected feature type
        let createType = this.setStyling(feature);

        // Since the selected feature was really a feature, select it!
        map.setFeatureSelected(true);
        this.setState({
          selectedFeature: { feature: feature, featureDetails: featureDetails },
          createType: createType
        });

        // If no featureDetails are present, it means that the feature is new, so show the createModal immediately
        if (!featureDetails) { this.showCreateModal(); }
      }
    } else {
      modal.showErrorAlert(messages.mapMessages.errorAlreadyModifying);
      this.leafletMap.leafletElement.closePopup();
    }
  }

  // Turn off highlighting by finding the layers default coloring
  setStylingToDefault() {
    if (this.state.selectedFeature.feature instanceof L.CircleMarker) {
      // If feature had details it means that its not newly created feature
      if (this.state.selectedFeature.featureDetails) {
        for (let i = 0; i < layer.pointLayers[0].features.length; i++) {
          if (this.state.selectedFeature.featureDetails.class2_fi === layer.pointLayers[0].features[i].name_fi) {
            this.state.selectedFeature.feature.setStyle({ "fillColor": layer.pointLayers[0].features[i].color, "weight": 1.5 });
          }
        }

        for (let i = 0; i < layer.pointLayers[1].features.length; i++) {
          if (this.state.selectedFeature.featureDetails.class2_fi === layer.pointLayers[1].features[i].name_fi) {
            this.state.selectedFeature.feature.setStyle({ "fillColor": layer.pointLayers[1].features[i].color, "weight": 1.5 });
          }
        }
      } else {
        this.state.selectedFeature.feature.setStyle({ "fillColor": "grey", "weight": 1.5 });
      }
    } else if ((this.state.selectedFeature.feature instanceof L.Polyline) && !(this.state.selectedFeature.feature instanceof L.Polygon)) {
      if (this.state.selectedFeature.featureDetails) {
        for (let i = 0; i < layer.lineLayers[0].features.length; i++) {
          if (this.state.selectedFeature.featureDetails.class2_fi === layer.lineLayers[0].features[i].name_fi) {
            this.state.selectedFeature.feature.setStyle({ "color": layer.lineLayers[0].features[i].color, "weight": 3 });
          }
        }
      } else {
        this.state.selectedFeature.feature.setStyle({ "color": "grey", "weight": 3 });
      }
    } else if ((this.state.selectedFeature.feature instanceof L.Polygon) && !(this.state.selectedFeature.feature instanceof L.Rectangle)) {
      if (this.state.selectedFeature.featureDetails) {

        for (let i = 0; i < layer.areaLayers[0].features.length; i++) {
          if (this.state.selectedFeature.featureDetails.class2_fi === layer.areaLayers[0].features[i].name_fi) {
            this.state.selectedFeature.feature.setStyle({ "fillColor": layer.areaLayers[0].features[i].color, "weight": 1.5 });
          }
        }

        for (let i = 0; i < layer.areaLayers[1].features.length; i++) {
          if (this.state.selectedFeature.featureDetails.class2_fi === layer.areaLayers[1].features[i].name_fi) {
            this.state.selectedFeature.feature.setStyle({ "fillColor": layer.areaLayers[1].features[i].color,  "weight": 1.5 });
          }
        }
      } else {
        this.state.selectedFeature.feature.setStyle({ "fillColor": "grey", "weight": 1.5 });
      }
    }
  }

  // Set highlight to feature
  setStyling(feature) {
    let createType = null;

    if (feature instanceof L.CircleMarker) {
      feature.bringToFront();
      feature.setStyle({ "fillColor": "red", "weight": 2.5 });
      createType = 'circlemarker';
    } else if ((feature instanceof L.Polyline) && !(feature instanceof L.Polygon)) {
      feature.bringToFront();
      feature.setStyle({ "color": "red", "weight": 4 });
      createType = 'polyline';
    } else if ((feature instanceof L.Polygon) && !(feature instanceof L.Rectangle)) {
      feature.bringToFront();
      feature.setStyle({ "fillColor": "red", "weight": 2.5 });
      createType = 'polygon';
    }

    return createType;
  }

  showCreateModal() {
    this.setState({ showCreateModal: true });
  }

  hideCreateModal() {
    this.setState({ showCreateModal: false });
  }

  switchLayer(layer) {
    // First remove the current layer
    this.leafletMap.leafletElement.removeLayer(this.state.layer);

    // Then add the layer according to the switchLayer val
    if (layer === 'taustakartta') {
      const taustakartta = L.tileLayer(mapUrls.taustakartta, {
  			minZoom: 0,
  			maxZoom: Infinity,
  			continuousWorld: true,
  			noWrap: true,
        subDomain: 'taustakartta'
      });

      this.leafletMap.leafletElement.addLayer(taustakartta);
      this.setState({ layer: taustakartta });
    } else if (layer === 'peruskartta') {
      const peruskartta = L.tileLayer(mapUrls.peruskartta, {
  			minZoom: 0,
  			maxZoom: Infinity,
  			continuousWorld: true,
  			noWrap: true,
        subDomain: 'peruskartta'
      });

      this.leafletMap.leafletElement.addLayer(peruskartta);
      this.setState({ layer: peruskartta });
    } else if (layer === 'ortokuva') {
      const ortokuva = L.tileLayer(mapUrls.ortokuva, { // Had to remove tms: true to get it working
  			minZoom: 0,
  			maxZoom: Infinity,
  			continuousWorld: true,
  			noWrap: true,
        subDomain: 'ortokuva'
      });

      this.leafletMap.leafletElement.addLayer(ortokuva);
      this.setState({ layer: ortokuva });
    }
  }

  render() {
    // Dummy reactComponent is to trigger componentWillReact for mobx-react...
    return (
      <div className="mapContainer">
        <UtilModalContainer />

        {this.state.showCreateModal &&
          <CreateModalContainer
            showCreateModal={this.state.showCreateModal}
            createType={this.state.createType}
            hideModal={this.hideCreateModal}
            feature={this.state.selectedFeature}
            selectedLayer={this.state.selectedLayer}
            unsetFeature={this.unsetSelectedFeature}
            startEdit={this.startEditFeature}
            removeNewTarget={this.removeNewTargetFeature}
            removeTarget={this.removeTargetFeature}
          />
        }

        <Dummy
          isCreateOnDummy={map.isCreateOn}
          manageFeatureDummy={map.manageFeature}
          stopEditDummy={map.stopEdit}
        />

        <div className={"layerSwitcher"}>
          <ButtonToolbar>
            <ToggleButtonGroup type={"radio"} name={"layers"} defaultValue={'taustakartta'} onChange={e => this.switchLayer(e)}>
              <ToggleButton value={'taustakartta'}>Taustakartta</ToggleButton>
              <ToggleButton value={'peruskartta'}>Peruskartta</ToggleButton>
              <ToggleButton value={'ortokuva'}>Ortokuva</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        {this.state.addingFeature &&
          <div className={"stopAddingButton"}>
            <Button bsStyle={"warning"} bsSize={"small"} onClick={e => this.deleteLastVertex(e)} disabled={map.buttonCreateType === 'point'}>Poista viimeisin piste</Button>
          </div>
        }

        {this.state.addingFeature &&
          <div className={"stopEditButton"}>
            <Button bsStyle={"danger"} bsSize={"small"} onClick={e => this.stopAddingFeature(e)}>Peruuta kohteen lisääminen</Button>
          </div>
        }

        {map.toggleEditState &&
          <div className={"stopEditButton"}>
            <Button bsStyle={"danger"} bsSize={"small"} onClick={map.stopEditFeature}>Lopeta sijainnin muokkaus</Button>
          </div>
        }

        <Map
          ref={(map) => { this.leafletMap = map; }}
        >
          <FeatureGroup ref={(areafeatures) => { this.areafeatures = areafeatures; }}>
            <AreaFeatures alueet={data.areaUpdate} setSelectedFeature={this.setSelectedFeature} />
          </FeatureGroup>

          <FeatureGroup ref={(linefeatures) => { this.linefeatures = linefeatures; }}>
            <LineFeatures reitit={data.lineUpdate} setSelectedFeature={this.setSelectedFeature} />
          </FeatureGroup>

          <FeatureGroup ref={(pointfeatures) => { this.pointfeatures = pointfeatures; }}>
            <PointFeatures pisteet={data.pointUpdate} setSelectedFeature={this.setSelectedFeature} />
          </FeatureGroup>

          <FeatureGroup><AreaApprovalFeatures alueet={data.areaApprovalUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>
          <FeatureGroup><LineApprovalFeatures reitit={data.lineApprovalUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>
          <FeatureGroup><PointApprovalFeatures pisteet={data.pointApprovalUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>

          <FeatureGroup><AreaUserFeatures alueet={data.areaUserUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>
          <FeatureGroup><LineUserFeatures reitit={data.lineUserUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>
          <FeatureGroup><PointUserFeatures pisteet={data.pointUserUpdate} setSelectedFeature={this.setSelectedFeature} /></FeatureGroup>
        </Map>
      </div>
    );
  }
}
