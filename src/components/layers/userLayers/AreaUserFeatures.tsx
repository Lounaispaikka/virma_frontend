import React from 'react';
import { observer } from 'mobx-react';
import { Polygon } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';

import { layer } from '../../../model/store';

@observer
export class AreaUserFeatures extends React.Component<any, any> {
  render() {
    const { alueet, setSelectedFeature } = this.props;

    return (
      <div>
        {alueet.length !== 0 && alueet.map((feature, idx) => {
          for (let j = 0; j < layer.areaLayers.length; j++) {
            for (let i = 0; i < layer.areaLayers[j].features.length; i++) {
              if (layer.areaLayers[j].features[i].name_fi === feature.class2_fi) {
                let color = layer.areaLayers[j].features[i].color;

                return (
                  <Polygon
                    key={idx}
                    positions={feature.geom.coordinates}
                    color={'black'}
                    weight={1.5}
                    fillColor={color}
                    fillOpacity={0.4}
                    onClick={(e) => setSelectedFeature(e.target, feature, 'areaFeatures')}
                  >
                    <FeaturePopup featureInfo={feature} type={'area'} />
                  </Polygon>
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
