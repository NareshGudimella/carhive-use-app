import { Alert, Image, Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import BottomTabNavigation from "../components/BottomTab";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile } from "../storage/redux";
import { removeToken } from "../storage/AsyncStorage";

class Componentprops extends Baseprops { }

const ProfileScreen: React.FC<Componentprops> = (props) => {
    const [logoutModal, setLogoutModal] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.profile)

    const handelLogout = async () => {
        dispatch(removeProfile(null))
        await removeToken()
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }]
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                logoutModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={logoutModal}
                        onRequestClose={() => {
                            setLogoutModal(!logoutModal);
                        }}>
                        <BottomModelView onclick={() => setLogoutModal(false)}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: hp(3)
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>Log out</Text>
                                <Text
                                    style={{
                                        marginVertical: hp(2),
                                        fontWeight: '500',
                                        fontSize: 15
                                    }}>Do you want to log out ?</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: hp(1)
                                }}>
                                    <Pressable
                                        onPress={() => handelLogout()}
                                        style={{
                                            borderWidth: 1,
                                            paddingVertical: hp(1.2),
                                            width: wp(35),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: wp(2),
                                            borderRadius: 10,
                                            borderColor: '#00354a'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: '#00354a'
                                            }}>Yes</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setLogoutModal(false)}
                                        style={{
                                            borderWidth: 1,
                                            paddingVertical: hp(1.2),
                                            width: wp(35),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: wp(2),
                                            borderRadius: 10,
                                            borderColor: '#00354a',
                                            backgroundColor: '#00354a'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: '#ffffff'
                                            }}>No</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    padding: wp(5),
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginVertical: hp(1)
                        }}>Profile</Text>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(2)
                }}>
                    <Cardview>
                        <View style={{
                            marginHorizontal: wp(5),
                            marginVertical: hp(1.5)
                        }}>
                            <Text
                            numberOfLines={1}
                             style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>Hi, {user && user.aadharcard_name}</Text>
                            <Text
                                style={{
                                    color: '#64748B',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginTop: hp(0.5)
                                }}>Welcome to our App.....</Text>
                        </View>
                    </Cardview>
                    <View style={{
                        marginVertical: hp(2)
                    }}>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(4),
                                marginVertical: hp(2)
                            }}>
                                <Pressable
                                    onPress={() => props.navigation.navigate('ProfileDetailsScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/frame1.png')}
                                            style={{
                                                height: 22,
                                                width: 22,
                                                tintColor: '#000000'
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>View profile</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Update your personal
                                            info conveniently</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable
                                    onPress={() => props.navigation.navigate('HostScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/gift.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Become a Host</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>You want to become a
                                            host for your car...</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable onPress={() => Linking.openURL(`tel: ${8143993222}`)} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/Chat_Circle_Dots.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Get Help</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Assistance at your fingertips,
                                            support just a click.</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable
                                    onPress={() => props.navigation.navigate('NotificationScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/bell1.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Notifications</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Check your Notification</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <Text
                                    onPress={() => {
                                        Linking.openURL('https://carhive.co.in/terms_conditions')
                                    }}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>
                                    Terms & Conditions
                                </Text>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#F4F6FA',
                                        marginVertical: hp(2)
                                    }} />
                                <Text
                                    onPress={() => {
                                        Linking.openURL('https://carhive.co.in/privacy_policy')
                                    }}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Privacy policy</Text>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#F4F6FA',
                                        marginVertical: hp(2)
                                    }} />
                                <Text
                                    onPress={() => setLogoutModal(true)}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Logout</Text>
                            </View>
                        </Cardview>
                    </View>
                </View>
            </ScrollView>
            <BottomTabNavigation step={3} navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default ProfileScreen