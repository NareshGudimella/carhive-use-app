import { Image, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const PaymentScreen: React.FC<Componentprops> = (props) => {
    const [Paymenttype, setPaymentType] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable
                onPress={() => props.navigation.goBack()}
                style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(2),
                    marginTop:hp(3)
                }}>
                <Image
                    source={require('../assets/Back.png')}
                    style={{
                        height: 35,
                        width: 35
                    }} />
            </Pressable>
            <View style={{
                marginHorizontal: wp(5),
                marginVertical: hp(2),
                flex: 1
            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold'
                }}>Payment method</Text>
                <Text style={{
                    color: '#64748B',
                    width: wp(75),
                    fontWeight: '500',
                    lineHeight: hp(2.3),
                    fontSize: 15,
                    marginVertical: hp(1)
                }}>
                    💳 Link your bank accounts,
                    credit cards, and even reward
                    cards in one place.
                </Text>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: hp(3),
                    marginVertical: hp(0.8)
                }}>Cards</Text>
                <Cardview>
                    <Pressable
                        onPress={() => setPaymentType('credit')}
                        style={{
                            marginHorizontal: wp(5),
                            paddingVertical: hp(2.5),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 7,
                                padding: wp(1.5),
                                borderColor: '#CBCBCB33'
                            }}>
                                <Image
                                    source={require('../assets/wallet.png')}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }} />
                            </View>
                            <Text style={{
                                marginHorizontal: wp(3),
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>Credit Cards</Text>
                        </View>
                        <RadioButton
                            value="credit"
                            status={Paymenttype === 'credit' ? 'checked' : 'unchecked'}
                            onPress={() => setPaymentType('credit')}
                            color="#FBC41D"
                            uncheckedColor="#9CA3AF"
                        />
                    </Pressable>
                </Cardview>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: hp(2),
                    marginVertical: hp(0.8),
                    marginBottom: hp(1)
                }}>UPI Payments</Text>
                <Cardview>
                    <View style={{
                        marginVertical: hp(2)
                    }}>
                        <Pressable
                            onPress={() => setPaymentType('GooglePay')}
                            style={{
                                marginHorizontal: wp(5),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    borderWidth: 1,
                                    borderRadius: 7,
                                    padding: wp(1.5),
                                    borderColor: '#CBCBCB33'
                                }}>
                                    <Image
                                        source={require('../assets/gpay.png')}
                                        style={{
                                            width: 30,
                                            height: 25
                                        }} />
                                </View>
                                <Text style={{
                                    marginHorizontal: wp(3),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Google Pay</Text>
                            </View>
                            <RadioButton
                                value="GooglePay"
                                status={Paymenttype === 'GooglePay' ? 'checked' : 'unchecked'}
                                onPress={() => setPaymentType('GooglePay')}
                                color="#FBC41D"
                                uncheckedColor="#9CA3AF"
                            />
                        </Pressable>
                        <View
                            style={{
                                borderWidth: 0.9,
                                borderColor: '#CBCBCB',
                                marginHorizontal: wp(10),
                                marginVertical: hp(2)
                            }} />
                        <Pressable
                            onPress={() => setPaymentType('Phonepe')}
                            style={{
                                marginHorizontal: wp(5),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    borderWidth: 1,
                                    borderRadius: 7,
                                    padding: wp(1.5),
                                    borderColor: '#CBCBCB33'
                                }}>
                                    <Image
                                        source={require('../assets/phonepe.png')}
                                        style={{
                                            width: 30,
                                            height: 25
                                        }} />
                                </View>
                                <Text style={{
                                    marginHorizontal: wp(3),
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Phone Pe</Text>
                            </View>
                            <RadioButton
                                value="Phonepe"
                                status={Paymenttype === 'Phonepe' ? 'checked' : 'unchecked'}
                                onPress={() => setPaymentType('Phonepe')}
                                color="#FBC41D"
                                uncheckedColor="#9CA3AF"
                            />
                        </Pressable>
                    </View>
                </Cardview>
                <Text style={{
                    fontSize: 12,
                    color: '#64748B',
                    fontWeight: '500',
                    marginVertical: hp(1.5)
                }}>Note : Do not go back while
                    payment is processing</Text>
            </View>
            <View style={{
                marginHorizontal: wp(5),
                marginVertical: hp(2)
            }}>
                <Cardview>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: wp(5),
                        marginVertical: wp(1.5)
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            ₹750
                        </Text>
                        <View style={{ width: wp(30) }}>
                            <PrimaryButton title='Pay'
                                onclick={() => props.navigation.navigate('PaymentSuccessScreen')} />
                        </View>
                    </View>
                </Cardview>
            </View>
        </SafeAreaView>
    )
}
export default PaymentScreen