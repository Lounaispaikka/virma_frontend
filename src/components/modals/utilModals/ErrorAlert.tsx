import React from 'react';
import { observer } from 'mobx-react';
import { Alert, Fade } from 'react-bootstrap';

import { modal } from '../../../model/store';

import '../../../../css/modal.css!';

@observer
export class ErrorAlert extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      fadeOut: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeOut: true }, () => {
        setTimeout(() => {
          modal.hideErrorAlert();
        }, 500);
      });
    }, 1500);
  }

  render() {
    if (modal.showError) {
      return (
        <Fade in={!this.state.fadeOut}>
          <Alert className={"errorAlert"} bsStyle={"danger"} onDismiss={modal.hideErrorAlert}>
            <div className={"errorMsg"}>
              {modal.errorContent}
            </div>
          </Alert>
        </Fade>
      );
    }

    return null;
  }
}
