import { Alert, Image, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

class Componentprops extends Baseprops { }

const PaymentSuccessScreen: React.FC<Componentprops> = (props) => {

    const [orderDetails, setOrderDetails] = useState<any>(null)

    useFocusEffect(
        useCallback(() => {
            if (props.route.params && props.route.params.Id) {
                handelOrderDetails(props.route.params.Id)
            }
        }, [])
    )

    const handelOrderDetails = async (car_booking_id: any) => {
        const response = await excuteGetResponse(`secure/cars/bookings/details/${car_booking_id}`)
        if (response.code == 0) {
            setOrderDetails(response.data)
        } else {
            Alert.alert('Alert', 'unable to get details')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={require('../assets/true1.png')}
                    style={{
                        height: hp(25),
                        width: hp(25)
                    }}
                />
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold', 
                    color: '#000000'
                }}>₹{props.route && props.route.params && props.route.params.amount}</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#00354a',
                    marginVertical: hp(1)
                }}>Payment Done</Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        width: wp(70),
                        textAlign: 'center'
                    }}>Your payment is successfully completed</Text>
                <View style={{
                    width: wp(70),
                    marginVertical: hp(5)
                }}>
                    <PrimaryButton title='View details' onclick={() => props.navigation.navigate('HomeScreen')} />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default PaymentSuccessScreen