
export function handleHttpErrorsGeneric(response) {
    if (!response.ok) {
        throw Error("VIRHE: "+response.status+ ": "+response.statusText);
    }
    return response;
}