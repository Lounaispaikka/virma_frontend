import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

import { TooltipWithContent } from '../createModals/formUtils/Tooltip';

import { form } from '../../../model/store';

import '../../../../css/customBootstrap.css!';
import '../../../../css/form.css!';

const ForgotContent = ({
  forgot,
  errorTextForgot,
  displayErrorForgot,
  updateForgotEmail,
  forgotDisabled,
  hideForgotModal
}) => {
  return (
    <div className={"forgot"}>
      <form onSubmit={e => forgot(e)}>
        {errorTextForgot.length !== 0 && <p>{errorTextForgot}</p>}
        
        <TooltipWithContent
          tooltip={form.tooltipsForForm['forgotEmailInfo']}
        >
          <FormGroup validationState={displayErrorForgot ? 'error' : null}>
            <ControlLabel>Sähköposti</ControlLabel>
            <FormControl type={"email"} onChange={updateForgotEmail} autoComplete={"new-password"} />
          </FormGroup>
        </TooltipWithContent>

        <ButtonToolbar>
          <Button id={"square-button-primary"} type={"submit"} bsStyle={"primary"} disabled={forgotDisabled}>
            Palauta salasana
          </Button>
          <Button id={"square-button-danger"} bsStyle={"danger"} onClick={hideForgotModal}>
            Takaisin
          </Button>
        </ButtonToolbar>
      </form>

    </div>
  );
};

export default ForgotContent;
