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
    const { showPublic } = this.state;
    const { handleFormChange, formConfig } = this.props;

    this.setState({ showPublic: !showPublic });
    e.target.value = !showPublic ? 'T' : 'F';

    formConfig.forEach(() => {
      if (e.target.id === 'publicinfo') {
        formConfig.find(conf => conf.attr === 'upkeeper').formError = !showPublic ? true : false;
        formConfig.find(conf => conf.attr === 'upkeeper').canBeUndefined = !showPublic ? false : true;

        formConfig.find(conf => conf.attr === 'upkeepinfo').formError = !showPublic ? true : false;
        formConfig.find(conf => conf.attr === 'upkeepinfo').canBeUndefined = !showPublic ? false : true;
      }
    });

    handleFormChange(e);
  }

  getPublicInfoPlaceholders(showPublic, type) {
    if (type === 'upkeeper') {
      return showPublic ? 'Tämän nimen saa julkaista' : 'Tätä nimeä ei saa julkaista';
    } else if (type === 'upkeepinfo') {
      return showPublic ? 'Tämän yhteystiedon saa julkaista' : 'Tätä yhteystietoa ei saa julkaista';
    }
  }

  render() {
    const { showPublic } = this.state;
    const { formConfig, parentState, handleFormChange, sortTabContent} = this.props;
    const tabContent = formConfig.sort(sortTabContent);

    return (
      <div className={"createModalBodyTab"}>
        {tabContent.map((info, idx) => {
          let disabled = false;

          if (!this.state.showPublic && (info.attr === 'upkeeper' || info.attr === 'upkeepinfo')) {
            disabled = true;
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
                  checkboxValue={showPublic}
                  handleChange={this.handleCheckbox}
                />
              );
            }

            return (
              <ControlText
                key={idx}
                controlName={info.desc}
                formName={info.attr}
                readOnly={disabled}
                stateValue={parentState[info.attr]}
                handleChange={handleFormChange}
                displayFormError={info.formError}
                placeholder={this.getPublicInfoPlaceholders(showPublic, info.attr)}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }
};
