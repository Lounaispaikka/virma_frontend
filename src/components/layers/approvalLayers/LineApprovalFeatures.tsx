import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Polyline } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';

import { layer } from '../../../model/store';

@observer
export class LineApprovalFeatures extends React.Component<any, any> {
  render() {
    const { reitit, setSelectedFeature } = this.props;

    return (
      <div>
        {reitit.length !== 0 && reitit.map((feature, idx) => {
          return (
            <Polyline
              key={idx}
              positions={feature.geom.coordinates}
              color={"black"}
              weight={3}
              onClick={(e) => setSelectedFeature(e.target, feature, 'lineApprovalFeatures')}
            >
              <FeaturePopup featureInfo={feature} type={'approvedLine'} />
            </Polyline>
          );
        })}
      </div>
    );
  }
}
