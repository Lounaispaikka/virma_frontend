const host = '';

const taustakartta = `${host}/service?service=wmts&request=GetTile&version=1.0.0&tilematrixset=JHS180&tilematrix={z}&tilerow={y}&tilecol={x}&layer=Taustakartta&format=image/png&style=default`;

const appUrls = {
  pointsAll: host + '/api/points/all',
  pointsClass1: host + '/api/points/class1',
  pointsClass1_2: host + '/api/points/class1_2',
  pointsUser: host + '/api/points/userFeatures',
  pointIndividual: host + '/api/points/pointIndividual',
  pointApprovals: host + '/api/points/approvals',
  createPoint: host + '/api/points/create',
  removePoint: host + '/api/points/remove',
  updatePoint: host + '/api/points/update',
  alterUpdaterPoint: host + '/api/points/alterUpdater',

  linesAll: host + '/api/routes/all',
  linesClass1: host + '/api/routes/class1',
  linesClass1_2: host + '/api/routes/class1_2',
  linesUser: host + '/api/routes/userFeatures',
  lineIndividual: host + '/api/routes/lineIndividual',
  lineApprovals: host + '/api/routes/approvals',
  createLine: host + '/api/routes/create',
  removeLine: host + '/api/routes/remove',
  updateLine: host + '/api/routes/update',
  alterUpdaterLine: host + '/api/routes/alterUpdater',

  areasAll: host + '/api/areas/all',
  areasClass1: host + '/api/areas/class1',
  areasClass1_2: host + '/api/areas/class1_2',
  areasUser: host + '/api/areas/userFeatures',
  areaIndividual: host + '/api/areas/areaIndividual',
  areaApprovals: host + '/api/areas/approvals',
  createArea: host + '/api/areas/create',
  removeArea: host + '/api/areas/remove',
  updateArea: host + '/api/areas/update',
  alterUpdaterArea: host + '/api/areas/alterUpdater',

  initLogin: host + '/api/login/initLogin',
  login: host + '/api/login/login',
  logout: host + '/api/login/logout',
  register: host + '/api/login/register',
  forgot: host + '/api/login/forgot',

  users: host + '/api/manage/users',
  addUser: host + '/api/manage/addUser',
  removeUser: host + '/api/manage/removeUser',
  updateUser: host + '/api/manage/updateUser',

  featureUploadImage: host + '/api/feature/uploadImage',
  requestFeatureAccess: host + '/api/feature/requestFeatureAccess'
};

const mapUrls = {
  taustakartta: taustakartta,
  peruskartta: 'https://tiles.kartat.kapsi.fi/peruskartta_3067/{z}/{x}/{y}.png',
  ortokuva: 'https://tiles.kartat.kapsi.fi/ortokuva_3067/{z}/{x}/{y}.png'
};

const FEATURE_ENABLED_AREA = false;
const URL_GUIDE = "https://www.lounaistieto.fi/virma-yllapidon-kayttoohjeet/";

export { appUrls, mapUrls, FEATURE_ENABLED_AREA, URL_GUIDE };
