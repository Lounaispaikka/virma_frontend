import React from 'react';
import { observer } from 'mobx-react';
import { Polygon } from 'react-leaflet';

import { FeaturePopup } from '../FeaturePopup';
import { AREA_APPROVAL_FEATURES } from '../../../config/constants';
import L from 'leaflet';

@observer
export class AreaApprovalFeatures extends React.Component<any, any> {
  render() {
    const { alueet, setSelectedFeature } = this.props;

    return (
      <>
        {alueet.length !== 0 && alueet.map((feature, idx) => {
          return (
            <Polygon
              key={idx}
              positions={L.GeoJSON.coordsToLatLngs(feature.geom.coordinates,2)}
              color={"black"}
              fillColor={"rgba(0, 0, 0, 0.7"}
              weight={1.5}
              fillOpacity={1}
              onClick={(e) => setSelectedFeature(e.target, feature, AREA_APPROVAL_FEATURES)}
            >
              <FeaturePopup featureInfo={feature} type={'approvedArea'} />
            </Polygon>
          );
        })}
      </>
    );
  }
}
