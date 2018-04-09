import { observable, action, computed } from 'mobx';
import { data } from '../store';

import { pointLayers } from '../layerConfig/pointLayers';
import { lineLayers } from '../layerConfig/lineLayers';
import { areaLayers } from '../layerConfig/areaLayers';
import { approvalLayers } from '../layerConfig/approvalLayers';
import { userLayers } from '../layerConfig/userLayers';

export default class Layer {
  @observable pointLayers = pointLayers;
  @observable lineLayers = lineLayers;
  @observable areaLayers = areaLayers;
  @observable approvalLayers = approvalLayers;
  @observable userLayers = userLayers;

  @action.bound
  layerToggleAll(e, type, class1_fi) {
    e.preventDefault();

    if (class1_fi === 'Virkistyskohde') {
      this.layerToggleAllLoop(this.pointLayers[0], type, class1_fi);
    } else if (class1_fi === 'Matkailupalvelukohde') {
      this.layerToggleAllLoop(this.pointLayers[1], type, class1_fi);
    } else if (class1_fi === 'Virkistysreitti') {
      this.layerToggleAllLoop(this.lineLayers[0], type, class1_fi);
    } else if (class1_fi === 'Virkistysalue') {
      this.layerToggleAllLoop(this.areaLayers[0], type, class1_fi);
    } else if (class1_fi === 'Matkailupalvelualue') {
      this.layerToggleAllLoop(this.areaLayers[1], type, class1_fi);
    } else if (class1_fi === 'Hyväksyttävät kohteet') {
      this.layerToggleAllLoop(this.approvalLayers[0], type, class1_fi);
    } else if (class1_fi === 'Kaikki') {
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

    if (type === 'point') {
      this.toggleIndividualFeatureLoop(this.pointLayers, type, class1_fi, class2_fi);
    } else if (type === 'line') {
      this.toggleIndividualFeatureLoop(this.lineLayers, type, class1_fi, class2_fi);
    } else if (type === 'polygon') {
      this.toggleIndividualFeatureLoop(this.areaLayers, type, class1_fi, class2_fi);
    } else if (type === 'approval') {
      this.toggleIndividualFeatureLoop(this.approvalLayers, type, class1_fi, class2_fi);
    } else if (type === 'all') {
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
