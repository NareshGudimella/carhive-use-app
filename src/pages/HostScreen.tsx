import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const HostScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: wp(5),
                    marginTop: hp(2.5)
                }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../assets/Back.png')}
                            style={{
                                height: 35,
                                width: 35
                            }}
                        />
                    </Pressable>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginHorizontal: wp(3)
                    }}>Become a Host</Text>
                </View>
                <ScrollView style={{
                    flex: 1
                }}>
                    <View
                        style={{
                            marginHorizontal: wp(5)
                        }}>
                        <Cardview>
                            <View style={{ padding: hp(2) }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        source={require('../assets/host.png')}
                                        style={{
                                            height: wp(45),
                                            width: wp(45)
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>Become a Host</Text>
                                    <Text
                                        style={{
                                            marginHorizontal: wp(3),
                                            textAlign: 'center',
                                            fontSize: 13,
                                            fontWeight: '500',
                                            marginVertical: hp(1)
                                        }}>Have a car you’re not using all
                                        the time? Let it work for you.</Text>
                                    <Text
                                        style={{
                                            marginHorizontal: wp(5),
                                            textAlign: 'center',
                                            fontSize: 13,
                                            fontWeight: '500',
                                            lineHeight: hp(2.5)
                                        }}
                                    >Join thousands of car owners who
                                        are earning extra income by sharing
                                        their vehicles on [App Name]. Whether
                                        it’s parked during the week or just
                                        used occasionally, your car could be
                                        helping you earn.</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>Why Host With Us?</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: hp(1)
                                    }}>
                                        <Image
                                            source={require('../assets/dot.png')}
                                            style={{
                                                height: 15,
                                                width: 15,
                                                top: 3
                                            }} />
                                        <View style={{
                                            marginHorizontal: wp(1)
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }}>💰 Earn on Your Terms</Text>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontWeight: '500',
                                                    fontSize: 12,
                                                    marginTop: 2,
                                                    width: wp(70),
                                                    lineHeight: hp(2)
                                                }}
                                            >Set your own pricing and
                                                availability. Whether it’s a
                                                weekend or a full month, you’re
                                                in control of when your car
                                                is rented out.</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: hp(1)
                                    }}>
                                        <Image
                                            source={require('../assets/dot.png')}
                                            style={{
                                                height: 15,
                                                width: 15,
                                                top: 3
                                            }} />
                                        <View style={{
                                            marginHorizontal: wp(1)
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }}>🔒 Protected Every Trip</Text>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontWeight: '500',
                                                    fontSize: 12,
                                                    marginTop: 2,
                                                    width: wp(70),
                                                    lineHeight: hp(2)
                                                }}
                                            >We’ve got your back. Each trip is
                                                covered with industry-leading
                                                insurance and 24/7 roadside
                                                assistance for peace of mind.</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: hp(1)
                                    }}>
                                        <Image
                                            source={require('../assets/dot.png')}
                                            style={{
                                                height: 15,
                                                width: 15,
                                                top: 3
                                            }} />
                                        <View style={{
                                            marginHorizontal: wp(1)
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }}>📈 Maximize Your Car’s Value</Text>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontWeight: '500',
                                                    fontSize: 13,
                                                    marginTop: 2,
                                                    width: wp(70),
                                                    lineHeight: hp(2)
                                                }}
                                            >Most cars sit unused 95% of the time.
                                                Hosting is a smart way to offset car
                                                payments, maintenance costs, or save
                                                for something big.</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: hp(1)
                                    }}>
                                        <Image
                                            source={require('../assets/dot.png')}
                                            style={{
                                                height: 15,
                                                width: 15,
                                                top: 3
                                            }} />
                                        <View style={{
                                            marginHorizontal: wp(1)
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }}>🚗 List in Minutes</Text>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontWeight: '500',
                                                    fontSize: 13,
                                                    marginTop: 2,
                                                    width: wp(70),
                                                    lineHeight: hp(2)
                                                }}
                                            > It’s quick and easy. Add your car,
                                                set the rules, and go live — all
                                                from the app.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginHorizontal: wp(5),
                        marginVertical: hp(3)
                    }}>
                        <PrimaryButton title='Become a Host'
                            onclick={() => props.navigation.navigate('BecomeHostScreen')} />
                       
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default HostScreen