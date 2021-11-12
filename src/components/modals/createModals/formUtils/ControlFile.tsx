import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { form } from '../../../../model/store';
import { TooltipWithContent } from './Tooltip';
import HelpBlockContent from './Helpblock';


import '../../../../../css/form.css!';

export default class ControlFile extends React.Component<any, any> {
 

  render() {
    const { formName, formType, handleChange } = this.props;

    return (
      <>
        <span><b>Huom!</b> Lähetä vain kuvia, joihin sinulla on tekijänoikeus tai kirjallinen lupa. <b>Noudata myös kuvan lisenssiä!</b> Tämä tarkoittaa yleensä, että kuvan ottaja pitää mainita. Lähettämällä kuvan annat Virmalle oikeudet julkaista kuvan ilman korvausta Virman sivuilla reitin tietojen yhteydessä.</span>
        <br />
        <br />

        Voit lähettää kuvan virman palvelimille myös tästä:
        <br />
        <FormControl
          componentClass={"input"}
          type="file"
          id={formName}
          onChange={handleChange}>
        </FormControl>
        <br />
        <hr/>
      </>
    )
  }
}
