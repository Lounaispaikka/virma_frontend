import React from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, Checkbox, ButtonGroup, Button } from 'react-bootstrap';

import { form } from '../../../model/store';

import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';

const AddNewUser = ({ showAddNewUser, hideAddNewUser, addNewUser, handleChange, formState, disableOrganization, showCustomOrganization }) => {
  if (showAddNewUser) {
    return (
      <Modal backdrop={"static"} show={showAddNewUser} onHide={hideAddNewUser} className={"addNewUserModal"}>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Käyttäjätunnus</ControlLabel>
            <FormControl type={"text"} id={"username"} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Salasana</ControlLabel>
            <FormControl type={"text"} id={"password"} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Sähköposti</ControlLabel>
            <FormControl type={"text"} id={"email"} onChange={handleChange} />
          </FormGroup>
          <FormGroup controlId={"organization"}>
            <ControlLabel>Organisaatio</ControlLabel>
            <FormControl
              componentClass={"select"}
              id={"organization"}
              disabled={disableOrganization}
              value={formState.organization}
              onChange={(e) => handleChange(e)}
            >
              {form.organizations.map((item, idx) => {
                return (
                  <option value={item.organization} key={idx}>{item.organization}</option>
                );
              })}
            </FormControl>
          </FormGroup>

          {showCustomOrganization &&
            <FormGroup>
              <ControlLabel>Uusi organisaatio</ControlLabel>
              <FormControl
                type={"text"}
                id={"customOrganization"}
                onChange={(e) => handleChange(e)}
                placeholder={"Kirjoita listan ulkopuolinen organisaatio"}
              />
            </FormGroup>
          }

          <div className={"checkbox-form"}>
            <label>
              <input type="checkbox" id={"admin"} checked={formState.admin === 'on' ? true : false} onChange={handleChange} /> Admin
            </label>
          </div>

          <FormGroup>
            <ControlLabel>Päivittäjätunnus</ControlLabel>
            <FormControl type={"text"} id={"updater_id"} onChange={handleChange} />
          </FormGroup>
          <Button id={"square-button-primary"} bsStyle={"primary"} onClick={(e) => addNewUser(e)}>Lisää käyttäjä</Button>
          {' '}
          <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideAddNewUser()}>Peruuta</Button>
        </Modal.Body>
      </Modal>
    );
  }

  return null;
};

export default AddNewUser;
