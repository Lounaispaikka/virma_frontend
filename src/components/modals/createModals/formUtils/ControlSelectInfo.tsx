import React from 'react';
import { FormGroup, ControlLabel, FormControl, Label } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';
import HelpBlockContent from './Helpblock';

import '../../../../../css/form.css!';

export class ControlSelectInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { uniqueOption: false };
  }

  componentWillMount() {
    // Check if the old value is unique, if it is add it to option
    let count = 0;
    this.props.optionValues.forEach(item => { if (item[this.props.formName] === this.props.stateValue) { count += 1; } });
    if (count === 0) { this.setState({ uniqueOption: true }); }
  }

  addStateValue(e) {
    let newValue = e.target.value;
    if (newValue !== 'Valitse / Välj') {
      if (this.props.stateValue) {
        newValue = this.props.stateValue.indexOf(e.target.value) < 0 ? this.props.stateValue + ', ' + e.target.value: this.props.stateValue;
      }

      if (e.target.id === 'ownerclass' || 'municipali' || 'subregion' || 'region') {
        this.props.handleChange(e, this.props.optionValues, newValue);
      } else {
        this.props.handleChange(e, this.props.optionValues);
      }
    }
  }

  removeStateValue(e, id, item) {
    if (this.props.stateValue) {
      const array = this.props.stateValue.trim().split(",");
      const newValue = array.filter(value => value !== item);
      newValue.map((str) => { return str.trim() });
      e.target.id = id;
      this.props.handleChange(e, this.props.optionValues, newValue.join(","));
    }
  }

  returnFormControl() {
    const { controlName, formName, stateValue, optionValues, displayFormError } = this.props;

    return (
      <FormGroup validationState={displayFormError ? 'error' : null} controlId={formName} bsSize={"small"}>
        <ControlLabel>{controlName}</ControlLabel>
        <FormControl
          componentClass={"select"}
          id={formName}
          value={'Valitse / Välj'}
          onChange={(e) => this.addStateValue(e)}
        >
          {this.state.uniqueOption &&
            <option value={stateValue} key={1}>{stateValue}</option>
          }
          {optionValues.map((item, idx) => {
            if (formName.indexOf('municipali') >= 0) {
              return (
                <option value={item.municipali} key={idx}>{item.municipali}</option>
              );
            } else if (formName.indexOf('subregion') >= 0) {
              return (
                <option value={item.subregion} key={idx}>{item.subregion}</option>
              );
            } else if (formName.indexOf('region') >= 0) {
              return (
                <option value={item.region} key={idx}>{item.region}</option>
              );
            } else if (formName.indexOf('ownerclass') >= 0) {
              return (
                <option value={item.owner} key={idx}>{item.owner}</option>
              );
            }
          })}
        </FormControl>

        {stateValue !== undefined && <div>
          {stateValue.length !== 0 && <div>
            {stateValue.trim().split(",").map((item, idx) => {
              return (
                <div className={"tags"} key={idx}>
                  <Label className={"tag"} key={idx}>
                    {item.trim()}{'   '}
                    <span className={"tag-close"} onClick={(e) => this.removeStateValue(e, formName, item)}>{'X'}</span>
                  </Label>
                </div>
              );
            })}
          </div>}
        </div>}

        {displayFormError && <HelpBlockContent formName={formName} value={stateValue} />}
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
