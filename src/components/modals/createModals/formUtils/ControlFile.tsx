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
    <b style={{marginLeft: "2em"}}>Lisäämällä kuvan sitoudut seuraavaan:</b>
    <ul style={{marginLeft: "2em"}}>
    <li>Hyväksyn, että Virma julkaisee kuvan palvelussaan.</li>
    <li>Lisään vain itse kuvaamani teoksen tai sellaisen johon omaan riittävät oikeudet. Epäselvissä tapauksissa otan ensin yhteyttä osoitteeseen virma@lounaistieto.fi.</li>
    <li>En saa kuvasta korvausta.</li>
    <li>Jos kuvaaja tulee olla julkisesti näkyvillä, lisään tiedon alla olevaan kenttään "kuvaajan nimi".</li>
    
    </ul>
        Voit lähettää kuvan tästä tai lisätä linkin kuvaan alempana:
        
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
