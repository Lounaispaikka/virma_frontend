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
    <b style={{marginLeft: "3em"}}>Lisäämällä kuvan sitoudut seuraavaan:</b>
    <ul style={{marginLeft: "3em"}}>
    <li>Lisään vain kuvan, johon omaan oikeudet</li>
    <li>Noudatan kuvan lisenssiehtoja (esim. tekijänoikeustietojen mainitseminen)</li>
    <li>Hyväksyn, että julkaisen Virman kautta kuvan <a href="https://creativecommons.org/licenses/by/4.0/deed.fi">CC BY 4.0</a> -lisenssillä
    <li>En saa kuvasta korvausta</li>
    </li>
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
