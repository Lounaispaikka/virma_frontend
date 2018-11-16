import React from 'react';
import { observer } from 'mobx-react';
import { PanelGroup, Button } from 'react-bootstrap';

import { login, layer, map, modal, messages } from '../model/store';

import { Login } from './Login';
import { LayerPanel } from './LayerPanel';

import '../../css/sidebar.css!';
import '../../css/customBootstrap.css!';

@observer
export class Sidebar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let infoButtonStyle, userButtonStyle, featureButtonStyle, approveButtonStyle, pointButtonStyle, lineButtonStyle, polygonButtonStyle;
    infoButtonStyle = userButtonStyle = featureButtonStyle = approveButtonStyle = pointButtonStyle = lineButtonStyle = polygonButtonStyle = "square-button-primary";

    if (modal.showInfo) {
      infoButtonStyle = "square-button-primary-active";
    } else if (modal.showUsersModal) {
      userButtonStyle = "square-button-primary-active";
    } else if (modal.showFeaturesModal) {
      featureButtonStyle = "square-button-primary-active";
    } else if (modal.showApproveModal) {
      approveButtonStyle = "square-button-primary-active";
    } else if (map.buttonCreateOn && map.buttonCreateType === 'point') {
      pointButtonStyle = "square-button-primary-active";
    } else if (map.buttonCreateOn && map.buttonCreateType === 'line') {
      lineButtonStyle = "square-button-primary-active";
    } else if (map.buttonCreateOn && map.buttonCreateType === 'polygon') {
      polygonButtonStyle = "square-button-primary-active";
    }

    return (
      <React.Fragment>
        <div className={"sidebar-logo"}>
          <img src="./images/virma_logo.jpg"></img>
        </div>

        <div className={"sidebar-login"}>
          <div className={"sidebar-header-login"}>
            {!login.isLoggedIn && <span>{'Kirjaudu sisään'}</span>}
            {login.isLoggedIn && <span>{`Tervetuloa ${login.loggedUser}!`}</span>}
            <div className={'sidebar-login-infobutton'}>
              <Button id={"info-button"} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showInfoModal(messages.toolInfoContent)}>{'i'}</Button>
            </div>
          </div>
          <div className={"sidebar-login-buttons"}>
            <Login />
          </div>
        </div>

        {login.isLoggedIn &&
          <div className={"sidebar-suggestion"}>
            <div className={"sidebar-header"}>
              {'Ehdota kohteita'}
            </div>
            <div className={"sidebar-suggestion-buttons"}>
              <Button id={pointButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, 'point')} disabled={map.toggleEditState || map.buttonCreateOn}>
                {'Pistekohde'}
              </Button>
              {' '}
              <Button id={lineButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, 'line')} disabled={map.toggleEditState || map.buttonCreateOn}>
                {'Viivakohde'}
              </Button>
              {' '}
              <Button id={polygonButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, 'polygon')} disabled={map.toggleEditState || map.buttonCreateOn}>
                {'Aluekohde'}
              </Button>
            </div>
          </div>
        }

        {login.isAdmin &&
          <div className={"sidebar-admintools"}>
            <div className={"sidebar-header"}>
              {'Pääkäyttäjän työkalut'}
            </div>
            <div className={"sidebar-admintools-buttons"}>
              <Button id={approveButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showApproveFeaturesModal()} block>
                {'Hyväksy kohteita'}
              </Button>
              <Button id={featureButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showManageFeaturesModal()} block>
                {'Hallitse muokkausoikeuksia'}
              </Button>
              <Button id={userButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showManageUsersModal()} block>
                {'Hallitse käyttäjiä'}
              </Button>
            </div>
          </div>
        }

        <div className={"sidebar-layerselector"}>
          <div className={"sidebar-header"}>
            {'Valitse näkyvät tasot'}
          </div>
          <div className={"layerselector-wrapper"}>
            {login.isLoggedIn &&
              <PanelGroup>
                <div className={"layerSelectorAdmin"}>
                  <LayerPanel
                    type={'all'}
                    layers={layer.userLayers[0]}
                    layerName={'Omat kohteet'}
                    layerType={'Kaikki'}
                  />
                  <LayerPanel
                    type={'approval'}
                    layers={layer.approvalLayers[0]}
                    layerName={'Hyväksytystä odottavat kohteet'}
                    layerType={'Hyväksyttävät kohteet'}
                  />
                </div>
              </PanelGroup>
            }
            <div className={"layerSelector"}>
              <PanelGroup>
                <LayerPanel
                  type={'point'}
                  layers={layer.pointLayers[0]}
                  layerName={'Virkistyskohteet'}
                  layerType={'Virkistyskohde'}
                />
                <LayerPanel
                  type={'point'}
                  layers={layer.pointLayers[1]}
                  layerName={'Matkailukohteet'}
                  layerType={'Matkailupalvelukohde'}
                />
                <LayerPanel
                  type={'line'}
                  layers={layer.lineLayers[0]}
                  layerName={'Virkistysreitit'}
                  layerType={'Virkistysreitti'}
                />
                <LayerPanel
                  type={'polygon'}
                  layers={layer.areaLayers[0]}
                  layerName={'Virkistysalueet'}
                  layerType={'Virkistysalue'}
                />
                <LayerPanel
                  type={'polygon'}
                  layers={layer.areaLayers[1]}
                  layerName={'Matkailupalvelualueet'}
                  layerType={'Matkailupalvelualue'}
                />
              </PanelGroup>
            </div>  
          </div>
        </div>

        <div className={"sidebar-footer-images"}>
          <img id={"logo_img_ely"} src="./images/ely_logo.jpg"></img>
          <img id={"logo_img_eu"} src="./images/eu_maaseutu_iso.jpg"></img>
        </div>
      </React.Fragment>
    );
  }
}
