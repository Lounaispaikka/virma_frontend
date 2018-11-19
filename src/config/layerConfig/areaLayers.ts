const areaLayers = [
  {
    name_fi: 'Virkistysalue',
    name_se: 'rekreationsområde',
    name_en: 'recreational area',
    selected: false,
    features: [
      {
        name_fi: 'Retkeilyalue',
        name_se: 'vandringsområde',
        name_en: 'hiking area',
        selected: false,
        description: 'Taajama-alueen ulkopuolella oleva retkeilyyn tarkoitettu alue',
        color: 'rgb(53, 91, 111)'
      },
      {
        name_fi: 'Kansallispuisto',
        name_se: 'nationalpark',
        name_en: 'national park',
        selected: false,
        description: 'Kansallispuistolakiin perustuva valtion omistama virkistysalue',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Virkistyskäyttöön soveltuva luonnonsuojelualue',
        name_se: 'naturskyddsområde lämpligt för friluftsbruk ',
        name_en: 'protected areas suitable for recreational use',
        selected: false,
        description: 'Alue, jonka suojelustatus mahdollistaa virkistyskäytön suojelun vaarantumatta (esim. Natura 2000 -alue)',
        color: 'rgb(253, 150, 11)'
      },
      {
        name_fi: 'Ulkoilualue',
        name_se: 'friluftsområde',
        name_en: 'area for outdoor activities',
        selected: false,
        description: 'Taajama-alueella tai sen reunoilla oleva laajempi virkistysalue, jolla voi harjoittaa monimuotoista virkistäytymistä',
        color: 'rgb(71, 160, 104)'
      },
      {
        name_fi: 'Kaavan virkistysalue',
        name_se: 'rekreationsområde i markanvändingsplanen',
        name_en: 'recreational area in land use plan',
        selected: false,
        description: 'Maakuntakaavan, yleiskaavan tai asemakaavan mukainen virkistysalue',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Virkistysmetsä',
        name_se: 'rekreationsskog',
        name_en: 'recreational forest',
        selected: false,
        description: 'Metsähallituksen päätöksen mukainen virkistysmetsä, jolla voidaan harjoittaa metsätaloudellisia toimenpiteitä',
        color: 'rgb(156, 99, 14)'
      }
    ]
  },
  {
    name_fi: 'Matkailupalvelualue',
    name_se: 'område för turismfunktioner',
    name_en: 'tourist service area',
    selected: false,
    features: [
      {
        name_fi: 'Lomakeskus',
        name_se: 'fritidscenter',
        name_en: 'holiday resort',
        selected: false,
        description: 'Lomakeskus, jolla on majoitusta laajempaa toimintaa ja mahdollisesti omaa virkistykseen liittyvää reitistöä.',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Kaavan retkeily- tai matkailualue',
        name_se: 'område för friluftsliv och turismfunktioner i markanvändingsplan',
        name_en: 'hiking or tourism area in land use plan',
        selected: false,
        description: 'Maakuntakaavan, yleiskaavan tai asemakaavan mukainen retkeily- tai matkailutoimintojen alue',
        color: 'rgb(156, 99, 14)'
      },
      {
        name_fi: 'Leirintä- tai caravanalue',
        name_se: 'camping- eller caravanområde',
        name_en: 'camping or caravan area',
        selected: false,
        description: 'Leirintä- ja asuntovaunualueet. Lisätietoihin merkintä siitä, ovatko alueet avoimia kaikille retkeilijöille vai ovatko ne tarkoitettu suljetulle ryhmälle mm. caravan-yhdistyksille',
        color: 'rgb(253, 150, 11)'
      },
      {
        name_fi: 'Muu matkailualue',
        name_se: 'övrigt område för turism',
        name_en: 'other tourism area',
        selected: false,
        description: 'Jokin muu matkailuun- tai retkeilyyn liittyvä alue',
        color: 'rgb(53, 91, 111)'
      }
    ]
  }
];

export { areaLayers };
