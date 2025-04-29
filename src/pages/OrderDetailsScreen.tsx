import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";

class Componentprops extends Baseprops { }

const shippingdata = [
    { id: 1, txt: 'Booking Placed', date: 'at 10/08/2025, 10:00AM', state: 'yes' },
    { id: 2, txt: 'Booking Accepted', date: 'at 10/08/2025, 10:00AM', state: 'yes' },
    { id: 3, txt: 'Vehicle Handed Over', date: 'Pending', state: 'No' },
    { id: 4, txt: 'Request for Return', date: 'Pending', state: 'No' },
    { id: 5, txt: 'Extended Service', date: 'Pending', state: 'No' },
    { id: 6, txt: 'Returned', date: 'Pending', state: 'No' }
]

const OrderDetailsScreen: React.FC<Componentprops> = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: wp(5)
                }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../assets/Back.png')}
                            style={{
                                height: 40,
                                width: 40
                            }} />
                    </Pressable>
                    <Text style={{
                        marginHorizontal: wp(2),
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Order Details</Text>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginTop: hp(10)
                }}>
                    <Cardview>
                        <View style={{ marginBottom: hp(1) }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <Image
                                    source={require('../assets/pngegg1.png')}
                                    style={{
                                        position: 'absolute',
                                        height: hp(20),
                                        width: hp(25),
                                        top: hp(-12)
                                    }}
                                />
                                <Text
                                    style={{
                                        marginTop: hp(8.5),
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>Booking ID : 134123</Text>
                                <Text
                                    style={{
                                        color: '#64748B',
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        marginVertical: 3
                                    }}>Range Rover</Text>
                                <Text
                                    style={{
                                        color: '#FBC41D',
                                        fontWeight: 'bold',
                                        fontSize: 16
                                    }}>Rental</Text>
                            </View>
                            <View style={{
                                borderWidth: 0.5,
                                marginHorizontal: wp(5),
                                borderColor: '#64748B',
                                borderStyle: 'dashed',
                                marginVertical: hp(1)
                            }} />
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: wp(6)
                            }}>
                                <Text style={{
                                    color: '#64748B',
                                    fontSize: 15,
                                    fontWeight: '500'
                                }}>Status :</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: '500'
                                    }}> Booking Accepted</Text>
                            </View>
                        </View>
                    </Cardview>
                </View>
                <View
                    style={{
                        marginHorizontal: wp(5)
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: hp(1.5)
                    }}>Trip Date & Time</Text>
                    <Cardview>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(10),
                            marginVertical: hp(2)
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>29 April, Mon</Text>
                                <Text style={{
                                    color: '#27272780',
                                    fontWeight: '500',
                                    marginTop: 2,
                                    fontSize: 13
                                }}>5:00 AM</Text>
                            </View>
                            <Image
                                source={require('../assets/arrow.png')}
                                style={{ height: 30, width: 20 }}
                            />
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>29 April, Mon</Text>
                                <Text style={{
                                    color: '#27272780',
                                    fontWeight: '500',
                                    marginTop: 2,
                                    fontSize: 13
                                }}>5:00 AM</Text>
                            </View>
                        </View>
                    </Cardview>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(1.5)
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: hp(1)
                    }}>
                        Host Details
                    </Text>
                    <Cardview>
                        <View style={{
                            marginHorizontal: wp(5),
                            marginVertical: hp(2),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../assets/user.png')}
                                    style={{
                                        height: 50,
                                        width: 50
                                    }} />
                                <View style={{
                                    marginHorizontal: wp(3),
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Avinash Naidu</Text>
                                    <Text
                                        style={{
                                            fontWeight: '500',
                                            color: '#64748B',
                                            fontSize: 13
                                        }}>AP 16 AB 1234</Text>
                                </View>
                            </View>
                            <Pressable>
                                <Image
                                    source={require('../assets/call1.png')}
                                    style={{
                                        height: 45,
                                        width: 45
                                    }} />
                            </Pressable>
                        </View>
                    </Cardview>
                </View>
                <View style={{
                    marginBottom: hp(2),
                    marginHorizontal: wp(5)
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: hp(1)
                    }}>Bill Details</Text>
                    <Cardview>
                        <View style={{
                            marginHorizontal: wp(5),
                            marginVertical: hp(2.5)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Trip Charges</Text>
                                    <Image
                                        source={require('../assets/info.png')}
                                        style={{
                                            height: 10,
                                            width: 10,
                                            marginTop: 3,
                                            marginHorizontal: 3
                                        }}
                                    />
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>₹ 350</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: hp(1.5)
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Taxes</Text>
                                    <Image
                                        source={require('../assets/info.png')}
                                        style={{
                                            height: 10,
                                            width: 10,
                                            marginTop: 3,
                                            marginHorizontal: 3
                                        }}
                                    />
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>₹ 10</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: hp(1.5)
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Convenience Fees</Text>
                                    <Image
                                        source={require('../assets/info.png')}
                                        style={{
                                            height: 10,
                                            width: 10,
                                            marginTop: 3,
                                            marginHorizontal: 3
                                        }}
                                    />
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>₹ 10</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Security Deposit </Text>
                                    <Text style={{
                                        color: '#64748B66'
                                    }}>(Refundable)</Text>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>₹ 400</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: hp(1.5)
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Trip Protection Fee</Text>
                                    <Image
                                        source={require('../assets/info.png')}
                                        style={{
                                            height: 10,
                                            width: 10,
                                            marginTop: 3,
                                            marginHorizontal: 3
                                        }}
                                    />
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>₹ 10</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#64748B',
                                        textDecorationLine: 'underline'
                                    }}>Coupon</Text>
                                    <Text style={{
                                        color: '#0D9D32'
                                    }}>(ABCD1234)</Text>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: '#FF0000'
                                }}>-₹ 100</Text>
                            </View>
                            <View style={{
                                borderWidth: 0.4,
                                borderStyle: 'dashed',
                                marginVertical: hp(1.5)
                            }} />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#64748B'
                                }}>To Pay</Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>₹ 850</Text>
                            </View>
                        </View>
                    </Cardview>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginBottom: hp(4)
                }}>
                    <Cardview>
                        <View style={{
                            padding: hp(2),
                            marginVertical: hp(1)
                        }}>
                            {shippingdata.map((e: any, index: any) => (
                                <View key={index} style={{
                                    flexDirection: 'row',
                                    marginHorizontal: wp(4)
                                }}>
                                    <View style={{ width: 30, alignItems: 'center' }}>
                                        {index !== shippingdata.length - 1 && (
                                            <View
                                                style={{
                                                    top: hp(1.5),
                                                    height: hp(7),
                                                    width: 2,
                                                    backgroundColor:
                                                    shippingdata[index + 1]?.state === 'yes' ? '#FBC41D' : '#CBCBCB',
                                                }}
                                            />
                                        )}

                                        <Image
                                            source={e.state == 'yes' ?
                                                require('../assets/true2.png') :
                                                require('../assets/dot.png')}
                                            style={e.state == 'yes' ?
                                                {
                                                    height: 35,
                                                    width: 35,
                                                    position: 'absolute',
                                                } : {
                                                    height: 30,
                                                    width: 30,
                                                    position: 'absolute',
                                                }}
                                        />
                                    </View>
                                    <View style={{
                                        marginLeft: wp(4),
                                        marginTop: 2
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}>{e.txt}</Text>
                                        <Text style={{
                                            color: '#64748B',
                                            fontSize: 13,
                                            fontWeight: '500'
                                        }}>{e.date}</Text>
                                    </View>
                                </View>
                            ))}

                        </View>
                    </Cardview>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default OrderDetailsScreen