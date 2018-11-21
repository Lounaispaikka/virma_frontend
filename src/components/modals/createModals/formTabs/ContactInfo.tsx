import React from 'react';

import ControlText from '../formUtils/ControlText';
import { ControlSelectInfo } from '../formUtils/ControlSelectInfo';
import ControlSelectUnique from '../formUtils/ControlSelectUnique';
import { ControlDate } from '../formUtils/ControlDate';
import { ControlCheckbox } from '../formUtils/ControlCheckbox';

import { form } from '../../../../model/store';

import {
  PUBLICINFO,
  UPKEEPER,
  UPKEEPINFO,
  OWNERCLASS,
  UPKEEPCLAS,
} from '../../../../config/constants';

export class ContactInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showPublic: this.props.parentState[PUBLICINFO] === 'T' ? true : false
    };
  }

  handleCheckbox = (e) => {
    const { showPublic } = this.state;
    const { handleFormChange, formConfig } = this.props;

    this.setState({ showPublic: !showPublic });
    e.target.value = !showPublic ? 'T' : 'F';

    formConfig.forEach(() => {
      if (e.target.id === PUBLICINFO) {
        formConfig.find(conf => conf.attr === UPKEEPER).formError = !showPublic ? true : false;
        formConfig.find(conf => conf.attr === UPKEEPER).canBeUndefined = !showPublic ? false : true;

        formConfig.find(conf => conf.attr === UPKEEPINFO).formError = !showPublic ? true : false;
        formConfig.find(conf => conf.attr === UPKEEPINFO).canBeUndefined = !showPublic ? false : true;
      }
    });

    handleFormChange(e);
  }

  getPublicInfoPlaceholders(showPublic, type) {
    if (type === UPKEEPER) {
      return showPublic ? 'Tämän nimen saa julkaista' : 'Tätä nimeä ei saa julkaista';
    } else if (type === UPKEEPINFO) {
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

          if (!this.state.showPublic && (info.attr === UPKEEPER || info.attr === UPKEEPINFO)) {
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

            if (info.attr === OWNERCLASS) {
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
            } else if (info.attr === UPKEEPCLAS) {
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
            } else if (info.attr === PUBLICINFO) {
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
