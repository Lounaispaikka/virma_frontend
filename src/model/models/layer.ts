import { observable, action } from 'mobx';
import { data } from '../store';

import { pointLayers } from '../../config/layerConfig/pointLayers';
import { lineLayers } from '../../config/layerConfig/lineLayers';
import { areaLayers } from '../../config/layerConfig/areaLayers';
import { approvalLayers } from '../../config/layerConfig/approvalLayers';
import { userLayers } from '../../config/layerConfig/userLayers';

import {
  ALL,
  POINT,
  LINESTRING,
  POLYGON,
  APPROVAL,
  RECREATIONAL_ATTRACTION,
  TOURIST_ATTRACTION,
  RECREATIONAL_ROUTE,
  RECREATIONAL_AREA,
  TOURIST_SERVICE_AREA,
  APPROVAL_FEATURES,
  ALL_FEATURES,
} from '../../config/constants';

export default class Layer {
  @observable pointLayers = pointLayers;
  @observable lineLayers = lineLayers;
  @observable areaLayers = areaLayers;
  @observable approvalLayers = approvalLayers;
  @observable userLayers = userLayers;

  @action.bound
  layerToggleAll(e, type, class1_fi) {
    e.preventDefault();

    if (class1_fi === RECREATIONAL_ATTRACTION) {
      this.layerToggleAllLoop(this.pointLayers[0], type, class1_fi);
    } else if (class1_fi === TOURIST_ATTRACTION) {
      this.layerToggleAllLoop(this.pointLayers[1], type, class1_fi);
    } else if (class1_fi === RECREATIONAL_ROUTE) {
      this.layerToggleAllLoop(this.lineLayers[0], type, class1_fi);
    } else if (class1_fi === RECREATIONAL_AREA) {
      this.layerToggleAllLoop(this.areaLayers[0], type, class1_fi);
    } else if (class1_fi === TOURIST_SERVICE_AREA) {
      this.layerToggleAllLoop(this.areaLayers[1], type, class1_fi);
    } else if (class1_fi === APPROVAL_FEATURES) {
      this.layerToggleAllLoop(this.approvalLayers[0], type, class1_fi);
    } else if (class1_fi === ALL_FEATURES) {
      this.layerToggleAllLoop(this.userLayers[0], type, class1_fi);
    }
  }

  layerToggleAllLoop(layers, type, class1_fi) {
    layers.selected === false ? data.addAllFeatures(type, class1_fi) : data.removeAllFeatures(type, class1_fi);
    layers.selected = !layers.selected;

    layers.features.forEach(feature => {
      if (layers.selected && !feature.selected) {
        feature.selected = true;
      } else if (layers.selected && feature.selected) {
        feature.selected = true;
      } else {
        feature.selected = false;
      }
    });
  }


  @action.bound
  toggleIndividualFeature(e, type, class1_fi, class2_fi) {
    e.preventDefault();

    if (type === POINT) {
      this.toggleIndividualFeatureLoop(this.pointLayers, type, class1_fi, class2_fi);
    } else if (type === LINESTRING) {
      this.toggleIndividualFeatureLoop(this.lineLayers, type, class1_fi, class2_fi);
    } else if (type === POLYGON) {
      this.toggleIndividualFeatureLoop(this.areaLayers, type, class1_fi, class2_fi);
    } else if (type === APPROVAL) {
      this.toggleIndividualFeatureLoop(this.approvalLayers, type, class1_fi, class2_fi);
    } else if (type === ALL) {
      this.toggleIndividualFeatureLoop(this.userLayers, type, class1_fi, class2_fi);
    }
  }

  toggleIndividualFeatureLoop(layers, type, class1_fi, class2_fi) {
    layers.forEach(layer => {
      let featureArray = layer.features;
      featureArray.forEach(feature => {
        if (class2_fi === feature.name_fi) {
          feature.selected === false ? data.addFeatures(type, class1_fi, class2_fi) : data.removeFeatures(type, class1_fi, class2_fi);
          feature.selected = !feature.selected;
        }
      });
    });
  }
}
