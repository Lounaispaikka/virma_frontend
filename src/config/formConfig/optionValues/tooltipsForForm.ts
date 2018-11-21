const tooltipsForForm = {
  name_fi: [
    'Kirjoita kohteen suomenkielinen nimi. Jos kohteella on nimi vain ruotsiksi, voit kirjoittaa sen tähän.',
    'Skriv objektets finska namn. Om objektet har ett namn endast på svenska, kan du skriva det här.'
  ],
  address: [
    'Kirjoita osoite. Mikäli osoitetta ei ole, valitse "osoitteeton".',
    'Skriv adressen, Om ingen adress finns, välj Utan adress.'
  ],
  info_fi: [
    'Vapaamuotoinen, laaja yleiskuvaus kohteesta. Esimerkkikuvaus ohjeessa.',
    'Vid, allmän beskrivning i fri form av objektet. Beskrivningsexempel i anvisningen. Frivilligt fält.'
  ],
  www_fi: [
    'Verkkosivu, josta löytyy lisätietoa kohteesta.',
    'Svenskspråkig webbplats med mer information om objektet. Frivilligt fält.'
  ],
  chall_clas: [
    'Kerro riittävät tiedot, jotta kävijä osaa varustautua kohteella vierailuun. Mikäli kohteella on valmis luokitus, mainitse käytetty luokitusjärjestelmä. Esimerkki kuvausohjeessa.',
    'Ge tillräcklig information, så att besökaren kan utrusta sig för att färdas i terrängen. Ifall rutten har en färdig klassificering, ange det använda klassificeringssystemet. Exempel i beskrivningsanvisningen.'
  ],
  length_m: [
    'Reitin pituus metreinä maastossa.',
    'Frivilligt fält'
  ],
  accessibil: [
    'Kuvaus kohteen esteettömyydestä. Esimerkiksi ”Inva-WC”. Lisätietoa ohjeessa.',
    'Beskrivning av hur hinderfritt objektet är. Exempelvis ”Inva-WC”. Mer information i anvisningen.'
  ],
  equipment: [
    'Lyhyt luettelo kohteen varustelusta. Esimerkki kuvausohjeessa.',
    'Kort förteckning över objektets utrustning. Exempel i beskrivningsanvisningen.'
  ],
  telephone: [
    'Käytä muotoa +358401234567',
    'Bruka formen +358401234567'
  ],
  email: [
    'Käytä muotoa etunimi.sukunimi@domain.fi',
    'Bruka formen förnamn.tillnamn@domain.fi'
  ],
  ownerclass: [
    `Omistajaluokka kertoo kohteen maapohjan omistajatahon/ -tahot. Kohteen maapohjan vuokrannut taho ei ole omistaja. Omistajaluokkatieto voidaan julkaista avoimena tietona,
    sillä se ei loukkaa maanomistajan yksityisyydensuojaa. Omistajaluokaksi voi valita yhden tai useamman listan vaihtoehtoisista luokista.`,
    'Ägarklassen anger ägaren/ägarna av markgrunden. Den som hyrt  markgrunden är inte en ägare. Ägarklassinformation kan publiceras som fri information, för den kränker ej markägarens integritetsskydd. Som ägarklass kan väljas en eller flera alternativa klasser på listan.'
  ],
  owner: [
    'Täytetään kohteen maapohjan omistavan tahon/tahojen nimi. Omistajan nimeä ei julkaista avoimena eikä julkisena tietona, vaan se näkyy ainoastaan kyseisen kohteen tietojen ylläpitäjälle ja Virma-palvelun pääkäyttäjälle.',
    'Fyll i namnet på ägaren/ägarna av objektets markgrund. Ägarens namn publiceras ej som fri eller offentlig information, utan  den syns endast för upprätthållaren av det aktuella objektet eller för huvudanvändaren av tjänsten Virma.'
  ],
  upkeepclas: [
    'Ylläpitoluokka kertoo, miten kohdetta ylläpidetään eli huolletaan. Lisää tietoa ohjeesta.',
    'Underhållsklassen anger hur objektet underhålls, dvs. servas. Mer information i anvisningen.'
  ],
  upkeeper: [
    `Henkilö tai muu toimija, joka huolehtii kohteen käytännön huollosta maastossa tai vastaa ylläpidosta tilaamalla käytännön huollon toiselta osapuolelta. Katso lisää ohjeesta.`,
    'Person eller annan aktör som har hand om det praktiska underhållet av objektet i  terrrängen eller ansvarar för underhållet genom att beställa service i praktiken av annan part. Se anvisningen för mer information.'
  ],
  upkeepinfo: [
    `Ylläpitäjän postiosoite, mikäli se on tiedossa. Ylläpitäjän yhteystieto tulee näkyviin Lounaispaikan karttapalvelussa, mikäli ylläpitäjän nimi on aiemmassa
    Ylläpitäjän nimi- kohdassa määritelty julkaistavaksi Lounaispaikan karttapalvelussa. Henkilötietoja ei julkaista avoimena datana.
    Mikäli kohteen ylläpitäjän osoite ei ole tiedossa, valitse ”ei tietoa ylläpitäjän osoitteesta”.`,
    'Upprätthållarens postadress, om tillgänglig. Upprätthållarens kontaktinformation syns i Lounaispaikkas karttjänst, ifall upprätthållarens namn har preciserats för publicering tidigare i punkten Upprätthållarens namn för att publiceras i Lounaispaikkas karttjänst. Personuppgifter publiceras inte som fria data. Ifall adressen på objektets upprätthållare är obekant, välj ”ej uppgift om upprätthållarens adress”.'
  ],
  shapeestim: [
    'Opasteiden ja rakenteiden kunto, maapohjan kuluneisuus. Esimerkki kuvausohjeessa.',
    'Vägvisarnas och konstruktionernas kondition, slitaget hos markgrunden. Exempel i beskrivningsanvisningen.'
  ],
  sh_es_date: [
    'Viimeisimmän maastotarkastuksen päivämäärä, jos tehty.',
    'Datum för senaste terränginspektion, om sådan gjorts.'
  ],
  special: [
    'Tätä saraketta käytetään tietojen erikseen määriteltyyn luokitteluun. Pääsääntöisesti kenttä jää tyhjäksi, mutta jos tarvitset aineistollesi erityistä luokittelua, sovi siitä Virma-palvelun pääkäyttäjän kanssa.',
    'Den här kolumnen används för klassificering av särskilt specificerad information. I regel blir fältet tomt, men om du behöver särskild klassificeringför ditt material, avtala om det med huvudanvändaren av tjänsten Virma.'
  ],
  no_address: [
    'Määritä, onko osoitekenttä julkinen tieto vai ei.',
    'Ange om adressfältet är offentligt eller inte.'
  ],
  publicinfo: [
    'Vakuutan että ylläpitäjän yhteystietojen julkaisemiselle Lounaispaikan karttapalveluissa on ylläpitäjän suostumus. Henkilötietoja ei julkaista avoimena datana. Lisää tietoa ohjeesta.',
    'Jag försäkrar att upprätthållarens samtycke finns för att publicera upprätthållarens kontaktinformation i Lounaispaikkas karttjänst. Personuppgifter publiceras inte som fria data. Mer information i anvisningen.'
  ],

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
