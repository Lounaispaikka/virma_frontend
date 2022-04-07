const lineLayers = [
  {
    name_fi: 'Virkistysreitti',
    name_se: 'rekreationsrutt',
    name_en: 'recreational route',
    selected: false,
    features: [
      {
        name_fi: 'Retkeilyreitti',
        name_se: 'vandringsrutt',
        name_en: 'hiking route',
        selected: false,
        description: 'Maastossa oleva merkitty ja retkeilyyn tarkoitettu reitti, jonka varrella on retkeilyä tukevia palveluita, kuten tuli- ja taukopaikkoja. Ei valaistu.',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Luontopolku',
        name_se: 'naturstig',
        name_en: 'nature trail',
        selected: false,
        description: 'Retkeilyreittiä lyhyempi, erityisesti luonto-opetukseen tai paikalliseen luonnonhistoriaan liittyvä virkistysreitti. Yleensä maastoon merkityt opas taulut. Opasteet voivat olla myös mobiililaitteilla luettavia. Pääsääntöisesti ei valaistu.',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Kulttuuriulkoilureitti',
        name_se: 'kulturfriluftsrutt',
        name_en: 'cultural outdoor route',
        selected: false,
        description: 'Reitti, joka nojaa vahvasti kulttuuriympäristön kohteisiin.',
        color: 'rgb(156, 99, 14)'
      },
      {
        name_fi: 'Hevosreitti',
        name_se: 'ridningsrutt',
        name_en: 'horse route',
        selected: false,
        description: 'Reitti, joka on suunnattu myös maastoratsastuskäyttöön',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Maastopyöräilyreitti',
        name_se: 'terrängcycklingsrutt',
        name_en: 'mountain biking route',
        selected: false,
        description: 'Reitti, joka on osoitettu myös maastopyöräilykäyttöön',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Melontareitti',
        name_se: 'paddlingsrutt',
        name_en: 'paddling route',
        selected: false,
        description: 'Melontaan tarkoitettu reitti.',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Kuntoreitti',
        name_se: 'motionsbana',
        name_en: 'jogging track',
        selected: false,
        description: 'Pääasiallisesti liikuntateemaan kuuluva reitti, jolla saattaa olla myös retkeilyllistä merkistystä osana kokonaisuutta. Ratkaistaan myöhemmin.',
        color: 'rgb(71, 160, 104)'
      },
      {
        name_fi: 'Suunniteltu retkeilyreitti',
        name_se: 'planerad vandringsrutt',
        name_en: 'planned hiking route',
        selected: false,
        description: 'Kaavoituksessa esitetty suunniteltu retkeilyreitti, voi olla osittain toteutunut.',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Latu',
        name_se: 'vandringsskidspår',
        name_en: 'trekking ski track',
        selected: false,
        description: 'Talvella ylläpidettävä retkihiihtoon suunnattu latu. Lisätiedoissa kerrotaan vaihteleeko latu-ura, vai onko ura sama vuodesta toiseen.',
        color: 'rgb(253, 150, 11)'
      },
      {
        name_fi: 'Matkailureitti',
        name_se: 'turistrutt',
        name_en: 'tourist route',
        selected: false,
        description: 'Laajempi matkailureitti, jolla on laajempaa matkailullista merkitystä.',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Pyöräilyreitti',
        name_se: 'cyklingsrutt',
        name_en: 'biking route',
        selected: false,
        description: 'Matkailuun ja retkeilyyn liittyvä pyöräilyreitti. Pyöräreitit eivät ole varsinaisesti Virkistä dataa! -hankkeen kerättäviä reittejä.',
        color: 'rgb(53, 91, 111)'
      }
    ]
  }
];

export { lineLayers };
