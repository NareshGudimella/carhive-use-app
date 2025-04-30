import { getToken } from "../storage/AsyncStorage"

const BASE_URL = ''

export const excuteResponse = async (url: string, body: any) => {

    const headers: any = {
        'Content-Type': (body instanceof FormData) ? 'multipart/form-data' : 'application/json'
    }

    const token = await getToken();
    if (token && token != '') {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: headers,
            body: (body instanceof FormData) ? body : JSON.stringify(body)
        })
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
    return { code: 1 }
}

export const excuteGetResponse = async (url: string) => {

    const headers: any = {
        'Content-Type': 'application/json'
    }

    const token = await getToken();
    if (token && token != '') {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'GET',
            headers: headers,
        })
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
    return { code: 1 }
}