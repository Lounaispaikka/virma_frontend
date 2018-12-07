import { observable, action } from 'mobx';

import { initialFormState } from '../../config/formConfig/initialFormState';

import { pointConfig } from '../../config/formConfig/tabContent/point';
import { lineConfig } from '../../config/formConfig/tabContent/line';
import { areaConfig } from '../../config/formConfig/tabContent/area';

import { municipali } from '../../config/formConfig/optionValues/municipali';
import { region } from '../../config/formConfig/optionValues/region';
import { subregion } from '../../config/formConfig/optionValues/subregion';
import { organizations } from '../../config/formConfig/optionValues/organizations';
import { ownerclass } from '../../config/formConfig/optionValues/ownerclass';
import { upkeepclass } from '../../config/formConfig/optionValues/upkeepclass';
import { tooltipsForForm } from '../../config/formConfig/optionValues/tooltipsForForm';
import { helpBlockTexts } from '../../config/formConfig/optionValues/helpBlockTexts';

export default class Form {
  @observable initialFormState = initialFormState;

  @observable pointFormConfig = pointConfig;
  @observable lineFormConfig = lineConfig;
  @observable areaFormConfig = areaConfig;

  @observable municipali = municipali;
  @observable region = region;
  @observable subregion = subregion;
  @observable organizations = organizations;
  @observable ownerclass = ownerclass;
  @observable upkeepclass = upkeepclass;
  @observable.shallow tooltipsForForm = tooltipsForForm;
  @observable helpBlockTexts = helpBlockTexts;

  @action.bound
  getTooltipsForForm(name, type) {
    return this.tooltipsForForm[name][type];
  }
}
