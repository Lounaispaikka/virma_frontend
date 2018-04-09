import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

import { TooltipWithContent } from '../createModals/formUtils/Tooltip';

import { form } from '../../../model/store';

import '../../../../css/customBootstrap.css!';
import '../../../../css/form.css!';

export class RegisterContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showCustomOrganization: false,
      organizationDisabled: false,
      selectedOrganization: 'Aura',
      newOrganization: ''
    };

    this.onChangeOrganization = this.onChangeOrganization.bind(this);
  }

  onChangeOrganization(e) {
    if (e.target.value === 'Muu organisaatio') {
      this.setState({
        showCustomOrganization: true,
        organizationDisabled: true,
        selectedOrganization: e.target.value,
        newOrganization: ''
      });
    } else {
      this.setState({ selectedOrganization: e.target.value, newOrganization: e.target.value });
      this.props.updateRegisterOrganization(e);
    }
  }

  render() {
    const {
      register,
      registerDisabled,
      errorTextRegister,
      displayErrorRegisterUsername,
      displayErrorRegisterPassword,
      displayErrorRegisterPassword2,
      displayErrorRegisterEmail,
      displayErrorRegisterOrganization,
      updateRegisterUsername,
      updateRegisterPassword,
      updateRegisterPasswordRepeat,
      updateRegisterEmail,
      hideRegisterModal
    } = this.props;

    let disabled = false;
    if (displayErrorRegisterUsername || displayErrorRegisterPassword || displayErrorRegisterPassword2 || displayErrorRegisterEmail || displayErrorRegisterOrganization) {
      disabled = true;
    }

    return (
      <div className={"register"}>
        <form onSubmit={e => register(e)}>
          {errorTextRegister.length !== 0 && <p>{errorTextRegister}</p>}

          <TooltipWithContent
            tooltip={form.tooltipsForForm['usernameInfo']}
          >
            <FormGroup validationState={displayErrorRegisterUsername ? 'error' : null}>
              <ControlLabel>Käyttäjätunnus</ControlLabel>
              <FormControl type={"text"} onChange={updateRegisterUsername} autoComplete={"new-password"} autoFocus />
            </FormGroup>
          </TooltipWithContent>

          <FormGroup validationState={displayErrorRegisterPassword ? 'error' : null}>
            <ControlLabel>Salasana</ControlLabel>
            <FormControl type={"password"} onChange={updateRegisterPassword} autoComplete={"new-password"} />
          </FormGroup>
          <FormGroup validationState={displayErrorRegisterPassword2 ? 'error' : null}>
            <ControlLabel>Salasana uudestaan</ControlLabel>
            <FormControl type={"password"} onChange={updateRegisterPasswordRepeat} autoComplete={"new-password"} />
          </FormGroup>

          <TooltipWithContent
            tooltip={form.tooltipsForForm['emailInfo']}
          >
            <FormGroup validationState={displayErrorRegisterEmail ? 'error' : null}>
              <ControlLabel>Sähköposti</ControlLabel>
              <FormControl onChange={updateRegisterEmail} autoComplete={"new-password"} />
            </FormGroup>
          </TooltipWithContent>

          <TooltipWithContent
            tooltip={form.tooltipsForForm['organizationInfo']}
          >
            <FormGroup controlId={"organization"}>
              <ControlLabel>Organisaatio</ControlLabel>
              <FormControl
                componentClass={"select"}
                id={"organization"}
                disabled={this.state.organizationDisabled}
                value={this.state.selectedOrganization}
                onChange={(e) => this.onChangeOrganization(e)}
              >
                {form.organizations.map((item, idx) => {
                  return (
                    <option value={item.organization} key={idx}>{item.organization}</option>
                  );
                })}
              </FormControl>
            </FormGroup>
          </TooltipWithContent>

          {this.state.showCustomOrganization &&
            <TooltipWithContent
              tooltip={form.tooltipsForForm['new_organizationInfo']}
            >
              <FormGroup validationState={(displayErrorRegisterOrganization || this.state.newOrganization.length === 0) ? 'error' : null}>
                <ControlLabel>Uusi organisaatio</ControlLabel>
                <FormControl
                  type={"text"}
                  onChange={(e) => this.onChangeOrganization(e)}
                  placeholder={"Kirjoita listan ulkopuolinen organisaatio"}
                  autoComplete={"new-password"}
                />
              </FormGroup>
            </TooltipWithContent>
          }

          <ButtonToolbar>
            <Button id={"square-button-primary"} type={"submit"} bsStyle={"primary"} disabled={disabled}>
              Luo tunnus
            </Button>
            <Button id={"square-button-danger"} bsStyle={"danger"} onClick={hideRegisterModal}>
              Takaisin
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
