import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import base64 from 'base-64';
import validator from 'validator';
import 'whatwg-fetch';

declare const L: any; // Some hack that works for including L & L.draw

import { login, data, layer, map, messages } from '../model/store';
import { LoginModalContainer } from './modals/LoginModalContainer';
import { appUrls } from '../config';

import '../../css/customBootstrap.css!';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Cache': 'no-cache'
};

@observer
export class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      // Form value state
      username: '', password: '',
      regUsername: '', regPassword: '', regPassword2: '', regEmail: '', regOrganization: 'Aura',
      forgotEmail: '',

      // Form error state
      errorTextLogin: '', errorTextRegister: '', errorTextForgot: '',
      displayErrorLoginUsername: false,
      displayErrorLoginPassword: false,
      displayErrorForgot: false,
      displayErrorRegisterUsername: false,
      displayErrorRegisterPassword: false,
      displayErrorRegisterPassword2: false,
      displayErrorRegisterEmail: false,
      displayErrorRegisterOrganization: false,

      loginDisabled: false, registerDisabled: false, forgotDisabled: true,

      // View render logic state
      showLoginModalContainer: false, showLoginModal: false, showRegisterModal: false, showForgotModal: false
    };

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.forgot = this.forgot.bind(this);

    this.processLogin = this.processLogin.bind(this);
    this.processLogout = this.processLogout.bind(this);
    this.processRegister = this.processRegister.bind(this);
    this.processForgot = this.processForgot.bind(this);

    this.showLoginModal = this.showLoginModal.bind(this);
    this.showRegisterModal = this.showRegisterModal.bind(this);
    this.showForgotModal = this.showForgotModal.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.hideRegisterModal = this.hideRegisterModal.bind(this);
    this.hideForgotModal = this.hideForgotModal.bind(this);

    this.updateLoginUsername = this.updateLoginUsername.bind(this);
    this.updateLoginPassword = this.updateLoginPassword.bind(this);
    this.updateRegisterUsername = this.updateRegisterUsername.bind(this);
    this.updateRegisterPassword = this.updateRegisterPassword.bind(this);
    this.updateRegisterPasswordRepeat = this.updateRegisterPasswordRepeat.bind(this);
    this.updateRegisterEmail = this.updateRegisterEmail.bind(this);
    this.updateRegisterOrganization = this.updateRegisterOrganization.bind(this);
    this.updateForgotEmail = this.updateForgotEmail.bind(this);

    this.resetErrors = this.resetErrors.bind(this);
  }

  componentWillMount() {
    const queryOptions: any = {
      method: 'GET',
      headers: headers,
      credentials: 'include'
    };
    fetch(appUrls.initLogin, queryOptions)
      .then(response => response.json())
      .then(this.processLogin)
      .catch(error => {
        console.log(error);
      });
  }

  login(e) {
    e.preventDefault();

    if (this.state.username.length === 0 && this.state.password.length === 0) {
      this.setState({ displayErrorLoginUsername: true, displayErrorLoginPassword: true, errorTextLogin: 'Anna käyttäjätunnus ja salasana' });
      return null;
    }

    if (this.state.username.length === 0) {
      this.setState({ displayErrorLoginUsername: true, errorTextLogin: 'Anna käyttäjätunnus' });
      return  null;
    }

    if (this.state.password.length === 0) {
      this.setState({ displayErrorLoginPassword: true, errorTextLogin: 'Anna salasana' });
      return null;
    }

    const queryOptions: any = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Authorization': 'Basic ' +  base64.encode(this.state.username + ':' + this.state.password)
      },
      credentials: 'include'
    };

    fetch(appUrls.login, queryOptions)
      .then(response => response.json())
      .then(this.processLogin)
      .catch(error => {
        console.log(error);
        this.setState({
          displayErrorLoginUsername: true,
          displayErrorRegisterPassword: true,
          errorTextLogin: messages.loginMessages.loginConnectionError
        });
      });
  }

  logout(e) {
    e.preventDefault();
    const queryOptions: any = {
      method: 'GET',
      headers: headers,
      credentials: 'include'
    };

    fetch(appUrls.logout, queryOptions)
      .then(response => response.json())
      .then(this.processLogout)
      .catch(error => {
        console.log(error);
      });
  }

  register(e) {
    e.preventDefault();

    let errorMessagesCount = 0;

    if (this.state.regUsername.length === 0) {
      this.setState({ displayErrorRegisterUsername: true });
      errorMessagesCount++;
    }

    if (this.state.regPassword.length === 0) {
      this.setState({ displayErrorRegisterPassword: true });
      errorMessagesCount++;
    }

    if (this.state.regPassword2.length === 0) {
      this.setState({ displayErrorRegisterPassword2: true });
      errorMessagesCount++;
    }

    if (this.state.regEmail.length === 0) {
      this.setState({ displayErrorRegisterEmail: true });
      errorMessagesCount++;
    }

    if (this.state.regOrganization.length === 0) {
      this.setState({ displayErrorRegisterOrganization: true });
      errorMessagesCount++;
    }

    if (errorMessagesCount > 0) {
      this.setState({ errorTextRegister: 'Lomakkeessa on vielä täytettäviä kohteita' });
      return null;
    }

    const queryOptions: any = {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.regUsername,
        password: this.state.regPassword,
        password2: this.state.regPassword2,
        email: this.state.regEmail,
        organization: this.state.regOrganization
      })
    };

    fetch(appUrls.register, queryOptions)
      .then(response => response.json())
      .then(this.processRegister)
      .catch(error => {
        console.log(error);
        this.setState({
          displayErrorRegister: true,
          errorTextRegister: messages.loginMessages.registerConnectionError
        });
      });
  }

  forgot(e) {
    e.preventDefault();
    const queryOptions: any = {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.forgotEmail
      })
    };

    fetch(appUrls.forgot, queryOptions)
      .then(response => response.json())
      .then(this.processForgot)
      .catch(error => {
        console.log(error);
        this.setState({
          displayErrorForgot: true,
          forgotTextLogin: messages.loginMessages.forgotConnectionError
        });
      });
  }

  processLogin(loginResponse) {
    if (loginResponse.message === 'In' || loginResponse.message === 'Success') {
      this.setState({
        password: '',
        username: loginResponse.user,
        showLoginModalContainer: false,
        showLoginModal: false,
        displayErrorLoginUsername: false,
        displayErrorLoginPassword: false,
        errorTextLogin: ''
      });

      login.setLogin(true, loginResponse.user, loginResponse.admin, loginResponse.updater_id);
    } else if (loginResponse.message === 'Invalid password') {
      this.setState({
        displayErrorLoginPassword: true,
        errorTextLogin: messages.loginMessages.password
      });
    } else if (loginResponse.message === 'Missing credentials') {
      this.setState({
        displayErrorLoginUsername: true,
        displayErrorLoginPassword: true,
        errorTextLogin: messages.loginMessages.credentials
      });
    } else if (loginResponse.message === 'Unknown user') {
      this.setState({
        displayErrorLoginUsername: true,
        errorTextLogin: messages.loginMessages.unknown
      });
    } else if (loginResponse.message === 'Account is locked') {
      this.setState({
        displayErrorLoginUsername: true,
        displayErrorLoginPassword: true,
        errorTextLogin: messages.loginMessages.locked
      });
    }
  }

  processLogout(logoutResponse) {
    if (logoutResponse.message === 'Success') {
      this.setState({
        username: '',
        password: '',
        errorTextLogin: '',
        displayErrorLogin: false,
        showLoginModal: false,
      });

      // Turn off approvalLayers features when logging off -> should not be visible anyone else than the logged user
      this.toggleLayersAndFeaturesOff(layer.approvalLayers);

      map.mapReference.eachLayer(layer => {
        if (layer.options.props) {
          if (layer.options.children.props.type.indexOf('approval') >= 0 ||
            layer instanceof L.CircleMarker ||
            layer instanceof L.Polyline ||
            layer instanceof L.Polygon
          ) {
            map.mapReference.removeLayer(layer);
          }
        }
      });

      login.setLogin(false, '', false, '');
    }
  }

  toggleLayersAndFeaturesOff(layer) {
    layer.forEach(layer => { layer.selected = false; layer.features.forEach(feature => { feature.selected = false; }); })
    data.pointsApproval = [];
    data.linesApproval = [];
    data.areasApproval = [];
  }

  processRegister(registerResponse) {
    if (registerResponse.message === 'Success') {
      this.setState({
        password: '',
        username: registerResponse.user,
        showRegisterModal: false,
        showLoginModal: true,
        displayErrorRegister: false,
        errorTextRegister: '',
        errorTextLogin: messages.loginMessages.registerSuccess
      });
    } else if (registerResponse.message === 'Missing credentials') {
      this.setState({
        displayErrorRegister: true,
        errorTextRegister: messages.loginMessages.credentials
      });
    } else if (registerResponse.message === 'Username has been taken') {
      this.setState({
        displayErrorRegister: true,
        errorTextRegister: messages.loginMessages.userTaken
      });
    } else if (registerResponse.message === 'Email has already been assigned to a user') {
      this.setState({
        displayErrorRegister: true,
        errorTextRegister: messages.loginMessages.emailTaken
      });
    } else if (registerResponse.message === 'Email was empty') {
      this.setState({
        displayErrorRegister: true,
        errorTextRegister: messages.loginMessages.emailEmpty
      });
    } else if (registerResponse.message === 'Second password does not match') {
      this.setState({
        displayErrorRegister: true,
        errorTextRegister: messages.loginMessages.passwordDouble
      });
    }
  }

  processForgot(forgotResponse) {
    if (forgotResponse.message === 'Success') {
      this.setState({
        displayErrorForgot: false,
        errorTextForgot: messages.loginMessages.emailSendSuccess,
        forgotEmail: '',
      });
    } else if (forgotResponse.message === 'Email already sent') {
      this.setState({
        displayErrorForgot: true,
        forgotDisabled: true,
        errorTextForgot: messages.loginMessages.emailAlreadySent
      });
    } else {
      this.setState({
        displayErrorForgot: true,
        forgotDisabled: true,
        errorTextForgot: messages.loginMessages.emailSendFailure
      });
    }
  }

  showLoginModal() {
    this.resetErrors();
    this.setState({
      showLoginModalContainer: true,
      showLoginModal: true,
    });
  }

  showRegisterModal() {
    this.resetErrors();
    this.setState({
      showRegisterModal: true,
      showLoginModal: false,
      showForgotModal: false,
      registerDisabled: true,
    });
  }

  showForgotModal() {
    this.resetErrors();
    this.setState({
      showForgotModal: true,
      showLoginModal: false,
      showRegisterModal: false,
    });
  }

  hideLoginModal() {
    this.resetErrors();
    this.setState({
      showLoginModalContainer: false,
      showLoginModal: false,
      showForgotModal: false,
    });
  }

  hideRegisterModal() {
    this.resetErrors();
    this.setState({
      showLoginModal: true,
      showRegisterModal: false,
      showForgotModal: false,
    });
  }

  hideForgotModal() {
    this.resetErrors();
    this.setState({
      showLoginModal: true,
      showRegisterModal: false,
      showForgotModal: false,
    });
  }

  resetErrors() {
    this.setState({
      displayErrorLoginUsername: false,
      displayErrorLoginPassword: false,
      displayErrorRegisterUsername: false,
      displayErrorRegisterPassword: false,
      displayErrorRegisterPassword2: false,
      displayErrorRegisterEmail: false,
      displayErrorRegisterOrganization: false,
      displayErrorForgot: false,
      errorTextLogin: '', errorTextRegister: '', errorTextForgot: '',
      username: '', password: '',
      regUsername: '', regPassword: '', regPassword2: '', regEmail: '', regOrganization: 'Aura',
      forgotEmail: '',
    });
  }

  updateRegisterUsername(event) {
    if (event.target.value.length === 0) {
      this.setState({
        displayErrorRegisterUsername: true
      });
    } else if (event.target.value.length > 15) {
      this.setState({
        displayErrorRegisterUsername: true,
        errorTextRegister: messages.loginMessages.usernameTooLong
      });
    } else if (/\s/.test(event.target.value)) {
      this.setState({
        displayErrorRegisterUsername: true,
        errorTextRegister: messages.loginMessages.usernameWhitespace
      });
    } else if (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(event.target.value)) {
      this.setState({
        displayErrorRegisterUsername: true,
        errorTextRegister: messages.loginMessages.usernameSpecialCharacters
      });
    } else {
      this.setState({
        displayErrorRegisterUsername: false,
        errorTextRegister: '',
        regUsername: event.target.value
      });
    }
  }

  updateRegisterPassword(event) {
    if (event.target.length === 0) {
      this.setState({ regPassword: event.target.value, displayErrorRegisterPassword: true });
    } else {
      this.setState({ regPassword: event.target.value, displayErrorRegisterPassword: false });
    }

    if (event.target.value === this.state.regPassword2) {
      this.setState({ displayErrorRegisterPassword2: false });
    } else {
      this.setState({ displayErrorRegisterPassword2: true });
    }
  }

  updateRegisterPasswordRepeat(event) {
    if (event.target.length === 0) {
      this.setState({ regPassword2: event.target.value, displayErrorRegisterPassword2: true });
    } else if (event.target.length === 0 || (event.target.value !== this.state.regPassword)) {
      this.setState({ regPassword2: event.target.value, displayErrorRegisterPassword2: true });
    } else {
      this.setState({ regPassword2: event.target.value, displayErrorRegisterPassword2: false });
    }
  }

  updateRegisterEmail(event) {
    if (event.target.value.length === 0 || !validator.isEmail(event.target.value)) {
      this.setState({ regEmail: event.target.value, displayErrorRegisterEmail: true });
      return;
    }

    this.setState({ regEmail: event.target.value, displayErrorRegisterEmail: false });
  }

  updateRegisterOrganization(event) {
    if (event.target.value.length === 0) {
      this.setState({ regOrganization: event.target.value, displayErrorRegisterOrganization: true });
    } else {
      this.setState({ regOrganization: event.target.value, displayErrorRegisterOrganization: false });
    }
  }

  updateLoginUsername(event) {
    if (event.target.value.length === 0) {
      this.setState({ username: event.target.value, displayErrorLoginUsername: true });
    } else {
      this.setState({ username: event.target.value, displayErrorLoginUsername: false });
    }
  }

  updateLoginPassword(event) {
    if (event.target.value.length === 0) {
      this.setState({ password: event.target.value, displayErrorLoginPassword: true });
    } else {
      this.setState({ password: event.target.value, displayErrorLoginPassword: false });
    }
  }

  updateForgotEmail(event) {
    if (event.target.value.length === 0 || !validator.isEmail(event.target.value)) {
      this.setState({ forgotEmail: event.target.value, forgotDisabled: true });
      return;
    }

    this.setState({ forgotEmail: event.target.value, forgotDisabled: false });
  }

  render() {
    let loginButtonStyle = "square-button-primary";

    if (this.state.showLoginModal || this.state.showRegisterModal || this.state.showForgotModal) {
      loginButtonStyle = "square-button-primary-active";
    }

    if (!this.state.showLoginModalContainer) {
      return (
        <div className={"login-buttons"}>
          {!login.isLoggedIn &&
            <Button id={loginButtonStyle} onClick={(e) => this.showLoginModal()} bsSize={"small"} bsStyle={"primary"}>Kirjaudu sisään</Button>
          }
          {login.isLoggedIn &&
            <Button id={"square-button-warning"} onClick={(e) => this.logout(e)} bsSize={"small"} bsStyle={"warning"}>Kirjaudu ulos</Button>
          }
        </div>
      );
    }

    return (
      <div className={"login-buttons"}>
        {!login.isLoggedIn &&
          <Button id={loginButtonStyle} onClick={(e) => this.showLoginModal()} bsSize={"small"} bsStyle={"primary"}>Kirjaudu sisään</Button>
        }

        {login.isLoggedIn &&
          <Button id={"square-button-warning"} onClick={(e) => this.logout(e)} bsSize={"small"} bsStyle={"warning"}>Kirjaudu ulos</Button>
        }

        <LoginModalContainer
          login={this.login}
          register={this.register}
          forgot={this.forgot}

          showLoginModalContainer={this.state.showLoginModalContainer}
          showLoginModalState={this.state.showLoginModal}
          showRegisterModalState={this.state.showRegisterModal}
          showForgotModalState={this.state.showForgotModal}

          showRegisterModal={this.showRegisterModal}
          showForgotModal={this.showForgotModal}

          hideLoginModal={this.hideLoginModal}
          hideForgotModal={this.hideForgotModal}
          hideRegisterModal={this.hideRegisterModal}

          displayErrorLoginUsername={this.state.displayErrorLoginUsername}
          displayErrorLoginPassword={this.state.displayErrorLoginPassword}
          displayErrorForgot={this.state.displayErrorForgot}
          displayErrorRegister={this.state.displayErrorRegister}
          displayErrorRegisterUsername={this.state.displayErrorRegisterUsername}
          displayErrorRegisterPassword={this.state.displayErrorRegisterPassword}
          displayErrorRegisterPassword2={this.state.displayErrorRegisterPassword2}
          displayErrorRegisterEmail={this.state.displayErrorRegisterEmail}
          displayErrorRegisterOrganization={this.state.displayErrorRegisterOrganization}

          loginDisabled={this.state.loginDisabled}
          registerDisabled={this.state.registerDisabled}
          forgotDisabled={this.state.forgotDisabled}
          errorTextLogin={this.state.errorTextLogin}
          errorTextRegister={this.state.errorTextRegister}
          errorTextForgot={this.state.errorTextForgot}

          updateLoginUsername={this.updateLoginUsername}
          updateLoginPassword={this.updateLoginPassword}
          updateRegisterUsername={this.updateRegisterUsername}
          updateRegisterPassword={this.updateRegisterPassword}
          updateRegisterPasswordRepeat={this.updateRegisterPasswordRepeat}
          updateRegisterEmail={this.updateRegisterEmail}
          updateRegisterOrganization={this.updateRegisterOrganization}
          updateForgotEmail={this.updateForgotEmail}
        />
      </div>
    );
  }
}
