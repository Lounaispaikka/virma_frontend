import React from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/fi';

import { TooltipWithContent } from './Tooltip';

import { form } from '../../../../model/store';
import { DATE_FORMAT } from '../../../../config/constants';

import '../../../../../node_modules/react-datepicker/dist/react-datepicker.css!';
import '../../../../../css/form.css!';

moment.locale('fi');

export class ControlDate extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      startDate: this.props.stateValue === undefined ? moment() : moment(this.props.stateValue)
    };
  }

  handleDatePicker = (date, event) => {
    this.setState({ startDate: date });
    event.target['id'] = this.props.formName;
    event.target['value'] = moment(date).format(DATE_FORMAT);
    this.props.handleChange(event);
  }

  returnFormControl() {
    const { controlName, formName, disabled } = this.props;

    return (
      <FormGroup bsSize={"small"}>
        <ControlLabel>{controlName}</ControlLabel>
        <DatePicker
          id={formName}
          todayButton={'Tänään'}
          className={"form-control"}
          selected={this.state.startDate}
          startDate={this.state.startDate}
          onChange={this.handleDatePicker}
          dateFormat={DATE_FORMAT}
          disabled={disabled}
          locale={'fi'}
        />
      </FormGroup>
    );
  }

  render() {
    const { formName } = this.props;

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
