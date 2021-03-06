import {
  GID,
  CLASS1_FI,
  CLASS1_SE,
  CLASS1_EN,
  CLASS2_FI,
  CLASS2_SE,
  CLASS2_EN,
  NAME_FI,
  NAME_SE,
  NAME_EN,
  INFO_FI,
  INFO_SE,
  INFO_EN,
  LENGTH_M,
  ACCESSIBIL,
  CHALL_CLAS,
  WWW_FI,
  WWW_SE,
  WWW_EN,
  MUNICIPALI,
  MUNICI_NRO,
  SUBREGION,
  SUBREG_NRO,
  REGION,
  REGION_NRO,
  TIMESTAMP,
  UPDATER_ID,
  SPECIAL,
  SHAPEESTIM,
  SH_ES_DATE,
  UPKEEPCLAS,
  PUBLICINFO,
  UPKEEPER,
  UPKEEPINFO,
  TELEPHONE,
  EMAIL,
} from '../../constants';

export const lineConfig = [
  {
    attr: GID,
    desc: 'Tunnus',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 1
  },
  {
    attr: CLASS1_FI,
    desc: 'Pääluokitus - Huvudklassificering',
    type: 'select',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 2
  },
  {
    attr: CLASS1_SE,
    desc: 'Pääluokitus ruotsiksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 3
  },
  {
    attr: CLASS1_EN,
    desc: 'Pääluokitus englanniksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 4
  },
  {
    attr: CLASS2_FI,
    desc: 'Alaluokitus - Underklassificering',
    type: 'select',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 5
  },
  {
    attr: CLASS2_SE,
    desc: 'Alaluokitus ruotsiksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 6
  },
  {
    attr: CLASS2_EN,
    desc: 'Alaluokitus englanniksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 7
  },
  {
    attr: NAME_FI,
    desc: 'Reitin nimi - Ruttens namn',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 8
  },
  {
    attr: NAME_SE,
    desc: 'Ruttens namn',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 9
  },
  {
    attr: NAME_EN,
    desc: 'Route name',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 10
  },
  {
    attr: INFO_FI,
    desc: 'Reitin kuvaus - Beskrivning av rutten',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 11
  },
  {
    attr: INFO_SE,
    desc: 'Beskrivning',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 12
  },
  {
    attr: INFO_EN,
    desc: 'Information',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 13
  },
  {
    attr: LENGTH_M,
    desc: 'Reitin pituus - Ruttens längd',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 14
  },
  {
    attr: ACCESSIBIL,
    desc: 'Esteettömyys - Tillgänglighet',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 15
  },
  {
    attr: CHALL_CLAS,
    desc: 'Vaativuustaso - Kravnivå',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 16
  },
  {
    attr: WWW_FI,
    desc: 'Kohteen verkkosivut - Ruttens webbsidor',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 17
  },
  {
    attr: WWW_SE,
    desc: 'Websida',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 18
  },
  {
    attr: WWW_EN,
    desc: 'Webpage',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 19
  },



  {
    attr: MUNICIPALI,
    desc: 'Kunta - Kommun',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 1
  },
  {
    attr: MUNICI_NRO,
    desc: 'Kuntanumero - Kommunnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 2
  },
  {
    attr: SUBREGION,
    desc: 'Seutukunta - Regionkommun',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 3
  },
  {
    attr: SUBREG_NRO,
    desc: 'Seutukuntanumero - Regionkommunnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 4
  },
  {
    attr: REGION,
    desc: 'Maakunta - Landskap',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 5
  },
  {
    attr: REGION_NRO,
    desc: 'Maakuntanumero - Landskapsnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 6
  },
  {
    attr: TIMESTAMP,
    desc: 'Aikaleima - Tidstämpel',
    type: 'date',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 7
  },
  {
    attr: UPDATER_ID,
    desc: 'Päivittäjätunnus - Uppdaterare identifikation',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 8
  },
  {
    attr: SPECIAL,
    desc: 'Erityisluokittelu - Specialklassificering',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 2,
    order: 9
  },



  {
    attr: SHAPEESTIM,
    desc: 'Kuntoarvio - Konditionsbedömning',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 1
  },
  {
    attr: SH_ES_DATE,
    desc: 'Kuntoarvion päivämäärä - Konditionsbedömningens datum',
    type: 'date',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 2
  },
  {
    attr: UPKEEPCLAS,
    desc: 'Ylläpitoluokka - Underhållsklass',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 3,
    order: 3
  },
  {
    attr: PUBLICINFO,
    desc: 'Yhteystiedot julkisia – Kontaktuppgifter offentliga',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 3,
    order: 4
  },
  {
    attr: UPKEEPER,
    desc: 'Ylläpitäjän nimi - Upprätthållarens namn',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 5
  },
  {
    attr: UPKEEPINFO,
    desc: 'Ylläpitäjän yhteystieto - Upprätthållarens kontaktinformation',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 6
  },
  {
    attr: TELEPHONE,
    desc: 'Reittiä koskeva yleinen puhelinnumero - Allmänt telefonnummer för rutten',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 7
  },
  {
    attr: EMAIL,
    desc: 'Reittiä koskeva yleinen sähköposti - Allmän e-post för rutten',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 8
  }
];
