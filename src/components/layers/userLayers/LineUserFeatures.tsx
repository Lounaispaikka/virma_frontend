import React from 'react';
import { observer } from 'mobx-react';
import { Polyline } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';

import { layer } from '../../../model/store';

@observer
export class LineUserFeatures extends React.Component<any, any> {
  render() {
    const { reitit, setSelectedFeature } = this.props;

    return (
      <div>
        {reitit.length !== 0 && reitit.map((feature, idx) => {
          for (let j = 0; j < layer.lineLayers.length; j++) {
            for (let i = 0; i < layer.lineLayers[j].features.length; i++) {
              if (layer.lineLayers[j].features[i].name_fi === feature.class2_fi) {
                let color = layer.lineLayers[j].features[i].color;

                return (
                  <Polyline
                    key={idx}
                    positions={feature.geom.coordinates}
                    weight={3}
                    color={color}
                    onClick={(e) => setSelectedFeature(e.target, feature, 'lineFeatures')}
                  >
                    <FeaturePopup featureInfo={feature} type={'line'} />
                  </Polyline>
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
