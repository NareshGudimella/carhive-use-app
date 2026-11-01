import {
    Alert, BackHandler, Image, Linking, Modal,
    PermissionsAndroid, Platform, Pressable, ScrollView,
    StyleSheet, Text, View,
} from "react-native";
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
import Geolocation from "@react-native-community/geolocation";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { getCity } from "../storage/AsyncStorage";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [cityname, setCityname] = useState<any>([])
    const [locationDeniedFlag, setLocationDeniedFlag] = useState(false)
    const [timeFlag, setTimeFlag] = useState<any>('')

    useFocusEffect(
        useCallback(() => {
            handelBannerImage();
            loadHoursFlag();
        }, [])
    );

    const loadHoursFlag = async () => {
        const response = await excuteGetResponse('auth/hours')
        console.log('reshours', response)
        if (response.code == 0) {
            setTimeFlag(response.data && response.data.hours_flag)
            // Default pickup: 1 hour from now, rounded up to the next 15 minutes so it clears the buffer check
            const pickup = new Date(new Date().getTime() + 60 * 60 * 1000);
            pickup.setSeconds(0, 0);
            pickup.setMinutes(Math.ceil((pickup.getMinutes() + 1) / 15) * 15);
            const minHours = response.data && response.data.hours_flag == 1 ? 24 : 12;
            const drop = new Date(pickup.getTime() + minHours * 60 * 60 * 1000);
            setPickupDate(pickup);
            setPickupTime(pickup);
            setDropTime(drop);
            setDropDate(drop);
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }

    const handelBannerImage = async () => {
        const response = await excuteGetResponse(`auth/banners`)
        if (response.code == 0) {
            setBanner(response.data)
            const city: any = await getCity()
            const citiedata: any = JSON.parse(city)
            setCityname(citiedata)
        } else {
            Alert.alert('Alert', 'Unable to get banner')
        }
    }

    const isWithinBufferTime = (): boolean => {
        const pickupDateTime = new Date(
            pickupDate.getFullYear(),
            pickupDate.getMonth(),
            pickupDate.getDate(),
            pickupTime.getHours(),
            pickupTime.getMinutes()
        );
        const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
        return pickupDateTime < oneHourFromNow;
    };

    const getDropTimeWarning = (): string | null => {
        const pickupDateTime = new Date(
            pickupDate.getFullYear(),
            pickupDate.getMonth(),
            pickupDate.getDate(),
            pickupTime.getHours(),
            pickupTime.getMinutes()
        );
        const dropDateTime = new Date(
            dropDate.getFullYear(),
            dropDate.getMonth(),
            dropDate.getDate(),
            dropTime.getHours(),
            dropTime.getMinutes()
        );

        if (dropDateTime <= pickupDateTime) {
            return 'Drop date and time must be after pickup date and time.';
        }

        const diffMs = dropDateTime.getTime() - pickupDateTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (timeFlag == 1 && diffHours < 24) {
            return 'Due to high demand, Carhive is temporarily not accepting bookings shorter than 24 hours.';
        }

        if (timeFlag != 1 && diffHours < 12) {
            return 'Pickup and Drop must be at least 12 hours apart.';
        }

        return null;
    };

    const dropTimeWarning = getDropTimeWarning();
    const bufferWarning = isWithinBufferTime();
    const hasAnyWarning = bufferWarning || !!dropTimeWarning;

    const handelCheckDate = (latitude: any, longitude: any) => {
        if (!pickupDate) {
            Alert.alert('Alert', 'Select the Pickup date');
            return;
        }
        if (!dropDate) {
            Alert.alert('Alert', 'Select the Drop date');
            return;
        }
        if (bufferWarning || dropTimeWarning) return;

        if (cityname && cityname.cityId !== '') {
            const pickupDateTime = new Date(
                pickupDate.getFullYear(),
                pickupDate.getMonth(),
                pickupDate.getDate(),
                pickupTime.getHours(),
                pickupTime.getMinutes()
            );
            const dropDateTime = new Date(
                dropDate.getFullYear(),
                dropDate.getMonth(),
                dropDate.getDate(),
                dropTime.getHours(),
                dropTime.getMinutes()
            );
            props.navigation.navigate('SelectVehicleScreen', {
                lat: latitude,
                long: longitude,
                pickdate: `${moment(pickupDateTime).format('DD-MM-YYYY HH:mm')}`,
                drop: `${moment(dropDateTime).format('DD-MM-YYYY HH:mm')}`,
                picktime: pickupTime,
                dropuptime: dropTime,
                addressid: cityname.cityId
            });
        } else {
            Alert.alert('Alert', 'Please select the City');
        }
    };

    const VerifyLocationPermission = async () => {
        if (hasAnyWarning) return;

        if (Platform.OS === 'android') {
            try {
                const fine = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                const coarse = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

                if (!fine || !coarse) {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    ]);
                    if (
                        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED ||
                        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
                    ) {
                        Alert.alert('Location Required', 'Please enable Location permission in settings.');
                        return;
                    }
                }

                Geolocation.getCurrentPosition(
                    (pos: any) => {
                        const { latitude, longitude } = pos.coords;
                        handelCheckDate(latitude, longitude);
                    },
                    async (error: any) => {
                        if (error.code === 3 || error.code === 2) {
                            Geolocation.getCurrentPosition(
                                (pos2: any) => {
                                    const { latitude, longitude } = pos2.coords;
                                    handelCheckDate(latitude, longitude);
                                },
                                () => {
                                    Alert.alert(
                                        'Location Required',
                                        'Unable to get your location. Please turn on GPS and try again.',
                                        [{ text: 'OK' }]
                                    );
                                },
                                { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
                            );
                        } else {
                            Alert.alert('Location Error', 'Unable to detect location. Please enable GPS.');
                        }
                    },
                    { enableHighAccuracy: false, timeout: 7000, maximumAge: 5000 }
                );
            } catch (err) {
                console.log('Permission error:', err);
            }
        } else if (Platform.OS === 'ios') {
            const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (status === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (pos: any) => {
                        const { latitude, longitude } = pos.coords;
                        handelCheckDate(latitude, longitude);
                    },
                    () => {
                        Alert.alert('Location Required', 'Please enable Location Services.');
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
                );
            } else {
                const req = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                if (req === RESULTS.GRANTED) {
                    VerifyLocationPermission();
                } else {
                    Alert.alert('Location Required', 'Please enable Location permission in Settings.', [
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                        { text: 'Cancel' },
                    ]);
                }
            }
        }
    };

    const handleOpenSettings = async () => {
        setLocationDeniedFlag(false)
        Linking.openSettings()
    }

    return (
        <GestureHandlerRootView style={[Background.bgcolor, { flex: 1 }]}>

            {(Platform.OS === 'ios' && modeltype === 'Time') && (
                <Modal
                    visible={open}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setOpen(false)}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius:15,
                            paddingBottom: 20,
                        }}>
                            <DateTimePicker
                                value={dateType === 'pickup' ? pickupTime : dropTime}
                                mode="time"
                                display="spinner"
                                minuteInterval={1}
                                themeVariant="light"
                                onChange={(event, selectedTime) => {
                                    if (selectedTime) {
                                        if (dateType === 'pickup') setPickupTime(selectedTime);
                                        else if (dateType === 'drop') setDropTime(selectedTime);
                                    }
                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderTopWidth: 1,
                                borderColor: '#ddd',
                                paddingTop: 10
                            }}>
                                <Text
                                    onPress={() => { setOpen(false); setDateType(''); }}
                                    style={{ fontSize: 16, color: 'red' }}>
                                    Cancel
                                </Text>
                                <Text
                                    onPress={() => { setOpen(false); setDateType(''); }}
                                    style={{ fontSize: 16, color: 'blue' }}>
                                    Confirm
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {(Platform.OS === 'ios' && modeltype !== 'Time') && (
                <Modal
                    visible={open}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => { setOpen(false); setDateType(''); }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius:15,
                            paddingBottom: 20,
                        }}>
                            <DateTimePicker
                                value={dateType === 'pickup' ? pickupDate : dropDate}
                                mode="date"
                                display="spinner"
                                minimumDate={new Date()}
                                themeVariant="light"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        if (dateType === 'pickup') setPickupDate(selectedDate);
                                        else if (dateType === 'drop') setDropDate(selectedDate);
                                    }
                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderTopWidth: 1,
                                borderColor: '#ddd',
                                paddingTop: 10,
                            }}>
                                <Text
                                    onPress={() => { setOpen(false); setDateType(''); }}
                                    style={{ fontSize: 16, color: 'red' }}>
                                    Cancel
                                </Text>
                                <Text
                                    onPress={() => { setOpen(false); setDateType(''); }}
                                    style={{ fontSize: 16, color: 'blue' }}>
                                    Confirm
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            <SafeAreaView style={{ flex: 1 }}>

                <View>
                    {locationDeniedFlag && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={locationDeniedFlag}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{
                                        color: '#000000', fontWeight: 'bold',
                                        fontSize: 18, textAlign: 'center'
                                    }}>
                                        Location Permission Required!
                                    </Text>
                                    <Text style={{
                                        color: '#000000', fontWeight: '500',
                                        fontSize: 16, marginTop: hp(1),
                                        width: wp(60), textAlign: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        We couldn't access your location. Please enable location services in your device settings.
                                    </Text>
                                    <View style={{ width: wp(50), alignSelf: 'center', marginTop: hp(3) }}>
                                        <PrimaryButton title="Open settings" onclick={() => handleOpenSettings()} />
                                    </View>
                                    <View style={{ width: wp(50), alignSelf: 'center', marginTop: hp(1) }}>
                                        <PrimaryButton
                                            title={Platform.OS == 'android' ? "Close App" : "Close"}
                                            onclick={() => {
                                                if (Platform.OS == 'android') {
                                                    BackHandler.exitApp()
                                                } else {
                                                    props.navigation.reset({
                                                        index: 0,
                                                        routes: [{ name: 'HomeScreen' }],
                                                    });
                                                }
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    )}
                </View>

                <ScrollView style={{ flex: 1 }}>

                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginVertical: hp(6)
                    }}>
                        <Image
                            source={require('../assets/Clouds.png')}
                            style={{ height: hp(3.3), width: wp(48) }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 28,
                        left: 0,
                        right: 0,
                        paddingHorizontal: wp(4),
                        justifyContent: 'space-between',
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
                                elevation: 2,
                            }}>
                            <Image
                                source={require('../assets/Location.png')}
                                style={{ height: 26, width: 26, tintColor: '#00354a' }}
                            />
                            {(cityname && cityname != '') ? (
                                <Text style={{ marginHorizontal: wp(2), fontWeight: 'bold' }}>
                                    {cityname.cityname}
                                </Text>
                            ) : (
                                <Text style={{ marginHorizontal: wp(2), fontWeight: 'bold' }}>
                                    Select City
                                </Text>
                            )}
                            <Image
                                source={require('../assets/mingcute_down-fill.png')}
                                style={{ height: 10, width: 25, tintColor: '#00354a' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => props.navigation.navigate('NotificationScreen')}
                            style={{
                                backgroundColor: '#ffffff',
                                height: 40, width: 40,
                                justifyContent: 'center', alignItems: 'center',
                                borderRadius: 20, elevation: 2,
                            }}>
                            <Image
                                source={require('../assets/bell2.png')}
                                style={{ height: 15, width: 15, tintColor: '#00354a' }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image
                            source={require('../assets/car.png')}
                            style={{ height: hp(5), width: wp(45), alignSelf: 'flex-end' }}
                        />
                    </View>

                    <View style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        elevation: 1,
                        paddingHorizontal: wp(5),
                        paddingVertical: hp(2)
                    }}>
                        <View style={{ marginVertical: hp(2) }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Book your ride now
                            </Text>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: '#64748B' }}>
                                Your journey awaits, book it right away.
                            </Text>
                        </View>

                        <View>
                            {Platform.OS === 'android' && modeltype === 'Time' && open && (
                                <DateTimePicker
                                    value={dateType === 'pickup' ? pickupTime : dropTime}
                                    mode="time"
                                    display="spinner"
                                    themeVariant="light"
                                    minimumDate={
                                        pickupDate && pickupDate.getTime() > new Date().getTime()
                                            ? new Date(new Date().setHours(0, 0, 0, 0))
                                            : new Date()
                                    }
                                    onChange={(event, selectedTime) => {
                                        setOpen(false);
                                        if (event.type === 'set' && selectedTime) {
                                            if (dateType === 'pickup') setPickupTime(selectedTime);
                                            else if (dateType === 'drop') setDropTime(selectedTime);
                                        }
                                        setDateType('');
                                    }}
                                />
                            )}

                            {Platform.OS === 'android' && modeltype !== 'Time' && open && (
                                <DateTimePicker
                                    value={dateType === 'pickup' ? pickupDate : dropDate}
                                    mode="date"
                                    themeVariant="light"
                                    display="default"
                                    minimumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setOpen(false);
                                        if (event.type === 'set' && selectedDate) {
                                            if (dateType === 'pickup') setPickupDate(selectedDate);
                                            else if (dateType === 'drop') setDropDate(selectedDate);
                                        }
                                        setDateType('');
                                    }}
                                />
                            )}
                        </View>

                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: wp(5),
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ color: '#64748B', fontWeight: '500' }}>Pickup Date</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true);
                                                setDateType('pickup');
                                                setModeltype('date');
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2),
                                                borderWidth: 0.5,
                                                borderColor: '#EDEFF8'
                                            }]}>
                                            <Image
                                                source={require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text style={{ marginHorizontal: wp(2), fontSize: 14, fontWeight: '600' }}>
                                                {moment(pickupDate).format('MMM D YYYY')}
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#64748B', fontWeight: '500' }}>Time</Text>
                                        <Pressable
                                            onPress={() => {
                                                setModeltype('Time');
                                                setDateType('pickup');
                                                setOpen(true);
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2),
                                                borderWidth: 0.5,
                                                borderColor: '#EDEFF8'
                                            }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text style={{ marginHorizontal: wp(2), fontSize: 14, fontWeight: '600' }}>
                                                {moment(pickupTime).format('h:mm A')}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(3)
                                }}>
                                    <View>
                                        <Text style={{ color: '#64748B', fontWeight: '500' }}>Drop Date</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true);
                                                setDateType('drop');
                                                setModeltype('date');
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2),
                                                borderWidth: 0.5,
                                                borderColor: '#EDEFF8'
                                            }]}>
                                            <Image
                                                source={require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text style={{ marginHorizontal: wp(2), fontSize: 14, fontWeight: '600' }}>
                                                {moment(dropDate).format('MMM D YYYY')}
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#64748B', fontWeight: '500' }}>Time</Text>
                                        <Pressable
                                            onPress={() => {
                                                setOpen(true);
                                                setDateType('drop');
                                                setModeltype('Time');
                                            }}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2),
                                                borderWidth: 0.5,
                                                borderColor: '#EDEFF8'
                                            }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text style={{ marginHorizontal: wp(2), fontSize: 14, fontWeight: '600' }}>
                                                {moment(dropTime).format('h:mm A')}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>

                                {bufferWarning && (
                                    <View style={styles.warningBox}>
                                        <Text style={{ fontSize: 18 }}>⏰</Text>
                                        <Text style={styles.warningText}>
                                            This is a buffer time. Please select a pickup time at least 1 hour from now.
                                        </Text>
                                    </View>
                                )}

                                {/* ── Drop time / duration warning ── */}
                                {!bufferWarning && !!dropTimeWarning && (
                                    <View style={styles.warningBox}>
                                        <Text style={{ fontSize: 18 }}>⚠️</Text>
                                        <Text style={styles.warningText}>
                                            {dropTimeWarning}
                                        </Text>
                                    </View>
                                )}

                                {/* ── Search button — blocked when any warning is active ── */}
                                <PrimaryButton
                                    title="Search"
                                    onclick={() => {
                                        if (hasAnyWarning) {
                                            Alert.alert('Alert', bufferWarning
                                                ? 'Please select a pickup time at least 1 hour from now.'
                                                : String(dropTimeWarning));
                                            return;
                                        }
                                        VerifyLocationPermission();
                                    }}
                                />
                            </View>
                        </Cardview>

                        <View>
                            <Carousel
                                autoPlay={true}
                                ref={ref}
                                width={wp(90)}
                                style={{ marginTop: hp(2) }}
                                height={hp(25)}
                                data={banner}
                                renderItem={({ item }: { item: any }) => (
                                    <View>
                                        <Image
                                            source={{ uri: item.banners }}
                                            style={CarouselimageStyles.style}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>

                <BottomTabNavigation step={1} navigation={props.navigation} />
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: hp(3),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    warningBox: {
        backgroundColor: '#FFF3CD',
        borderWidth: 1,
        borderColor: '#FFC107',
        borderRadius: 10,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        marginBottom: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    warningText: {
        color: '#856404',
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
});

export default HomeScreen