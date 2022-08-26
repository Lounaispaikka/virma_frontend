import React from 'react';
import { observer } from 'mobx-react';
import { Alert, Fade } from 'react-bootstrap';

import { modal } from '../../../model/store';

import '../../../../css/modal.css!';

@observer
export class SuccessAlert extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      fadeOut: false
    }
  }

  componentDidMount() {
    // TODO: remove timeout on hide
    setTimeout(() => {
      this.setState({ fadeOut: true }, () => {
        setTimeout(() => {
          modal.hideSuccessAlert();
        }, 500);
      });
    }, 19*1000);
  }

  render() {
    if (modal.showSuccess) {
      return (
        <Fade in={!this.state.fadeOut}>
          <Alert className={"successAlert"} bsStyle={"success"} onDismiss={modal.hideSuccessAlert}>
            <div className={"successMsg"}>
              {modal.successContent}
            </div>
          </Alert>
        </Fade>
      );
    }

    return null;
  }
}
