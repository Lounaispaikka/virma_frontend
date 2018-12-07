import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import HelpBlockContent from './Helpblock';

import '../../../../../css/form.css!';

const ControlSelectUnique = ({ controlName, formName, stateValue, handleChange, optionValues, displayFormError }) => {
  return (
    <FormGroup validationState={displayFormError ? 'error' : null} controlId={formName} bsSize={"small"}>
      <ControlLabel>{controlName}</ControlLabel>
      <FormControl
        componentClass={"select"}
        id={formName}
        value={stateValue}
        onChange={(e) => handleChange(e, optionValues)}
      >
        {optionValues.map((value, idx) => {
          const low_value = value.upkeep.toLowerCase();

          return (
            <option value={low_value} key={idx}>{value.upkeep.charAt(0).toUpperCase() + value.upkeep.slice(1)}</option>
          );
        })}
      </FormControl>
      {displayFormError && <HelpBlockContent formName={formName} value={stateValue} />}
    </FormGroup>
  );
}

export default ControlSelectUnique;
