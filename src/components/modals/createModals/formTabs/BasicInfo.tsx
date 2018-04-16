import React from 'react';
import { observer } from 'mobx-react';

import ControlSelectClasses from '../formUtils/ControlSelectClasses';
import ControlText from '../formUtils/ControlText';
import { ControlCheckbox } from '../formUtils/ControlCheckbox';

@observer
export class BasicInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showAddress: this.props.parentState['no_address'] === 'T' ? true : false
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(e) {
    this.setState({ showAddress: !this.state.showAddress });
    e.target.value = this.state.showAddress ? 'F' : 'T';

    this.props.formConfig.forEach(item => {
      if (e.target.id === 'no_address') {
        this.props.formConfig.find(conf => conf.attr === 'address').formError = this.state.showAddress ? true : false;
        this.props.formConfig.find(conf => conf.attr === 'address').canBeUndefined = this.state.showAddress ? false : true;
      }
    });

    this.props.handleFormChange(e);
  }

  getClass2Options(layer) {
    for (let i = 0; i < layer.length; i++) {
      if (layer[i].name_fi === this.props.parentState.class1_fi) {
        return layer[i].features;
      }
    }
  }

  render() {
    const { formConfig, parentState, handleFormChange, layers, sortTabContent } = this.props;
    const tabContent = formConfig.sort(sortTabContent);

    return (
      <div className={"createModalBodyTab"}>
        {tabContent.map((info, idx) => {
          if (this.state.showAddress && info.attr === 'address') {
            return null;
          }

          if (info.addedToForm && info.tab === 1) {
            if (info.type === 'select') {
              if (info.attr.indexOf('class1') >= 0) {
                return (
                  <ControlSelectClasses
                    key={idx}
                    controlName={info.desc}
                    formName={info.attr}
                    disabled={false}
                    stateValue={parentState[info.attr]}
                    handleChange={handleFormChange}
                    optionValues={layers}
                  />
                );
              } else if (info.attr.indexOf('class2') >= 0) {
                return (
                  <ControlSelectClasses
                    key={idx}
                    controlName={info.desc}
                    formName={info.attr}
                    disabled={false}
                    stateValue={parentState[info.attr]}
                    handleChange={handleFormChange}
                    optionValues={this.getClass2Options(layers)}
                  />
                );
              }
            }

            if (info.attr === 'no_address') {
              return (
                <ControlCheckbox
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  checkboxValue={this.state.showAddress}
                  handleChange={this.handleCheckbox}
                />
              );
            }

            return (
              <ControlText
                key={idx}
                controlName={info.desc}
                formName={info.attr}
                readOnly={false}
                stateValue={parentState[info.attr]}
                handleChange={handleFormChange}
                displayFormError={info.formError}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }
}
