const pointLayers = [
  {
    name_fi: 'Virkistyskohde',
    name_se: 'rekreationsobjekt',
    name_en: 'recreational attraction',
    selected: false,
    features: [
      {
        name_fi: 'Luonto- tai lintutorni',
        name_se: 'natur- eller fågeltorn',
        name_en: 'nature or bird watching tower',
        selected: false,
        description: 'Luonnon tai lintujen tarkkailuun tarkoitettu maanpinnan tasoa merkittävästi korkeampi torni',
        color: 'rgb(166, 206, 227)'
      },
      {
        name_fi: 'Kalastuspaikka',
        name_se: 'fiskeplats',
        name_en: 'fishing site',
        selected: false,
        description: 'Virkistyskalastusta varten osoitettu paikka',
        color: 'rgb(178, 223, 138)'
      },
      {
        name_fi: 'Rantautumispaikka',
        name_se: 'landstigningsplats',
        name_en: 'landing site',
        selected: false,
        description: 'Melonnan tai veneilyn rantautumispaikka',
        color: 'rgb(166, 206, 227)'
      },
      {
        name_fi: 'Veneenlaskupaikka',
        name_se: 'sjösättningsramp',
        name_en: 'slipway',
        selected: false,
        description: 'Veneenlaskupaikka, jossa mahdollisuus laskea tai nostaa pienvene trailerille',
        color: 'rgb(255, 255, 153)'
      },
      {
        name_fi: 'Opastuspiste',
        name_se: 'informationspunkt',
        name_en: 'information point',
        selected: false,
        description: 'Miehittämätön opastuspiste, jossa lisätietoa alueesta tai reitistä (mm. kartta tai opastaulu)',
        color: 'rgb(166, 206, 227)'
      },
      {
        name_fi: 'Opastuskeskus',
        name_se: 'naturrum',
        name_en: 'nature center or guidance building',
        selected: false,
        description: 'Laajempi alueen opastukseen tarkoitettu rakennus (miehitetty tai miehittämätön)',
        color: 'rgb(31, 120, 180)'
      },
      {
        name_fi: 'Yleisö-wc tai -puucee',
        name_se: 'offentlig toalett eller uthus',
        name_en: 'public lavatory or outhouse',
        selected: false,
        description: 'Retkeilijöiden käyttöön tarkoitettu julkinen käymälä',
        color: 'rgb(178, 223, 138)'
      },
      {
        name_fi: 'Levähdyspaikka',
        name_se: 'rastplats',
        name_en: 'hiking rest area',
        selected: false,
        description: 'Pienimuotoinen levähdyspaikka ilman tulipaikkaa, kuten pöytä-penkki',
        color: 'rgb(31, 120, 180)'
      },
      {
        name_fi: 'Tulipaikka',
        name_se: 'eldplats',
        name_en: 'campfire site',
        selected: false,
        description: 'Nuotiopaikka, jossa joko itse mukana tuotavat polttopuut tai puuhuolto',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Keittokatos- / ruoanlaittopaikka',
        name_se: 'takförsedd kokplats eller matlagningsplats',
        name_en: 'outdoor cooking shelter or open fire cookery place',
        selected: false,
        description: 'Normaalia nuotiopaikkaa varustellumpi keittokatos ',
        color: 'rgb(251, 154, 153)'
      },
      {
        name_fi: 'Vesipiste',
        name_se: 'vattenuttag',
        name_en: 'water supply',
        selected: false,
        description: 'Retkeilyn käyttöön tarkoitettu avoin vesipiste tai avoin kaivo, jonka vesi on juomakelpoista',
        color: 'rgb(251, 154, 153)'
      },
      {
        name_fi: 'Telttailupaikka',
        name_se: 'tältplats',
        name_en: 'tent area',
        selected: false,
        description: 'Telttailuun osoitettu paikka, jossa ei maksullisia palveluita',
        color: 'rgb(227, 26, 28)'
      },
      {
        name_fi: 'Yöpymislaavu tai -kota',
        name_se: 'övernattningsvindskydd eller -kåta',
        name_en: 'lean-to or lap pole tent for overnighting',
        selected: false,
        description: 'Laavu tai kota, jossa mahdollisuus yöpymiseen',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Päivälaavu tai -kota',
        name_se: 'dagsvindskydd eller -kåta',
        name_en: 'lean-to or lap pole tent for daytime use',
        selected: false,
        description: 'Laavu tai kota, jossa ei mahdollisuutta yöpymiseen',
        color: 'rgb(255, 127, 0)'
      },
      {
        name_fi: 'Tupa',
        name_se: 'stuga',
        name_en: 'cabin',
        selected: false,
        description: 'Taukotupa, päivätupa tai autiotupa. Avoin, ei varattava.',
        color: 'rgb(202, 178, 214)'
      },
      {
        name_fi: 'Retkeilyä palveleva parkkipaikka',
        name_se: 'parkeringsplats för vandring',
        name_en: 'parking lot for hikers',
        selected: false,
        description: 'Maastoon merkitty parkkipaikka',
        color: 'rgb(31, 120, 180)'
      },
      {
        name_fi: 'Virkistysreitin lähtöpiste',
        name_se: 'startpunkt för friluftsleden',
        name_en: 'starting point for a recreational route',
        selected: false,
        description: 'Vakiintunut tai ylläpitäjän ilmoittama virkistysreitin lähtöpiste',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Melontareitin lähtöpiste',
        name_se: 'startpunkt för paddlingsleden',
        name_en: 'starting point for a paddling route',
        selected: false,
        description: 'Vakiintunut tai ylläpitäjän ilmoittama melontareitin lähtöpiste',
        color: 'rgb(31, 120, 180)'
      },
      {
        name_fi: 'Retkiluistelureitin lähtöpiste',
        name_se: 'startpunkt för långfärdsskridskoled',
        name_en: 'starting point for a tour skating route',
        selected: false,
        description: 'Vakiintunut tai ylläpitäjän ilmoittama melontareitin lähtöpiste',
        color: 'rgb(166, 206, 227)'
      },
      {
        name_fi: 'Retkiladun lähtöpiste',
        name_se: 'startpunkt för långfärdsskidled',
        name_en: 'starting point for a trekking ski track',
        selected: false,
        description: 'Talvisin ylläpidettävän retkiladun lähtöpiste',
        color: 'rgb(178, 223, 138)'
      },
      {
        name_fi: 'Uimapaikka',
        name_se: 'badplats',
        name_en: 'unattended beach',
        selected: false,
        description: 'Yleinen uimapaikka, jossa ei valvontaa.',
        color: 'rgb(227, 26, 28)'
      },
      {
        name_fi: 'Uimaranta',
        name_se: 'badstrand',
        name_en: 'beach',
        selected: false,
        description: 'Yleinen uimapaikka, jossa aukioloaikana valvonta.',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Sauna',
        name_se: 'bastu',
        name_en: 'sauna',
        selected: false,
        description: 'Kunnan, yhdistyksen tms. ylläpitämäsauna (saattaa sisältää saunamaksun). Yleensä ei ennakkovarausta.',
        color: 'rgb(202, 178, 214)'
      },
      {
        name_fi: 'Talviuimapaikka',
        name_se: 'vinterbadplats',
        name_en: 'ice swimming place',
        selected: false,
        description: 'Talvella jäätilanteesta riippuen avovesi tai sulana pidetty avanto.',
        color: 'rgb(255, 127, 0)'
      },
      {
        name_fi: 'Luonnonmuistomerkki tai näköalapaikka',
        name_se: 'naturmonument eller utsiktspunkt',
        name_en: 'nature monument or vantage point',
        selected: false,
        description: 'Erityinen luonnon tai kulttuuriympäristöön liittyvä kohde tai näköalapaikka',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Suojasatama',
        name_se: 'skyddshamn',
        name_en: 'shelter harbour',
        selected: false,
        description: 'Satama, jota on mahdollista käyttää kun matkan jatkaminen ei ole enää turvallista.',
        color: 'rgb(178, 223, 138)'
      },
      {
        name_fi: 'Turvasatama',
        name_se: 'säkerhetshamn',
        name_en: 'refuge harbour',
        selected: false,
        description: 'Satama, josta voidaan hakea suojaa tai saada ensiapua tai korjausapua',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Retki- tai luonnonsatama',
        name_se: 'utfärds- eller naturhamn',
        name_en: 'excursion or natural harbour',
        selected: false,
        description: 'Pääosin rakentamaton, retkeilytoimintaa palveleva satama',
        color: 'rgb(251, 154, 153)'
      },
      {
        name_fi: 'Ankkuripaikka',
        name_se: 'ankarplats',
        name_en: 'place for anchoring',
        selected: false,
        description: 'Paikka ankkurointiin',
        color: 'rgb(227, 26, 28)'
      },
      {
        name_fi: 'Hätäsatama',
        name_se: 'nödhamn',
        name_en: 'emergency harbour',
        selected: false,
        description: 'Saa käyttää vain hätätapauksessa',
        color: 'rgb(254, 191, 111)'
      },
      {
        name_fi: 'Lähde tai kaivo',
        name_se: 'brunn eller källa',
        name_en: 'spring or well',
        selected: false,
        description: 'Juomaveden ottoon soveltuva vesipiste',
        color: 'rgb(255, 255, 153)'
      },
      {
        name_fi: 'Jätepiste',
        name_se: 'sopstation',
        name_en: 'carbage collecting point',
        selected: false,
        description: 'Jätteiden keräys- ja lajittelupiste',
        color: 'rgb(227, 26, 28)'
      },
      {
        name_fi: 'Polttopuusuoja',
        name_se: 'vedbod',
        name_en: 'wood shed',
        selected: false,
        description: '',
        color: 'grey'
      },
      {
        name_fi: 'Virkistykseen liittyvä erityiskohde',
        name_se: 'speciellt objekt för friluftsliv',
        name_en: 'special recreational attraction',
        selected: false,
        description: 'Erityinen virkistykseen liittyvä ja omalaatuinen kohde',
        color: 'grey'
      }
    ]
  },
  {
    name_fi: 'Matkailupalvelukohde',
    name_se: 'objekt för turismfunktioner',
    name_en: 'tourist attraction',
    selected: false,
    features: [
      {
        name_fi: 'Varaustupa',
        name_se: 'hyresstuga',
        name_en: 'rental cabin',
        selected: false,
        description: 'Maksullinen ja/tai etukäteen varattava tupa, joka soveltuu myös yöpymiseen',
        color: 'rgb(166, 206, 227)'
      },
      {
        name_fi: 'Varauslaavu tai -kota',
        name_se: 'hyresvindskydd eller -kåta',
        name_en: 'rental cabin lean-to or lap pole tent',
        selected: false,
        description: 'Maksullinen ja/tai etukäteen varattava laavu, jonka soveltuvuudesta yöpymiseen mainitaan lisätiedoissa',
        color: 'rgb(31, 120, 180)'
      },
      {
        name_fi: 'Majoituspalvelu',
        name_se: 'övernattningsservice',
        name_en: 'accomodation service',
        selected: false,
        description: 'Majoituspalvelu, esim. maatilamajoitus, hotelli, hostelli tai motelli',
        color: 'rgb(178, 223, 138)'
      },
      {
        name_fi: 'Leirikeskus',
        name_se: 'lägercenter',
        name_en: 'summer camp centre',
        selected: false,
        description: 'Erityisesti leiritoimintaa palveleva keskus',
        color: 'rgb(41, 160, 44)'
      },
      {
        name_fi: 'Ruokapalvelu',
        name_se: 'cateringservice',
        name_en: 'catering service',
        selected: false,
        description: 'Ruokapalvelua tarjoava toimija',
        color: 'rgb(251, 154, 153)'
      },
      {
        name_fi: 'Opaspalvelu',
        name_se: 'guidningsservice',
        name_en: 'guide service',
        selected: false,
        description: 'Opaspalveluita tarjoava toimija',
        color: 'rgb(227, 26, 28)'
      },
      {
        name_fi: 'Ohjelma- tai elämyspalvelu',
        name_se: 'program- eller upplevelseservice',
        name_en: 'programme or experience service',
        selected: false,
        description: 'Ohjelmapalveluita tarjoava toimija',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Tilavuokraus- tai kokouspalvelu',
        name_se: 'utrymmes- eller konferensservice',
        name_en: 'facility rental and conference service',
        selected: false,
        description: 'Kokoustiloja tarjoava toimija',
        color: 'rgb(255, 127, 0)'
      },
      {
        name_fi: 'Kulttuuripalvelu',
        name_se: 'kulturtjänst',
        name_en: 'cultural service',
        selected: false,
        description: 'Kulttuuripalveluita tarjoava toimija',
        color: 'rgb(202, 178, 214)'
      },
      {
        name_fi: 'Muu virkistystä tukeva palvelu',
        name_se: 'övrig tjänst som stödjer friluftsliv',
        name_en: 'service supporting recreational activities',
        selected: false,
        description: 'Muu virkistykseen liittyviä palveluita tarjoava toimija, esim. retkeilykarttoja myyvä toimija.',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Paikallinen erikoispalvelu',
        name_se: 'lokal specialtjänst',
        name_en: 'local special service',
        selected: false,
        description: 'Virkistystä tai matkailua tukeva alueelle tunnusmerkillinen erityispalvelu',
        color: 'rgb(255, 127, 0)'
      },
      {
        name_fi: 'Välinevuokrauspalvelu',
        name_se: 'uthyrningstjänst för utrustning',
        name_en: 'equipment rental',
        selected: false,
        description: 'Retkeilyyn liittyvien välineiden vuokrauspalvelu, esim. kanootti-, maastopyörä-, lumikenkä-, suksipalvelu',
        color: 'rgb(255, 255, 153)'
      },
      {
        name_fi: 'Kuljetuspalvelu',
        name_se: 'transportservice',
        name_en: 'transport service',
        selected: false,
        description: 'Tilausajoneuvotoimija, esim. taksi, taksivene, tilausajoyritys',
        color: 'rgb(177, 89, 40)'
      },
      {
        name_fi: 'Vierassatama',
        name_se: 'gästhamn',
        name_en: 'guest harbour',
        selected: false,
        description: 'Monipuolinen ja korkeatasoinen matkaveneilyä palveleva satama, jossa on vähintään 10 vierasvenepaikkaa. Varustuksena ainakin elintarvikkeiden myyntipiste, venepolttoainejakelu, juomavesihuolto, käymälä, peseytymismahdollisuus ja talousjätehuolto.',
        color: 'rgb(253, 191, 111)'
      },
      {
        name_fi: 'Vieraslaituri',
        name_se: 'gästbrygga',
        name_en: 'visitors berth',
        selected: false,
        description: 'Vierasveneille varattu laituri tai laiturin osa. Voidaan käyttää sataman luonteen mukaan.',
        color: 'rgb(255, 127, 0)'
      },
      {
        name_fi: 'Palvelusatama',
        name_se: 'servicehamn',
        name_en: 'service harbour',
        selected: false,
        description: 'Pääasiassa polttoaine-, elintarvike- ja vesitäydennyksiin tarkoitettu satama. Satamassa voi olla myös vieraspaikkoja yöpymiseen.',
        color: 'rgb(202, 178, 214)'
      },
      {
        name_fi: 'Käyntisatama',
        name_se: 'besökshamn',
        name_en: 'cruising harbour',
        selected: false,
        description: 'Satama, jossa voi veneretken aikana käydä kaupassa, asioimassa, lepäämässä tai veneen huollossa.',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Yhteysaluslaituri',
        name_se: 'förbindelsebåtsbrygga',
        name_en: 'ferry harbour',
        selected: false,
        description: 'Yhteysaluslaituri yhteysalusliikennettä varten. Mikäli on ilmoitettu, niin laituria voidaan käyttää lyhytaikaiseen kiinnittymiseen, jos ei häiritä yhteysalusliikennettä.',
        color: 'rgb(177, 89, 40)'
      },
      {
        name_fi: 'Kalastuslupien myyntipiste',
        name_se: 'försäljning av fiskekort',
        name_en: 'shop for fishing licenses',
        selected: false,
        description: 'Paikallisia kalastuslupia myyvä toimija',
        color: 'rgb(51, 160, 44)'
      },
      {
        name_fi: 'Ulkoilu- tai hiihtomaja',
        name_se: 'frilufts- eller skidstuga',
        name_en: 'outdoor of ski cabin',
        selected: false,
        description: 'Hiihtäjiä tai retkeilijöitä palveleva maja, jossa maksullisia palveluita',
        color: 'rgb(106, 61, 154)'
      },
      {
        name_fi: 'Varaussauna',
        name_se: 'hyresbastu',
        name_en: 'rental sauna',
        selected: false,
        description: 'Ennalta varattava, yksityisen toimijan ylläpitämä sauna',
        color: 'rgb(106, 61, 154)'
      }
    ]
  }
];

export { pointLayers };
