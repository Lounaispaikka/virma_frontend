import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';
import HelpBlockContent from './Helpblock';

import { UPKEEPER, UPKEEPINFO } from '../../../../config/constants';

import '../../../../../css/form.css!';

export default class ControlText extends React.Component<any, any> {
  returnFormControl() {
    const { displayFormError, formName, controlName, stateValue, handleChange, readOnly, placeholder, multiline } = this.props;

    return (
      <FormGroup
        className={(formName === UPKEEPER || formName === UPKEEPINFO) ? 'form-indented' : null}
        validationState={displayFormError ? 'error' : null}
        controlId={formName}
        bsSize={"small"}
      >
        <ControlLabel>{controlName}</ControlLabel>
        <FormControl
          componentClass={multiline?"textarea":"input"}
          type={multiline?"textarea":"text"}
          id={formName}
          rows={3}
          placeholder={placeholder}
          value={stateValue === undefined ? '' : stateValue}
          onChange={handleChange}
          readOnly={readOnly}>
        </FormControl>
        {displayFormError && <HelpBlockContent formName={formName} value={stateValue} />}
      </FormGroup>
    );
  }

  render() {
    const { formName, formType } = this.props;

    if (form.tooltipsForForm[formName]) {
      return (
        <TooltipWithContent
          tooltip={form.getTooltipsForForm(formName, formType)}
        >
          {this.returnFormControl()}
        </TooltipWithContent>
      );
    } else {
      return (
        this.returnFormControl()
      );
    }
  }
}
