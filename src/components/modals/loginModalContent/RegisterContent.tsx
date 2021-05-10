import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

import { TooltipWithContent } from '../createModals/formUtils/Tooltip';

import { form } from '../../../model/store';

import '../../../../css/customBootstrap.css!';
import '../../../../css/form.css!';
import '../../../../css/checkbox.css!';

const OTHERORG = form.organizations[0].organization;
const DEFORG = form.organizations[1].organization;

export class RegisterContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showCustomOrganization: false,
      selectedOrganization: DEFORG,
      newOrganization: '',
      gdprAccepted: false,
    };
  }

  onChangeOrganization = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === 'organization') {
      if (value === OTHERORG) {
        this.setState({
          showCustomOrganization: true,
          selectedOrganization: value,
          newOrganization: ''
        });
      } else {
        this.setState({
          showCustomOrganization: false,
          selectedOrganization: value,
          newOrganization: value
        });
        this.props.updateRegisterOrganization(value);
      }
    }

    if (id === 'new_organization') {
      this.setState({
        selectedOrganization: value,
        newOrganization: value
      });
      this.props.updateRegisterOrganization(value);
    }
  }

  handleCheckbox = (e) => {
    this.setState({ gdprAccepted: !this.state.gdprAccepted });
  }

  render() {
    const { gdprAccepted } = this.state;
    const {
      register,
      errorTextRegister,
      displayErrorRegisterName,
      displayErrorRegisterSurname,
      displayErrorRegisterUsername,
      displayErrorRegisterPassword,
      displayErrorRegisterPassword2,
      displayErrorRegisterEmail,
      displayErrorRegisterPhone,
      displayErrorRegisterOrganization,
      updateRegisterName,
      updateRegisterSurname,
      updateRegisterUsername,
      updateRegisterPassword,
      updateRegisterPasswordRepeat,
      updateRegisterEmail,
      updateRegisterPhone,
      hideRegisterModal
    } = this.props;


    let disabled = false;
    if (displayErrorRegisterName ||
      displayErrorRegisterSurname ||
      displayErrorRegisterUsername ||
      displayErrorRegisterPassword ||
      displayErrorRegisterPassword2 ||
      displayErrorRegisterEmail ||
      displayErrorRegisterPhone ||
      displayErrorRegisterOrganization ||
      !gdprAccepted
    ) {
      disabled = true;
    }

    return (
      <div className={"register"}>
        <form onSubmit={e => register(e)}>
          {errorTextRegister.length !== 0 && <p>{errorTextRegister}</p>}

          <div className={'register-inline'}>
            <div className={'register-inline-1'}>
              <FormGroup validationState={displayErrorRegisterName ? 'error' : null}>
                <ControlLabel>{'Etunimi'}</ControlLabel>
                <FormControl type={"text"} onChange={updateRegisterName} autoComplete={"new-password"} autoFocus />
              </FormGroup>
            </div>
            <div className={'register-inline-2'}>
              <FormGroup validationState={displayErrorRegisterSurname ? 'error' : null}>
                <ControlLabel>{'Sukunimi'}</ControlLabel>
                <FormControl type={"text"} onChange={updateRegisterSurname} autoComplete={"new-password"} />
              </FormGroup>
            </div>
          </div>

          <TooltipWithContent
            tooltip={form.tooltipsForForm['usernameInfo']}
          >
            <FormGroup validationState={displayErrorRegisterUsername ? 'error' : null}>
              <ControlLabel>{'Käyttäjätunnus'}</ControlLabel>
              <FormControl type={"text"} onChange={updateRegisterUsername} autoComplete={"new-password"} />
            </FormGroup>
          </TooltipWithContent>

          <div className={'register-inline'}>
            <div className={'register-inline-1'}>
              <FormGroup validationState={displayErrorRegisterPassword ? 'error' : null}>
                <ControlLabel>{'Salasana'}</ControlLabel>
                <FormControl type={"password"} onChange={updateRegisterPassword} autoComplete={"new-password"} />
              </FormGroup>
            </div>
            <div className={'register-inline-2'}>
              <FormGroup validationState={displayErrorRegisterPassword2 ? 'error' : null}>
                <ControlLabel>{'Salasana uudestaan'}</ControlLabel>
                <FormControl type={"password"} onChange={updateRegisterPasswordRepeat} autoComplete={"new-password"} />
              </FormGroup>
            </div>
          </div>

          <TooltipWithContent
            tooltip={form.tooltipsForForm['emailInfo']}
          >
            <FormGroup validationState={displayErrorRegisterEmail ? 'error' : null}>
              <ControlLabel>{'Sähköposti'}</ControlLabel>
              <FormControl onChange={updateRegisterEmail} autoComplete={"new-password"} />
            </FormGroup>
          </TooltipWithContent>

          <TooltipWithContent
            tooltip={form.tooltipsForForm['phoneInfo']}
          >
            <FormGroup validationState={displayErrorRegisterPhone ? 'error' : null}>
              <ControlLabel>{'Puhelinnumero'}</ControlLabel>
              <FormControl onChange={updateRegisterPhone} 
                id={"phone"}
                autoComplete={"new-password"} />
            </FormGroup>
          </TooltipWithContent>
		
          <TooltipWithContent
            tooltip={form.tooltipsForForm['organizationInfo']}
          >
            <FormGroup controlId={"organization"}>
              <ControlLabel>{'Organisaatio / yhdistys / maanomistaja'}</ControlLabel>


	          <p className={'p-text'}>
	            {'Olet rekisteröitymässä Virman ylläpitotyökaluun, jolla et voi esimerkiksi kommenttoida virheellisiä reittejä. Käyttäjille suunnattu palvelu löytyy '}
	            {''}<a href="https://m.virma.fi">{'täältä!'}</a>{''}
	          </p>

              <FormControl
                componentClass={"select"}
                id={"organization"}
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
                <ControlLabel>{'Uusi organisaatio'}</ControlLabel>
                <FormControl
                  type={"text"}
                  id={"new_organization"}
                  onChange={(e) => this.onChangeOrganization(e)}
                  placeholder={"Kirjoita listan ulkopuolinen organisaatio"}
                  autoComplete={"new-password"}
                />
              </FormGroup>
            </TooltipWithContent>
          }

          <p className={'p-text'}>
            {'Antamalla yhteystietosi hyväksyt tietojesi tallentamisen Varsinais-Suomen liiton tietosuojaselosteen periaatteiden mukaisesti '}
            {'('}<a href="https://www.varsinais-suomi.fi/fi/tietopankki/tietosuoja" target="_blank">{'linkki'}</a>{')'}
          </p>
          <label className={'checkbox-container'}>{'Hyväksyn'}
            <input type="checkbox" id={'gdpr'} checked={this.state.gdprAccepted} onChange={this.handleCheckbox} />
            <span className={'checkbox-checkmark'}></span>
          </label>

          <ButtonToolbar>
            <Button id={"square-button-primary"} type={"submit"} bsStyle={"primary"} disabled={disabled}>
              {'Luo tunnus'}
            </Button>
            <Button id={"square-button-danger"} bsStyle={"danger"} onClick={hideRegisterModal}>
              {'Takaisin'}
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
