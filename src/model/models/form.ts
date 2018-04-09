import { observable } from 'mobx';

import { initialState } from '../formConfig/initialState';

import { pointConfig } from '../formConfig/tabContent/point';
import { lineConfig } from '../formConfig/tabContent/line';
import { areaConfig } from '../formConfig/tabContent/area';

import { municipali } from '../formConfig/optionValues/municipali';
import { region } from '../formConfig/optionValues/region';
import { subregion } from '../formConfig/optionValues/subregion';
import { organizations } from '../formConfig/optionValues/organizations';
import { ownerclass } from '../formConfig/optionValues/ownerclass';
import { upkeepclass } from '../formConfig/optionValues/upkeepclass';
import { tooltipsForForm } from '../formConfig/optionValues/tooltipsForForm';
import { helpBlockTexts } from '../formConfig/optionValues/helpBlockTexts';

export default class Form {
  @observable initialState = initialState;

  @observable pointFormConfig = pointConfig;
  @observable lineFormConfig = lineConfig;
  @observable areaFormConfig = areaConfig;

  @observable municipali = municipali;
  @observable region = region;
  @observable subregion = subregion;
  @observable organizations = organizations;
  @observable ownerclass = ownerclass;
  @observable upkeepclass = upkeepclass;
  @observable tooltipsForForm = tooltipsForForm;
  @observable helpBlockTexts = helpBlockTexts;
}
