import { Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Asset, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useCallback, useState } from "react";
import { ensureCameraPermission } from "../utils/permissions";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import PrimaryButton from "./PrimaryButton";

class Componentprops extends Baseprops {
    cameraModal?: boolean;
    close: any;
    selectedImage?: any
    onclick?: any;
    setImages?: any
}

const CameraModalScreen: React.FC<Componentprops> = (props) => {

    const [image, setImage] = useState<Asset | null>(null)

    const cameraPermissions = async () => {
        if (await ensureCameraPermission()) {
            cameraClick()
        }
    }

    const cameraClick = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            maxHeight: 600,
            maxWidth: 600
        })
        if (result.assets && result.assets.length > 0) {
            setImage(result.assets[0])
        }
    }

    const galleryClick = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            maxHeight: 600,
            maxWidth: 600
        })
        if (result.assets && result.assets.length > 0) {
            setImage(result.assets[0])
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.cameraModal}
        >
            <View style={[styles.centeredView,
            {
                backgroundColor: 'rgba(0,0,0,0.5)',
                marginTop: hp(0)
            }]}>
                <View style={[styles.modalView,
                { paddingVertical: hp(3) }]}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#000000'
                    }}>Select Photo</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: hp(3)
                        }}>
                        <Pressable
                            onPress={cameraPermissions}
                            style={{ alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30
                                }} source={require('../assets/Huge.png')} />
                            <Text
                                style={{
                                    color: '#000000',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Camera</Text>
                        </Pressable>
                        <Pressable
                            onPress={galleryClick}
                            style={{ alignItems: 'center' }}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../assets/gallery.png')} />
                            <Text
                                style={{
                                    color: '#000000',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Gallery</Text>
                        </Pressable>
                    </View>
                    {image != null ? <>
                        <Image style={{
                            width: 100,
                            height: 100,
                            marginTop: hp(2),
                            alignSelf: 'center'
                        }} source={{ uri: image?.uri }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center', marginHorizontal: wp(15),
                            marginTop: hp(3)
                        }}>
                            <PrimaryButton title='Submit'
                                onclick={() => {
                                    setImage(image),
                                        props.close()
                                    props.setImages(image)
                                    setImage(null)
                                }} />
                            <PrimaryButton
                                title='Cancel'
                                onclick={() => props.close()} />
                        </View>
                    </> :
                        <View style={{
                            marginHorizontal: wp(20),
                            marginTop: hp(5)
                        }}>
                            <PrimaryButton
                                title='Cancel'
                                onclick={() => props.close()} />
                        </View>}
                </View>
            </View>
        </Modal>
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


export default CameraModalScreen;