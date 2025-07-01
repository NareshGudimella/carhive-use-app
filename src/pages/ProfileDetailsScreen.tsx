import { Alert, Image, TextInput, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { CameraView } from "../components/CameraView";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateProfile } from "../storage/redux";
import DatePicker from "react-native-date-picker";

class Componentprops extends Baseprops { }

const ProfileDetailsScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()
    const [profilDetails, setProfileDetails] = useState<any>(null)
    const [date, setDate] = useState<any>(new Date())
    const [userDetailsObj, setUserDetailsObj] = useState<any>({})
    const [showPicker, setShowPicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadUserDetails()
        }, [])
    )
    const genderData = [
        { id: "MALE", value: "MALE" },
        { id: "FEMALE", value: "FEMALE" },
        { id: "OTHER", value: "OTHER" },
    ];

    const loadUserDetails = async () => {
        const response = await excuteGetResponse('secure/profile')
        console.log('profile', response)
        if (response.code == 0) {
            setProfileDetails(response.data)
            dispatch(updateProfile(response.data));
            handleInputChangeValue('name', response.data.aadharcard_name)
            handleInputChangeValue('email', response.data.email)
            handleInputChangeValue('gender', response.data.gender)
            setDate(new Date(response.data.dob))
        } else {
            Alert.alert('Alert', 'Login your account')
        }
    }

    const handleInputChangeValue = (key: string, value: any) => {
        setUserDetailsObj((e: any) => ({ ...e, [key]: value }))
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>

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

                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: hp(1)
                            }}>
                                <Pressable
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: wp(12),
                                        borderColor: '#D9D9D9',
                                        padding: 2
                                    }}
                                    >{profilDetails &&
                                        profilDetails.profile_pic != null ?
                                        <Image
                                            source={{ uri: profilDetails.profile_pic }}
                                            style={{
                                                height: wp(22),
                                                width: wp(22),
                                                borderRadius: wp(11),
                                            }}
                                        />
                                        :
                                        <Image
                                            source={require('../assets/profile.png')}
                                            style={{
                                                height: wp(22),
                                                width: wp(22),
                                                borderRadius: wp(11),
                                            }}
                                        />
                                    }
                                </Pressable>
                            </View>
                            <Cardview>
                                <TextInput
                                    placeholder='Enter Name'
                                    placeholderTextColor='#000000'
                                    onChangeText={text => handleInputChangeValue('name', text)}
                                    value={userDetailsObj.name}
                                    editable={false}
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
                                    placeholder='Enter Email'
                                    placeholderTextColor='#000000'
                                    onChangeText={text => handleInputChangeValue('email', text)}
                                    value={userDetailsObj.email}
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
                                    borderRadius: 15,
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
                                    fontSize: 15,
                                    color: "#000000",
                                    fontWeight: 'bold'
                                }}
                                selectedTextStyle={{
                                    fontSize: 15,
                                    color: "#000",
                                    fontWeight: 'bold'
                                }}
                                iconStyle={{
                                    width: 24,
                                    height: 24,
                                }}
                                data={genderData}
                                maxHeight={300}
                                labelField="value"
                                valueField="id"
                                placeholder="Gender"
                                value={userDetailsObj.gender}
                                disable={true}
                                onChange={(item) => {
                                    handleInputChangeValue('gender', item.id)
                                }}
                            />
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <Text
                                    onPress={() => setShowPicker(false)}
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
                                open={showPicker}
                                date={date ? date : new Date()}
                                mode="date"
                                dividerColor="#FBC41D"
                                onConfirm={(selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) {
                                        setDate(selectedDate);
                                    }
                                }}
                                onCancel={() => {
                                    setShowPicker(false);
                                }}
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
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginVertical: hp(1)
                                    }}>Aadhar card</Text>
                                    {profilDetails && profilDetails.aadhar_verfy_flag == 1 &&
                                        <Image resizeMode='contain' style={{ width: 30, height: 30 }} source={require('../assets/check.png')} />
                                    }
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1)
                                }}>
                                    <View style={{
                                        width: wp(38)
                                    }}>
                                        <Cardview>
                                            {profilDetails && profilDetails.documents.aadhar_front ?
                                                <Pressable
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: hp(1)
                                                    }}>
                                                    <Image
                                                        source={{ uri: profilDetails.documents.aadhar_front }}
                                                        style={{
                                                            width: 120,
                                                            height: 90,
                                                            resizeMode: 'cover',
                                                            borderRadius: 10
                                                        }}
                                                    />
                                                </Pressable>
                                                :
                                                <CameraView
                                                    image={
                                                        require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                />
                                            }
                                        </Cardview>
                                    </View>
                                    <View style={{
                                        width: wp(38)
                                    }}>
                                        <Cardview>
                                            {profilDetails && profilDetails.documents.aadhar_front ?
                                                <Pressable
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(1)
                                                    }}>
                                                    <Image
                                                        source={{ uri: profilDetails.documents.aadhar_front }}
                                                        style={{
                                                            width: 120,
                                                            height: 90,
                                                            resizeMode: 'cover',
                                                            borderRadius: 10
                                                        }}
                                                    />
                                                </Pressable>
                                                :
                                                <CameraView
                                                    image={
                                                        require('../assets/Huge.png')}
                                                    title="Upload Back"

                                                />}
                                        </Cardview>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginVertical: hp(1)
                                    }}>Driving License</Text>
                                    {profilDetails && profilDetails.driving_licence_flag == 1 &&
                                        <Image resizeMode='contain' style={{ width: 30, height: 30 }} source={require('../assets/check.png')} />
                                    }
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1),
                                    marginBottom: hp(2)
                                }}>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            {profilDetails && profilDetails.documents.license_front ?
                                                <Pressable
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: profilDetails.documents.license_front }}
                                                        style={{
                                                            width: 110,
                                                            height: 75,
                                                            resizeMode: 'cover',
                                                            borderRadius: 10
                                                        }}
                                                    />
                                                </Pressable>
                                                :
                                                <CameraView
                                                    image={require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                />}
                                        </Cardview>
                                    </View>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            {profilDetails && profilDetails.documents.license_back ?
                                                <Pressable
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: profilDetails.documents.license_back }}
                                                        style={{
                                                            width: 110,
                                                            height: 75,
                                                            resizeMode: 'cover',
                                                            borderRadius: 10
                                                        }}
                                                    />
                                                </Pressable>
                                                :
                                                <CameraView
                                                    image={require('../assets/Huge.png')}
                                                    title="Upload Back"
                                                />}
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