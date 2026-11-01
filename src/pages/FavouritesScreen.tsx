import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Cardview } from "../components/Cardview";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { getFavouriteCars, removeFavouriteCar } from "../apis/api";
import { showMessage } from "../components/MessageModal";
import { getFriendlyError } from "../utils/apiMessages";

class Componentprops extends Baseprops { }

const FavouritesScreen: React.FC<Componentprops> = (props) => {

    const [cars, setCars] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [removing, setRemoving] = useState<any>(null)

    useFocusEffect(
        useCallback(() => {
            loadFavourites()
        }, [])
    )

    const loadFavourites = async () => {
        setLoading(true)
        const response = await getFavouriteCars()
        setLoading(false)
        if (response.code == 0) {
            // The API returns one row per car image; keep one row per car.
            const seen: any = {}
            const list = (response.data || []).filter((e: any) => {
                if (seen[e.carid]) {
                    return false
                }
                seen[e.carid] = true
                return true
            })
            setCars(list)
        } else {
            showMessage(getFriendlyError(response))
        }
    }

    const handelRemove = async (carid: any) => {
        setRemoving(carid)
        const response = await removeFavouriteCar(carid)
        setRemoving(null)
        if (response.code == 0) {
            setCars((list: any) => list.filter((e: any) => e.carid != carid))
        } else {
            showMessage(getFriendlyError(response))
        }
    }

    // Car details and prices need trip dates, so booking starts from Home.
    const handelOpen = () => {
        showMessage({
            kind: 'info',
            title: 'Choose your trip dates',
            message: 'Pick your trip dates and location on the home screen to check availability and price for this car.',
            onClose: () => props.navigation.navigate('HomeScreen'),
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: wp(5)
            }}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Image source={require('../assets/Back.png')} style={BackButtonStyle.style} />
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: wp(3) }}>
                    Favourites
                </Text>
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='#00354a' size="large" />
                </View>
            ) : cars.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: wp(10) }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                        No favourites yet
                    </Text>
                    <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: hp(1) }}>
                        Tap the heart on a car to save it here.
                    </Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: wp(5), paddingBottom: hp(3) }}>
                    {cars.map((e: any) => (
                        <Pressable key={e.carid} onPress={handelOpen} style={{ marginBottom: hp(2) }}>
                            <Cardview>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: wp(3) }}>
                                    <Image
                                        source={{ uri: e.image_path }}
                                        style={{ height: hp(9), width: wp(30), borderRadius: 10, backgroundColor: '#F4F6FA' }} />
                                    <View style={{ flex: 1, marginHorizontal: wp(3) }}>
                                        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>
                                            {e.brand} {e.model}
                                        </Text>
                                        {!!e.varient && <Text numberOfLines={1} style={{ fontSize: 13, color: '#64748B' }}>{e.varient}</Text>}
                                        <Text style={{ fontSize: 12, color: '#64748B', marginTop: hp(0.5) }}>
                                            {[e.make_year, e.car_transmission, e.car_seating ? `${e.car_seating} seats` : null].filter(Boolean).join(' • ')}
                                        </Text>
                                    </View>
                                    {removing == e.carid ? (
                                        <ActivityIndicator color='#00354a' />
                                    ) : (
                                        <Pressable onPress={() => handelRemove(e.carid)} hitSlop={10}>
                                            <Text style={{ fontSize: 24, color: '#E53935' }}>♥</Text>
                                        </Pressable>
                                    )}
                                </View>
                            </Cardview>
                        </Pressable>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    )
}
export default FavouritesScreen
