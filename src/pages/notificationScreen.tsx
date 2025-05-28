import React, { useCallback, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Image, Pressable, ScrollView, Text, View, Dimensions, Alert } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import { hp, wp } from "../utils/ResponsiveScreen";
import { excuteGetResponse } from '../apis/api';
import { useFocusEffect } from '@react-navigation/native';

class Componentprops extends Baseprops { }

const NotificationScreen: React.FC<Componentprops> = (props) => {
    const screenWidth = Dimensions.get('window').width - wp(18);

    const [notification, setNotification] = useState<any>([])

    useFocusEffect(
        useCallback(() => {
            loadNotification()
        }, [])
    )

    const loadNotification = async () => {
        const response = await excuteGetResponse(`secure/notifications`)
        console.log('notify', response)
        if (response.code == 0) {
            setNotification(response.data)
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                paddingHorizontal: wp(5),
                paddingVertical: hp(2),
                elevation: 1
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
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginHorizontal: wp(2)
                }}>Summary</Text>
            </View>

            <ScrollView style={{
                flex: 1,
                marginHorizontal: wp(5),
                marginTop: hp(1)
            }}>
                {
                    notification && notification.map((e: any, index: any) => (
                        <View key={index}
                            style={{
                                backgroundColor: '#ffffff',
                                marginVertical: 4,
                                borderRadius: 10,
                                padding: wp(2)
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 2.5
                            }}>
                                <View style={{
                                    backgroundColor: '#EEEEEE80',
                                    height: 40,
                                    width: 40,
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                }}>
                                    <Image source={require('../assets/bell2.png')}
                                        style={{
                                            height: 16,
                                            width: 16
                                        }} />
                                </View>
                                <View style={{ marginHorizontal: wp(2) }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>{e.title}</Text>
                                    <Text
                                        style={{
                                            color: '#64748B',
                                            fontWeight: '400',
                                            fontSize: 14,
                                            marginTop: 1,
                                            width: wp(70)
                                        }}>{e.message}</Text>
                                </View>
                            </View>
                            {e.image_path && <View style={{
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: wp(2)
                            }}>
                                <AutoHeightImage
                                    width={screenWidth}
                                    source={{ uri: e.image_path }}
                                    style={{
                                        borderRadius: 10
                                    }}
                                />
                            </View>}
                            <View style={{
                                marginTop: 5,
                                alignItems: 'flex-end',
                                marginHorizontal: wp(2)
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>{e.time}</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;
