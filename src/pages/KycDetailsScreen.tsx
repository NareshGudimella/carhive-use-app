import {
    Alert,
    Image, Modal, Pressable, StyleSheet,
    Text, View
} from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { CameraView } from "../components/CameraView";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState } from "react";
import CameraModalScreen from "../components/CameraModel";
import { CenterModalView } from "../components/CenterModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "react-native-image-picker";
import { KycDetails } from "../apis/api";

class Componentprops extends Baseprops { }

const KycDetailsScreen: React.FC<Componentprops> = (props) => {
    const [cameraModal, SetCaremaModal] = useState(false)
    const [successKycModal, setSuccessKycModal] = useState(false)
    const [aadharfront, setAadharfront] = useState<Asset | null>(null)
    const [aadharback, setAadharBack] = useState<Asset | null>(null)
    const [licenseback, setlicenseBack] = useState<Asset | null>(null)
    const [licensefront, setlicensefront] = useState<Asset | null>(null)
    const [targetType, setTargetType] = useState('');

    const handelPhotosSubmit = async () => {
        if (aadharfront == null) {
            Alert.alert('Alert', 'Upload the Aadhar Front side photo')
            return
        }
        if (aadharback == null) {
            Alert.alert('Alert', 'Upload the Aadhar Back side photo')
            return
        }
        if (licensefront == null) {
            Alert.alert('Alert', 'Upload the License front side photo')
            return
        }
        if (licenseback == null) {
            Alert.alert('Alert', 'Upload the License front side photo')
            return
        }
        const response = await KycDetails(aadharfront, aadharback, licensefront, licenseback)
        console.log(response)
        if (response.code == 0) {
            setSuccessKycModal(true)
        }else{
            Alert.alert('Alert','unable to get KYC details')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {cameraModal && (
                <CameraModalScreen
                    close={() => SetCaremaModal(false)}
                    cameraModal={cameraModal}
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
                        }

                        SetCaremaModal(false);
                    }}
                />
            )}
            {
                successKycModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={successKycModal}
                        onRequestClose={() => {
                            setSuccessKycModal(!successKycModal);
                        }}>
                        <CenterModalView>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: hp(2)
                            }}>
                                <Image
                                    source={require('../assets/true.png')}
                                    style={{
                                        height: 180,
                                        width: 200
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}
                                >Congratulations! 👍</Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: '#64748B',
                                        width: wp(70),
                                        textAlign: 'center',
                                        marginVertical: hp(1)
                                    }}
                                >Your account is ready to use.
                                    You will be redirected to
                                    the Home page in a few seconds.</Text>
                                <View style={{width:wp(40),
                                    marginTop:hp(2)
                                }}>
                                    <PrimaryButton title='Back'
                                        onclick={() => props.navigation.navigate('HomeScreen')} />
                                </View>
                            </View>
                        </CenterModalView>
                    </Modal>
                </View>
            }

            <Pressable
                onPress={() => props.navigation.goBack()}
                style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(2),
                    marginTop: hp(4)
                }}>
                <Image
                    source={require("../assets/Back.png")}
                    style={{ height: 35, width: 35 }}
                />
            </Pressable>
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                <View style={{ marginBottom: hp(2) }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        marginTop: hp(1)
                    }}>
                        E-KYC
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "400",
                            color: "#64748B",
                            marginVertical: hp(1.5),
                            width: wp(80),
                            lineHeight: hp(3)
                        }}
                    >
                        Verify your identity in minutes with our
                        secure, paperless E-KYC process.
                        No long forms or in-person visits
                    </Text>
                </View>
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
                                        <View style={{
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
                                        </View>
                                        :
                                        <CameraView
                                            image={require('../assets/Huge.png')}
                                            title="Upload Front"
                                            onclick={() => {
                                                setTargetType('aadharfront');
                                                SetCaremaModal(true);
                                            }}


                                        />}
                                </Cardview>
                            </View>
                            <View style={{
                                width: wp(38)
                            }}>
                                <Cardview>
                                    {aadharback ?
                                        <View style={{
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
                                        </View>
                                        :
                                        <CameraView
                                            image={require('../assets/Huge.png')}
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
                                        <View style={{
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
                                        </View>
                                        :
                                        <CameraView
                                            image={require('../assets/Huge.png')}
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
                                        <View style={{
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
                                        </View>
                                        :
                                        <CameraView
                                            image={require('../assets/Huge.png')}
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
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end', marginVertical: hp(3)
                }}>
                    <PrimaryButton title='Submit'
                        onclick={() => handelPhotosSubmit()} />
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
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
export default KycDetailsScreen