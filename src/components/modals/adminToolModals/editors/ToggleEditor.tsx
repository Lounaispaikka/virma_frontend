import React from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import '../../../../../css/form.css!';
import '../../../../../css/customBootstrap.css!';

export class ToggleEditor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  updateData = (e) => {
    this.props.onUpdate(e);
  }

  render() {
    return (
      <span>
        <ToggleButtonGroup defaultValue={this.props.defaultValue.toString()} name={"boolean"} type={"radio"} onChange={this.updateData}>
          <ToggleButton id={"square-button-default"} value={"true"}>True</ToggleButton>
          <ToggleButton id={"square-button-default"} value={"false"}>False</ToggleButton>
        </ToggleButtonGroup>
      </span>
    );
  }
}
