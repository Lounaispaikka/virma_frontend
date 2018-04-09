import React from 'react';
import { observer } from 'mobx-react';
import { CircleMarker } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';

import { layer } from '../../../model/store';

@observer
export class PointApprovalFeatures extends React.Component<any, any> {
  render() {
    const { pisteet, setSelectedFeature } = this.props;

    return (
      <div>
        {pisteet.length !== 0 && pisteet.map((feature, idx) => {
          return (
            <CircleMarker
              key={idx}
              center={[feature.geom.coordinates[0], feature.geom.coordinates[1]]}
              radius={8}
              color={"black"}
              fillColor={"black"}
              weight={1.5}
              fillOpacity={1}
              onClick={(e) => setSelectedFeature(e.target, feature, 'pointApprovalFeatures')}
            >
              <FeaturePopup featureInfo={feature} type={'approvedPoint'} />
            </CircleMarker>
          );
        })}
      </div>
    );
  }
}
