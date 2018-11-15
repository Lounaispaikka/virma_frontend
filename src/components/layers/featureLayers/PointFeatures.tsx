import React from 'react';
import { observer } from 'mobx-react';
import { CircleMarker } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';

import { layer } from '../../../model/store';

@observer
export class PointFeatures extends React.Component<any, any> {
  render() {
    const { pisteet, setSelectedFeature } = this.props;

    return (
      <div>
        {pisteet.length !== 0 && pisteet.map((feature, idx) => {
          for (let j = 0; j < layer.pointLayers.length; j++) {
            for (let i = 0; i < layer.pointLayers[j].features.length; i++) {
              if (layer.pointLayers[j].features[i].selected === true && layer.pointLayers[j].features[i].name_fi === feature.class2_fi) {
                let color = layer.pointLayers[j].features[i].color;

                return (
                  <CircleMarker
                    key={idx}
                    center={[feature.geom.coordinates[0], feature.geom.coordinates[1]]}
                    radius={8}
                    color={"black"}
                    fillColor={color}
                    weight={1.5}
                    fillOpacity={0.8}
                    onClick={(e) => setSelectedFeature(e.target, feature, 'pointFeatures')}
                  >
                    <FeaturePopup featureInfo={feature} type={'point'} />
                  </CircleMarker>
                );
              }
            }
          }

          return null;
        })}
      </div>
    );
  }
}
