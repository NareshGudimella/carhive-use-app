import { Image, Pressable, SafeAreaView, Text } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";

class Componentprops extends Baseprops { }

const PaymentScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable style={{
                marginHorizontal: wp(5),
                marginVertical: hp(2)
            }}>
                <Image
                    source={require('../assets/Back.png')}
                    style={{
                        height: 35,
                        width: 35
                    }} />
            </Pressable>
        </SafeAreaView>
    )
}
export default PaymentScreen