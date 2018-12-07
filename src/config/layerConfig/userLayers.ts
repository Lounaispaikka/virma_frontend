import { POINT_FEATURES, LINE_FEATURES, AREA_FEATURES } from '../constants';

const userLayers = [
  {
    name_fi: 'Omat kohteet',
    name_se: '',
    name_en: '',
    selected: false,
    features: [
      {
        name_fi: POINT_FEATURES,
        name_se: '',
        name_en: '',
        selected: false,
        description: '',
        color: 'grey'
      },
      {
        name_fi: LINE_FEATURES,
        name_se: '',
        name_en: '',
        selected: false,
        description: '',
        color: 'grey'
      },
      {
        name_fi: AREA_FEATURES,
        name_se: '',
        name_en: '',
        selected: false,
        description: '',
        color: 'grey'
      }
    ]
  }
];

export { userLayers };
