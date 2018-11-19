const lineConfig = [
  {
    attr: 'gid',
    desc: 'Tunnus',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 1
  },
  {
    attr: 'class1_fi',
    desc: 'Pääluokitus - Huvudklassificering',
    type: 'select',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 2
  },
  {
    attr: 'class1_se',
    desc: 'Pääluokitus ruotsiksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 3
  },
  {
    attr: 'class1_en',
    desc: 'Pääluokitus englanniksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 4
  },
  {
    attr: 'class2_fi',
    desc: 'Alaluokitus - Underklassificering',
    type: 'select',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 5
  },
  {
    attr: 'class2_se',
    desc: 'Alaluokitus ruotsiksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 6
  },
  {
    attr: 'class2_en',
    desc: 'Alaluokitus englanniksi',
    type: 'select',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 7
  },
  {
    attr: 'name_fi',
    desc: 'Reitin nimi - Objektets namn',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 8
  },
  {
    attr: 'name_se',
    desc: 'Ruttens namn',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 9
  },
  {
    attr: 'name_en',
    desc: 'Route name',
    type: 'text',
    addedToForm: false,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 10
  },
  {
    attr: 'info_fi',
    desc: 'Kohdekuvaus - Beskrivning av objektet',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 1,
    order: 11
  },
  {
    attr: 'info_se',
    desc: 'Beskrivning',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 12
  },
  {
    attr: 'info_en',
    desc: 'Information',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 13
  },
  {
    attr: 'length_m',
    desc: 'Reitin pituus - Ruttens längd',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 14
  },
  {
    attr: 'accessibil',
    desc: 'Esteettömyys - Hinderfritt',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 15
  },
  {
    attr: 'chall_clas',
    desc: 'Vaativuustaso - Kravnivå',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 16
  },
  {
    attr: 'www_fi',
    desc: 'Kohteen verkkosivut - Objektets webbsidor',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 17
  },
  {
    attr: 'www_se',
    desc: 'Websida',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 18
  },
  {
    attr: 'www_en',
    desc: 'Webpage',
    type: 'text',
    addedToForm: false,
    canBeUndefined: true,
    formError: false,
    tab: 1,
    order: 19
  },



  {
    attr: 'municipali',
    desc: 'Kunta - Kommun',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 1
  },
  {
    attr: 'munici_nro',
    desc: 'Kuntanumero - Kommunnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 2
  },
  {
    attr: 'subregion',
    desc: 'Seutukunta - Regionkommun',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 3
  },
  {
    attr: 'subreg_nro',
    desc: 'Seutukuntanumero - Regionkommunnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 4
  },
  {
    attr: 'region',
    desc: 'Maakunta - Landskap',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 5
  },
  {
    attr: 'region_nro',
    desc: 'Maakuntanumero - Landskapsnummer',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 6
  },
  {
    attr: 'timestamp',
    desc: 'Aikaleima - Tidstämpel',
    type: 'date',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 7
  },
  {
    attr: 'updater_id',
    desc: 'Päivittäjätunnus - Uppdaterare identifikation',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 2,
    order: 8
  },
  {
    attr: 'special',
    desc: 'Erityisluokittelu - Specialklassificering',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 2,
    order: 9
  },



  {
    attr: 'shapeestim',
    desc: 'Kuntoarvio - Konditionsbedömning',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 1
  },
  {
    attr: 'sh_es_date',
    desc: 'Kuntoarvion päivämäärä - Konditionsbedömningens datum',
    type: 'date',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 2
  },
  {
    attr: 'upkeepclas',
    desc: 'Ylläpitoluokka - Underhållsklass',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 3,
    order: 3
  },
  {
    attr: 'publicinfo',
    desc: 'Yhteystiedot julkisia – Kontaktuppgifter offentliga',
    type: 'text',
    addedToForm: true,
    canBeUndefined: false,
    formError: false,
    tab: 3,
    order: 4
  },
  {
    attr: 'upkeeper',
    desc: 'Ylläpitäjän nimi - Upprätthållarens namn',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 5
  },
  {
    attr: 'upkeepinfo',
    desc: 'Ylläpitäjän yhteystieto - Upprätthållarens kontaktinformation',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 6
  },
  {
    attr: 'telephone',
    desc: 'Kohdetta koskeva yleinen puhelinnumero – En allmän telefonnummer som gäller objektet',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 7
  },
  {
    attr: 'email',
    desc: 'Kohdetta koskeva yleinen sähköposti – En allmän epost som gäller objektet',
    type: 'text',
    addedToForm: true,
    canBeUndefined: true,
    formError: false,
    tab: 3,
    order: 8
  }
];

export { lineConfig };
