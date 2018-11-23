import React from 'react';
import { observer } from 'mobx-react';
import { Polyline } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';
import { LINE_APPROVAL_FEATURES } from '../../../config/constants';

@observer
export class LineApprovalFeatures extends React.Component<any, any> {
  render() {
    const { reitit, setSelectedFeature } = this.props;

    return (
      <>
        {reitit.length !== 0 && reitit.map((feature, idx) => {
          return (
            <Polyline
              key={idx}
              positions={feature.geom.coordinates}
              color={"rgba(0, 0, 0, 0.7"}
              weight={3}
              onClick={(e) => setSelectedFeature(e.target, feature, LINE_APPROVAL_FEATURES)}
            >
              <FeaturePopup featureInfo={feature} type={'approvedLine'} />
            </Polyline>
          );
        })}
      </>
    );
  }
}
