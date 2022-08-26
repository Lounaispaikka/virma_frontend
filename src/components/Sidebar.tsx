import React from 'react';
import { observer } from 'mobx-react';
import { PanelGroup, Button } from 'react-bootstrap';

import { login, layer, map, modal, messages } from '../model/store';
import { POINT, LINESTRING, POLYGON, APPROVAL, ALL, RECREATIONAL_AREA, TOURIST_SERVICE_AREA, RECREATIONAL_ROUTE, TOURIST_ATTRACTION, RECREATIONAL_ATTRACTION, APPROVAL_FEATURES, ALL_FEATURES } from '../config/constants';

import { Login } from './Login';
import { LayerPanel } from './LayerPanel';

import '../../css/sidebar.css!';
import '../../css/customBootstrap.css!';

@observer
export class AllLayersHandler extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			showAll: false
		}
	}
	setShowAll(s) {
		this.setState({ showAll: s })
		
		layer.pointLayers[0].features.forEach(feature => {
			feature.selected = s;
		})
		layer.pointLayers[1].features.forEach(feature => {
			feature.selected = s;
		})
		layer.lineLayers[0].features.forEach(feature => {
			feature.selected = s;
		})
		layer.areaLayers[0].features.forEach(feature => {
			feature.selected = s;
		})
		layer.areaLayers[1].features.forEach(feature => {
			feature.selected = s;
		})
	}
	render() {
		return (
			<>
				<Button id={this.props.searchButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showSearchTargetsModal()} block>
					{'Hae kohteita'}
				</Button>

				{ false && 
				<Button id={this.state.showAll ? "square-button-layer-switcher-all-on" : "square-button-layer-switcher-all-off"} bsSize={"small"} bsStyle={"primary"}
					onClick={(e) => this.setShowAll(!this.state.showAll)} block
				>
					{'Näytä kaikki kohteet'}
				</Button> }

				<div className={"layerselector-wrapper"}>
					{login.isLoggedIn &&
						<div className={"layerSelectorAdmin"}>
							<PanelGroup>
								<Button id={this.props.ownSearchButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => modal.showOwnSearchTargetsModal()} block>
									{'Omien kohteiden haku ja joukkohallinta'}
								</Button>
								<LayerPanel
									type={ALL}
									layers={layer.userLayers[0]}
									layerName={'Omat kohteet'}
									layerType={ALL_FEATURES}
								/>
								<LayerPanel
									type={APPROVAL}
									layers={layer.approvalLayers[0]}
									layerName={'Hyväksymistä odottavat kohteet'}
									layerType={APPROVAL_FEATURES}
								/>
							</PanelGroup>
						</div>
					}
					<div className={"layerSelector"}>
						<PanelGroup>
							<LayerPanel
								type={POINT}
								layers={layer.pointLayers[0]}
								showAllMode={this.state.showAll}
								layerName={'Virkistyskohteet'}
								layerType={RECREATIONAL_ATTRACTION}
							/>
							<LayerPanel
								type={POINT}
								layers={layer.pointLayers[1]}
								showAllMode={this.state.showAll}
								layerName={'Matkailukohteet'}
								layerType={TOURIST_ATTRACTION}
							/>
							<LayerPanel
								type={LINESTRING}
								layers={layer.lineLayers[0]}
								showAllMode={this.state.showAll}
								layerName={'Virkistysreitit'}
								layerType={RECREATIONAL_ROUTE}
							/>
							<LayerPanel
								type={POLYGON}
								layers={layer.areaLayers[0]}
								showAllMode={this.state.showAll}
								layerName={'Virkistysalueet'}
								layerType={RECREATIONAL_AREA}
							/>
							<LayerPanel
								type={POLYGON}
								layers={layer.areaLayers[1]}
								showAllMode={this.state.showAll}
								layerName={'Matkailupalvelualueet'}
								layerType={TOURIST_SERVICE_AREA}
							/>
						</PanelGroup>
					</div>
				</div>
			</>
		)
	}
}

@observer
export class Sidebar extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		let ownSearchButtonStyle,searchButtonStyle, userButtonStyle, featureButtonStyle, approveButtonStyle, pointButtonStyle, lineButtonStyle, polygonButtonStyle;
		ownSearchButtonStyle = searchButtonStyle = userButtonStyle = featureButtonStyle = approveButtonStyle = pointButtonStyle = lineButtonStyle = polygonButtonStyle = "square-button-primary";

		if (modal.showUsersModal) {
			userButtonStyle = "square-button-primary-active";
		} else if (modal.showSearchModal) {
			searchButtonStyle = "square-button-primary-active";
		} else if (modal.showOwnSearchModal) {
			ownSearchButtonStyle = "square-button-primary-active";
		} else if (modal.showFeaturesModal) {
			featureButtonStyle = "square-button-primary-active";
		} else if (modal.showApproveModal) {
			approveButtonStyle = "square-button-primary-active";
		} else if (map.buttonCreateOn && map.buttonCreateType === POINT) {
			pointButtonStyle = "square-button-primary-active";
		} else if (map.buttonCreateOn && map.buttonCreateType === LINESTRING) {
			lineButtonStyle = "square-button-primary-active";
		} else if (map.buttonCreateOn && map.buttonCreateType === POLYGON) {
			polygonButtonStyle = "square-button-primary-active";
		}
		const showEverything = function () {

		}
		return (
			<React.Fragment>
				<div className={"sidebar-logo"}>
					<img src="./images/virma_logo_yllapito.png"></img>
				</div>

				<div className={"sidebar-login"}>
					{!login.isLoggedIn && <Button id={'virmaMobileGoto'} bsSize={"small"} bsStyle={"primary"} onClick={(e) => window.location.href = "https://m.virma.fi"} block>
						{'Virma Kartta Mobiili »'}
					</Button>}
					<div className={"sidebar-header-login"}>
						{!login.isLoggedIn && <span>{'Kirjaudu sisään'}</span>}
						{login.isLoggedIn && <span>{`Tervetuloa ${login.loggedUser}!`}</span>}
						<div className={'sidebar-login-infobutton'}>{'Käyttöohjeet '}
							<Button id={"info-button"} bsSize={"small"} bsStyle={"primary"} href="https://www.lounaistieto.fi/virma-yllapidon-kayttoohjeet/" target="_blank">{'i'}</Button>
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
							<Button id={pointButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, POINT)} disabled={map.toggleEditState || map.buttonCreateOn}>
								{'Pistekohde'}
							</Button>
							{' '}
							<Button id={lineButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, LINESTRING)} disabled={map.toggleEditState || map.buttonCreateOn}>
								{'Viivakohde'}
							</Button>
							{' '}
							<Button id={polygonButtonStyle} bsSize={"small"} bsStyle={"primary"} onClick={(e) => map.createOn(e, POLYGON)} disabled={map.toggleEditState || map.buttonCreateOn}>
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
						{'Kohteet ja tasot'}
					</div>

					<AllLayersHandler searchButtonStyle={searchButtonStyle}>
					</AllLayersHandler>
				</div>

				<div className={"sidebar-footer-images"}>
					<img id={"logo_img_ely"} src="./images/ely_logo.jpg"></img>
					<img id={"logo_img_eu"} src="./images/eu_maaseutu_iso.jpg"></img>
				</div>
			</React.Fragment>
		);
	}
}
