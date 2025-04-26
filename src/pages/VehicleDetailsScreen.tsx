import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import { Cardview } from "../components/Cardview";
import { useState } from "react";
import { ImageStyle } from "../styles/ImageStyle";
import { AirbnbRating } from "react-native-ratings";

class Componentprops extends Baseprops { }

const VehicleDetailsScreen: React.FC<Componentprops> = (props) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    source={require('../assets/Image(3).png')}
                    style={{
                        height: hp(30),
                        width: wp(100)
                    }} />
                <View style={{
                    position: 'absolute',
                    top: hp(2),
                    marginHorizontal: wp(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(90)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Pressable>
                            <Image
                                source={require('../assets/Back.png')}
                                style={BackButtonStyle.style}
                                tintColor='#ffffff'
                            />
                        </Pressable>
                        <Text
                            style={{
                                color: '#ffffff',
                                marginHorizontal: wp(2),
                                fontWeight: 'bold'
                            }}
                        >Vehicle details</Text>
                    </View>
                    <Pressable style={{
                        backgroundColor: '#ffffff',
                        padding: wp(1.5),
                        borderRadius: 20
                    }}>
                        <Image source={require('../assets/shop1.png')}
                            style={BottomTabstyles.selectedstyle} />
                    </Pressable>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginTop: hp(2)
                }}>
                    <Cardview>
                        <View style={{
                            paddingVertical: hp(1),
                            paddingHorizontal: hp(2)
                        }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                            >Range Rover Sport</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginVertical: wp(1.5),
                                    color: '#64748B'
                                }}>
                                {expanded ? (
                                    <>
                                        Simplifies renting a Bike, enabling
                                        users to search for available
                                        vehicles, select pick-up and times,
                                        choose a car type, and manage their
                                        booking. The app helps rental
                                        companies to manage their fleet,
                                        track reservations.{' '}
                                        <Text
                                            onPress={() => setExpanded(false)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            Show less &lt;&lt;
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        Simplifies renting a Bike, enabling
                                        users to search for available vehicles,
                                        select pick-up locations and times,
                                        choose a car type , and manage their ...
                                        {' '}
                                        <Text
                                            onPress={() => setExpanded(true)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            See all &gt;&gt;
                                        </Text>
                                    </>
                                )}
                            </Text>
                        </View>
                    </Cardview>
                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2)
                            }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>Equipment</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: wp(2)
                                }}>
                                    <View >
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/IconAir.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Air</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center', marginVertical: hp(1)
                                        }}>
                                            <Image
                                                source={require('../assets/Icon.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Cruise Control</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Music.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Music Player</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: wp(5) }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Compass.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>GPS</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: hp(1)
                                        }}>
                                            <Image
                                                source={require('../assets/Steer.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Manual</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Tyre.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Winter Tyres</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginBottom: hp(1)
                        }}>Host Details</Text>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../assets/user.png')}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 30
                                    }} />
                                <View style={{ marginHorizontal: wp(5) }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>Avinash Naidu</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: '400'
                                        }}>3.4</Text>
                                        <AirbnbRating
                                            count={5}
                                            defaultRating={3.5}
                                            size={30}
                                            isDisabled={true} 
                                            showRating={false} 
                                        />
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
export default VehicleDetailsScreen