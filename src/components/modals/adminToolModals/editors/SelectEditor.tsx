import React from 'react'
import { Modal, DropdownButton, MenuItem, ButtonGroup, Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

import { form } from '../../../../model/store';

import '../../../../../css/form.css!';
import '../../../../../css/modal.css!';
import '../../../../../css/customBootstrap.css!';

export class SelectEditor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: props.defaultValue,
      open: true,
      buttonName: 'Aura',
      organizationName: '',
      showNewOrganization: false
    };

    this.updateData = this.updateData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  updateData() {
    if (this.state.showNewOrganization) {
      this.props.onUpdate(this.state.organizationName)
    } else {
      this.props.onUpdate(this.state.buttonName)
    }
  }

  close = () => {
    this.setState({ open: false });
    this.props.onUpdate(this.props.defaultValue);
  }

  handleSelect(e) {
    if (e.target.value === 'Muu organisaatio') {
      this.setState({ buttonName: e.target.value, showNewOrganization: true });
    } else {
      this.setState({ buttonName: e.target.value, showNewOrganization: false });
    }
  }

  handleInput(e) {
    this.setState({ organizationName: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal backdrop={"static"} bsSize={"small"} show={true} onHide={this.close}>
          <Modal.Body>
            <FormGroup controlId={"organisaatio"}>
              <ControlLabel>{"Organisaatio"}</ControlLabel>

              <FormControl
                componentClass={"select"}
                className={"btn-block"}
                id={"organisaatio"}
                value={this.state.buttonName}
                onChange={(e) => this.handleSelect(e)}
              >
                {form.organizations.map((item) => {
                  return (
                    <option value={item.organization} key={item.organization}>{item.organization}</option>
                  );
                })}
              </FormControl>
            </FormGroup>

            {this.state.showNewOrganization &&
              <FormGroup controlId={"uusi_organisaatio"}>
                <ControlLabel>Uuden organisaation nimi</ControlLabel>
                <FormControl
                  type={"text"}
                  id={"uusi_organisaatio"}
                  value={this.state.organizationName}
                  placeholder={"Lisää uusi organisaatio"}
                  onChange={this.handleInput}
                />
              </FormGroup>
            }

          </Modal.Body>
          <Modal.Footer>
            <Button id={"square-button-primary"} bsSize={"small"} bsStyle={"primary"} onClick={this.updateData}>Vahvista</Button>
            <Button id={"square-button-warning"} bsSize={"small"} bsStyle={"warning"} onClick={this.close}>Peruuta</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
