import {
    Image, Modal, Pressable, SafeAreaView,
    ScrollView, Text, TextInput, View
} from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { input } from "../styles/TextInputStyle";
import BottomTabNavigation from "../components/BottomTab";
import { Cardview } from "../components/Cardview";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { BottomModelView } from "../components/BottomModelView";
import { CenterModalView } from "../components/CenterModelView";

class Componentprops extends Baseprops { }
const data = [{
    id: 1, type: 'Pending', Bookingid: '134123',
    carname: 'Range Rover - AP40 AB 1234',
    date: '29th April 2025, 10:00AM - 31st April 2025, 10:00AM'
},
{
    id: 2, type: 'Accepted', Bookingid: '134123',
    carname: 'Range Rover - AP40 AB 1234',
    date: '29th April 2025, 10:00AM'
},
{
    id: 3, type: 'On-going', Bookingid: '134123',
    carname: 'Range Rover - AP40 AB 1234',
    date: '29th April 2025, 10:00AM'
},
{
    id: 4, type: 'Completed', Bookingid: '134123',
    carname: 'Range Rover - AP40 AB 1234',
    date: '29th April 2025, 10:00AM - 31st April 2025, 10:00AM'
},
]

const RentalsScreen: React.FC<Componentprops> = (props) => {
    const [addressChecked, setAddressChecked] = useState('address');
    const [extendServiceModal, setExtendServiceModal] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                extendServiceModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={extendServiceModal}
                        onRequestClose={() => {
                            setExtendServiceModal(!extendServiceModal);
                        }}
                    >
                        <CenterModalView>
                            <View style={{
                                padding: hp(2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: hp(3)
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: wp(60),
                                    textAlign: 'center'
                                }}>Are you sure want to extend your service?</Text>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: '500',
                                    marginVertical: hp(2)
                                }}>₹35<Text
                                    style={{ color: '#64748B' }}>/Km</Text></Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(0.5),
                                    marginTop: hp(2)
                                }}>
                                    <Pressable style={{
                                        borderWidth: 1,
                                        paddingHorizontal: wp(7),
                                        paddingVertical: hp(1.3),
                                        borderRadius: 10,
                                        borderColor: '#FBC41D',
                                        marginHorizontal: wp(2)
                                    }}>
                                        <Text style={{
                                            color: '#FBC41D',
                                            fontWeight: 'bold'
                                        }}>No, Continue</Text>
                                    </Pressable>
                                    <Pressable
                                    onPress={()=>{props.navigation.navigate('ExtendServiceRequestScreen'),
                                        setExtendServiceModal(false)
                                    }}
                                        style={{
                                            borderWidth: 1,
                                            paddingHorizontal: wp(7),
                                            paddingVertical: hp(1.3),
                                            borderRadius: 10,
                                            borderColor: '#FBC41D',
                                            backgroundColor: '#FBC41D',
                                            marginHorizontal: wp(2)
                                        }}>
                                        <Text style={{
                                            fontWeight: '500'
                                        }}>Extend Now</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </CenterModalView>
                    </Modal>
                </View>
            }
            <View style={{
                backgroundColor: '#ffffff',
                padding: hp(2),
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: hp(1)
                }}>Rentals</Text>
            </View>
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 10,
                elevation: 1,
                height: hp(6),
                marginVertical: hp(1),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(5),
                marginHorizontal: wp(5)
            }}>
                <Image source={require('../assets/search.png')}
                    style={input.imgstyle} />
                <TextInput
                    placeholder="Search by Vehicle..."
                    placeholderTextColor='#64748B'
                    style={{
                        fontSize: 15,
                        fontWeight: '500',
                        width: wp(70),
                        marginHorizontal: wp(2)
                    }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    marginHorizontal: wp(5),
                    marginVertical: hp(1)
                }}>
                {data.map((e: any, index: any) => (
                    <View key={index}>
                        {
                            e.type == 'Pending' ?
                                <Pressable
                                    onPress={() => props.navigation.navigate('OrderDetailsScreen')}
                                    style={{ marginVertical: hp(1.5) }}>
                                    <Cardview>
                                        <View>
                                            <View style={{
                                                backgroundColor: '#FBC41D',
                                                width: wp(25),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingVertical: hp(1),
                                                alignSelf: 'flex-end',
                                                borderTopRightRadius: 15,
                                                borderBottomLeftRadius: 10
                                            }}>
                                                <Text
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 13,
                                                        fontWeight: 'bold'
                                                    }}
                                                >{e.type}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: wp(4)
                                            }}>
                                                <Image
                                                    source={require('../assets/pngegg1.png')}
                                                    style={{
                                                        height: 50,
                                                        width: 70
                                                    }} />
                                                <View style={{
                                                    marginHorizontal: wp(3)
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        Booking ID :
                                                        {e.Bookingid}</Text>
                                                    <Text
                                                        style={{
                                                            color: '#64748B',
                                                            fontSize: 13,
                                                            fontWeight: '500',
                                                            marginTop: 2
                                                        }}>{e.carname}</Text>
                                                </View>
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    marginHorizontal: wp(5),
                                                    marginVertical: hp(2),
                                                    textAlign: 'center'
                                                }}>{e.date}</Text>
                                        </View>
                                    </Cardview>
                                </Pressable> :
                                e.type == 'Accepted' ?
                                    <Pressable>
                                        <Cardview>
                                            <View>
                                                <View style={{
                                                    backgroundColor: '#1D85FB',
                                                    width: wp(25),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingVertical: hp(1),
                                                    alignSelf: 'flex-end',
                                                    borderTopRightRadius: 15,
                                                    borderBottomLeftRadius: 10
                                                }}>
                                                    <Text
                                                        style={{
                                                            color: '#ffffff',
                                                            fontSize: 13,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >{e.type}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: wp(4)
                                                }}>
                                                    <Image
                                                        source={require('../assets/pngegg1.png')}
                                                        style={{
                                                            height: 50,
                                                            width: 70
                                                        }} />
                                                    <View style={{
                                                        marginHorizontal: wp(3)
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: 'bold'
                                                        }}>Booking ID :
                                                            {e.Bookingid}</Text>
                                                        <Text
                                                            style={{
                                                                color: '#64748B',
                                                                fontSize: 13,
                                                                fontWeight: '500',
                                                                marginTop: 2
                                                            }}>{e.carname}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: wp(5),
                                                    marginVertical: hp(1.5)
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                            color: '#64748B'
                                                        }}>
                                                        Delivery date :
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 'bold',

                                                        }}> {e.date}</Text>
                                                </View>
                                                <View style={{
                                                    marginHorizontal: wp(5)
                                                }}>
                                                    <Text style={{
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                        color: '#64748B'
                                                    }}>Host Details</Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginVertical: hp(1.5)
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
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                    fontWeight: 'bold',
                                                                    marginHorizontal: wp(4)
                                                                }}>Avinash Naidu</Text>
                                                        </View>
                                                        <Pressable>
                                                            <Image
                                                                source={require('../assets/call1.png')}
                                                                style={{
                                                                    height: 40,
                                                                    width: 40
                                                                }} />
                                                        </Pressable>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: '500',
                                                            color: '#64748B'
                                                        }}>Pickup Location</Text>
                                                    <Pressable
                                                        onPress={() => setAddressChecked('address')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginVertical: hp(1),
                                                            marginBottom: hp(2)
                                                        }}>
                                                        <RadioButton
                                                            value="address"
                                                            status={addressChecked === 'address' ? 'checked' : 'unchecked'}
                                                            onPress={() => setAddressChecked('address')}
                                                            color="#34C759"
                                                            uncheckedColor="#13131380"
                                                        />
                                                        <Text
                                                            style={{
                                                                width: wp(60),
                                                                fontSize: 13,
                                                                fontWeight: '500'
                                                            }}>Spline Arcade, Aayyappa
                                                            Society, Madhapur,
                                                            Telangana (500081)</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Cardview>
                                    </Pressable> : e.type == 'On-going' ?
                                        <Pressable style={{
                                            marginVertical: hp(1.5)
                                        }}>
                                            <Cardview>
                                                <View>
                                                    <View style={{
                                                        backgroundColor: '#FF8300',
                                                        width: wp(25),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: hp(1),
                                                        alignSelf: 'flex-end',
                                                        borderTopRightRadius: 15,
                                                        borderBottomLeftRadius: 10
                                                    }}>
                                                        <Text
                                                            style={{
                                                                color: '#ffffff',
                                                                fontSize: 13,
                                                                fontWeight: 'bold'
                                                            }}
                                                        >{e.type}</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginHorizontal: wp(4)
                                                    }}>
                                                        <Image
                                                            source={require('../assets/pngegg1.png')}
                                                            style={{
                                                                height: 50,
                                                                width: 70
                                                            }} />
                                                        <View style={{
                                                            marginHorizontal: wp(3)
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold'
                                                            }}>
                                                                Booking ID :
                                                                {e.Bookingid}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    color: '#64748B',
                                                                    fontSize: 13,
                                                                    fontWeight: '500',
                                                                    marginTop: 2
                                                                }}>{e.carname}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginHorizontal: wp(5),
                                                        marginVertical: hp(2)
                                                    }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 'bold',
                                                                color: '#64748B'
                                                            }}>
                                                            Expected Return on :
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 'bold',

                                                            }}> {e.date}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        marginBottom: hp(2),
                                                        marginHorizontal: wp(10)
                                                    }}>
                                                        <PrimaryButton
                                                            title='Extend Service'
                                                            onclick={() => setExtendServiceModal(true)} />
                                                    </View>
                                                </View>
                                            </Cardview>
                                        </Pressable>
                                        : e.type == 'Completed' ?
                                            <Pressable style={{ marginVertical: hp(1.5) }}>
                                                <Cardview>
                                                    <View>
                                                        <View style={{
                                                            backgroundColor: '#0BB335',
                                                            width: wp(25),
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            paddingVertical: hp(1),
                                                            alignSelf: 'flex-end',
                                                            borderTopRightRadius: 15,
                                                            borderBottomLeftRadius: 10
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: '#ffffff',
                                                                    fontSize: 13,
                                                                    fontWeight: 'bold'
                                                                }}
                                                            >{e.type}</Text>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginHorizontal: wp(4)
                                                        }}>
                                                            <Image
                                                                source={require('../assets/pngegg1.png')}
                                                                style={{
                                                                    height: 50,
                                                                    width: 70
                                                                }} />
                                                            <View style={{
                                                                marginHorizontal: wp(3)
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    Booking ID :
                                                                    {e.Bookingid}</Text>
                                                                <Text
                                                                    style={{
                                                                        color: '#64748B',
                                                                        fontSize: 13,
                                                                        fontWeight: '500',
                                                                        marginTop: 2
                                                                    }}>{e.carname}</Text>
                                                            </View>
                                                        </View>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 'bold',
                                                                marginHorizontal: wp(5),
                                                                marginVertical: hp(2),
                                                                textAlign: 'center'
                                                            }}>{e.date}</Text>
                                                        <View style={{
                                                            marginBottom: hp(2),
                                                            marginHorizontal: wp(10)
                                                        }}>
                                                            <PrimaryButton title='Rate your Experience' />
                                                        </View>
                                                    </View>
                                                </Cardview>
                                            </Pressable>
                                            : <></>
                        }
                    </View>
                ))}
            </ScrollView>
            <BottomTabNavigation step={3} navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default RentalsScreen