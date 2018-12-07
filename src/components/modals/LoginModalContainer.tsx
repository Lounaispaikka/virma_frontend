import React from 'react';
import { Modal } from 'react-bootstrap';

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
      return <b>{'Kirjaudu sisään'}</b>;
    } else if (this.props.showRegisterModalState) {
      return <b>{'Luo tunnus'}</b>;
    } else if (this.props.showForgotModalState) {
      return <b>{'Palauta salasana'}</b>;
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

    const {
      displayErrorLoginUsername,
      displayErrorLoginPassword,
      displayErrorForgot,
      displayErrorRegister,
      displayErrorRegisterName,
      displayErrorRegisterSurname,
      displayErrorRegisterUsername,
      displayErrorRegisterPassword,
      displayErrorRegisterPasssword2,
      displayErrorRegisterEmail,
      displayErrorRegisterOrganization
    } = this.props.displayFormErrors;

    const {
      updateLoginUsername,
      updateLoginPassword,
      updateRegisterName,
      updateRegisterSurname,
      updateRegisterUsername,
      updateRegisterPassword,
      updateRegisterPasswordRepeat,
      updateRegisterEmail,
      updateRegisterOrganization,
      updateForgotEmail
    } = this.props.updaters;

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
                displayErrorLoginUsername={displayErrorLoginUsername}
                displayErrorLoginPassword={displayErrorLoginPassword}
                updateLoginUsername={updateLoginUsername}
                updateLoginPassword={updateLoginPassword}
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
                displayErrorRegisterName={displayErrorRegisterName}
                displayErrorRegisterSurname={displayErrorRegisterSurname}
                displayErrorRegisterUsername={displayErrorRegisterUsername}
                displayErrorRegisterPassword={displayErrorRegisterPassword}
                displayErrorRegisterPassword2={displayErrorRegisterPasssword2}
                displayErrorRegisterEmail={displayErrorRegisterEmail}
                displayErrorRegisterOrganization={displayErrorRegisterOrganization}
                updateRegisterName={updateRegisterName}
                updateRegisterSurname={updateRegisterSurname}
                updateRegisterUsername={updateRegisterUsername}
                updateRegisterPassword={updateRegisterPassword}
                updateRegisterPasswordRepeat={updateRegisterPasswordRepeat}
                updateRegisterEmail={updateRegisterEmail}
                updateRegisterOrganization={updateRegisterOrganization}
                hideRegisterModal={this.props.hideRegisterModal}
              />
            }

            {showForgotModalState &&
              <ForgotContent
                forgot={this.props.forgot}
                errorTextForgot={this.props.errorTextForgot}
                displayErrorForgot={displayErrorForgot}
                updateForgotEmail={updateForgotEmail}
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
