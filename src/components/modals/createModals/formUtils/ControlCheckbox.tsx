import React from 'react';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';

import '../../../../../css/form.css!';

export class ControlCheckbox extends React.Component<any, any> {

  returnFormControl() {
    const { formName, checkboxValue, handleChange, controlName } = this.props;

    return (
      <div className={"checkbox-form"}>
        <label>
          <input type="checkbox" id={formName} checked={checkboxValue} onChange={handleChange} /> {controlName}
        </label>
      </div>
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
};
