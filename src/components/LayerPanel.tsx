import React from 'react';
import { observer } from 'mobx-react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import bUtils from 'react-bootstrap/lib/utils/bootstrapUtils';

import { login, layer } from '../model/store';
import { APPROVAL } from '../config/constants';

import '../../css/sidebar.css!';
import '../../css/customBootstrap.css!';

@observer
export class LayerPanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      panelCollapsed: false,
      hasLoadedYet: false
    };

    bUtils.addStyle(Panel, 'panel-on');
    bUtils.addStyle(Panel, 'panel-off');
  }

  togglePanelState = (e) => {
    // Hack, fix this to be more precise way of checking from where the trigger came from
    if (e.target.hasAttribute("href") || e.target.id === "menu-glyphicon") {
      this.setState({ panelCollapsed: !this.state.panelCollapsed });
    }
  }

  toggleAll(e: Event) {
    const { type, layers, layerName, layerType } = this.props;
    layer.layerToggleAll(e, type, layerType);
  }

  render() {
    const { type, layers, layerName, layerType } = this.props;

    let panelHeader = "square-panel";

    if (this.state.panelCollapsed) {
      panelHeader = "square-panel-active";
    }
    if (!this.state.hasLoadedYet && this.props.showAll) {
      layer.layerToggleAll(new Event("asd"), type, layerType);
      this.setState({
        hasLoadedYet: true
      })
    }

    const header = (
      <span id={"header-element"}>
        {layerName}
        {this.state.panelCollapsed &&
          <Glyphicon id={"menu-glyphicon"} glyph={"menu-down"} />
        }
        {!this.state.panelCollapsed &&
          <Glyphicon id={"menu-glyphicon"} glyph={"menu-up"} />
        }
      </span>
    );

    return (
      <div>
        <Panel collapsible
          onClick={(e) => this.togglePanelState(e)}
          id={panelHeader}
          eventKey={layerType}
          header={header}
          bsStyle={layers.selected ? "panel-on" : "panel-off"}
        >
          <Button
            id={layers.selected ? "square-button-layer-switcher-all-on" : "square-button-layer-switcher-all-off"}
            bsSize={"xsmall"}
            bsStyle={"primary"}
            onClick={(e) => { this.setState({
              hasLoadedYet: true
            }); layer.layerToggleAll(e, type, layerType)}}
            block>
              {layers.selected ? "Piilota kaikki tasot" : "Valitse kaikki tasot"}
          </Button>
          <div className={login.isAdmin ? "layerGroupIsAdmin" : "layerGroupNotAdmin"}>
            {layers.features.map((feature, idx) => {
              return (
                <Button
                  key={idx}
                  id={feature.selected ? "square-button-layer-switcher-on" : "square-button-layer-switcher-off"}
                  bsSize={"xsmall"}
                  bsStyle={"primary"}
                  onClick={(e) => layer.toggleIndividualFeature(e, type, layerType, feature.name_fi)}
                  block>
                    {feature.name_fi}
                </Button>
              );
            })}
          </div>
        </Panel>

        {type === APPROVAL && <br />}
      </div>
    );
  }
}
