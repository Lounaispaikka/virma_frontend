import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';
import HelpBlockContent from './Helpblock';

import '../../../../../css/form.css!';

export default class ControlText extends React.Component<any, any> {
  returnFormControl() {
    const { displayFormError, formName, controlName, stateValue, handleChange, readOnly, placeholder } = this.props;

    return (
      <FormGroup validationState={displayFormError ? 'error' : null} controlId={formName} bsSize={"small"}>
        <ControlLabel>{controlName}</ControlLabel>
        <FormControl
          componentClass={"input"}
          type={"text"}
          id={formName}
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
