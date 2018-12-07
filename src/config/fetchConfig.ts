export const postOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Pragma': 'no-cache'
    },
    credentials: 'include',
    body: null,
}

export const getOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Pragma': 'no-cache'
    },
    credentials: 'include'
}

export const postAuthOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Pragma': 'no-cache',
        'Authorization': null
    },
    credentials: 'include'
}
