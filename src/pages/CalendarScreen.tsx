import { Image, Platform, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const CalendarScreen: React.FC<Componentprops> = (props) => {

    const [selectedDate, setSelectedDate] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F8F9' }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: wp(5),
                        marginVertical: hp(3), alignItems: 'center'
                    }}>
                    <Pressable
                        onPress={() => props.navigation.goBack()}
                        style={{
                            height: hp(6),
                            width: wp(13),
                            backgroundColor: '#ffffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            elevation: 2
                        }}
                    >
                        <Image
                            source={require('../assets/close.png')}
                            style={BottomTabstyles.selectedstyle}
                        />
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: '#ffffff',
                            height: hp(6),
                            width: wp(20),
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 2

                        }}
                    >
                        <Text>Reset</Text>
                    </Pressable>
                </View>
                <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                    <Cardview>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: wp(2)
                        }}>
                            <View style={{ padding: hp(2) }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 500
                                }}>
                                    Thursday,
                                </Text>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginVertical: hp(1)
                                }}>Mar 19</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 500
                                    }}>
                                    9:00 AM
                                </Text>
                            </View>
                            <View style={{
                                backgroundColor: '#FBC41D',
                                height: hp(5),
                                width: wp(13),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25,
                                elevation: 1
                            }}>
                                <Image
                                    source={require('../assets/arrow-left.png')}
                                    style={BottomTabstyles.selectedstyle}
                                />
                            </View>
                            <View style={{ padding: hp(2) }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 500
                                }}>
                                    Thursday,
                                </Text>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginVertical: hp(1)
                                }}>Mar 19</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 500
                                    }}>
                                    9:00 AM
                                </Text>
                            </View>
                        </View>
                    </Cardview>
                    <View style={{ marginVertical: hp(2) }}>
                        <Calendar
                            onDayPress={(day) => {
                                setSelectedDate(day.dateString);
                            }}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: '#A8E178',
                                },
                            }}
                            theme={{
                                backgroundColor: '#F7F8F9',
                                textDayFontSize: 16,
                                calendarBackground: '#F7F8F9',
                                dayTextColor: '#000000',
                                monthTextColor: '#000000',
                                textSectionTitleColor: '#000000',
                                selectedDayBackgroundColor: '#FBC41D',
                                todayTextColor: '#FBC41D',
                                arrowColor: '#000000',
                            }}
                            style={{
                                backgroundColor: '#F7F8F9',

                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: hp(2)
                    }}>
                        <Cardview>
                            <View style={{
                                flexDirection: 'row',
                                padding: hp(1),
                                alignItems: 'center',
                                width: wp(40)
                            }}>
                                <Image
                                    source={require('../assets/clock.png')}
                                    style={[BottomTabstyles.selectedstyle, {
                                        marginHorizontal: wp(2)
                                    }]}
                                />
                                <View style={{}}>
                                    <Text
                                        style={{
                                            color: '#7C7C7C',
                                            fontSize: 14,
                                            fontWeight: 400
                                        }}
                                    >Start time</Text>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '600'
                                        }}
                                    >9:00 AM</Text>
                                </View>
                            </View>
                        </Cardview>
                        <Cardview>
                            <View style={{
                                flexDirection: 'row',
                                padding: hp(1),
                                alignItems: 'center',
                                width: wp(40)
                            }}>
                                <Image
                                    source={require('../assets/clock.png')}
                                    style={[BottomTabstyles.selectedstyle, {
                                        marginHorizontal: wp(2)
                                    }]}
                                />
                                <View style={{ marginHorizontal: wp(2) }}>
                                    <Text
                                        style={{
                                            color: '#7C7C7C',
                                            fontSize: 14,
                                            fontWeight: 400
                                        }}>End time</Text>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '600'
                                        }}>9:00 AM</Text>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default CalendarScreen