import { Image, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }
const PaymentSuccessScreen: React.FC<Componentprops> = (props) => {
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
                    fontWeight: 'bold'
                }}>₹750</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#FBC41D',
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