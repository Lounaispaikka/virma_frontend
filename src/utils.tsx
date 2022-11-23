import { postOptions } from "./config/fetchConfig";
import L from "leaflet";
import {
    LINESTRING,
    POINT,
    POLYGON,
    CREATE,
    CIRCLE_MARKER,
    POLYLINE,
    AREA,
    UPDATE,
} from './config/constants';
import { layer, data, form, modal, login, map } from './model/store';
import { appUrls } from "./config/config";

export function handleHttpErrorsGeneric(response) {
    if (!response.ok) {
        throw Error("VIRHE: " + response.status + ": " + response.statusText);
    }
    return response;
}


// Convert from long lat to leaflet (hence "fix")
export function fixSimpleCoords(coords) {
    return new L.LatLng(coords[1], coords[0], coords[2]);
}


export const UpdateGeomPost = (type, bodyContent)  =>
    new Promise(function (resolve, reject) {

    let operation: string = UPDATE;
    let url: string = null;
    let array: any = [];
    let need: string;

    if (type === CIRCLE_MARKER || type === POINT) {
        url = appUrls.updatePoint;
        need = POINT;
    } else if (type === POLYLINE || type === LINESTRING) {
        url = appUrls.updateLine;
        need = 'MultiLineString';
    } else if (type == AREA) {
        url = appUrls.updateArea;
        throw "not implemented";
    } else {
        throw ("unknown type: " + type);
    }

    if (!confirm('Haluatko varmasti päivittää kohteen geometrian?')) {
        resolve(false);
    }

    const options: any = postOptions;
    options.body = JSON.stringify({ user: login.loggedUser, body: bodyContent });

    return fetch(url, options)
        .then(handleHttpErrorsGeneric)
        .then(response => response.json())
        .then((response) => {
            //TODO: check return json
            let message = operation === CREATE ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
            if (type === CIRCLE_MARKER) {
                message = operation === CREATE ? 'Kohde lisätty onnistuneesti.' : 'Kohde päivitetty onnistuneesti.';
            } else if (type === POLYLINE) {
                message = operation === CREATE ? 'Reitti lisätty onnistuneesti.' : 'Reitti päivitetty onnistuneesti.';
            } else if (type === POLYGON) {
                message = operation === CREATE ? 'Alue lisätty onnistuneesti.' : 'Alue päivitetty onnistuneesti.';
            }

            modal.showSuccessAlert(message);
            resolve(response);
        }).catch((e) => {

            let message = operation === CREATE ? 'Kohteen lisäys epäonnistui.' : 'Kohteen päivitys epäonnistui.';
            if (type === CIRCLE_MARKER) {
                message = operation === CREATE ? 'Kohteen lisäys epäonnistui.' : 'Kohteen päivitys epäonnistui.';
            } else if (type === POLYLINE) {
                message = operation === CREATE ? 'Reitin lisäys epäonnistui.' : 'Reitin päivitys epäonnistui.';
            } else if (type === POLYGON) {
                message = operation === CREATE ? 'Alueen lisäys epäonnistui.' : 'Alueen päivitys epäonnistui.';
            }

            modal.showErrorAlert(message + "\n" + e.message);
            reject(e);
        });
})
