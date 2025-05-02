import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { SelectorBoxStyle } from "../styles/Selectorbox";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const ExtendServiceRequestScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: wp(5)
                }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../assets/Back.png')}
                            style={{
                                height: 40,
                                width: 40
                            }} />
                    </Pressable>
                    <Text style={{
                        marginHorizontal: wp(2),
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Request Return</Text>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginTop: hp(12)
                }}>
                    <Cardview>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: hp(1)
                        }}>
                            <Image
                                source={require('../assets/pngegg1.png')}
                                style={{
                                    position: 'absolute',
                                    height: hp(20),
                                    width: hp(25),
                                    top: hp(-12)
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: hp(11),
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>Booking ID : 134123</Text>
                            <Text
                                style={{
                                    color: '#64748B',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    marginVertical: hp(1)
                                }}>Range Rover</Text>
                        </View>
                    </Cardview>
                </View>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginHorizontal: wp(5),
                    marginVertical: hp(1.5)
                }}>Extend Date & Time</Text>
                <View style={{
                    marginHorizontal: wp(5)
                }}>
                    <Cardview>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(4),
                            marginVertical: hp(1.5)
                        }}>
                            <Pressable
                                onPress={() => props.navigation.navigate('CalendarScreen')}
                                style={[SelectorBoxStyle.style, {
                                    flexDirection: 'row',

                                }]}>
                                <Image
                                    source={
                                        require('../assets/calendar-add(1).png')}
                                    style={BottomTabstyles.selectedstyle}
                                    tintColor='#000000'
                                />
                                <Text
                                    style={{
                                        marginHorizontal: wp(2.5),
                                        fontSize: 14,
                                        fontWeight: '600'
                                    }}>29 April 2025</Text>
                            </Pressable>
                            <Pressable style={[SelectorBoxStyle.style, {
                                flexDirection: 'row',

                            }]}>
                                <Image
                                    source={require('../assets/clock.png')}
                                    style={BottomTabstyles.selectedstyle} />
                                <Text
                                    style={{
                                        marginHorizontal: wp(2.5),
                                        fontSize: 14,
                                        fontWeight: '600'
                                    }}>10:00PM</Text>
                            </Pressable>
                        </View>
                    </Cardview>
                </View>
                <View style={{ marginHorizontal: wp(5) }}>
                    <Text style={{
                        color: '#64748B99',
                        fontWeight: '500',
                        fontSize: 13,
                        marginVertical: hp(2),
                        marginTop: hp(4)
                    }}>Note : </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: '#64748B99',
                            fontSize: 13,
                        }}>1 . </Text>
                        <Text style={{
                            width: wp(75),
                            color: '#64748B99',
                            fontSize: 13,
                            lineHeight: hp(3)
                        }}>Additional charges apply
                            based on hourly or daily rates.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: '#64748B99',
                            fontSize: 13
                        }}>2 . </Text>
                        <Text style={{
                            width: wp(75),
                            color: '#64748B99',
                            fontSize: 13,
                            lineHeight: hp(3)
                        }}>Wait for confirmation before
                            assuming the extension is granted.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: '#64748B99',
                            fontSize: 13
                        }}>3 . </Text>
                        <Text style={{
                            width: wp(75),
                            color: '#64748B99',
                            fontSize: 13,
                            lineHeight: hp(3)
                        }}>Request extensions before your
                            current rental period ends.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                marginHorizontal: wp(5),
                marginVertical: hp(3)
            }}>
                <PrimaryButton title='Request Now'
                    onclick={() => props.navigation.navigate('RentalsScreen')} />
            </View>
        </SafeAreaView>
    )
}
export default ExtendServiceRequestScreen