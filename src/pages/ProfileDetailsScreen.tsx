import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { CameraView } from "../components/CameraView";
import { useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const ProfileDetailsScreen: React.FC<Componentprops> = (props) => {

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
                                <Text style={{
                                    marginVertical: hp(2),
                                    marginHorizontal: wp(4),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    Avinash Naidu
                                </Text>
                            </Cardview>
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <Text style={{
                                    marginVertical: hp(2),
                                    marginHorizontal: wp(4),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    rowthuavinash@gmail.com
                                </Text>
                            </Cardview>
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <Text style={{
                                    marginVertical: hp(2),
                                    marginHorizontal: wp(4),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    Male
                                </Text>
                            </Cardview>
                            <View style={{ marginVertical: hp(0.8) }} />
                            <Cardview>
                                <Text style={{
                                    marginVertical: hp(2),
                                    marginHorizontal: wp(4),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    08/07/2000
                                </Text>
                            </Cardview>
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
                                                onclick={() => props.navigation.navigate('KycDetailsScreen')}
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
                                                onclick={() => props.navigation.navigate('KycDetailsScreen')}
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
                                                onclick={() => props.navigation.navigate('KycDetailsScreen')}
                                            />
                                        </Cardview>
                                    </View>
                                    <View style={{ width: wp(38) }}>
                                        <Cardview>
                                            <CameraView
                                                image={require('../assets/Huge.png')}
                                                title='Upload Back'
                                                onclick={() => props.navigation.navigate('KycDetailsScreen')}
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