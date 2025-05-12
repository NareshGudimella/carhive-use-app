import { Alert, Image, TextInput, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { CameraView } from "../components/CameraView";
import { useCallback, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse, updateProfile } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { input } from "../styles/TextInputStyle";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import CameraModalScreen from "../components/CameraModel";

class Componentprops extends Baseprops { }

const ProfileDetailsScreen: React.FC<Componentprops> = (props) => {
    const [profilDetails, setProfileDetails] = useState<any>(null)
    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState<any>(new Date())
    const [open, setOpen] = useState(false)
    const [cameraModal, SetCaremaModal] = useState(false)
    const [successKycModal, setSuccessKycModal] = useState(false)

    useFocusEffect(
        useCallback(() => {
            handelProfileDetails()
        }, [])
    )
    const genderData = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const handelProfileDetails = async () => {
        const response = await excuteGetResponse('secure/profile')
        console.log('profile', response)
        if (response.code == 0) {
            setProfileDetails(response.data)
            setDate(new Date(response.data.dob))
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }
    const handelUpdateProfile = async() => {
      
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            {
                CameraModalScreen &&
                <CameraModalScreen
                    close={() => SetCaremaModal(false)}
                    cameraModal={cameraModal}
                    onclick={() => setSuccessKycModal(true)}
                />}
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: wp(5),
                    marginTop: hp(4)
                }}>
                    <Pressable
                        onPress={() => props.navigation.goBack()}
                    >
                        <Image
                            source={require('../assets/Back.png')}
                            style={{
                                height: 35,
                                width: 35
                            }} />
                    </Pressable>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginHorizontal: wp(3),

                    }}>Profile details</Text>
                </View>
                <View style={{ marginHorizontal: wp(5) }}>
                    <Cardview>
                        <View
                            style={{
                                marginVertical: hp(2),
                                marginHorizontal: wp(4),

                            }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: hp(1.5),
                                marginHorizontal: wp(2)
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Personal details</Text>
                                <Pressable>
                                    <Image
                                        source={require('../assets/edit1.png')}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }} />
                                </Pressable>
                            </View>
                            <Cardview>
                                <TextInput
                                    placeholder={profilDetails && profilDetails.name}
                                    placeholderTextColor='#000000'
                                    style={{
                                        height: hp(6),
                                        marginHorizontal: wp(4),
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }} />
                            </Cardview>
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <TextInput
                                    placeholder={profilDetails && profilDetails.email}
                                    placeholderTextColor='#000000'
                                    style={{
                                        height: hp(6),
                                        marginHorizontal: wp(4),
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }} />

                            </Cardview>
                            <View style={{ marginVertical: hp(0.8) }} />

                            <Dropdown
                                style={{
                                    height: hp(6),
                                    borderColor: "#E5E7EB",
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    backgroundColor: "#ffffff",
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
                                    color: "#000000",
                                    fontWeight: 'bold'
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
                                placeholder={profilDetails && profilDetails.gender}
                                value={gender}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={(item) => {
                                    setGender(item.value);
                                    setIsFocus(false);
                                }}

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
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <Text
                                    onPress={() => setOpen(true)}
                                    style={{
                                        height: hp(6),
                                        marginHorizontal: wp(4),
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        top: hp(2)
                                    }}
                                >
                                    {date ? moment(date).format('YYYY-MM-DD') : 'Date of birth'}
                                </Text>
                            </Cardview>

                            <DatePicker
                                modal
                                open={open}
                                date={date ? date : new Date()}
                                mode="date"
                                dividerColor="#FBC41D"
                                onConfirm={(selectedDate) => {
                                    setOpen(false);
                                    setDate(selectedDate);
                                }}
                                onCancel={() => setOpen(false)}
                                theme="light"
                            />
                        </View>
                    </Cardview>
                    <View style={{
                        marginVertical: hp(2)
                    }}>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(4),
                                marginVertical: hp(1)
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginVertical: hp(1)
                                }}>Aadhar card</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1)
                                }}>
                                    <View style={{
                                        width: wp(38)
                                    }}>
                                        <Cardview>
                                            <CameraView
                                                image={require('../assets/Huge.png')}
                                                title='Upload Front'
                                                onclick={() => SetCaremaModal(true)}
                                            />
                                        </Cardview>
                                    </View>
                                    <View style={{
                                        width: wp(38)
                                    }}>
                                        <Cardview>
                                            <CameraView
                                                image={require('../assets/Huge.png')}
                                                title='Upload Back'
                                                onclick={() => SetCaremaModal(true)}
                                            />
                                        </Cardview>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginVertical: hp(1)
                                }}>Driving License</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1),
                                    marginBottom: hp(2)
                                }}>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            <CameraView
                                                image={require('../assets/Huge.png')}
                                                title='Upload Front'
                                                onclick={() => SetCaremaModal(true)}
                                            />
                                        </Cardview>
                                    </View>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            <CameraView
                                                image={require('../assets/Huge.png')}
                                                title='Upload Back'
                                                onclick={() => SetCaremaModal(true)}
                                            />
                                        </Cardview>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfileDetailsScreen