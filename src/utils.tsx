import L from "leaflet";

export function handleHttpErrorsGeneric(response) {
    if (!response.ok) {
        throw Error("VIRHE: "+response.status+ ": "+response.statusText);
    }
    return response;
}


// Convert from long lat to leaflet (hence "fix")
export function fixSimpleCoords(coords) {
    return new L.LatLng(coords[1], coords[0], coords[2]);
}
