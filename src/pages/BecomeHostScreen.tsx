import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { input } from "../styles/TextInputStyle";
import { BecomeHost, excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";

class Componentprops extends Baseprops { }
const CarCountData = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
];
const LocationData = [
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Visakhapatnam', value: 'Visakhapatnam' },
    { label: 'Mumbai', value: 'Mumbai' },
];
const BecomeHostScreen: React.FC<Componentprops> = (props) => {
    const [cars, setCars] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [islocationFocus, setIslocationFocus] = useState(false);
    const [selectLocation, setSelactLocation] = useState('')
    const [userName, setUserName] = useState<any>('')
    const [email, setEmail] = useState<any>('')
    const [number, setNumber] = useState<any>('')
    const [selectcity, setSelectcity] = useState<any>([])


    useFocusEffect(
        useCallback(() => {
            handelCity()
        }, [])
    )

    const handelBecomeHost = async () => {
        if (userName.trim().length == 0) {
            Alert.alert('Alert', 'Enter host name')
            return
        }
        if (email.trim().length == 0) {
            Alert.alert('Alert', 'Enter host Email')
            return
        }
        if (number.trim().length == 0 && number.trim().length != 10) {
            Alert.alert('Alert', 'Enter host Number')
            return
        }
        if (cars == '') {
            Alert.alert('Alert', 'Select No.of Cars you have')
            return
        }
        if (selectLocation == '') {
            Alert.alert('Alert', 'Select host location')
            return
        }
        const response = await BecomeHost(userName, email, number, cars, selectLocation)
        console.log('host', response, userName, email, number, cars, selectLocation)
        if (response.code == 0) {
            props.navigation.navigate('ProfileScreen')
        } else {
            Alert.alert('Alert', 'Error on Hosting')
            return
        }
    }
    const handelCity = async () => {
        const response = await excuteGetResponse(`auth/cities`)
        console.log('cities', response)
        if (response.code == 0) {
            setSelectcity(response.data)
        } else {
            Alert.alert('Alert', 'Unable to get Cities details')
            return
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Pressable
                    onPress={() => props.navigation.goBack()}
                    style={{
                        padding: hp(2),
                        marginTop: hp(2)
                    }}>
                    <Image source={require('../assets/Back.png')}
                        style={{
                            height: 35,
                            width: 35
                        }} />
                </Pressable>
                <View style={{
                    marginHorizontal: wp(5),
                    marginBlock: hp(3)
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>Become a Host</Text>
                    <Text style={{
                        fontSize: 17,
                        color: '#9CA3AF',
                        width: wp(65),
                        lineHeight: hp(3),
                        marginVertical: hp(2)
                    }}>Have a car you’re not using all
                        the time? Let it work for you.</Text>
                    <View style={{ marginVertical: hp(1) }}>
                        <Textinput
                            placeholder='Your name'
                            onChangeText={setUserName}
                            value={userName}
                            image={require('../assets/users.png')}
                            keyboardtype='default' />
                        <Textinput placeholder='Your email'
                            onChangeText={setEmail}
                            value={email}
                            image={require('../assets/sms.png')}
                            keyboardtype='default' />
                        <Textinput placeholder='Mobile number'
                            onChangeText={setNumber}
                            value={number}
                            image={require('../assets/sms.png')}
                            keyboardtype='numeric' />
                        <Dropdown
                            style={{
                                height: hp(6),
                                borderColor: "#E5E7EB",
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                marginVertical: hp(1),
                                backgroundColor: "#EEEFF2",
                                flexDirection: "row",
                                alignItems: "center",
                                elevation: 1,
                            }}
                            containerStyle={{
                                borderRadius: 8,
                                backgroundColor: "#EEEFF2",
                            }}
                            placeholderStyle={{
                                fontSize: 16,
                                color: "#9CA3AF",
                            }}
                            selectedTextStyle={{
                                fontSize: 16,
                                color: "#000",
                            }}
                            iconStyle={{
                                width: 24,
                                height: 24,
                            }}
                            data={CarCountData}
                            maxHeight={180}
                            labelField="label"
                            valueField="value"
                            placeholder="How many Cars you have"
                            value={cars}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setCars(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Image
                                    source={require("../assets/sms.png")}
                                    style={[input.style, { marginRight: wp(4) }]}
                                />
                            )}
                            renderRightIcon={() => (
                                <Image
                                    source={require("../assets/mingcute_down-fill.png")}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: isFocus ? "#FBC41D" : "#9CA3AF",
                                    }}
                                />
                            )}
                        />
                        <Dropdown
                            style={{
                                height: hp(6),
                                borderColor: "#E5E7EB",
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                marginVertical: hp(1),
                                backgroundColor: "#EEEFF2",
                                flexDirection: "row",
                                alignItems: "center",
                                elevation: 1,
                            }}
                            containerStyle={{
                                borderRadius: 8,
                                backgroundColor: "#EEEFF2",
                            }}
                            placeholderStyle={{
                                fontSize: 16,
                                color: "#9CA3AF",
                            }}
                            selectedTextStyle={{
                                fontSize: 16,
                                color: "#000",
                            }}
                            iconStyle={{
                                width: 24,
                                height: 24,
                            }}
                            data={selectcity}
                            maxHeight={300}
                            labelField="cityname"
                            valueField="cityname"
                            placeholder="Select city"
                            value={selectLocation}
                            onFocus={() => setIslocationFocus(true)}
                            onBlur={() => setIslocationFocus(false)}
                            onChange={(item) => {
                                setSelactLocation(item.cityId);
                                setIslocationFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Image
                                    source={require("../assets/sms.png")}
                                    style={[input.style, { marginRight: wp(4) }]}
                                />
                            )}
                            renderRightIcon={() => (
                                <Image
                                    source={require("../assets/mingcute_down-fill.png")}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: islocationFocus ? "#FBC41D" : "#9CA3AF",
                                    }}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginVertical: hp(3)
                }}>
                    <PrimaryButton title='Submit' onclick={() => handelBecomeHost()} />
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        marginHorizontal: wp(10),
                        textAlign: 'center',
                        lineHeight: hp(2.5),
                        marginVertical: hp(2)
                    }}>By signing up you agree to <Text style={{
                        color: '#FBC41D'
                    }}>
                            Terms of Services & Privacy Policy.</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default BecomeHostScreen

function aysnc() {
    throw new Error("Function not implemented.");
}
