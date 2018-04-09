import React from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import '../../../../../css/form.css!';
import '../../../../../css/customBootstrap.css!';

export class ToggleEditor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.updateData = this.updateData.bind(this);
  }

  updateData(e) {
    this.props.onUpdate(e);
  }

  render() {
    return (
      <span>
        <ToggleButtonGroup defaultValue={this.props.defaultValue.toString()} bsSize={"xsmall"} name={"boolean"} type={"radio"} onChange={this.updateData}>
          <ToggleButton id={"square-button-default"} value={"true"}>True</ToggleButton>
          <ToggleButton id={"square-button-default"} value={"false"}>False</ToggleButton>
        </ToggleButtonGroup>
      </span>
    );
  }
}
