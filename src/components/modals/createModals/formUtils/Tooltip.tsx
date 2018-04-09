import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../../../../../css/tooltip.css!';

export function TooltipWithContent({ children, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={"tooltip-bottom"}>
        {tooltip.length === 1 &&
          <div className={"tooltip-content"}>
            {tooltip[0]}
          </div>
        }

        {tooltip.length > 1 &&
          <div className={"tooltip-content"}>
            {tooltip[0]}
            <hr />
            {tooltip[1]}
          </div>
        }
      </Tooltip>}
      placement={"top"}
    >
      {children}
    </OverlayTrigger>
  );
}
