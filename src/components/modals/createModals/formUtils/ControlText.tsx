import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';
import { HelpBlockContent } from './Helpblock';

import '../../../../../css/form.css!';

export default class ControlText extends React.Component<any, any> {
  returnFormControl() {
    const { displayFormError, formName, controlName, stateValue, handleChange, readOnly } = this.props;

    return (
      <FormGroup validationState={displayFormError ? 'error' : null} controlId={formName} bsSize={"small"}>
        <ControlLabel>{controlName}</ControlLabel>
        <FormControl
          componentClass={"input"}
          type={"text"}
          id={formName}
          value={stateValue === undefined ? '' : stateValue}
          onChange={handleChange}
          readOnly={readOnly}>
        </FormControl>
        {displayFormError && <HelpBlockContent>{formName}</HelpBlockContent>}
      </FormGroup>
    );
  }

  render() {
    const { controlName, formName, readOnly, stateValue, handleChange, displayFormError } = this.props;

    if (form.tooltipsForForm[formName]) {
      return (
        <TooltipWithContent
          tooltip={form.tooltipsForForm[formName]}
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
