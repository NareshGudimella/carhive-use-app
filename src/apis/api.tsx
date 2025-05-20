import moment from "moment";
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
    return { code: 2 }
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
export const CarsList = async (
    from_date: any,
    to_date: any,
    city_id: any,
    user_latitude: any,
    user_longitude: any,
    price_sort: any,
    brands: any,
    fuel_type: any,
    transmission: any,
    seating: any
) => {
    return excuteResponse('auth/cars', {
        from_date,
        to_date,
        city_id,
        user_latitude,
        user_longitude,
        filters: {
            price_sort,
            brands,
            fuel_type,
            transmission,
            seating,
        },
    });
};

export const LoginCarsList = async (
    from_date: any,
    to_date: any,
    city_id: any,
    user_latitude: any,
    user_longitude: any,
    price_sort: any,
    brands: any,
    fuel_type: any,
    transmission: any,
    seating: any) => {
    return excuteResponse('secure/cars', {
        from_date, to_date, city_id,
        user_latitude, user_longitude,
        filters: {
            price_sort,
            brands,
            fuel_type,
            transmission,
            seating,
        },
    })
}
export const carDetails = async (carid: any, from_date: any, to_date: any) => {
    return excuteResponse(`auth/cars/details/${carid}`, { from_date, to_date })
}
export const LoginCarDetails = async (carid: any, from_date: any, to_date: any) => {
    return excuteResponse(`secure/cars/cardetails/${carid}`, { from_date, to_date })
}
export const SignUp = async (name: any, email: any, gender: any, dob: any) => {
    return excuteResponse(`secure/signup`, { name, email, gender, dob })
}
export const summery = async (carid: any, from_date: any, to_date: any,
    latitude: any, longitude: any, ofercode: any) => {
    return excuteResponse(`secure/cars/details/${carid}`,
        { from_date, to_date, latitude, longitude, ofercode })
}
export const userUpdateProfile = async (body: any) => {
    const data = new FormData()
    for (const [key, value] of Object.entries<any>(body)) {
        if (key == 'aadhar_front_image') {
            if (value && value.uri) {
                data.append(key, {
                    uri: value.uri,
                    type: value.type,
                    name: value.fileName
                })
            }
        } else if (key == 'aadhar_back_image') {
            if (value && value.uri) {
                data.append(key, {
                    uri: value.uri,
                    type: value.type,
                    name: value.fileName
                })
            }
        } else if (key == 'driving_licence_front') {
            if (value && value.uri) {
                data.append(key, {
                    uri: value.uri,
                    type: value.type,
                    name: value.fileName
                })
            }
        } else if (key == 'driving_licence_back') {
            if (value && value.uri) {
                data.append(key, {
                    uri: value.uri,
                    type: value.type,
                    name: value.fileName
                })
            }
        }
    }

    return excuteResponse(`secure/profile/update`, data)
}

export const KycDetails = async (
    aadhar_front_image: any,
    aadhar_back_image: any,
    driving_licence_front: any,
    driving_licence_back: any
) => {
    const formdata = new FormData();

    formdata.append('aadhar_front_image', {
        uri: aadhar_front_image.uri,
        type: aadhar_front_image.type,
        name: aadhar_front_image.fileName,
    });

    formdata.append('aadhar_back_image', {
        uri: aadhar_back_image.uri,
        type: aadhar_back_image.type,
        name: aadhar_back_image.fileName,
    });

    formdata.append('driving_licence_front', {
        uri: driving_licence_front.uri,
        type: driving_licence_front.type,
        name: driving_licence_front.fileName,
    });

    formdata.append('driving_licence_back', {
        uri: driving_licence_back.uri,
        type: driving_licence_back.type,
        name: driving_licence_back.fileName,
    });

    return excuteResponse(`secure/documents`, formdata);
};


export const wishlist = async (carid: any) => {
    return excuteGetResponse(`secure/cars/favorite/add/${carid}`)
}
export const removeWishlist = async (carid: any) => {
    return excuteGetResponse(`secure/cars/favorite/remove/${carid}`)
}
export const carBookings = async (terms_conditions_flag: any,
    booking_list_flag: any, from_date: any, to_date: any, carid: any,
    ofercode: any, trip_charges: any, taxes: any, convenience_fee: any,
    security_deposite: any, protection_fee: any, total_price: any) => {
    return excuteResponse(`secure/cars/book`, {
        terms_conditions_flag, booking_list_flag,
        from_date, to_date, carid, ofercode, trip_charges,
        taxes, convenience_fee, security_deposite,
        protection_fee, total_price
    })
}
export const extendtime = async (car_booking_id: any, extended_date: any) => {
    return excuteResponse(`secure/cars/bookings/extendrequest/${car_booking_id}`,
        { extended_date })
}
export const BecomeHost = async (name: any, email: any, mobile: any, no_of_cars: any, city_id: any) => {
    return excuteResponse(`secure/host`, { name, email, mobile, no_of_cars, city_id })
}