import React from 'react';
import { HelpBlock } from 'react-bootstrap';

import { form } from '../../../../model/store';

import '../../../../../css/form.css!';

const HelpBlockContent = ({ formName, value }) => {
  if (form.helpBlockTexts[formName]) {
    return (
      <HelpBlock>{form.helpBlockTexts[formName]}</HelpBlock>
    );
  } else {
    if (value) {
      if (value.length > 253) {
        return (
          <HelpBlock>Kentän maksimipituus on täynnä - Fältets maximala längd</HelpBlock>
        );
      }
    }
    
    return (
      <HelpBlock>Kenttä on täytettävä - Fyll i fältet</HelpBlock>
    );
  }
}

export default HelpBlockContent;
