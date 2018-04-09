import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'react-bootstrap';

import { modal } from '../../../model/store';

import '../../../../css/modal.css!';

const InfoModal = observer(() => {
  if (modal.showInfo) {
    return (
      <Modal show={modal.showInfo} onHide={modal.hideInfoModal} bsSize={"large"}>
        <Modal.Body className={"infoModalBody"}>
          <div dangerouslySetInnerHTML={{__html: modal.infoContent}} />
        </Modal.Body>
        <Modal.Footer>
          <i>Sulje klikkaamalla muualle</i>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
});

export default InfoModal;
