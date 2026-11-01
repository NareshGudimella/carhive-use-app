import { Image, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../utils/responsive';

class Componentprops extends Baseprops {
    step?: any;
}

const BottomTabNavigation: React.FC<Componentprops> = (props) => {
    return (
        <View style={{
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 1,
            paddingHorizontal: wp(7),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: hp(9)
        }}>
            <Pressable
                onPress={() => props.navigation.navigate('HomeScreen')}
                style={{ alignItems: 'center', }}>
                <View style={{ alignItems: 'center', }}>
                    <Image source={props.step == 1 ?
                        require('../assets/home-2.png') :
                        require('../assets/home.png')}
                        style={props.step == 1 ?
                            BottomTabstyles.selectedstyle :
                            BottomTabstyles.nonselectedstyle} />
                    <Text style={props.step == 1 ?
                        BottomTabstyles.selectedtextStyle :
                        BottomTabstyles.nonselectedtextstyle}>Home</Text>
                </View>
                {
                    props.step == 1 ?
                        <View style={{}}>
                            <Image source={require('../assets/Union.png')}
                                style={BottomTabstyles.baseStyle}
                                tintColor='#00354a' />
                        </View>
                        : <></>
                }
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('RentalsScreen')}
                style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <Image source={props.step == 2 ?
                        require('../assets/calendar-add.png') :
                        require('../assets/calendar-add(1).png')}
                        style={props.step == 2 ?
                            BottomTabstyles.selectedstyle :
                            BottomTabstyles.nonselectedstyle} />
                    <Text style={props.step == 2 ?
                        BottomTabstyles.selectedtextStyle :
                        BottomTabstyles.nonselectedtextstyle}>Bookings</Text>
                </View>
                {
                    props.step == 2 ?
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/Union.png')}
                                style={[BottomTabstyles.baseStyle,

                                ]}
                                tintColor='#00354a' />
                        </View>
                        : <></>
                }
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('ProfileScreen')}
                style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <Image source={props.step == 3 ?
                        require('../assets/frame.png') :
                        require('../assets/frame1.png')}
                        style={props.step == 3 ?
                            BottomTabstyles.selectedstyle :
                            BottomTabstyles.nonselectedstyle} />
                    <Text style={props.step == 3 ?
                        BottomTabstyles.selectedtextStyle :
                        BottomTabstyles.nonselectedtextstyle}>Profile</Text>
                </View>
                {
                    props.step == 3 ?
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/Union.png')}
                                style={BottomTabstyles.baseStyle}
                                tintColor='#00354a' />
                        </View>
                        : <></>
                }
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('HostScreen')}
                style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <Image source={props.step == 4 ?
                        require('../assets/gift.png') :
                        require('../assets/gift.png')}
                        style={props.step == 4 ?
                            [BottomTabstyles.selectedstyle, { tintColor: '#FBC41D' }] :
                            [BottomTabstyles.nonselectedstyle, { tintColor: '#64748B' }]} />
                    <Text style={props.step == 4 ?
                        BottomTabstyles.selectedtextStyle :
                        BottomTabstyles.nonselectedtextstyle}>Host</Text>
                </View>
                {
                    props.step == 4 ?
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/Union.png')}
                                style={BottomTabstyles.baseStyle}
                                tintColor='#00354a' />
                        </View>
                        : <></>
                }
            </Pressable>
        </View>
    )
}
export default BottomTabNavigation