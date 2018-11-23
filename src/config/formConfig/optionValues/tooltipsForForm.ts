const tooltipsForForm = {
  name_fi: {
    'point': [
      'Kirjoita kohteen suomenkielinen nimi. Jos kohteella on nimi vain ruotsiksi, voit kirjoittaa sen tähän.',
      'Skriv objektets finska namn. Om objektet har ett namn endast på svenska, kan du skriva det här.'
    ],
    'line': [
      'Kirjoita reitin suomenkielinen nimi. Jos reitillä on nimi vain ruotsiksi, voit kirjoittaa sen tähän.',
      'Skriv rutt finska namn. Om rutt har ett namn endast på svenska, kan du skriva det här.'
    ],
    'polygon': [
      'Kirjoita alueen suomenkielinen nimi. Jos alueella on nimi vain ruotsiksi, voit kirjoittaa sen tähän.',
      'Skriv områdets finska namn. Om områdets har ett namn endast på svenska, kan du skriva det här.'
    ]
  },
  address: {
    'point': [
      'Kirjoita kohteen katuosoite. Mikäli kohteella ei ole osoitetta, valitse "Ei osoitetta".',
      'Skriv adressen. Om ingen adress finns, välj: "Ei osoitetta."'
    ],
    'line': null,
    'polygon': [
      'Kirjoita alueen katuosoite. Mikäli alueella ei ole osoitetta, valitse "Ei osoitetta".',
      'Skriv adressen. Om ingen adress finns, välj: "Ei osoitetta."'
    ]
  },
  info_fi: {
    'point': [
      'Vapaamuotoinen yleiskuvaus. Maksimimerkkimäärä 254. Esimerkki ohjeessa.',
      'Allmän beskrivning i fri form. Max. 254 tecken. Beskrivningsexempel i anvisningen.'
    ],
    'line': [
      'Vapaamuotoinen yleiskuvaus. Maksimimerkkimäärä 254. Esimerkki ohjeessa.',
      'Allmän beskrivning i fri form. Max. 254 tecken. Beskrivningsexempel i anvisningen.'
    ],
    'polygon': [
      'Vapaamuotoinen yleiskuvaus. Maksimimerkkimäärä 254. Esimerkki ohjeessa.',
      'Allmän beskrivning i fri form. Max. 254 tecken. Beskrivningsexempel i anvisningen.'
    ]
  },
  www_fi: {
    'point': [
      'Syötä kohteen verkkosivu (http://www.osoite.fi)',
      'Ifall objektet har en finskspråkig webbplats, rekommenderar vi att den används för databasens enhetlighet. I annat fall kan du mata in den svenskspråkiga webbsajten.'
    ],
    'line': [
      'Syötä reitin verkkosivu (http://www.osoite.fi).',
      'Ifall rutten har en finskspråkig webbplats, rekommenderar vi att den används för databasens enhetlighet. I annat fall kan du mata in den svenskspråkiga webbsajten.'
    ],
    'polygon': [
      'Syötä alueen verkkosivu (http://www.osoite.fi).',
      'Ifall området har en finskspråkig webbplats, rekommenderar vi att den används för databasens enhetlighet. I annat fall kan du mata in den svenskspråkiga webbsajten.'
    ]
  },
  chall_clas: {
    'point': [
      'Kerro riittävät tiedot, jotta kävijä osaa varustautua kohteella vierailuun. Mikäli kohteella on valmis luokitus, mainitse käytetty luokitusjärjestelmä. Esimerkki kuvausohjeessa.',
      'Ge tillräcklig information, så att besökaren kan utrusta sig för att färdas i terrängen. Ifall rutten har en färdig klassificering, ange det använda klassificeringssystemet. Exempel i beskrivningsanvisningen.'
    ],
    'line': [
      'Kerro riittävät tiedot, jotta kävijä osaa varustautua reitillä vierailuun. Mikäli reitillä on valmis luokitus, mainitse käytetty luokitusjärjestelmä. Esimerkki kuvausohjeessa.',
      'Ge tillräcklig information, så att besökaren kan utrusta sig för att färdas i terrängen. Ifall rutten har en färdig klassificering, ange det använda klassificeringssystemet. Exempel i beskrivningsanvisningen.'
    ],
    'polygon': null
  },
  length_m: {
    'point': null,
    'line': [
      'Reitin pituus metreinä maastossa.',
      'Ruttens längd i meter i terrängen'
    ],
    'polygon': null
  },
  accessibil: {
    'point': [
      'Kuvaus kohteen esteettömyydestä. Esimerkiksi ”Inva-WC”. Lisätietoa ohjeessa.',
      'Beskrivning av hur hinderfritt objektet är. Exempelvis ”Inva-WC”. Mer information i anvisningen.'
    ],
    'line': [
      'Kuvaus kohteen esteettömyydestä. Esimerkiksi ”Inva-WC”. Lisätietoa ohjeessa.',
      'Beskrivning av hur hinderfritt objektet är. Exempelvis ”Inva-WC”. Mer information i anvisningen.'
    ],
    'polygon': [
      'Kuvaus kohteen esteettömyydestä. Esimerkiksi ”Inva-WC”. Lisätietoa ohjeessa.',
      'Beskrivning av hur hinderfritt objektet är. Exempelvis ”Inva-WC”. Mer information i anvisningen.'
    ]
  },
  equipment: {
    'point': [
      'Lyhyt luettelo kohteen varustelusta. Esimerkki kuvausohjeessa.',
      'Kort förteckning över objektets utrustning. Exempel i beskrivningsanvisningen.'
    ],
    'line': null,
    'polygon': [
      'Lyhyt luettelo kohteen varustelusta. Esimerkki kuvausohjeessa.',
      'Kort förteckning över objektets utrustning. Exempel i beskrivningsanvisningen.'
    ]
  },
  telephone: {
    'point': [
      'Puhelinnumero ei saa olla yksityisen henkilön käytössä, koska tämä tieto julkaistaan avoimena datana. Käytä muotoa +358501231234',
      'Telefonnumret får inte vara i en privatpersons användning, eftersom denna uppgift publiceras som fria data. Ange telefonnumret i formen +358501231234'
    ],
    'line': [
      'Puhelinnumero ei saa olla yksityisen henkilön käytössä, koska tämä tieto julkaistaan avoimena datana. Käytä muotoa +358501231234',
      'Telefonnumret får inte vara i en privatpersons användning, eftersom denna uppgift publiceras som fria data. Ange telefonnumret i formen +358501231234'
    ],
    'polygon': [
      'Puhelinnumero ei saa olla yksityisen henkilön käytössä, koska tämä tieto julkaistaan avoimena datana. Käytä muotoa +358501231234',
      'Telefonnumret får inte vara i en privatpersons användning, eftersom denna uppgift publiceras som fria data. Ange telefonnumret i formen +358501231234'
    ]
  },
  email: {
    'point': [
      'Sähköposti ei saa olla yksityisen henkilön osoite, koska tämä tieto julkaistaan avoimena datana.',
      'E-posten får inte vara en privatpersons adress, eftersom denna uppgift publiceras som fria data.'
    ],
    'line': [
      'Sähköposti ei saa olla yksityisen henkilön osoite, koska tämä tieto julkaistaan avoimena datana.',
      'E-posten får inte vara en privatpersons adress, eftersom denna uppgift publiceras som fria data.'
    ],
    'polygon': [
      'Sähköposti ei saa olla yksityisen henkilön osoite, koska tämä tieto julkaistaan avoimena datana.',
      'E-posten får inte vara en privatpersons adress, eftersom denna uppgift publiceras som fria data.'
    ]
  },
  ownerclass: {
    'point': [
      `Omistajaluokka kertoo kohteen maapohjan omistajatahon/ -tahot. Kohteen maapohjan vuokrannut taho ei ole omistaja. Omistajaluokkatieto voidaan julkaista avoimena tietona,
      sillä se ei loukkaa maanomistajan yksityisyydensuojaa. Omistajaluokaksi voi valita yhden tai useamman listan vaihtoehtoisista luokista.`,
      'Ägarklassen anger ägaren/ägarna av markgrunden. Den som hyrt  markgrunden är inte en ägare. Ägarklassinformation kan publiceras som fri information, för den kränker ej markägarens integritetsskydd. Som ägarklass kan väljas en eller flera alternativa klasser på listan.'
    ],
    'line': [
      `Omistajaluokka kertoo reitin maapohjan omistajatahon/ -tahot. Kohteen maapohjan vuokrannut taho ei ole omistaja. Omistajaluokkatieto voidaan julkaista avoimena tietona,
      sillä se ei loukkaa maanomistajan yksityisyydensuojaa. Omistajaluokaksi voi valita yhden tai useamman listan vaihtoehtoisista luokista.`,
      'Ägarklassen anger ägaren/ägarna av markgrunden. Den som hyrt  markgrunden är inte en ägare. Ägarklassinformation kan publiceras som fri information, för den kränker ej markägarens integritetsskydd. Som ägarklass kan väljas en eller flera alternativa klasser på listan.'
    ],
    'polygon': [
      `Omistajaluokka kertoo alueen maapohjan omistajatahon/ -tahot. Kohteen maapohjan vuokrannut taho ei ole omistaja. Omistajaluokkatieto voidaan julkaista avoimena tietona,
      sillä se ei loukkaa maanomistajan yksityisyydensuojaa. Omistajaluokaksi voi valita yhden tai useamman listan vaihtoehtoisista luokista.`,
      'Ägarklassen anger ägaren/ägarna av markgrunden. Den som hyrt  markgrunden är inte en ägare. Ägarklassinformation kan publiceras som fri information, för den kränker ej markägarens integritetsskydd. Som ägarklass kan väljas en eller flera alternativa klasser på listan.'
    ]
  },
  owner: {
    'point': [
      'Täytetään kohteen maapohjan omistavan tahon/tahojen nimi. Omistajan nimeä ei julkaista avoimena eikä julkisena tietona, vaan se näkyy ainoastaan kyseisen kohteen tietojen ylläpitäjälle ja Virma-palvelun pääkäyttäjälle.',
      'Fyll i namnet på ägaren/ägarna av objektets markgrund. Ägarens namn publiceras ej som fri eller offentlig information, utan  den syns endast för upprätthållaren av det aktuella objektet eller för huvudanvändaren av tjänsten Virma.'
    ],
    'line': [
      'Täytetään reitin maapohjan omistavan tahon/tahojen nimi. Omistajan nimeä ei julkaista avoimena eikä julkisena tietona, vaan se näkyy ainoastaan kyseisen kohteen tietojen ylläpitäjälle ja Virma-palvelun pääkäyttäjälle.',
      'Fyll i namnet på ägaren/ägarna av rutt markgrund. Ägarens namn publiceras ej som fri eller offentlig information, utan  den syns endast för upprätthållaren av det aktuella objektet eller för huvudanvändaren av tjänsten Virma.'
    ],
    'polygon': [
      'Täytetään alueen maapohjan omistavan tahon/tahojen nimi. Omistajan nimeä ei julkaista avoimena eikä julkisena tietona, vaan se näkyy ainoastaan kyseisen kohteen tietojen ylläpitäjälle ja Virma-palvelun pääkäyttäjälle.',
      'Fyll i namnet på ägaren/ägarna av områdets markgrund. Ägarens namn publiceras ej som fri eller offentlig information, utan  den syns endast för upprätthållaren av det aktuella objektet eller för huvudanvändaren av tjänsten Virma.'
    ]
  },
  upkeepclas: {
    'point': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista.',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ],
    'line': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista.',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ],
    'polygon': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista.',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ]
  },
  upkeeper: {
    'point': [
      `Henkilö tai muu toimija, joka huolehtii kohteen käytännön huollosta maastossa tai vastaa ylläpidosta tilaamalla käytännön huollon toiselta osapuolelta.  Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana. `,
      'Den som ser till underhållet i praktiken i terrängen eller som ansvarar för att underhåll beställs. Upprätthållarens namn blir synligt i Lounaistietos karttjänst, ifall ovan lämnats tillstånd för kontaktinformationens offentlighet. Personuppgifter publiceras ej som fria data.'
    ],
    'line': [
      'Henkilö tai muu toimija, joka huolehtii reitin käytännön huollosta maastossa tai vastaa ylläpidosta tilaamalla käytännön huollon toiselta osapuolelta. Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana.',
      'Den som ser till underhållet i praktiken i terrängen eller som ansvarar för att underhåll beställs. Upprätthållarens namn blir synligt i Lounaistietos karttjänst, ifall ovan lämnats tillstånd för kontaktinformationens offentlighet. Personuppgifter publiceras ej som fria data.'
    ],
    'polygon': [
      'Henkilö tai muu toimija, joka huolehtii alueen käytännön huollosta maastossa tai vastaa ylläpidosta tilaamalla käytännön huollon toiselta osapuolelta. Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana.',
      'Den som ser till underhållet i praktiken i terrängen eller som ansvarar för att underhåll beställs. Upprätthållarens namn blir synligt i Lounaistietos karttjänst, ifall ovan lämnats tillstånd för kontaktinformationens offentlighet. Personuppgifter publiceras ej som fria data.'
    ]
  },
  upkeepinfo: {
    'point': [
      'Ylläpitäjän postiosoite, puhelinnumero tai sähköpostiosoite, mikäli se on tiedossa. Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana. Jos osoitetta ei tunneta, kirjoita "Ei tietoa".',
      'Upprätthållarens postadress, ifall den är tillgänglig. Upprätthållarens kontaktinformation syns i Lounaistietos karttjänst, ifall "Kontaktuppgifter offentliga" är vald. Personuppgifter publiceras ej som fria data. Ifall adressen för objektets upprätthållare är obekant, skriv "Ei tietoa"'
    ],
    'line': [
      'Ylläpitäjän postiosoite, puhelinnumero tai sähköpostiosoite, mikäli se on tiedossa. Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana. Jos osoitetta ei tunneta, kirjoita "Ei tietoa".',
      'Upprätthållarens postadress, ifall den är tillgänglig. Upprätthållarens kontaktinformation syns i Lounaistietos karttjänst, ifall "Kontaktuppgifter offentliga" är vald. Personuppgifter publiceras ej som fria data. Ifall adressen för objektets upprätthållare är obekant, skriv "Ei tietoa"'
    ],
    'polygon': [
      'Ylläpitäjän postiosoite, puhelinnumero tai sähköpostiosoite, mikäli se on tiedossa. Ylläpitäjän nimi tulee näkyviin Lounaistiedon karttapalvelussa, mikäli yhteystietojen julkisuudelle on yllä annettu lupa. Henkilötietoja ei julkaista avoimena datana. Jos osoitetta ei tunneta, kirjoita "Ei tietoa".',
      'Upprätthållarens postadress, ifall den är tillgänglig. Upprätthållarens kontaktinformation syns i Lounaistietos karttjänst, ifall "Kontaktuppgifter offentliga" är vald. Personuppgifter publiceras ej som fria data. Ifall adressen för objektets upprätthållare är obekant, skriv "Ei tietoa"'
    ]
  },
  shapeestim: {
    'point': [
      'Opasteiden ja rakenteiden kunto, maapohjan kuluneisuus. Esimerkki kuvausohjeessa.',
      'Vägvisarnas och konstruktionernas kondition, slitaget hos markgrunden. Exempel i beskrivningsanvisningen.'
    ],
    'line': [
      'Opasteiden ja rakenteiden kunto, maapohjan kuluneisuus. Esimerkki kuvausohjeessa.',
      'Vägvisarnas och konstruktionernas kondition, slitaget hos markgrunden. Exempel i beskrivningsanvisningen.'
    ],
    'polygon': [
      'Opasteiden ja rakenteiden kunto, maapohjan kuluneisuus. Esimerkki kuvausohjeessa.',
      'Vägvisarnas och konstruktionernas kondition, slitaget hos markgrunden. Exempel i beskrivningsanvisningen.'
    ]
  },
  sh_es_date: {
    'point': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista."',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ],
    'line': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista."',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ],
    'polygon': [
      'Viimeisimmän kuntoa-arvioivan maastotarkastuksen päivämäärä, jos tehty. Valitse oikea päivä avautuvasta kalenterista.',
      'Datum för senaste terränginspektion, om sådan gjorts. Välj rätt dag i kalendern som öppnas.'
    ]
  },
  special: {
    'point': [
      'Tätä saraketta käytetään tietojen erikseen määriteltyyn luokitteluun. Pääsääntöisesti kenttä jää tyhjäksi, mutta jos tarvitset aineistollesi erityistä luokittelua, sovi siitä Virma-palvelun pääkäyttäjän kanssa.',
      'Den här kolumnen används för klassificering av särskilt specificerad information. I regel blir fältet tomt, men om du behöver särskild klassificeringför ditt material, avtala om det med huvudanvändaren av tjänsten Virma.'
    ],
    'line': [
      'Tätä saraketta käytetään tietojen erikseen määriteltyyn luokitteluun. Pääsääntöisesti kenttä jää tyhjäksi, mutta jos tarvitset aineistollesi erityistä luokittelua, sovi siitä Virma-palvelun pääkäyttäjän kanssa.',
      'Den här kolumnen används för klassificering av särskilt specificerad information. I regel blir fältet tomt, men om du behöver särskild klassificeringför ditt material, avtala om det med huvudanvändaren av tjänsten Virma.'
    ],
    'polygon': [
      'Tätä saraketta käytetään tietojen erikseen määriteltyyn luokitteluun. Pääsääntöisesti kenttä jää tyhjäksi, mutta jos tarvitset aineistollesi erityistä luokittelua, sovi siitä Virma-palvelun pääkäyttäjän kanssa.',
      'Den här kolumnen används för klassificering av särskilt specificerad information. I regel blir fältet tomt, men om du behöver särskild klassificeringför ditt material, avtala om det med huvudanvändaren av tjänsten Virma.'
    ]
  },
  no_address: {
    'point': [
      'Määritä, onko osoitekenttä julkinen tieto vai ei.',
      'Ange om adressfältet är offentligt eller inte.'
    ],
    'line': [
      'Määritä, onko osoitekenttä julkinen tieto vai ei.',
      'Ange om adressfältet är offentligt eller inte.'
    ],
    'polygon': [
      'Määritä, onko osoitekenttä julkinen tieto vai ei.',
      'Ange om adressfältet är offentligt eller inte.'
    ]
  },
  publicinfo: {
    'point': [
      'Vakuutan että ylläpitäjän yhteystietojen julkaisemiselle Lounaistiedon karttapalveluissa on ylläpitäjän suostumus. Henkilötietoja ei julkaista avoimena datana. Tämä valinta koskee kenttiä "Ylläpitäjän nimi" ja "Ylläpitäjän yhteystieto".',
      'Jag försäkrar att upprätthållarens samtycke finns för att publicera upprätthållarens kontaktinformation i Lounaistietos karttjänst. Personuppgifter publiceras inte som fria data. Detta val gäller fältet "Upprätthållarens namn" och "Upprätthållarens kontaktinformation".'
    ],
    'line': [
      'Vakuutan että ylläpitäjän yhteystietojen julkaisemiselle Lounaistiedon karttapalveluissa on ylläpitäjän suostumus. Henkilötietoja ei julkaista avoimena datana. Tämä valinta koskee kenttiä "Ylläpitäjän nimi" ja "Ylläpitäjän yhteystieto".',
      'Jag försäkrar att upprätthållarens samtycke finns för att publicera upprätthållarens kontaktinformation i Lounaistietos karttjänst. Personuppgifter publiceras inte som fria data. Detta val gäller fältet "Upprätthållarens namn" och "Upprätthållarens kontaktinformation".'
    ],
    'polygon': [
      'Vakuutan että ylläpitäjän yhteystietojen julkaisemiselle Lounaistiedon karttapalveluissa on ylläpitäjän suostumus. Henkilötietoja ei julkaista avoimena datana. Tämä valinta koskee kenttiä "Ylläpitäjän nimi" ja "Ylläpitäjän yhteystieto".',
      'Jag försäkrar att upprätthållarens samtycke finns för att publicera upprätthållarens kontaktinformation i Lounaistietos karttjänst. Personuppgifter publiceras inte som fria data. Detta val gäller fältet "Upprätthållarens namn" och "Upprätthållarens kontaktinformation".'
    ]
  },
  updater_id: {
    'point': [
      'Päivittäjätunnusten vaihdon tekee pääkäyttäjä – ota yhteyttä: virma@lounaistieto.fi',
      'Om ni vill ändra uppdateraren var vänlig och kontakta Virma administratör: virma@lounaistieto.fi.'
    ],
    'line': [
      'Päivittäjätunnusten vaihdon tekee pääkäyttäjä – ota yhteyttä: virma@lounaistieto.fi',
      'Om ni vill ändra uppdateraren var vänlig och kontakta Virma administratör: virma@lounaistieto.fi.'
    ],
    'polygon': [
      'Päivittäjätunnusten vaihdon tekee pääkäyttäjä – ota yhteyttä: virma@lounaistieto.fi',
      'Om ni vill ändra uppdateraren var vänlig och kontakta Virma administratör: virma@lounaistieto.fi.'
    ]
  },


  nameInfo: [
    '',
    ''
  ],
  usernameInfo: [
    'Ei ääkkösiä, eikä välilyöntejä. Max 15 merkkiä.',
    'Ej å,ä,ö, inga mellanslag. Max. 15 tecken.'
  ],
  emailInfo: [
    'Sähköpostiosoite tulee olla käyttäjäkohtaisesti yksilöllinen ja sen tulee olla hyväksytyssä muodossa esim. "sähko@posti.fi"',
  ],
  organizationInfo: [
    'Valitse organisaatio listasta. Voit lisätä vapaasti määriteltävän organisaation valisemalla "Muu organisaatio".',
  ],
  new_organizationInfo: [
    'Kirjoita haluamasi organisaatio nimi.',
  ],
  forgotEmailInfo: [
    'Anna sähköpostiosoite, johon salasanan palautuslinkki lähetetään.',
  ],
};

export { tooltipsForForm };
