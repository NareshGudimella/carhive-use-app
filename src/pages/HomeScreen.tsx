import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { Background } from "../styles/BackgroundColor";
import BottomTabNavigation from "../components/BottomTab";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SelectorBoxStyle } from "../styles/Selectorbox";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Cardview } from "../components/Cardview";
import { CarouselimageStyles } from "../styles/CarouselimageStyles";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const HomeScreen: React.FC<Componentprops> = (props) => {

    const ref = React.useRef<ICarouselInstance>(null);

    return (
        <SafeAreaView style={[Background.bgcolor, { flex: 1 }]}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: hp(4),
                    }}>
                        <Pressable
                            onPress={() => props.navigation.navigate('SelectCityScreen')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                height: hp(6),
                                borderRadius: 25,
                                paddingHorizontal: wp(3),
                                marginHorizontal: wp(5),
                                elevation: 2,
                            }}>
                            <Image
                                source={require('../assets/Location.png')}
                                style={{ height: 26, width: 26 }}
                            />
                            <Text style={{
                                marginHorizontal: wp(2)
                            }}>
                                Madhapur
                            </Text>
                            <Image
                                source={require('../assets/mingcute_down-fill.png')}
                                style={{ height: 10, width: 25 }}
                            />
                        </Pressable>
                        <Image
                            source={require('../assets/Clouds.png')}
                            style={{
                                height: hp(3.3),
                                width: wp(48)
                            }}
                        />
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/car.png')}
                            style={{
                                height: hp(5),
                                width: wp(45),
                                alignSelf: 'flex-end'
                            }} />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            elevation: 1,
                            paddingHorizontal: wp(5),
                            paddingVertical: hp(2)
                        }}>
                        <View style={{ marginVertical: hp(2) }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Book your ride now</Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '500',
                                color: '#64748B'
                            }}>Your journey awaits, book it right away.</Text>
                        </View>

                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: wp(5),
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#64748B',
                                                fontWeight: '500'
                                            }}>Pickup Date</Text>
                                        <Pressable
                                            onPress={() => props.navigation.navigate('CalendarScreen')}
                                            style={[SelectorBoxStyle.style, {
                                                flexDirection: 'row',
                                                marginTop: wp(2)
                                            }]}>
                                            <Image
                                                source={
                                                    require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>29 April 2025</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '500'
                                        }}>Time</Text>
                                        <Pressable style={[SelectorBoxStyle.style, {
                                            flexDirection: 'row',
                                            marginTop: wp(2)
                                        }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle} />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>10:00PM</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(3)
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#64748B',
                                                fontWeight: '500'
                                            }}>Drop Date</Text>
                                        <Pressable style={[SelectorBoxStyle.style, {
                                            flexDirection: 'row',
                                            marginTop: wp(2)
                                        }]}>
                                            <Image
                                                source={
                                                    require('../assets/calendar-add(1).png')}
                                                style={BottomTabstyles.selectedstyle}
                                                tintColor='#000000'
                                            />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>29 April 2025</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '500'
                                        }}>Time</Text>
                                        <Pressable style={[SelectorBoxStyle.style, {
                                            flexDirection: 'row',
                                            marginTop: wp(2)
                                        }]}>
                                            <Image
                                                source={require('../assets/clock.png')}
                                                style={BottomTabstyles.selectedstyle} />
                                            <Text
                                                style={{
                                                    marginHorizontal: wp(2),
                                                    fontSize: 14,
                                                    fontWeight: '600'
                                                }}>10:00PM</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <PrimaryButton title="Search"
                                    onclick={() =>
                                        props.navigation.navigate('SelectVehicleScreen')} />
                            </View>
                        </Cardview>
                        <Carousel
                            autoPlay={true}
                            ref={ref}
                            width={wp(90)}
                            style={{ marginTop: hp(2) }}
                            height={hp(25)}
                            data={[1, 2, 3]}
                            renderItem={({ index }: { index: any }) => (
                                <View>
                                    <Image source={require('../assets/image.png')}
                                        style={CarouselimageStyles.style} />
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
                <BottomTabNavigation step={1} navigation={props.navigation} />
            </SafeAreaView>
        </SafeAreaView>
    )
}
export default HomeScreen