import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Tabs, Tab, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import 'whatwg-fetch';

declare const L: any; // Some hack that works for including L & L.draw

import { layer, data, form, modal, login, map } from '../../model/store';
import { CreateModalForm } from './createModals/CreateModalForm';
import validateBorders from './validateBorders';

import { appUrls } from '../../config';

import '../../../css/modal.css!';

@observer
export class CreateModalContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      featureInfoExists: false, // This for determine whether to use create or update as post method!
      form: map.checkFormEditOn ? map.formState : form.initialState // This is for not reseting form state if modifing feature geometry
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.resetFeatureCoords = this.resetFeatureCoords.bind(this);
  }

  // This is for filling up the form content based whether feature has properties or it is newly created feature
  componentDidMount() {
    // This means that props contain values of the feature already
    if (this.props.feature.featureDetails) {
      this.setState({ featureInfoExists: true });

      if (!map.checkFormEditOn) {
        const featureDetails = this.props.feature.featureDetails;

        // Go through existing data and the data to the form
        for (let prop in featureDetails) {
          if (featureDetails.hasOwnProperty(prop)) {
            const form = this.state.form;

            if (!featureDetails[prop]) {
              form[prop] = undefined;
            } else {
              if (prop.indexOf('timestamp') >= 0) {
                form[prop] = moment().format('YYYY-MM-DD'); // Always update the timestamp
              } else {
                form[prop] = featureDetails[prop];
              }
            }

            this.setState({ form });
          }
        }
      } else {
        if (this.props.createType === 'circlemarker') {
          this.setState({ form: { ...this.state.form,
            x_eureffin: this.props.feature.feature._latlng.lng,
            y_eureffin: this.props.feature.feature._latlng.lat
          }});
        }

        // Automatically get the underlaying border features property values
        const borderValues = validateBorders(this.props.createType, this.props.feature.feature, true);

        this.setState({
          form: { ...this.state.form,
            municipali: borderValues.municipalities.join(', '),
            munici_nro: borderValues.municipality_numbers.join(', '),
            region: borderValues.regions.join(', '),
            region_nro: borderValues.region_numbers.join(', '),
            subregion: borderValues.subregions.join(', '),
            subreg_nro: borderValues.subregion_numbers.join(', '),
          }
        });
      }
    } else {
      // If feature has no properties (new feature) then set its state as initial and add the correct default values for the select vals
      this.setState({ featureInfoExists: false });

      if (!map.checkFormEditOn) {

        // Reset current state values
        for (let prop in this.state.form) {
          if (this.state.form.hasOwnProperty(prop)) {
            const form = this.state.form;
            form[prop] = undefined;
            this.setState({ form });
          }
        }

        // Automatically get the underlaying border features property values
        const borderValues = validateBorders(this.props.createType, this.props.feature.feature);

        const updater_id = login.updater_id === '' ? undefined : login.updater_id;

        // Sets the form initial values based on the selected feature
        if (this.props.createType === 'circlemarker') {
          if (this.props.feature.feature) { // If circle marker is new add its coordinates
            this.setState({
              form: { ...this.state.form,
                class1_fi: 'Virkistyskohde', class1_se: 'rekreationsobjekt', class1_en: 'recreational attraction',
                class2_fi: 'Luonto- tai lintutorni', class2_se: 'natur- eller fågeltorn', class2_en: 'nature or bird watching tower',
                municipali: borderValues.municipalities.join(', '),
                munici_nro: borderValues.municipality_numbers.join(', '),
                region: borderValues.regions.join(', '),
                region_nro: borderValues.region_numbers.join(', '),
                subregion: borderValues.subregions.join(', '),
                subreg_nro: borderValues.subregion_numbers.join(', '),
                x_eureffin: this.props.feature.feature._latlng.lng,
                y_eureffin: this.props.feature.feature._latlng.lat,
                timestamp: moment().format('YYYY-MM-DD'),
                sh_es_date: moment().format('YYYY-MM-DD'),
                publicinfo: 'F',
                no_address: 'T',
                updater_id: updater_id
              }
            });
          }
        } else if (this.props.createType === 'polyline') {
          this.setState({
            form: { ...this.state.form,
              class1_fi: 'Virkistysreitti', class1_se: 'rekreationsrutt', class1_en: 'recreational route',
              class2_fi: 'Retkeilyreitti', class2_se: 'vandringsrutt', class2_en: 'hiking route',
              municipali: borderValues.municipalities.join(', '),
              munici_nro: borderValues.municipality_numbers.join(', '),
              region: borderValues.regions.join(', '),
              region_nro: borderValues.region_numbers.join(', '),
              subregion: borderValues.subregions.join(', '),
              subreg_nro: borderValues.subregion_numbers.join(', '),
              timestamp: moment().format('YYYY-MM-DD'),
              sh_es_date: moment().format('YYYY-MM-DD'),
              publicinfo: 'F',
              no_address: 'T',
              updater_id: updater_id
            }
          });
        } else if (this.props.createType === 'polygon') {
          this.setState({
            form: { ...this.state.form,
              class1_fi: 'Virkistysalue', class1_se: 'rekreationsområde', class1_en: 'recreational area',
              class2_fi: 'Retkeilyalue', class2_se: 'vandringsområde', class2_en: 'hiking area',
              municipali: borderValues.municipalities.join(', '),
              munici_nro: borderValues.municipality_numbers.join(', '),
              region: borderValues.regions.join(', '),
              region_nro: borderValues.region_numbers.join(', '),
              subregion: borderValues.subregions.join(', '),
              subreg_nro: borderValues.subregion_numbers.join(', '),
              timestamp: moment().format('YYYY-MM-DD'),
              sh_es_date: moment().format('YYYY-MM-DD'),
              publicinfo: 'F',
              no_address: 'T',
              updater_id: updater_id
            }
          });
        }

      } else {
        if (this.props.createType === 'circlemarker') {
          this.setState({ form: { ...this.state.form,
            x_eureffin: this.props.feature.feature._latlng.lng,
            y_eureffin: this.props.feature.feature._latlng.lat
          }});
        }

        // Automatically get the underlaying border features property values
        const borderValues = validateBorders(this.props.createType, this.props.feature.feature);

        this.setState({
          form: { ...this.state.form,
            municipali: borderValues.municipalities.join(', '),
            munici_nro: borderValues.municipality_numbers.join(', '),
            region: borderValues.regions.join(', '),
            region_nro: borderValues.region_numbers.join(', '),
            subregion: borderValues.subregions.join(', '),
            subreg_nro: borderValues.subregion_numbers.join(', '),
          }
        });
      }
    }

    // Now that form is updated, reset state for enabled edit (from form)
    map.toggleFormEdit(false);
  }

  // This resets faeture back after possible geometry changes
  resetFeatureCoords(feature) {
    let coordArray = [];

    // Get feature coordinates for feature equal check -> to see whether the feature coords have been edited
    if (this.props.selectedLayer.indexOf('point') >= 0) {
      coordArray = [feature.feature._latlng.lat, feature.feature._latlng.lng];
    } else if (this.props.selectedLayer.indexOf('line') >= 0) {
      feature.feature._latlngs.forEach((coord, idx) => {
        coordArray.push([]);
        coord.forEach((coord2, idx2) => {
          const coords = { lat: coord2.lat, lng: coord2.lng };
          coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
        })
      });
    } else if (this.props.selectedLayer.indexOf('area') >= 0) {
      if (this.props.selectedLayer.toLowerCase().indexOf('approval') >= 0) { // Approval area coords don't have same ending and starting point
        feature.feature._latlngs[0].forEach((coord, idx) => {
          coordArray.push([]);
          coord.forEach((coord2, idx2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
          });
        });
        coordArray = [coordArray];
      } else {
        feature.feature._latlngs[0].forEach((coord, idx) => {
          coordArray.push([]);
          coord.forEach((coord2, idx2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
          });
          const firstCoord = { lat: coord[0].lat, lng: coord[0].lng };
          coordArray[idx].push(Object.keys(firstCoord).map(item => firstCoord[item]));
        });
        coordArray = [coordArray];
      }
    }

    if (!isEqual(this.state.form.geom.coordinates, coordArray)) {
      if (this.props.selectedLayer.toLowerCase().indexOf('approval') >= 0) {
        if (this.props.selectedLayer === 'pointApprovalFeatures') {
          data.updateFeatures(feature.featureDetails, 'point', true);
        } else if (this.props.selectedLayer === 'lineApprovalFeatures') {
          data.updateFeatures(feature.featureDetails, 'line', true);
        } else if (this.props.selectedLayer === 'areaApprovalFeatures') {
          data.updateFeatures(feature.featureDetails, 'polygon', true);
        }
      } else if (this.props.selectedLayer.toLowerCase().indexOf('point') >= 0) {
        data.updateFeatures(feature.featureDetails, 'point', false);
      } else if (this.props.selectedLayer.toLowerCase().indexOf('line') >= 0) {
        data.updateFeatures(feature.featureDetails, 'line', false);
      } else if (this.props.selectedLayer.toLowerCase().indexOf('area') >= 0) {
        data.updateFeatures(feature.featureDetails, 'polygon', false);
      }
    }
  }

  handleChange(event, layer, newValue = null) {
    // Check if the form change occurs for class1 or class2. If it does change the values for se and en values accordingly
    if (event.target.id === 'class1_fi') {
      layer.map(layer => {
        if (layer.name_fi === event.target.value) {
          this.setState({
            form: { ...this.state.form,
              class1_fi: event.target.value, class1_se: layer.name_se, class1_en: layer.name_en
            }
          });
        }
      });
    } else if (event.target.id === 'class2_fi') {
      layer.map(layer => {
        if (layer.name_fi === event.target.value) {
          this.setState({
            form: { ...this.state.form,
              class2_fi: event.target.value, class2_se: layer.name_se, class2_en: layer.name_en
            }
          });
        }
      });
    } else if (event.target.id === 'no_address') {
      this.setState({ form: { ...this.state.form, [event.target.id]: event.target.value } });
    } else if (event.target.id === 'publicinfo') {
      this.setState({ form: { ...this.state.form, [event.target.id]: event.target.value } });
    } else {
      // If other form values were changed handle them normaly
      this.setState({
        form: { ...this.state.form, [event.target.id]: newValue ? newValue: event.target.value }
      });
    }
  }

  sendPost(type, feature) {
    let url: any = null;
    let array: any = [];
    let geomFeature: any = null;

    if (type === 'circlemarker') {
      const coords = [feature._latlng.lat, feature._latlng.lng];
      url = this.state.featureInfoExists ? appUrls.updatePoint : appUrls.createPoint;

      geomFeature = {
        type: 'Point',
        coordinates: coords,
        crs: { type: 'name', properties: { name: 'EPSG:3067' } }
      }
    } else if (type ==='polyline') {
      if (!this.state.featureInfoExists) {
        url = appUrls.createLine;

        array.push([]);
        feature._latlngs.forEach((coord, idx) => {
          const coords = { lat: coord.lat, lng: coord.lng };
          array[0].push(Object.keys(coords).map(item => coords[item]));
        });
      } else {
        url = appUrls.updateLine;

        feature._latlngs.forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2, idx2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            array[idx].push(Object.keys(coords).map(item => coords[item]));
          })
        });
      }

      geomFeature = {
        type: 'MultiLineString',
        coordinates: array,
        crs: { type: 'name', properties: { name: 'EPSG:3067' } }
      }
    } else if (type === 'polygon') {
      if (!this.state.featureInfoExists) {
        url = appUrls.createArea

        feature._latlngs.forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2, idx2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            array[idx].push(Object.keys(coords).map(item => coords[item]));
          });
        });
      } else {
        url = appUrls.updateArea;

        feature._latlngs[0].forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2, idx2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            array[idx].push(Object.keys(coords).map(item => coords[item]));
          });
        });
      }

      geomFeature = {
        type: 'MultiPolygon',
        coordinates: [array], // Wrap coordinates inside of an array to avoid -> error: Geometry has z dimension but column does not exist
        crs: { type: 'name', properties: { name: 'EPSG:3067' } }
      }
    }

    if (!this.state.featureInfoExists) {
      if (confirm('Haluatko varmasti lisätä kohteen?')) { this.sendDbPost(type, url, geomFeature, feature, 'CREATE'); }
    } else {
      if (confirm('Haluatko varmasti päivittää kohteen tiedot?')) { this.sendDbPost(type, url, geomFeature, feature, 'UPDATE'); }
    }
  }

  sendDbPost(type, url, featureGeom, feature, operation) {
    let bodyContent = {};
    if (type === 'circlemarker') {
      form.pointFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    } else if (type === 'polyline') {
      form.lineFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    } else if (type === 'polygon') {
      form.areaFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    }

    bodyContent['geom'] = featureGeom;
    bodyContent['type'] = this.props.selectedLayer;

    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ user: login.loggedUser, body: bodyContent })
    };

    fetch(url, queryOptions).then(response => response.json()).then(response => {
      this.updateFeaturesToMap(this.state.form, type, this.props.selectedLayer);
      feature.remove();
      this.props.hideModal();

      let message = operation === 'CREATE' ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
      if (type === 'circlemarker') {
        message = operation === 'CREATE' ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
      } else if (type === 'polyline') {
        message = operation === 'CREATE' ? 'Reitti lisätty onnistuneesti.' : 'Reitti päivitetty onnistuneesti.';
      } else if (type === 'polygon') {
        message = operation === 'CREATE' ? 'Alue lisätty onnistuneesti.' : 'Alue päivitetty onnistuneesti.';
      }

      modal.showSuccessAlert(message);
    }).catch(error => {
      console.log(error);
      feature.remove();
      this.props.hideModal();

      let message = operation === 'CREATE' ? 'Kohteen lisäys epäonnistui.' : 'Kohde päivitys epäonnistui.';
      if (type === 'circlemarker') {
        message = operation === 'CREATE' ? 'Kohteen lisäys epäonnistui.' : 'Kohde päivitys epäonnistui.';
      } else if (type === 'polyline') {
        message = operation === 'CREATE' ? 'Reitin lisäys epäonnistui.' : 'Reitin päivitys epäonnistui.';
      } else if (type === 'polygon') {
        message = operation === 'CREATE' ? 'Alueen lisäys epäonnistui.' : 'Alueen päivitys epäonnistui.';
      }

      modal.showErrorAlert(message);
    });
  }

  updateFeaturesToMap(form, type, layerType) {
    if (layerType.indexOf('newFeature') >= 0) { // create
      if (this.props.createType === 'circlemarker') {
        data.updateApprovalFeatures('Pistekohteet');
        layer.approvalLayers[0].features.find(feature => feature.name_fi === 'Pistekohteet').selected = true;
      } else if (this.props.createType === 'polyline') {
        data.updateApprovalFeatures('Reittikohteet');
        layer.approvalLayers[0].features.find(feature => feature.name_fi === 'Reittikohteet').selected = true;
      } else if (this.props.createType === 'polygon') {
        data.updateApprovalFeatures('Aluekohteet');
        layer.approvalLayers[0].features.find(feature => feature.name_fi === 'Aluekohteet').selected = true;
      }
    } else if (layerType.indexOf('ApprovalFeatures') >= 0) { // update
      if (layerType === 'pointApprovalFeatures') {
        data.updateFeatures(this.props.feature.featureDetails, 'point', true);
      } else if (layerType === 'lineApprovalFeatures') {
        data.updateFeatures(this.props.feature.featureDetails, 'line', true);
      } else if (layerType === 'areaApprovalFeatures') {
        data.updateFeatures(this.props.feature.featureDetails, 'polygon', true);
      }
    } else { // update
      if (type === 'circlemarker') {
        data.updateFeatures(this.props.feature.featureDetails, 'point', false);
      } else if (type === 'polyline') {
        data.updateFeatures(this.props.feature.featureDetails, 'line', false);
      } else if (type === 'polygon') {
        data.updateFeatures(this.props.feature.featureDetails, 'polygon', false);
      }
    }
  }

  render() {
    const { showCreateModal, createType, hideModal, feature, unsetFeature, startEdit, removeNewTarget, removeTarget } = this.props;

    if (createType === 'circlemarker') {
      return (
        <CreateModalForm
          createType={createType}
          formConfig={form.pointFormConfig}
          layers={layer.pointLayers}

          showCreateModal={showCreateModal}
          hideModal={hideModal}
          feature={feature}
          unsetFeature={unsetFeature}
          startEdit={startEdit}
          removeNewTarget={removeNewTarget}
          removeTarget={removeTarget}

          sendPost={this.sendPost}
          handleFormChange={this.handleChange}
          parentState={this.state.form}
          resetFeatureCoords={this.resetFeatureCoords}
        />
      );
    } else if (createType === 'polyline') {
      return (
        <CreateModalForm
          createType={createType}
          formConfig={form.lineFormConfig}
          layers={layer.lineLayers}

          showCreateModal={showCreateModal}
          hideModal={hideModal}
          feature={feature}
          unsetFeature={unsetFeature}
          startEdit={startEdit}
          removeNewTarget={removeNewTarget}
          removeTarget={removeTarget}

          sendPost={this.sendPost}
          handleFormChange={this.handleChange}
          parentState={this.state.form}
          resetFeatureCoords={this.resetFeatureCoords}
        />
      );
    } else if (createType === 'polygon') {
      return (
        <CreateModalForm
          createType={createType}
          formConfig={form.areaFormConfig}
          layers={layer.areaLayers}

          showCreateModal={showCreateModal}
          hideModal={hideModal}
          feature={feature}
          unsetFeature={unsetFeature}
          startEdit={startEdit}
          removeNewTarget={removeNewTarget}
          removeTarget={removeTarget}

          sendPost={this.sendPost}
          handleFormChange={this.handleChange}
          parentState={this.state.form}
          resetFeatureCoords={this.resetFeatureCoords}
        />
      );
    }

    return null;
  }
}
