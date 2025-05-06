import { Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import { Cardview } from "../components/Cardview";
import { useState } from "react";
import { ImageStyle } from "../styles/ImageStyle";
import { Rating } from 'react-native-ratings';
import PrimaryButton from "../components/PrimaryButton";
import { BottomModelView } from "../components/BottomModelView";
import Textinput from "../components/TextInput";
import { OtpInput } from "react-native-otp-entry";
import { style } from "../styles/OtpStyle";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const VehicleDetailsScreen: React.FC<Componentprops> = (props) => {
    const [textExpanded, setTextExpanded] = useState(false);
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [otp, setOtp] = useState<any>('')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                {mobileNumberModal &&
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={mobileNumberModal}
                            onRequestClose={() => {
                                setMobileNumberModal(!mobileNumberModal);
                            }}>
                            <BottomModelView>
                                <View style={{
                                    marginHorizontal: wp(5),
                                    marginVertical: hp(2)
                                }}>
                                    <Pressable
                                        onPress={() => setMobileNumberModal(false)}
                                        style={{
                                            backgroundColor: '#EEEEEE80',
                                            borderRadius: 20,
                                            width: 35,
                                            height: 35,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Image
                                            source={require('../assets/close.png')}
                                            style={{
                                                height: 15,
                                                width: 15
                                            }} />
                                    </Pressable>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        marginTop: hp(2),

                                    }}>User Login</Text>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: '400',
                                            color: '#64748B',
                                            marginTop: hp(1),
                                            marginBottom: hp(1.5)
                                        }}
                                    >Please enter a your mobile number
                                        to login into your account</Text>
                                    <Textinput
                                        image={require('../assets/call.png')}
                                        placeholder='Enter your mobile number'
                                        keyboardtype='numeric'
                                    />
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            lineHeight: hp(2.5),
                                            color: '#64748B',
                                            marginVertical: hp(1),
                                            marginHorizontal: wp(2)
                                        }}
                                    >By continuing you agree
                                        to our <Text
                                            style={{
                                                color: '#FBC41D'
                                            }}> Terms of service
                                        </Text> ,   &
                                        <Text
                                            style={{
                                                color: '#FBC41D'
                                            }}>  Privacy policy</Text>
                                    </Text>
                                    <View style={{ marginVertical: hp(2) }}>
                                        <PrimaryButton title='Request OTP'
                                            onclick={() => {
                                                setMobileNumberModal(false),
                                                    setOtpModal(true)
                                            }}
                                        />
                                    </View>
                                </View>
                            </BottomModelView>
                        </Modal>
                    </View>
                }
                {
                    otpModal &&
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={otpModal}
                            onRequestClose={() => {
                                setOtpModal(!otpModal);
                            }}>
                            <BottomModelView>
                                <View style={{
                                    marginHorizontal: wp(5),
                                    marginVertical: hp(2)
                                }}>
                                    <Pressable
                                        onPress={() => setMobileNumberModal(false)}
                                        style={{
                                            backgroundColor: '#EEEEEE80',
                                            borderRadius: 20,
                                            width: 35,
                                            height: 35,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Image
                                            source={require('../assets/close.png')}
                                            style={{
                                                height: 15,
                                                width: 15
                                            }} />
                                    </Pressable>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        marginTop: hp(2),

                                    }}>Enter Otp</Text>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: '400',
                                            color: '#64748B',
                                            marginTop: hp(1),
                                            marginBottom: hp(1.5),
                                            width: wp(80)
                                        }}
                                    >We’ve sent an SMS with an activation
                                        code to your phone
                                        <Text
                                            style={{
                                                color: '#FBC41D',
                                                fontSize: 16
                                            }}>  +91 9704611443</Text>
                                    </Text>
                                    <OtpInput
                                        numberOfDigits={4}
                                        focusColor="#E8ECF4"
                                        focusStickBlinkingDuration={500}
                                        onTextChange={(text) => setOtp(text)}
                                        onFilled={(text) => console.log(`OTP is ${text}`)}
                                        textInputProps={{
                                            accessibilityLabel: "One-Time Password",
                                        }}
                                        theme={{
                                            containerStyle: style.otpContainer,
                                            pinCodeContainerStyle: style.otp,
                                            pinCodeTextStyle: style.otpText,
                                        }}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: hp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#64748B'
                                        }}>I didn’t receive a code</Text>
                                        <Text style={{
                                            color: '#FBC41D',
                                            marginHorizontal: wp(2),
                                            fontSize: 16
                                        }}>Resend</Text>
                                    </View>
                                    <View style={{marginBottom:hp(2)}}>
                                    <PrimaryButton
                                        title='Verify'
                                        onclick={() => {
                                            props.navigation.navigate('SignupScreen'),
                                                setOtpModal(false)
                                        }}
                                    />
                                    </View>
                                </View>
                            </BottomModelView>
                        </Modal>
                    </View>
                }
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    source={require('../assets/Image(3).png')}
                    style={{
                        height: hp(30),
                        width: wp(100)
                    }} />
                <View style={{
                    position: 'absolute',
                    top: hp(3),
                    marginHorizontal: wp(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(90)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Pressable onPress={() => props.navigation.goBack()}>
                            <Image
                                source={require('../assets/Back.png')}
                                style={BackButtonStyle.style}
                                tintColor='#ffffff'
                            />
                        </Pressable>
                        <Text
                            style={{
                                color: '#ffffff',
                                marginHorizontal: wp(2),
                                fontWeight: 'bold'
                            }}
                        >Vehicle details</Text>
                    </View>
                    <Pressable style={{
                        backgroundColor: '#ffffff',
                        padding: wp(1.5),
                        borderRadius: 20
                    }}>
                        <Image source={require('../assets/shop1.png')}
                            style={BottomTabstyles.selectedstyle} />
                    </Pressable>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        marginHorizontal: wp(5),
                        paddingVertical: hp(2)
                    }}>
                    <Cardview>
                        <View style={{
                            paddingVertical: hp(1),
                            paddingHorizontal: hp(2)
                        }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                            >Range Rover Sport</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginVertical: wp(1.5),
                                    color: '#64748B'
                                }}>
                                {textExpanded ? (
                                    <>
                                        Simplifies renting a Bike, enabling
                                        users to search for available
                                        vehicles, select pick-up and times,
                                        choose a car type, and manage their
                                        booking. The app helps rental
                                        companies to manage their fleet,
                                        track reservations.{' '}
                                        <Text
                                            onPress={() => setTextExpanded(false)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            Show less &lt;&lt;
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        Simplifies renting a Bike, enabling
                                        users to search for available vehicles,
                                        select pick-up locations and times,
                                        choose a car type , and manage their ...
                                        {' '}
                                        <Text
                                            onPress={() => setTextExpanded(true)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            See all &gt;&gt;
                                        </Text>
                                    </>
                                )}
                            </Text>
                        </View>
                    </Cardview>
                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2)
                            }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>Equipment</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: wp(2)
                                }}>
                                    <View >
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/IconAir.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Air</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: hp(2)
                                        }}>
                                            <Image
                                                source={require('../assets/Icon.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Cruise Control</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Music.png')}
                                                style={{
                                                    height: 20,
                                                    width: 17
                                                }}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Music Player</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: wp(5) }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Compass.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>GPS</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: hp(2)
                                        }}>
                                            <Image
                                                source={require('../assets/Steer.png')}
                                                style={ImageStyle.style}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Manual</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../assets/Tyre.png')}
                                                style={{
                                                    height: 20,
                                                    width: 16
                                                }}
                                                tintColor='#8A8A8F'
                                            />
                                            <Text style={
                                                ImageStyle.text
                                            }>Winter Tyres</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginBottom: hp(1)
                        }}>Host Details</Text>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../assets/user.png')}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 30
                                    }} />
                                <View style={{ marginHorizontal: wp(5) }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>Avinash Naidu</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: '400'
                                        }}>3.4</Text>
                                        <Rating
                                            readonly
                                            startingValue={3.4}
                                            imageSize={13}
                                            ratingCount={5}
                                            fractions={1}
                                            style={{ marginLeft: 8 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                marginVertical: hp(1.5)
                            }}>Documents required</Text>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: hp(2)
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../assets/license.png')}
                                        style={{ height: 40, width: 40 }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Driving License</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#64748B',
                                            fontWeight: '400', width: wp(60)
                                        }}>Digilocker or
                                            original -issued at
                                            least 6 months ago</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: wp(3.5)
                                }}>
                                    <Image
                                        source={require('../assets/id-card.png')}
                                        style={{ height: 40, width: 40 }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Aadhar/Passport</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#64748B',
                                            fontWeight: '400',
                                            width: wp(60)
                                        }}>Digilocker or
                                            original or copy</Text>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: hp(2)
                            }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>Images</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginTop: hp(1) }}>
                                    {[1, 2, 3, 4].map((e, index: any) => (
                                        <Image key={index}
                                            source={require('../assets/bike.png')}
                                            style={{
                                                height: 75,
                                                width: 120,
                                                marginRight: wp(2),
                                                borderRadius: 15
                                            }} />
                                    ))}
                                </ScrollView>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2)
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>Reviews</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={require('../assets/user.png')}
                                        style={{
                                            height: 45,
                                            width: 45,
                                            borderRadius: 22
                                        }}
                                    />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}>Jagadesh</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Rating
                                                readonly
                                                startingValue={4}
                                                imageSize={11}
                                                ratingCount={5}
                                                fractions={1}
                                                style={{ marginLeft: 8 }}
                                            />
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#8A8A8F', marginHorizontal: wp(2)
                                            }}>15 minutes ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{
                                    fontWeight: '500',
                                    marginVertical: hp(2)
                                }}>Amazing service easy car to use!Nice
                                    little car, wasn’t cleaned on the outside
                                    but the interior was nice enough. Car
                                    location was tricky to find (15 mins)
                                    walking around trying to find it.</Text>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginTop: hp(5),
                        marginBottom: hp(4)
                    }}>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold'
                                    }}>₹3980</Text>
                                    <Text style={{
                                        color: '#64748B',
                                        top: (-3),
                                        marginHorizontal: wp(2)
                                    }}>₹199 /Day</Text>
                                </View>
                                <PrimaryButton
                                    title='Book Now'
                                    onclick={() => setMobileNumberModal(true)} />
                            </View>
                        </Cardview>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default VehicleDetailsScreen