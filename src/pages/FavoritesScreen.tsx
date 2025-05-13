import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import { input } from "../styles/TextInputStyle";
import BottomTabNavigation from "../components/BottomTab";
import { Cardview } from "../components/Cardview";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

class Componentprops extends Baseprops { }

const FavoritesScreen: React.FC<Componentprops> = (props) => {
    const [favoriteList, setFavoriteList] = useState<any>([])
    useFocusEffect(
        useCallback(() => {
            handelFavorites()
        }, [])
    )
    const handelFavorites = async () => {
        const response = await excuteGetResponse(`secure/cars/favorite`)
        console.log('favorites',response)
        if (response.code == 0) {
            setFavoriteList(response.data)
        }else{
            Alert.alert('Alert','Unable to get details of Favorites')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: '#ffffff',
                padding: hp(2),
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: hp(1)
                }}>Favorites</Text>
            </View>
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 10,
                elevation: 1,
                height: hp(6),
                marginVertical: hp(1),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(5),
                marginHorizontal: wp(5)
            }}>
                <Image source={require('../assets/search.png')}
                    style={input.imgstyle} />
                <TextInput
                    placeholder="Search by Vehicle..."
                    placeholderTextColor='#64748B'
                    style={{
                        fontSize: 15,
                        fontWeight: '500',
                        width: wp(70),
                        marginHorizontal: wp(2)
                    }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    marginHorizontal: wp(5),
                    marginVertical: hp(1)
                }}>
                {
                    favoriteList && favoriteList.map((e: any, index: any) => (
                        <Pressable key={index}
                            style={{ marginVertical: hp(1) }}>
                            <Cardview>
                                <View style={{ padding: hp(2) }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={{uri:e.image_path}}
                                                style={{
                                                    height: 70,
                                                    width: 85,
                                                    borderRadius:10
                                                }} />
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    marginHorizontal: wp(3)
                                                }}>{e.brand} {e.model}</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#0000000A',
                                            height: hp(4),
                                            width: hp(4),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20
                                        }}>
                                            <Image
                                                source={require('../assets/shop.png')}
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    tintColor: '#FF0000'
                                                }} />
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: wp(1)
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                color: '#666666',
                                            }}>
                                           {e.car_rating}
                                        </Text>
                                        <Rating
                                            readonly
                                            startingValue= {e.car_rating}
                                            imageSize={12}
                                            ratingCount={5}
                                            fractions={1}
                                            style={{ marginLeft: 8 }}
                                        />
                                        <Text>
                                            - <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                color: '#666666'
                                            }}>{e.make_year}
                                            </Text> - <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '500',
                                                    color: '#666666'
                                                }}>{e.car_seating} seats - {e.car_transmission}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </Cardview>
                        </Pressable>
                    ))
                }
            </ScrollView>
            <BottomTabNavigation step={2} navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default FavoritesScreen