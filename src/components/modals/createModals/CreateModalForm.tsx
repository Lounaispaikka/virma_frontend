import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Tabs, Tab, Button, Form, ButtonToolbar, Alert } from 'react-bootstrap';
import validator from 'validator';

import { map } from '../../../model/store';

import { BasicInfo } from './formTabs/BasicInfo';
import { OtherInfo } from './formTabs/OtherInfo';
import { ContactInfo } from './formTabs/ContactInfo';

import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';

@observer
export class CreateModalForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      tabKey: 1,
      showAlert: false,
      formConfig: []
    };

    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.getAlert = this.getAlert.bind(this);
  }

  componentWillReceiveProps(prevProps) {
    this.setState({ formConfig: prevProps.formConfig, showAlert: false });
    prevProps.formConfig.map((info) => {
      let content = prevProps.parentState[info.attr] + '';

      // Check if field is added to form and it cannot be undefined -> some content needs to be there
      if (info.addedToForm && !info.canBeUndefined) {
        if (content.indexOf('undefined') >= 0 || validator.isEmpty(content)) {
          info.formError = true;
          return;
        }
      }

      // Validate every field that content needs to be in some specific form
      if (info.addedToForm && content.length !== 0 && content.indexOf('undefined') === -1) {
        if (info.attr.indexOf('email') >= 0) {
          if (content.indexOf('undefined') >= 0 || !validator.isEmail(content)) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf('telephone') >= 0) {
          if (content.indexOf('undefined') >= 0 || content.indexOf('+358') < 0) { // || !validator.isMobilePhone(content, 'any') -> doesn't work for every number for some reason
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf('www') >= 0) {
          if (content.indexOf('undefined') >= 0 || !validator.isURL(content)) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf('zip') >= 0) {
          if (content.indexOf('undefined') >= 0 || !validator.isNumeric(content) || !validator.isLength(content, { min: 5, max: 5 })) {
            info.formError = true;
            return;
          }
        } else if (info.attr.indexOf('upkeepclas') >= 0) {
          if (content.indexOf('Valitse') >= 0) {
            info.formError = true;
            return;
          }
        }
      }

      info.formError = false;
    });
  }

  handleTabSelect(key) {
    this.setState({ tabKey: key });
  }

  validateForm() {
    let errorCount = 0;
    this.state.formConfig.map((info) => { if (info.formError) { errorCount++; } });

    errorCount > 0 ? this.setState({ showAlert: true }) :
      this.props.sendPost(this.props.createType, this.props.feature.feature);
  }

  hideCreateModal() {
    this.handleTabSelect(1);
    this.props.unsetFeature();
    this.props.hideModal();
  }

  sortTabContent(a, b) {
    if (a !== null || b !== null) {
      if (a.order < b.order) { return -1; }
      if (a.order > b.order) { return 1; }
    }

    return 0;
  }

  getConfirmText() {
    return this.props.feature.featureDetails ? 'Päivitä kohteen tiedot' : 'Vahvista ehdotus';
  }

  getHeaderText() {
    if (this.props.createType === 'circlemarker') {
      if (this.props.feature.featureDetails) { return (<b>Muokkaa kohteen "{this.props.feature.featureDetails.name_fi}" tietoja</b>); }
      return (<b>Lisää uuden kohteen tiedot</b>);
    } else if (this.props.createType === 'polyline') {
      if (this.props.feature.featureDetails) { return (<b>Muokkaa reitin "{this.props.feature.featureDetails.name_fi}" tietoja</b>); }
      return (<b>Lisää uuden reitin tiedot</b>);
    } else if (this.props.createType === 'polygon') {
      if (this.props.feature.featureDetails) { return (<b>Muokkaa alueen "{this.props.feature.featureDetails.name_fi}" tietoja</b>); }
      return (<b>Lisää uuden alueen tiedot</b>);
    }

    return null;
  }

  getAlert() {
    return (
     <Alert className={"formErrorAlert"} bsStyle={"danger"} onDismiss={() => { this.setState({ showAlert: false }); }}>
       <div className={"formErrorMsg"}>
          {'Lomakkeessa on vielä kohtia, jotka pitää täyttää tai niiden sisällössä on jotain vialla.'}
       </div>
     </Alert>
    );
  }

  render() {
    const {
      formConfig,
      layers,
      showCreateModal,
      hideModal,
      feature,
      handleFormChange,
      parentState,
      startEdit,
      removeNewTarget,
      removeTarget,
      unsetFeature,
      resetFeatureCoords
    } = this.props;

    return (
      <div>
        <Modal backdrop={"static"} show={showCreateModal} onHide={this.hideCreateModal} bsSize={'large'}>
          <Modal.Header>
            <Modal.Title>
              {this.getHeaderText()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={'createModalBody'}>
            {this.state.showAlert && this.getAlert()}
            <Form>
              <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id={'createTabs'} bsStyle={"tabs"}>
                <Tab eventKey={1} title="Perustiedot">
                  <BasicInfo
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    layers={layers}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>

                <Tab eventKey={2} title="Muut tiedot">
                  <OtherInfo
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>

                <Tab eventKey={3} title="Yhteystiedot">
                  <ContactInfo
                    formConfig={formConfig}
                    parentState={parentState}
                    handleFormChange={handleFormChange}
                    sortTabContent={this.sortTabContent}
                  />
                </Tab>
              </Tabs>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>
              <Button id={"square-button-success"} bsStyle={"success"} onClick={() => this.validateForm()}>
                {this.getConfirmText()}
              </Button>
              <Button id={"square-button-primary"} bsStyle={"primary"} onClick={() => { startEdit(feature); map.toggleFormEdit(true, parentState); }}>
                Muokkaa sijaintia
              </Button>

              {feature.featureDetails &&
                <Button id={"square-button-danger"} bsStyle={"danger"} onClick={() => { hideModal(); removeTarget(feature); }}>
                  Poista kohde
                </Button>
              }

              {feature.featureDetails &&
                <Button id={"square-button-warning"} bsStyle={"warning"} onClick={() => { unsetFeature(); hideModal(); this.setState({ tabKey: 1 }); resetFeatureCoords(feature); }}>
                  Peruuta
                </Button>
              }

              {!feature.featureDetails &&
                <Button id={"square-button-danger"} bsStyle={"danger"} onClick={() => { hideModal(); removeNewTarget(feature); this.setState({ tabKey: 1 }); }}>
                  Poista ehdotus
                </Button>
              }
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
