import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import 'whatwg-fetch';

import { layer, data, form, modal, login, map } from '../../model/store';
import { CreateModalForm } from './createModals/CreateModalForm';
import validateBorders from './validateBorders';

import { handleHttpErrorsGeneric } from '../../utils';
import { appUrls } from '../../config/config';
import { postOptions } from '../../config/fetchConfig';
import {
  LINESTRING,
  POINT,
  POLYGON,
  POINT_FEATURES,
  LINE_FEATURES,
  AREA_FEATURES,
  TIMESTAMP,
  AREA,
  APPROVAL,
  CLASS1_FI,
  CLASS2_FI,
  NO_ADDRESS,
  HIDDEN,
  PUBLICINFO,
  CREATE,
  UPDATE,
  DATE_FORMAT,
  CIRCLE_MARKER,
  POLYLINE,
  POINT_APPROVAL_FEATURES,
  LINE_APPROVAL_FEATURES,
  AREA_APPROVAL_FEATURES,
  POINT_USER_FEATURES,
  LINE_USER_FEATURES,
  AREA_USER_FEATURES,
} from '../../config/constants';

import '../../../css/modal.css!';

@observer
export class CreateModalContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      featureInfoExists: false, // This for determine whether to use create or update as post method!
      form: map.checkFormEditOn ? map.formState : form.initialFormState // This is for not reseting form state if modifing feature geometry
    };
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
              if (prop.indexOf(TIMESTAMP) >= 0) {
                form[prop] = moment().format(DATE_FORMAT); // Always update the timestamp
              } else {
                form[prop] = featureDetails[prop];
              }
            }

            this.setState({ form });
          }
        }
      } else {
        if (this.props.createType === CIRCLE_MARKER) {
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
        if (this.props.createType === CIRCLE_MARKER) {
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
                timestamp: moment().format(DATE_FORMAT),
                sh_es_date: moment().format(DATE_FORMAT),
                publicinfo: 'F',
                no_address: 'F',
                hidden: false,
                updater_id: updater_id
              }
            });
          }
        } else if (this.props.createType === POLYLINE) {
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
              timestamp: moment().format(DATE_FORMAT),
              sh_es_date: moment().format(DATE_FORMAT),
              publicinfo: 'F',
              no_address: 'F',
              hidden: false,
              updater_id: updater_id
            }
          });
        } else if (this.props.createType === POLYGON) {
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
              timestamp: moment().format(DATE_FORMAT),
              sh_es_date: moment().format(DATE_FORMAT),
              publicinfo: 'F',
              no_address: 'F',
              hidden: false,
              updater_id: updater_id
            }
          });
        }

      } else {
        if (this.props.createType === CIRCLE_MARKER) {
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
  resetFeatureCoords = (feature) => {
    const { selectedLayer } = this.props;

    let coordArray = [];

    // Get feature coordinates for feature equal check -> to see whether the feature coords have been edited
    if (selectedLayer.indexOf(POINT) >= 0) {
      coordArray = [feature.feature._latlng.lat, feature.feature._latlng.lng];
    } else if (selectedLayer.indexOf(LINESTRING) >= 0) {
      feature.feature._latlngs.forEach((coord, idx) => {
        coordArray.push([]);
        coord.forEach((coord2) => {
          const coords = { lat: coord2.lat, lng: coord2.lng };
          coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
        })
      });
    } else if (selectedLayer.indexOf(AREA) >= 0) {
      if (selectedLayer.toLowerCase().indexOf(APPROVAL) >= 0) { // Approval area coords don't have same ending and starting point
        feature.feature._latlngs[0].forEach((coord, idx) => {
          coordArray.push([]);
          coord.forEach((coord2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
          });
        });
        coordArray = [coordArray];
      } else {
        feature.feature._latlngs[0].forEach((coord, idx) => {
          coordArray.push([]);
          coord.forEach((coord2) => {
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
      if (selectedLayer.toLowerCase().indexOf(APPROVAL) >= 0) {
        if (selectedLayer === POINT_APPROVAL_FEATURES) {
          data.updateFeatures(feature.featureDetails, POINT, true, false);
        } else if (selectedLayer === LINE_APPROVAL_FEATURES) {
          data.updateFeatures(feature.featureDetails, LINESTRING, true, false);
        } else if (selectedLayer === AREA_APPROVAL_FEATURES) {
          data.updateFeatures(feature.featureDetails, POLYGON, true, false);
        }
      } else if (selectedLayer.toLowerCase().indexOf('user') >= 0) {
        if (selectedLayer === POINT_USER_FEATURES) {
          data.updateFeatures(feature.featureDetails, POINT, false, true);
        } else if (selectedLayer === LINE_USER_FEATURES) {
          data.updateFeatures(feature.featureDetails, LINESTRING, false, true);
        } else if (selectedLayer === AREA_USER_FEATURES) {
          data.updateFeatures(feature.featureDetails, POLYGON, false, true);
        }
      } else if (selectedLayer.toLowerCase().indexOf(POINT) >= 0) {
        data.updateFeatures(feature.featureDetails, POINT, false, false);
      } else if (selectedLayer.toLowerCase().indexOf(LINESTRING) >= 0) {
        data.updateFeatures(feature.featureDetails, LINESTRING, false, false);
      } else if (selectedLayer.toLowerCase().indexOf(AREA) >= 0) {
        data.updateFeatures(feature.featureDetails, POLYGON, false, false);
      }
    }
  }

  handleChange = (event, layer, newValue = null) => {
    const { id, value } = event.target;

    // Check if the form change occurs for class1 or class2. If it does change the values for se and en values accordingly
    if (id === CLASS1_FI) {
      layer.map(layer => {
        if (layer.name_fi === value) {
          this.setState({
            form: { ...this.state.form,
              class1_fi: value, class1_se: layer.name_se, class1_en: layer.name_en
            }
          });
        }
      });
    } else if (id === CLASS2_FI) {
      layer.map(layer => {
        if (layer.name_fi === value) {
          this.setState({
            form: { ...this.state.form,
              class2_fi: value, class2_se: layer.name_se, class2_en: layer.name_en
            }
          });
        }
      });
    } else if (id === NO_ADDRESS) {
      if (value === 'T') {
        this.setState({ form: { ...this.state.form, [id]: value } });
      } else {
        this.setState({ form: { ...this.state.form, [id]: value, address: '' }});
      }
    } else if (id === PUBLICINFO) {
      this.setState({ form: { ...this.state.form, [id]: value } });
    } else if (id === HIDDEN) {
      this.setState({ form: { ...this.state.form, [id]: value } });
    } else {
      // If other form values were changed handle them normaly
      this.setState({
        form: { ...this.state.form, [id]: newValue ? newValue: value }
      });
    }
  }

  sendPost = (type, feature) => {
    const { featureInfoExists } = this.state;

    let url: any = null;
    let array: any = [];
    let geomFeature: any = null;

    if (type === CIRCLE_MARKER) {
      const coords = [feature._latlng.lat, feature._latlng.lng];
      url = featureInfoExists ? appUrls.updatePoint : appUrls.createPoint;

      geomFeature = {
        type: POINT,
        coordinates: coords,
        crs: { type: 'name', properties: { name: 'EPSG:3067' } }
      }
    } else if (type === POLYLINE) {
      if (!featureInfoExists) {
        url = appUrls.createLine;

        array.push([]);
        feature._latlngs.forEach((coord) => {
          const coords = { lat: coord.lat, lng: coord.lng };
          array[0].push(Object.keys(coords).map(item => coords[item]));
        });
      } else {
        url = appUrls.updateLine;

        feature._latlngs.forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2) => {
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
    } else if (type === POLYGON) {
      if (!featureInfoExists) {
        url = appUrls.createArea

        feature._latlngs.forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2) => {
            const coords = { lat: coord2.lat, lng: coord2.lng };
            array[idx].push(Object.keys(coords).map(item => coords[item]));
          });
        });
      } else {
        url = appUrls.updateArea;

        feature._latlngs[0].forEach((coord, idx) => {
          array.push([]);
          coord.forEach((coord2) => {
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

    if (!featureInfoExists) {
      if (confirm('Haluatko varmasti lisätä kohteen?')) {
        this.sendDbPost(type, url, geomFeature, feature, CREATE);
      }
    } else {
      if (confirm('Haluatko varmasti päivittää kohteen tiedot?')) {
        this.sendDbPost(type, url, geomFeature, feature, UPDATE);
      }
    }
  }

  sendDbPost = (type, url, featureGeom, feature, operation) => {
    const { selectedLayer, feature: { featureDetails } } = this.props;

    let bodyContent = {};
    if (type === CIRCLE_MARKER) {
      form.pointFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    } else if (type === POLYLINE) {
      form.lineFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    } else if (type === POLYGON) {
      form.areaFormConfig.map(item => { bodyContent[item.attr] = this.state.form[item.attr]; });
    }

    bodyContent['geom'] = featureGeom;
    bodyContent['type'] = selectedLayer;

    const options: any = postOptions;
    options.body = JSON.stringify({ user: login.loggedUser, body: bodyContent });

    fetch(url, options)
    .then(handleHttpErrorsGeneric)
    .then(response => response.json())
    .then(() => {
      if (selectedLayer.indexOf('newFeature') >= 0) feature.remove();
      this.props.unsetFeature();
      this.updateFeaturesToMap(type, selectedLayer, featureDetails);
      this.props.hideModal();

      let message = operation === CREATE ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
      if (type === CIRCLE_MARKER) {
        message = operation === CREATE ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
      } else if (type === POLYLINE) {
        message = operation === CREATE ? 'Reitti lisätty onnistuneesti.' : 'Reitti päivitetty onnistuneesti.';
      } else if (type === POLYGON) {
        message = operation === CREATE ? 'Alue lisätty onnistuneesti.' : 'Alue päivitetty onnistuneesti.';
      }

      modal.showSuccessAlert(message);
    }).catch((e) => {
      feature.remove();
      this.props.unsetFeature();
      this.props.hideModal();

      let message = operation === CREATE ? 'Kohteen lisäys epäonnistui.' : 'Kohteen päivitys epäonnistui.';
      if (type === CIRCLE_MARKER) {
        message = operation === CREATE ? 'Kohteen lisäys epäonnistui.' : 'Kohteen päivitys epäonnistui.';
      } else if (type === POLYLINE) {
        message = operation === CREATE ? 'Reitin lisäys epäonnistui.' : 'Reitin päivitys epäonnistui.';
      } else if (type === POLYGON) {
        message = operation === CREATE ? 'Alueen lisäys epäonnistui.' : 'Alueen päivitys epäonnistui.';
      }

      modal.showErrorAlert(message + "\n" +e.message);
    });
  }

  updateFeaturesToMap(type, layerType, featureDetails) {
    if (layerType.indexOf('newFeature') >= 0) { // create
      if (this.props.createType === CIRCLE_MARKER) {
        data.updateApprovalFeatures(POINT_FEATURES);
        layer.approvalLayers[0].features.find(feature => feature.name_fi === POINT_FEATURES).selected = true;
      } else if (this.props.createType === POLYLINE) {
        data.updateApprovalFeatures(LINE_FEATURES);
        layer.approvalLayers[0].features.find(feature => feature.name_fi === LINE_FEATURES).selected = true;
      } else if (this.props.createType === POLYGON) {
        data.updateApprovalFeatures(AREA_FEATURES);
        layer.approvalLayers[0].features.find(feature => feature.name_fi === AREA_FEATURES).selected = true;
      }
    } else if (layerType.indexOf('ApprovalFeatures') >= 0) { // update
      if (layerType === POINT_APPROVAL_FEATURES) {
        data.updateFeatures(featureDetails, POINT, true, false);
      } else if (layerType === LINE_APPROVAL_FEATURES) {
        data.updateFeatures(featureDetails, LINESTRING, true, false);
      } else if (layerType === AREA_APPROVAL_FEATURES) {
        data.updateFeatures(featureDetails, POLYGON, true, false);
      }
    } else if (layerType.indexOf('UserFeatures') >= 0) { // update
      if (layerType === POINT_USER_FEATURES) {
        data.updateFeatures(featureDetails, POINT, false, true);
      } else if (layerType === LINE_USER_FEATURES) {
        data.updateFeatures(featureDetails, LINESTRING, false, true);
      } else if (layerType === AREA_USER_FEATURES) {
        data.updateFeatures(featureDetails, POLYGON, false, true);
      }
    } else { // update
      if (type === CIRCLE_MARKER) {
        data.updateFeatures(featureDetails, POINT, false, false);
      } else if (type === POLYLINE) {
        data.updateFeatures(featureDetails, LINESTRING, false, false);
      } else if (type === POLYGON) {
        data.updateFeatures(featureDetails, POLYGON, false, false);
      }
    }
  }

  render() {
    const { showCreateModal, createType, hideModal, feature, unsetFeature, startEdit, removeNewTarget, removeTarget } = this.props;

    if (createType === CIRCLE_MARKER) {
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
    } else if (createType === POLYLINE) {
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
    } else if (createType === POLYGON) {
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
