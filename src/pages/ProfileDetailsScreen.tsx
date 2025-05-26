import { Alert, Image, TextInput, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { CameraView } from "../components/CameraView";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse, userUpdateProfile } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import CameraModalScreen from "../components/CameraModel";
import { Asset } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { updateProfile } from "../storage/redux";
import PrimaryButton from "../components/PrimaryButton";

class Componentprops extends Baseprops { }

const ProfileDetailsScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()
    const [profilDetails, setProfileDetails] = useState<any>(null)
    const [date, setDate] = useState<any>(new Date())
    const [open, setOpen] = useState(false)
    const [cameraModal, SetCaremaModal] = useState(false)
    const [successKycModal, setSuccessKycModal] = useState(false)
    const [aadharfront, setAadharfront] = useState<Asset | null>(null)
    const [aadharback, setAadharBack] = useState<Asset | null>(null)
    const [licenseback, setlicenseBack] = useState<Asset | null>(null)
    const [licensefront, setlicensefront] = useState<Asset | null>(null)
    const [targetType, setTargetType] = useState('');
    const [userDetailsObj, setUserDetailsObj] = useState<any>({})
    const [profileImage, setProfileImage] = useState<Asset | null>(null)

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
            handleInputChangeValue('name', response.data.name)
            handleInputChangeValue('email', response.data.email)
            handleInputChangeValue('gender', response.data.gender)
            setDate(new Date(response.data.dob))
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }

    const handleInputChangeValue = (key: string, value: any) => {
        setUserDetailsObj((e: any) => ({ ...e, [key]: value }))
    }

    const handleUpdateBtn = async () => {
        const object = JSON.parse(JSON.stringify(userDetailsObj))
        object.dob = moment(date).format('YYYY-MM-DD')
        object.aadhar_front_image = aadharfront
        object.aadhar_back_image = aadharback
        object.driving_licence_front = licensefront
        object.driving_licence_back = licenseback
        console.log('profileOBj', object)
        const response = await userUpdateProfile(object)
        console.log('profileOBj111', response)
        if (response.code == 0) {
            props.navigation.navigate('ProfileScreen')
        } else {
            Alert.alert('Alert!', 'Unable to get details.')
        }

    }


    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            {cameraModal && (
                <CameraModalScreen
                    close={() => SetCaremaModal(false)}
                    cameraModal={cameraModal}
                    onclick={() => setSuccessKycModal(true)}
                    setImages={(image: Asset) => {
                        switch (targetType) {
                            case 'aadharfront':
                                setAadharfront(image);
                                break;
                            case 'aadharback':
                                setAadharBack(image);
                                break;
                            case 'licensefront':
                                setlicensefront(image);
                                break;
                            case 'licenseback':
                                setlicenseBack(image);
                                break;
                            case 'Profile':
                                setProfileImage(image);
                                break;
                        }

                        SetCaremaModal(false);
                    }}
                />
            )}
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
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: hp(1)
                            }}>
                                <Pressable onPress={() => {
                                    SetCaremaModal(true),
                                        setTargetType('Profile')
                                }}>
                                    <Image
                                        source={profileImage != null ?
                                            { uri: profileImage?.uri }
                                            : require('../assets/profile.png')}
                                        style={{
                                            height: wp(25),
                                            width: wp(25),
                                            borderRadius: wp(12)
                                        }} />
                                </Pressable>

                            </View>
                            <Cardview>
                                <TextInput
                                    placeholder='Enter Name'
                                    placeholderTextColor='#000000'
                                    onChangeText={text => handleInputChangeValue('name', text)}
                                    value={userDetailsObj.name}
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
                                labelField="value"
                                valueField="id"
                                placeholder="Gender"
                                value={userDetailsObj.gender}
                                onChange={(item) => {
                                    handleInputChangeValue('gender', item.id)
                                }}
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
                                            {aadharfront ?
                                                <Pressable
                                                    onPress={() => {
                                                        setTargetType('aadharfront');
                                                        SetCaremaModal(true);
                                                    }}
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: aadharfront?.uri }}
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
                                                    image={profilDetails &&
                                                        profilDetails.documents.aadhar_front != null ?
                                                        { uri: profilDetails.documents.aadhar_front } :
                                                        require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                    onclick={() => {
                                                        setTargetType('aadharfront');
                                                        SetCaremaModal(true);
                                                    }}
                                                />
                                            }
                                        </Cardview>
                                    </View>
                                    <View style={{
                                        width: wp(38)
                                    }}>
                                        <Cardview>
                                            {aadharback ?
                                                <Pressable
                                                    onPress={() => {
                                                        setTargetType('aadharback');
                                                        SetCaremaModal(true);
                                                    }}
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: aadharback?.uri }}
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
                                                    image={profilDetails &&
                                                        profilDetails.documents.aadhar_back != null ?
                                                        { uri: profilDetails.documents.aadhar_back }
                                                        :
                                                        require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                    onclick={() => {
                                                        setTargetType('aadharback');
                                                        SetCaremaModal(true);
                                                    }}

                                                />}
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
                                            {licensefront ?
                                                <Pressable
                                                    onPress={() => {
                                                        SetCaremaModal(true);
                                                        setTargetType('licensefront')
                                                    }}
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: licensefront?.uri }}
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
                                                    image={
                                                        profilDetails &&
                                                            profilDetails.documents.license_front != null ?
                                                            { uri: profilDetails.documents.license_front } :
                                                            require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                    onclick={() => {
                                                        SetCaremaModal(true);
                                                        setTargetType('licensefront')
                                                    }}
                                                />}
                                        </Cardview>
                                    </View>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            {licenseback ?
                                                <Pressable
                                                    onPress={() => {
                                                        SetCaremaModal(true);
                                                        setTargetType('licenseback')
                                                    }}
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        paddingVertical: hp(2)
                                                    }}>
                                                    <Image
                                                        source={{ uri: licenseback?.uri }}
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
                                                    image={
                                                        profilDetails &&
                                                            profilDetails.documents.license_back != null ?
                                                            { uri: profilDetails.documents.license_back } :
                                                            require('../assets/Huge.png')}
                                                    title="Upload Front"
                                                    onclick={() => {
                                                        SetCaremaModal(true);
                                                        setTargetType('licenseback')
                                                    }}
                                                />}
                                        </Cardview>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginHorizontal: wp(5), marginVertical: hp(2)
                    }}>
                        <PrimaryButton title='Submit' onclick={() => {
                            handleUpdateBtn()
                        }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfileDetailsScreen