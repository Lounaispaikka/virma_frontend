import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

import '../../../../css/customBootstrap.css!';
import '../../../../css/form.css!';


const LoginContent = ({
  login,
  loginDisabled,
  errorTextLogin,
  displayErrorLoginUsername,
  displayErrorLoginPassword,
  updateLoginUsername,
  updateLoginPassword,
  hideLoginModal,
  showRegisterModal,
  showForgotModal
}) => {

  let disabled = loginDisabled;
  if (displayErrorLoginUsername || displayErrorLoginPassword) {
    disabled = true;
  }

  return (
    <div className={"login"}>
      <form onSubmit={e => login(e)}>
        {errorTextLogin.length !== 0 && <p>{errorTextLogin}</p>}

        <FormGroup validationState={displayErrorLoginUsername ? 'error' : null}>
          <ControlLabel>Käyttäjätunnus</ControlLabel>
          <FormControl type={"text"} onChange={updateLoginUsername} autoComplete={"new-password"} autoFocus />
        </FormGroup>
        <FormGroup validationState={displayErrorLoginPassword ? 'error' : null}>
          <ControlLabel>Salasana</ControlLabel>
          <FormControl type={"password"} onChange={updateLoginPassword} autoComplete={"new-password"} />
        </FormGroup>
        <ButtonToolbar>
          <Button id={"square-button-primary"} type={"submit"} bsStyle={"primary"} disabled={disabled}>
            Kirjaudu
          </Button>
          <Button id={"square-button-danger"} bsStyle={"danger"} onClick={hideLoginModal}>
            Sulje
          </Button>
          <Button id={"square-button-warning"} bsStyle={"warning"} onClick={showRegisterModal}>
            Luo tunnus
          </Button>
          <Button id={"square-button-default"} bsStyle={"default"} onClick={showForgotModal}>
            Salasana unohtunut?
          </Button>
        </ButtonToolbar>
      </form>
    </div>
  );
};

export default LoginContent;
