import { Alert, Image, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { input } from "../styles/TextInputStyle";
import DatePicker from "react-native-date-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUp } from "../apis/api";
import moment from "moment";

class Componentprops extends Baseprops { }

const SignupScreen: React.FC<Componentprops> = (props) => {
    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const genderData = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHERS", value: "OTHERS" },
    ];

    const handelSignup = async () => {
        if (userName.trim().length == 0) {
            Alert.alert('Alert', 'Enter your Name')
            return
        }
        if (userEmail.trim().length == 0) {
            Alert.alert('Alert', 'Enter your Email')
            return
        }
        if (gender == null) {
            Alert.alert('Alert', 'Enter your Gender')
            return
        }
        const response = await SignUp(userName, userEmail, gender, moment(date).format('YYYY-MM-DD'));
        console.log('Signupresponse', response, userName, userEmail, gender, moment(date).format('DD-MM-YYYY'));
        if (response.code == 0) {
            props.navigation.navigate('KycDetailsScreen');
        } else if (response.code == 1 && response.message == 'EMAIL_EXIST') {
            Alert.alert('Alert', 'Email already exist');
            return
        } else {
            Alert.alert('Alert', 'Unable to get details');
            return
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable
                onPress={() => props.navigation.goBack()}
                style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(2),
                    marginTop: hp(3.5)
                }}>
                <Image
                    source={require("../assets/Back.png")}
                    style={{ height: 35, width: 35 }}
                />
            </Pressable>

            <View style={{ marginHorizontal: wp(7) }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: "bold"
                }}>
                    Sign up to Ride a car
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: "#9CA3AF",
                        width: wp(70),
                        marginVertical: hp(1.5),
                    }}
                >
                    Ready to hit the road? Signing up to book your ride is quick and
                    easy!
                </Text>
            </View>

            <View style={{
                marginHorizontal: wp(7),
                marginTop: hp(2)
            }}>
                <Textinput
                    image={require("../assets/users.png")}
                    placeholder="Your name"
                    keyboardtype="default"
                    onChangeText={setUserName}
                    value={userName}
                    max={40}
                />
                <Textinput
                    image={require("../assets/sms.png")}
                    placeholder="Email"
                    keyboardtype="default"
                    onChangeText={setUserEmail}
                    value={userEmail}
                    max={(50)}
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
                    data={genderData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Gender"
                    value={gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setGender(item.value);
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
                <Pressable
                    onPress={() => setOpen(true)}
                    style={input.continer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/sms.png')} style={input.style} />
                        <Text style={[input.textinput, { color: isDateSelected ? '#000' : '#9CA3AF' }]}>
                            {isDateSelected ? moment(date).format('YYYY-MM-DD') : 'Date of birth'}
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/mingcute_down-fill.png')}
                        style={input.style}
                    />
                </Pressable>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    dividerColor="#FBC41D"
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                        setIsDateSelected(true);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    theme="light"
                />
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginHorizontal: wp(7),
                    marginVertical: hp(3),
                }}
            >
                <PrimaryButton
                    title="Submit"
                    onclick={() => handelSignup()}
                />
                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text
                        style={{
                            color: "#9CA3AF",
                            width: wp(70),
                            textAlign: "center",
                            marginTop: hp(1.5),
                            lineHeight: hp(3)
                        }}
                    >
                        By signing up you agree to
                        <Text style={{ color: "#FBC41D" }}>
                            {" "}
                            Terms of Services & Privacy Policy.
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignupScreen;
