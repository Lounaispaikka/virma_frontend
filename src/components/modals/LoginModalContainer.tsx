import React from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

import LoginContent from './loginModalContent/LoginContent';
import { RegisterContent } from './loginModalContent/RegisterContent';
import ForgotContent from './loginModalContent/ForgotContent';

export class LoginModalContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  getLoginModalHeader() {
    if (this.props.showLoginModalState) {
      return (
        <b>Kirjaudu sisään</b>
      );
    } else if (this.props.showRegisterModalState) {
      return (
        <b>Luo tunnus</b>
      );
    } else if (this.props.showForgotModalState) {
      return (
        <b>Palauta salasana</b>
      );
    }

    return null;
  }

  render() {
    const {
      showLoginModalContainer,
      showLoginModalState,
      showForgotModalState,
      showRegisterModalState,
      hideLoginModal,
    } = this.props;

    return (
      <div>
        <Modal backdrop={"static"} show={showLoginModalContainer} onHide={hideLoginModal}>
          <Modal.Header>
            <Modal.Title>
              {this.getLoginModalHeader()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showLoginModalState &&
              <LoginContent
                login={this.props.login}
                loginDisabled={this.props.loginDisabled}
                errorTextLogin={this.props.errorTextLogin}
                displayErrorLoginUsername={this.props.displayErrorLoginUsername}
                displayErrorLoginPassword={this.props.displayErrorLoginPassword}
                updateLoginUsername={this.props.updateLoginUsername}
                updateLoginPassword={this.props.updateLoginPassword}
                hideLoginModal={this.props.hideLoginModal}
                showRegisterModal={this.props.showRegisterModal}
                showForgotModal={this.props.showForgotModal}
              />
            }

            {showRegisterModalState &&
              <RegisterContent
                register={this.props.register}
                registerDisabled={this.props.registerDisabled}
                errorTextRegister={this.props.errorTextRegister}
                displayErrorRegisterUsername={this.props.displayErrorRegisterUsername}
                displayErrorRegisterPassword={this.props.displayErrorRegisterPassword}
                displayErrorRegisterPassword2={this.props.displayErrorRegisterPassword2}
                displayErrorRegisterEmail={this.props.displayErrorRegisterEmail}
                displayErrorRegisterOrganization={this.props.displayErrorRegisterOrganization}
                updateRegisterUsername={this.props.updateRegisterUsername}
                updateRegisterPassword={this.props.updateRegisterPassword}
                updateRegisterPasswordRepeat={this.props.updateRegisterPasswordRepeat}
                updateRegisterEmail={this.props.updateRegisterEmail}
                updateRegisterOrganization={this.props.updateRegisterOrganization}
                hideRegisterModal={this.props.hideRegisterModal}
              />
            }

            {showForgotModalState &&
              <ForgotContent
                forgot={this.props.forgot}
                errorTextForgot={this.props.errorTextForgot}
                displayErrorForgot={this.props.displayErrorForgot}
                updateForgotEmail={this.props.updateForgotEmail}
                forgotDisabled={this.props.forgotDisabled}
                hideForgotModal={this.props.hideForgotModal}
              />
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
