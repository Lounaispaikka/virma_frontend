

import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import { postOptions } from '../config/fetchConfig';
import { appUrls } from '../config/config';
import { handleHttpErrorsGeneric } from '../utils';
import { modal } from '../model/store';

@observer
export class RequestFeatureEdit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      reason: ""
    }
  }

  updateReason = (event) => this.setState({ reason: event.target.value });
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { featureInfo, type } = this.props;

    const handleClose = () => this.closeModal();
    const handleSend = () => {

      this.closeModal();
      const options: any = postOptions;
      options.body = JSON.stringify({ featureType: type, featureId: featureInfo.gid, reason: this.state.reason });

      // start uploading image..
      fetch(appUrls.requestFeatureAccess, options)
        .then(handleHttpErrorsGeneric)
        .then(response => response.json())
        .then((response) => {
          console.log("Success", response, response.url);
          modal.showSuccessAlert("Pyyntö lähetetty")
        }).catch((e) => {
          console.log(e);
          alert("Pyynnön lähetys epäonnistui! " + e);
        });

    }
    const handleShow = () => this.openModal();

    const NON_EXIST = 'Tietoa ei saatavilla';
    const name_fi = featureInfo.name_fi ? featureInfo.name_fi : NON_EXIST;
    const gid = featureInfo.gid ? featureInfo.gid : "???";
    return (
      <>
        <Button className="pull-right" bsStyle="link" onClick={handleShow}>
          Pyydä muokkausoikeutta
        </Button>

        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Muokkausoikeuden pyyntö</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

              <div>Olet pyytämässä ylläpitäjäoikeutta kohteeseen {name_fi}.</div>
              <div>Voit lisätä syyn muokkaustarpeelle seuraavassa kentässä tai lähettää pyynnön ilman syytä jos olet jo aikaisemmassa pyynnössä antanut syyn:</div>
              <FormControl type={"text"} onChange={this.updateReason} />
              <br/>
              <div>Huom. Lähetä myös erillinen sähköposti osoitteeseen <a href="mail:virma@lounaistieto.fi?Subject=Muokkausoikeuspyyntö+kohteeseen+{gid}">virma@lounaistieto.fi</a>, jos tarvitset oikeudet nopeasti.</div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={handleClose}>
              Sulje
            </Button>
            <Button bsStyle="primary" onClick={handleSend}>
              Lähetä pyyntö
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}