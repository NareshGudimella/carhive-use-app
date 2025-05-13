import { Alert, Image, Linking, PermissionsAndroid, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { Background } from "../styles/BackgroundColor";
import BottomTabNavigation from "../components/BottomTab";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SelectorBoxStyle } from "../styles/Selectorbox";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import React, { useCallback, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Cardview } from "../components/Cardview";
import { CarouselimageStyles } from "../styles/CarouselimageStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import Geolocation from "@react-native-community/geolocation";
import { check, PERMISSIONS, request } from "react-native-permissions";
import { getCity } from "../storage/AsyncStorage";
import moment from "moment";

class Componentprops extends Baseprops { }

const HomeScreen: React.FC<Componentprops> = (props) => {

    const [banner, setBanner] = useState<any>([])
    const [pickupDate, setPickupDate] = useState(new Date());
    const [dropDate, setDropDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateType, setDateType] = useState<'pickup' | 'drop' | ''>('');
    const [modeltype, setModeltype] = useState('')
    const ref = React.useRef<ICarouselInstance>(null);
    const [pickupTime, setPickupTime] = useState(new Date());
    const [dropTime, setDropTime] = useState(new Date())
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [cityname, setCityname] = useState<any>([])

    useFocusEffect(
        useCallback(() => {
            handelBannerImage()
            VerifyLocationPermission()
        }, [])
    )

    const handelBannerImage = async () => {
        const response = await excuteGetResponse(`auth/banners`)
        console.log('banner', response)
        if (response.code == 0) {
            setBanner(response.data)
            const city: any = await getCity()
            const citiedata: any = JSON.parse(city)
            setCityname(citiedata)
        }else{
            Alert.alert('ALert','unable to get banner')
        }
    }
    const handelCheckDate = () => {
        if (!pickupDate) {
            Alert.alert('Alert', 'Select the Pickup date');
            return;
        }
        if (!dropDate) {
            Alert.alert('Alert', 'Select the Drop date');
            return;
        }


        const pickupDay = new Date(pickupDate.getFullYear(), pickupDate.getMonth(), pickupDate.getDate());
        const dropDay = new Date(dropDate.getFullYear(), dropDate.getMonth(), dropDate.getDate());
        if (cityname && cityname.cityId != '') {
            if (dropDay >= pickupDay) {
                props.navigation.navigate('SelectVehicleScreen', {
                    lat: latitude,
                    long: longitude,
                    pickdate: `${moment(pickupDate).format('DD-MM-YYYY')} ${moment(pickupTime).format('HH:mm')}`,
                    drop: `${moment(dropDate).format('DD-MM-YYYY')} ${moment(dropTime).format('HH:mm')}`,
                    picktime: pickupTime,
                    dropuptime: dropTime,
                    addressid: cityname.cityId
                });
                console.log('date time',
                    `${moment(pickupDate).format('DD-MM-YYYY')} ${moment(pickupTime).format('HH:mm')}`,
                    `${moment(dropDate).format('DD-MM-YYYY')} ${moment(dropTime).format('HH:mm')}`);
            } else {
                Alert.alert('Alert', 'Drop date must be after the Pickup date');
            }
        } else {
            Alert.alert('Alert', 'Alert Select the City')
        }
    };
    const VerifyLocationPermission = async () => {
        if (Platform.OS == 'android') {
            const granted = await
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const granted1 = await
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            if (granted && granted1) {
                Geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords
                    setLatitude(latitude.toString());
                    setLongitude(longitude.toString());
                    console.log(latitude, longitude)
                }, error => {
                    console.log(error)
                })
            } else {
                const granted = await
                    PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ])
                if (granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ==
                    PermissionsAndroid.RESULTS.GRANTED &&
                    granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ==
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    Geolocation.getCurrentPosition(position => {
                        const { latitude, longitude } = position.coords
                        setLatitude(latitude.toString());
                        setLongitude(longitude.toString());
                        console.log(latitude, longitude)
                    }, error => {
                        console.log(error)
                    })
                } else {
                    Linking.openSettings()
                }
            }
        } else if (Platform.OS == 'ios') {
            const granted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if (granted == 'granted') {
                Geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords
                    setLatitude(latitude.toString());
                    setLongitude(longitude.toString());
                }, error => {
                    console.log(error)
                })
            } else {
                const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                if (granted == 'granted') {
                    Geolocation.getCurrentPosition(position => {
                        const { latitude, longitude } = position.coords
                        setLatitude(latitude.toString());
                        setLongitude(longitude.toString());
                    }, error => {
                        console.log(error)
                    })
                } else {
                    Linking.openSettings()
                }
            }
        }
    }

    return (
        <GestureHandlerRootView style={[Background.bgcolor, { flex: 1 }]}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: hp(4),
                    }}>
                        <Pressable
                            onPress={() => props.navigation.navigate('SelectCityScreen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                height: hp(6),
                                borderRadius: 25,
                                paddingHorizontal: wp(3),
                                marginHorizontal: wp(5),
                                elevation: 2,
                            }}>
                            <Image
                                source={require('../assets/Location.png')}
                                style={{ height: 26, width: 26 }}
                            />
                            <Text style={{
                                marginHorizontal: wp(2)
                            }}>
                                {cityname && cityname != '' ? cityname.cityname : 'Select city'}
                            </Text>
                            <Image
                                source={require('../assets/mingcute_down-fill.png')}
                                style={{ height: 10, width: 25 }}
                            />
                        </Pressable>
                        <Image
                            source={require('../assets/Clouds.png')}
                            style={{
                                height: hp(3.3),
                                width: wp(48)
                            }}
                        />
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/car.png')}
                            style={{
                                height: hp(5),
                                width: wp(45),
                                alignSelf: 'flex-end'
                            }} />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            elevation: 1,
                            paddingHorizontal: wp(5),
                            paddingVertical: hp(2)
                        }}>
                        <View style={{ marginVertical: hp(2) }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Book your ride now</Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '500',
                                color: '#64748B'
                            }}>Your journey awaits, book it right away.</Text>
                        </View>
                        <View>
                            {modeltype == 'Time' ?
                                <DatePicker
                                    modal
                                    mode="time"
                                    open={open}
                                    date={dateType === 'pickup' ? pickupTime : dropTime}
                                    onConfirm={(selectedtime) => {
                                        setOpen(false);
                                        if (dateType === 'pickup') {
                                            setPickupTime(selectedtime);
                                        } else if (dateType === 'drop') {
                                            setDropTime(selectedtime);
                                        }
                                        setDateType('');
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                /> :
                                <DatePicker
                                    modal
                                    mode={"date"}
                                    open={open}
                                    date={dateType === 'pickup' ? pickupDate : dropDate}
                                    onConfirm={(selectedDate) => {
                                        setOpen(false);
                                        if (dateType === 'pickup') {
                                            setPickupDate(selectedDate);
                                        } else if (dateType === 'drop') {
                                            setDropDate(selectedDate);
                                        }
                                        setDateType('');
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                        setDateType('');
                                    }}
                                />}
                        </View>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: wp(5),
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#64748B',
                                                fontWeight: '500'
                                            }}>Pickup Date</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true)
                                                setDateType('pickup')
                                                setModeltype('date')
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2)
                                            }]}>
                                            <Image
                                                source={
                                                    require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}> {moment(pickupDate).format('MMMM D YYYY')}</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '500'
                                        }}>Time</Text>
                                        <Pressable
                                            onPress={() => {
                                                setModeltype('Time');
                                                setDateType('pickup');
                                                setOpen(true);
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2)
                                            }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle} />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>{moment(pickupTime).format('h:mm A')}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(3)
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#64748B',
                                                fontWeight: '500'
                                            }}>Drop Date</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true)
                                                setDateType('drop')
                                                setModeltype('date')
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2)
                                            }]}>
                                            <Image
                                                source={
                                                    require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>{moment(dropDate).format('MMMM D YYYY')}</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '500'
                                        }}>Time</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true)
                                                setDateType('drop')
                                                setModeltype('Time');
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2)
                                            }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle} />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>{moment(dropTime).format('h:mm A')}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <PrimaryButton title="Search"
                                    onclick={() => handelCheckDate()} />
                            </View>
                        </Cardview>
                        <Carousel
                            autoPlay={true}
                            ref={ref}
                            width={wp(90)}
                            style={{ marginTop: hp(2) }}
                            height={hp(25)}
                            data={banner}
                            renderItem={({ item }: { item: any }) => (
                                <View>
                                    <Image source={{ uri: item.banners }}
                                        style={CarouselimageStyles.style} />
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
                <BottomTabNavigation step={1} navigation={props.navigation} />
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default HomeScreen