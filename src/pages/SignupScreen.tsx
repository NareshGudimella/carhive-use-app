import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import { wp, hp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import DropdownTextinput from "../components/DropdownTextinput";
import PrimaryButton from "../components/PrimaryButton";

class Componentprops extends Baseprops { }

const SignupScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable style={{
                marginHorizontal: wp(5),
                marginVertical: hp(2)
            }}>
                <Image source={require('../assets/Back.png')}
                    style={{
                        height: 30,
                        width: 30
                    }} />
            </Pressable>
            <View style={{ marginHorizontal: wp(7) }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold'
                }}>Sign up to Ride a car</Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: '400',
                        color: '#9CA3AF',
                        width: wp(70),
                        marginVertical: hp(1.5)
                    }}
                >Ready to hit the road?
                    Signing up to book your
                    ride is quick and easy!</Text>
            </View>
            <View style={{
                marginHorizontal: wp(7),
                marginTop: hp(2)
            }}>
                <Textinput
                    image={require('../assets/users.png')}
                    placeholder='Your name'
                    keyboardtype='' />
                <Textinput
                    image={require('../assets/sms.png')}
                    placeholder='Email'
                    keyboardtype='' />
                <DropdownTextinput
                    image={require('../assets/sms.png')}
                    title='Gender'
                    img={require('../assets/mingcute_down-fill.png')}
                />
                <DropdownTextinput
                    image={require('../assets/sms.png')}
                    title='Date of birth'
                    img={require('../assets/mingcute_down-fill.png')}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginHorizontal: wp(7),
                    marginVertical: hp(3),
                }}
            >
                <PrimaryButton title='Submit' />
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            color: '#9CA3AF',
                            width: wp(70),
                            textAlign: 'center',
                            marginTop: hp(1.5)
                        }}>By signing up you agree to
                        <Text
                            style={{ color: '#FBC41D' }}>
                            Terms of Services & Privacy Policy.</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default SignupScreen