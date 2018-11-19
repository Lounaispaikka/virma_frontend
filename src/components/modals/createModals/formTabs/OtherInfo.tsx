import React from 'react';

import ControlText from '../formUtils/ControlText';
import { ControlSelectInfo } from '../formUtils/ControlSelectInfo';
import { ControlDate } from '../formUtils/ControlDate';

import { form } from '../../../../model/store';

import {
  SH_ES_DATE,
  TIMESTAMP,
  MUNICIPALI,
  SUBREGION,
  REGION,
  X_EUREFFIN,
  Y_EUREFFIN,
  UPDATER_ID,
} from '../../../../config/constants';

export class OtherInfo extends React.Component<any, any> {
  render() {
    const { formConfig, parentState, handleFormChange, sortTabContent } = this.props;
    const tabContent = formConfig.sort(sortTabContent);

    return (
      <div className={"createModalBodyTab"}>
        {tabContent.map((info, idx) => {
          if (info.addedToForm && info.tab === 2) {
            if (info.attr === SH_ES_DATE) {
              return (
                <ControlDate
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  disabled={false}
                />
              );
            } else if (info.attr === TIMESTAMP) {
              return (
                <ControlDate
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  disabled={true}
                />
              );
            } else if (info.attr === MUNICIPALI) {
              return (
                <ControlSelectInfo
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  optionValues={form.municipali}
                  displayFormError={info.formError}
                />
              );
            } else if (info.attr === SUBREGION) {
              return (
                <ControlSelectInfo
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  optionValues={form.subregion}
                  displayFormError={info.formError}
                />
              );
            } else if (info.attr === REGION) {
              return (
                <ControlSelectInfo
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  optionValues={form.region}
                  displayFormError={info.formError}
                />
              );
            }

            if (info.attr === X_EUREFFIN || info.attr === Y_EUREFFIN || info.attr === UPDATER_ID) {
              return (
                <ControlText
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  readOnly={true}
                  stateValue={parentState[info.attr]}
                  handleChange={handleFormChange}
                  displayFormError={info.formError}
                  placeholder={null}
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
                placeholder={null}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }
}
