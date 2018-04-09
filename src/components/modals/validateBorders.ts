import turf from 'turf';
import * as borders from '../../../kunta_maakunta_seutukunta.json!json';

const propertyKeys = {
  'municipalities': 'k_nimi',
  'regions': 'mk_nimi',
  'subregions': 'sk_nimi',
  'municipality_numbers': 'k_koodi',
  'region_numbers': 'mk_koodi',
  'subregion_numbers': 'sk_koodi'
}

export default function validateBorders(geometryType, feature, oldFeature = false) {
  let coordArray = [];
  let returnObject = {
    municipalities: [],
    regions: [],
    subregions: [],
    municipality_numbers: [],
    region_numbers: [],
    subregion_numbers: []
  };

  if (geometryType === 'circlemarker') {
    const coords = [feature._latlng.lng, feature._latlng.lat];
    const pointFeature = turf.point(coords);

    loopBorders(pointFeature, returnObject);
  } else if (geometryType === 'polyline') {
    if (oldFeature) {
      feature._latlngs[0].forEach(coord => {
        const coords = { lat: coord.lng, lng: coord.lat };
        coordArray.push(Object.keys(coords).map(item => coords[item]));
      });
    } else {
      feature._latlngs.forEach(coord => {
        const coords = { lat: coord.lng, lng: coord.lat };
        coordArray.push(Object.keys(coords).map(item => coords[item]));
      });
    }

    const lineFeature = turf.lineString(coordArray);
    loopBorders(lineFeature, returnObject);
  } else if (geometryType === 'polygon') {
    if (oldFeature) {
      feature._latlngs.forEach((coord, idx) => {
        coordArray.push([]);
        coord[0].forEach((coord2, idx2) => {
          const coords = { lat: coord2.lng, lng: coord2.lat };
          coordArray[idx].push(Object.keys(coords).map(item => coords[item]));
        });

        const firstCoord = { lat: feature._latlngs[idx][0][0].lng, lng: feature._latlngs[idx][0][0].lat };
        coordArray[idx].push(Object.keys(firstCoord).map(item => firstCoord[item]));
      });

      coordArray.forEach(array => {
        const polygonFeature = turf.polygon([array]);
        loopBorders(polygonFeature, returnObject);
      });
    } else {
      feature._latlngs[0].forEach(coord => {
        const coords = { lat: coord.lng, lng: coord.lat };
        coordArray.push(Object.keys(coords).map(item => coords[item]));
      });
      const firstCoord = { lat: feature._latlngs[0][0].lng, lng: feature._latlngs[0][0].lat };
      coordArray.push(Object.keys(firstCoord).map(item => firstCoord[item]));
      const polygonFeature = turf.polygon([coordArray]);

      loopBorders(polygonFeature, returnObject);
    }
  }

  return returnObject;
}

function loopBorders(inputFeature, returnObject) {
  const borderFeatures = borders.default.features;

  borderFeatures.forEach(border => {
    const borderFeature = turf.multiPolygon(border.geometry.coordinates);

    if (turf.intersect(inputFeature, borderFeature)) {
      appendBorderInfoToObject(returnObject, border.properties);
    }
  });
}

function appendBorderInfoToObject(returnObject, property) {
  for (let key in returnObject) { pushToArrayIfUnique(returnObject, key, property[propertyKeys[key]]); }
  return returnObject;
}

function pushToArrayIfUnique(object, property, propertyValue) {
  return object[property].indexOf(propertyValue) < 0 ? object[property].push(propertyValue) : null;
}
