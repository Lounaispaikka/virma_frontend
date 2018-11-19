const loginMessages = {
  loginConnectionError: 'Kirjautuminen ei onnistu tällä hetkellä',
  registerConnectionError: 'Rekisteröiminen ei onnistu tällä hetkellä',
  forgotConnectionError: 'Salasanan palauttaminen ei onnistu tällä hetkellä',

  credentials: 'Lisää käyttäjätunnus ja salasana',
  password: 'Väärä salasana',
  passwordDouble: 'Toinen salasanoista on väärin',
  unknown: 'Käyttäjää ei ole olemassa',
  locked: 'Tunnuksesi on lukittu turvallisuussyistä usean virheellisen yrityksen jälkeen. Yritä kirjautumista uudestaan hetken kuluttua.',

  userTaken: 'Käyttäjätunnus on jo käytössä',
  emailEmpty: 'Sähköposti on annettava',
  emailTaken: 'Sähköposti on jo määritelty toiselle tunnukselle',
  usernameTooLong: 'Käyttäjätunnus liian pitkä! (max 15 merkkiä)',
  usernameWhitespace: 'Käyttäjätunnuksessa ei saa olla välilyöntejä',
  usernameSpecialCharacters: 'Käyttäjätunnuksessa ei saa olla erikoismerkkejä',

  registerSuccess: 'Tunnuksen rekisteröinti onnistui.',
  emailAlreadySent: 'Sähköposti on jo lähetetty kyseiseen osoitteseen.',
  emailSendSuccess: 'Sälasanan palautuslinkki on lähetetty annettuun osoitteeseen ja se on voimassa tunnin ajan',
  emailSendFailure: 'Sähköpostia ei pystytty lähettämään annettuun osoitteeseen.'
}

export { loginMessages };
