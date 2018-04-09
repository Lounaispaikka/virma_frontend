import React from 'react';

import ControlText from '../formUtils/ControlText';
import { ControlSelectInfo } from '../formUtils/ControlSelectInfo';
import ControlSelectUnique from '../formUtils/ControlSelectUnique';
import { ControlDate } from '../formUtils/ControlDate';
import { ControlCheckbox } from '../formUtils/ControlCheckbox';

import { form } from '../../../../model/store';

export class ContactInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showPublic: this.props.parentState['publicinfo'] === 'T' ? true : false
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(e) {
    this.setState({ showPublic: !this.state.showPublic });
    e.target.value = !this.state.showPublic ? 'T' : 'F';

    this.props.formConfig.forEach(item => {
      if (e.target.id === 'publicinfo') {
        this.props.formConfig.find(conf => conf.attr === 'upkeeper').formError = !this.state.showPublic ? true : false;
        this.props.formConfig.find(conf => conf.attr === 'upkeeper').canBeUndefined = !this.state.showPublic ? false : true;

        this.props.formConfig.find(conf => conf.attr === 'upkeepinfo').formError = !this.state.showPublic ? true : false;
        this.props.formConfig.find(conf => conf.attr === 'upkeepinfo').canBeUndefined = !this.state.showPublic ? false : true;
      }
    });

    this.props.handleFormChange(e);
  }

  render() {
    const { formConfig, parentState, handleFormChange, sortTabContent} = this.props;
    const tabContent = formConfig.sort(sortTabContent);

    return (
      <div className={"createModalBodyTab"}>
        {tabContent.map((info, idx) => {
          if (!this.state.showPublic && (info.attr === 'upkeeper' || info.attr === 'upkeepinfo')) {
            return null;
          }

          if (info.addedToForm && info.tab === 3) {
            if (info.type === 'date') {
              return (
                <ControlDate
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  disabled={info.attr.indexOf('timestamp') >= 0 ? true : false}
                />
              );
            }

            if (info.attr === 'ownerclass') {
              return (
                <ControlSelectInfo
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  optionValues={form.ownerclass}
                  displayFormError={info.formError}
                />
              );
            } else if (info.attr === 'upkeepclas') {
              return (
                <ControlSelectUnique
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  optionValues={form.upkeepclass}
                  displayFormError={info.formError}
                />
              );
            } else if (info.attr === 'publicinfo') {
              return (
                <ControlCheckbox
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  checkboxValue={this.state.showPublic}
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
};
