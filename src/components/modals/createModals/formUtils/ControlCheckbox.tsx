import React from 'react';
import { FormGroup, Row, Col, ControlLabel, Checkbox } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';

import '../../../../../css/form.css!';

export class ControlCheckbox extends React.Component<any, any> {

  returnFormControl() {
    return (
      <div className={"checkbox-form"}>
        <label>
          <input type="checkbox" id={this.props.formName} checked={this.props.checkboxValue} onChange={this.props.handleChange} /> {this.props.controlName}
        </label>
      </div>
    );
  }

  render() {
    const { controlName, formName, stateValue } = this.props;

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
};
