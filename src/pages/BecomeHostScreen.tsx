import { Image, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const BecomeHostScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable
                onPress={() => props.navigation.goBack()}
                style={{ padding: hp(2),
                    marginTop:hp(2)
                 }}>
                <Image source={require('../assets/Back.png')}
                    style={{
                        height: 35,
                        width: 35
                    }} />
            </Pressable>
            <View style={{ marginHorizontal: wp(5) }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold'
                }}>Become a Host</Text>
                <Text style={{
                    fontSize: 17,
                    color: '#9CA3AF',
                    width: wp(65),
                    lineHeight: hp(3),
                    marginVertical: hp(2)
                }}>Have a car you’re not using all
                    the time? Let it work for you.</Text>
                <View style={{ marginVertical: hp(1) }}>
                    <Textinput placeholder='Your name'
                        image={require('../assets/users.png')}
                        keyboardtype='default' />
                    <Textinput placeholder='Your email'
                        image={require('../assets/sms.png')}
                        keyboardtype='default' />
                    <Textinput placeholder='Mobile number'
                        image={require('../assets/sms.png')}
                        keyboardtype='numeric' />
                </View>
            </View>
            <View style={{
                marginHorizontal: wp(5),
                flex: 1,
                justifyContent: 'flex-end',
                marginVertical: hp(1)
            }}>
                <PrimaryButton title='Submit' onclick={()=>props.navigation.navigate('ProfileScreen')} />
                <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    marginHorizontal: wp(10),
                    textAlign: 'center',
                    lineHeight: hp(2.5),
                    marginVertical: hp(2)
                }}>By signing up you agree to <Text style={{
                    color: '#FBC41D'
                }}>
                        Terms of Services & Privacy Policy.</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default BecomeHostScreen