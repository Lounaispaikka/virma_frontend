import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import '../../../../../css/form.css!';

const ControlSelectClasses = ({ controlName, formName, disabled, stateValue, handleChange, optionValues }) => {
  return (
    <FormGroup controlId={formName} bsSize={"small"}>
      <ControlLabel>{controlName}</ControlLabel>
      <FormControl
        componentClass={"select"}
        id={formName}
        disabled={disabled}
        value={stateValue === undefined ? '' : stateValue}
        onChange={(e) => handleChange(e, optionValues)}
      >
        {optionValues.map((layer, idx) => {
          return (
            <option value={layer.name_fi} key={idx}>{layer.name_fi + ' / ' + layer.name_se + ' / ' + layer.name_en}</option>
          );
        })}
      </FormControl>
    </FormGroup>
  );
}

export default ControlSelectClasses;
