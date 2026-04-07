import { Alert, Image, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { SelectorBoxStyle } from "../styles/Selectorbox";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import moment from "moment";
import { excuteGetResponse, extendtime } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

class Componentprops extends Baseprops { }

const ExtendServiceRequestScreen: React.FC<Componentprops> = (props) => {
    const [dropDate, setDropDate] = useState(new Date());
    const [dropTime, setDropTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [modeltype, setModeltype] = useState<'Date' | 'Time' | ''>('');
    const [carData, setCarData] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            if (props.route.params && props.route.params.id) {
                ExtendsCarDetails(props.route.params.id)
            }
        }, [])
    )

    const ExtendsCarDetails = async (car_booking_id: any) => {
        const response = await excuteGetResponse(`secure/cars/bookings/extend/${car_booking_id}`)
        if (response.code == 0) {
            setCarData(response.data)
            setDropDate(new Date(response.data.to_date))
            setDropTime(new Date(response.data.to_date))
        } else if (response.message == 'Ride_has_already_ended') {
            Alert.alert('Alert', 'Ride has already ended', [
                { text: 'Ok', onPress: () => props.navigation.goBack(), style: 'cancel' },
            ])
            return
        } else if (response.message == 'Request_already_sent') {
            Alert.alert('Alert', 'Request already sent', [
                { text: 'Ok', onPress: () => props.navigation.goBack(), style: 'cancel' },
            ])
            return
        } else if (response.message == 'Cannot_extend_ride_within_5_hours_of_end_time') {
            Alert.alert('Alert', 'Cannot extend ride before 5 hours of return vehicle', [
                { text: 'Ok', onPress: () => props.navigation.goBack(), style: 'cancel' },
            ])
            return
        } else {
            Alert.alert('Alert', 'Unable to get CarDetils', [
                { text: 'Ok', onPress: () => props.navigation.goBack(), style: 'cancel' },
            ])
            return
        }
    }

    const requestExtendtime = async (bookingID: any) => {
        const combinedDateTime = `${moment(dropDate).format('YYYY-MM-DD')} ${moment(dropTime).format('HH:mm:ss')}`
        const response = await extendtime(bookingID, combinedDateTime)
        console.log('request Success', response, bookingID, combinedDateTime)
        if (response.code == 0) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'RentalsScreen' }]
            })
        } else {
            Alert.alert('Alert', 'Unable to extend time')
            return
        }
    }

    const openPicker = (type: 'Date' | 'Time') => {
        setModeltype(type)
        setOpen(true)
    }

    const closePicker = () => {
        setOpen(false)
        setModeltype('')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {Platform.OS === 'ios' && (
                <Modal
                    visible={open}
                    transparent
                    animationType="slide"
                    onRequestClose={closePicker}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            paddingBottom: 20,
                        }}>
                            {modeltype === 'Date' && (
                                <DateTimePicker
                                    value={dropDate}
                                    mode="date"
                                    display="spinner"
                                    themeVariant="light"
                                    minimumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setDropDate(selectedDate);
                                        }
                                    }}
                                />
                            )}
                            {modeltype === 'Time' && (
                                <DateTimePicker
                                    value={dropTime}
                                    mode="time"
                                    display="spinner"
                                    themeVariant="light"
                                    onChange={(event, selectedTime) => {
                                        if (selectedTime) {
                                            setDropTime(selectedTime);
                                        }
                                    }}
                                />
                            )}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderTopWidth: 1,
                                borderColor: '#ddd',
                                paddingTop: 10,
                            }}>
                                <Text
                                    onPress={closePicker}
                                    style={{ fontSize: 16, color: 'red' }}
                                >
                                    Cancel
                                </Text>
                                <Text
                                    onPress={closePicker}
                                    style={{ fontSize: 16, color: 'blue' }}
                                >
                                    Confirm
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {Platform.OS === 'android' && open && (
                <>
                    {modeltype === 'Date' && (
                        <DateTimePicker
                            value={dropDate}
                            mode="date"
                            display="default"
                            themeVariant="light"
                            minimumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setOpen(false);
                                setModeltype('');
                                if (event.type === 'set' && selectedDate) {
                                    setDropDate(selectedDate);
                                }
                            }}
                        />
                    )}
                    {modeltype === 'Time' && (
                        <DateTimePicker
                            value={dropTime}
                            mode="time"
                            display="default"
                            themeVariant="light"
                            onChange={(event, selectedTime) => {
                                setOpen(false);
                                setModeltype('');
                                if (event.type === 'set' && selectedTime) {
                                    setDropTime(selectedTime);
                                }
                            }}
                        />
                    )}
                </>
            )}

            {carData &&
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: wp(5)
                        }}>
                            <Pressable onPress={() => props.navigation.goBack()}>
                                <Image
                                    source={require('../assets/Back.png')}
                                    style={{ height: 40, width: 40 }}
                                />
                            </Pressable>
                            <Text style={{
                                marginHorizontal: wp(2),
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>
                                Request Return
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: wp(5),
                            marginTop: hp(12)
                        }}>
                            <Cardview>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: hp(1)
                                }}>
                                    {carData && (
                                        <Image
                                            source={{ uri: carData.car_image }}
                                            style={{
                                                position: 'absolute',
                                                height: hp(20),
                                                width: hp(25),
                                                top: hp(-12),
                                                borderRadius: 15
                                            }}
                                        />
                                    )}
                                    <Text style={{
                                        marginTop: hp(11),
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>
                                        Booking ID : {carData && carData.booking_id}
                                    </Text>
                                    <Text style={{
                                        color: '#64748B',
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        marginVertical: hp(1)
                                    }}>
                                        {carData && carData.carname}
                                    </Text>
                                </View>
                            </Cardview>
                        </View>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginHorizontal: wp(5),
                            marginVertical: hp(1.5)
                        }}>
                            Extend Date & Time
                        </Text>

                        <View style={{ marginHorizontal: wp(5) }}>
                            <Cardview>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginHorizontal: wp(4),
                                    marginVertical: hp(1.5)
                                }}>
                                    <Pressable
                                        onPress={() => openPicker('Date')}
                                        style={[SelectorBoxStyle.style, { flexDirection: 'row' }]}
                                    >
                                        <Image
                                            source={require('../assets/calendar-add(1).png')}
                                            style={BottomTabstyles.selectedstyle}
                                            tintColor='#000000'
                                        />
                                        <Text style={{
                                            marginHorizontal: wp(2.5),
                                            fontSize: 14,
                                            fontWeight: '600'
                                        }}>
                                            {moment(dropDate).format('DD MMM YYYY')}
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => openPicker('Time')}
                                        style={[SelectorBoxStyle.style, { flexDirection: 'row' }]}
                                    >
                                        <Image
                                            source={require('../assets/clock.png')}
                                            style={BottomTabstyles.selectedstyle}
                                        />
                                        <Text style={{
                                            marginHorizontal: wp(2.5),
                                            fontSize: 14,
                                            fontWeight: '600'
                                        }}>
                                            {moment(dropTime).format('hh:mm A')}
                                        </Text>
                                    </Pressable>
                                </View>
                            </Cardview>
                        </View>

                        <View style={{ marginHorizontal: wp(5) }}>
                            <Text style={{
                                color: '#64748B99',
                                fontWeight: '500',
                                fontSize: 13,
                                marginVertical: hp(2),
                                marginTop: hp(4)
                            }}>
                                Note :
                            </Text>

                            {[
                                "Additional charges apply based on hourly or daily rates.",
                                "Wait for confirmation before assuming the extension is granted.",
                                "Request extensions before your current rental period ends."
                            ].map((note, index) => (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#64748B99', fontSize: 13 }}>{index + 1} . </Text>
                                    <Text style={{
                                        width: wp(75),
                                        color: '#64748B99',
                                        fontSize: 13,
                                        lineHeight: hp(3)
                                    }}>
                                        {note}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={{ marginHorizontal: wp(5), marginVertical: hp(3) }}>
                        <PrimaryButton
                            title='Request Now'
                            onclick={() => requestExtendtime(carData.car_booking_id)}
                        />
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};

export default ExtendServiceRequestScreen;