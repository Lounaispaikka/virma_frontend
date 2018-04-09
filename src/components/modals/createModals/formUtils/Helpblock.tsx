import React from 'react';
import { HelpBlock } from 'react-bootstrap';

import { form } from '../../../../model/store';

import '../../../../../css/form.css!';

export function HelpBlockContent({ children }) {
  if (form.helpBlockTexts[children]) {
    return (
      <HelpBlock>{form.helpBlockTexts[children]}</HelpBlock>
    );
  } else {
    return (
      <HelpBlock>Kenttä on täytettävä - Fyll i fältet</HelpBlock>
    );
  }
}
