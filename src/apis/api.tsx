import { getToken } from "../storage/AsyncStorage"

const BASE_URL = 'https://carhive.pengwinsolutions.in/api'

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
    return { code: 2 }
}

export const Login = async (mobile: any) => {
    return excuteResponse('auth/login', { mobile })
}
export const Otp = async (mobile: any, otp: any) => {
    return excuteResponse('auth/verfy', { mobile, otp })
}
export const CarsList = async (from_date: any, to_date: any,
    city_id: any, user_latitude: any, user_longitude: any) => {
    return excuteResponse('auth/cars', {
        from_date, to_date, city_id,
        user_latitude, user_longitude
    })
}
export const LoginCarsList = async (from_date: any, to_date: any,
    city_id: any, user_latitude: any, user_longitude: any) => {
    return excuteResponse('secure/cars', {
        from_date, to_date, city_id,
        user_latitude, user_longitude
    })
}
export const carDetails = async (carid: any, from_date: any, to_date: any) => {
    return excuteResponse(`auth/cars/details/${carid}`, { from_date, to_date })
}
export const SignUp = async (name: any, email: any, gender: any, dob: any) => {
    return excuteResponse(`secure/signup`, { name, email, gender, dob })
}
export const summery = async (carid: any, from_date: any, to_date: any,
    latitude: any, longitude: any) => {
    return excuteResponse(`secure/cars/details/${carid}`,
        { from_date, to_date, latitude, longitude })
}
export const UpdateProfile = async (name: any, email: any, gender: any, dob: any,
    aadhar_front_image: any, aadhar_back_image: any,
    driving_licence_front: any, driving_licence_back: any) => {
    return excuteResponse(`secure/profile/update`, {
        name, email, gender, dob,
        aadhar_front_image, aadhar_back_image,
        driving_licence_front,
        driving_licence_back
    })
}
export const KycDetails = async (aadhar_front_image: any,
    aadhar_back_image: any,
    driving_licence_front: any,
    driving_licence_back: any) => {
    return excuteResponse(`secure/documents`, {
        aadhar_front_image,
        aadhar_back_image,
        driving_licence_front,
        driving_licence_back
    })
}
export const wishlist = async(carid:any)=>{
    return excuteGetResponse(`secure/cars/favorite/add/${carid}`)
}
export const removeWishlist =async(carid:any)=>{
    return excuteGetResponse(`secure/cars/favorite/remove/${carid}`)
}