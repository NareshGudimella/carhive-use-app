import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Baseprops } from "../utils/navigation";
import {
    Image, Modal, Pressable, ScrollView, Text,
    TextInput, View
} from "react-native";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { wp, hp } from "../utils/ResponsiveScreen";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useState } from "react";
import { CarouselimageStyles } from "../styles/CarouselimageStyles";
import { BottomModelView } from "../components/BottomModelView";

class Componentprops extends Baseprops { }

const SelectVehicleScreen: React.FC<Componentprops> = (props) => {

    const ref = React.useRef<ICarouselInstance>(null);
    const [filterModel, setFilterModal] = useState(false);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {
                filterModel && <View style={{}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={filterModel}
                        onRequestClose={() => {
                            setFilterModal(!filterModel);
                        }}>
                        <BottomModelView>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>Filter</Text>
                                    <Pressable onPress={() => setFilterModal(false)}>
                                        <Image
                                            source={require('../assets/close.png')}
                                            style={{
                                                height: 30,
                                                width: 30,
                                                tintColor: '#FBC41D'
                                            }}
                                        />
                                    </Pressable>
                                </View>
                                <View style={{
                                    borderWidth: 0.5,
                                    borderColor: '#EEEEEE',
                                    backgroundColor: '#EEEEEE',
                                    marginVertical: hp(1.5)
                                }} />
                                <View>
                                    <Text style={{
                                        color: '#64748B',
                                        fontSize: 17,
                                        fontWeight: 'bold'
                                    }}>Sort by</Text>
                                    <View>

                                    </View>
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>

                </View>
            }
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: wp(5),
                    marginVertical: hp(2)
                }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Image source={require('../assets/Back.png')}
                            style={BackButtonStyle.style}
                        />
                    </Pressable>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginHorizontal: wp(2)
                    }}>
                        Select vehicle
                    </Text>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                        padding: hp(2),
                        elevation: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>07 April, 2025</Text>
                            <Text style={{
                                color: '#13131380',
                                fontSize: 13,
                                fontWeight: '500'
                            }}>5:00 AM</Text>
                        </View>
                        <Image
                            source={require('../assets/arrow.png')}
                            style={[BottomTabstyles.selectedstyle, {
                                marginHorizontal: wp(6)
                            }]}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>07 April, 2025</Text>
                            <Text
                                style={{
                                    color: '#13131380',
                                    fontSize: 13,
                                    fontWeight: '500'
                                }}>5:00 AM</Text>
                        </View>
                    </View>
                    <Pressable>
                        <Image source={require('../assets/edit.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </Pressable>
                </View>
                <View style={{
                    backgroundColor: '#ffffff',
                    flex: 1,
                    marginTop: hp(2),
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: hp(6),
                        backgroundColor: '#F7F8F9',
                        elevation: 1, marginHorizontal: wp(5),
                        borderRadius: 10,
                        paddingHorizontal: wp(3),
                        alignItems: 'center',
                        marginVertical: hp(2)
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={require('../assets/search.png')}
                                style={BottomTabstyles.selectedstyle}
                            />
                            <TextInput
                                placeholder="Search any car..."
                                placeholderTextColor='#000000'
                                style={{
                                    marginHorizontal: wp(2),
                                    width: wp(60)
                                }}
                            />
                        </View>
                        <Pressable onPress={() => setFilterModal(true)}>
                            <Image source={require('../assets/filter-list.png')}
                                style={BottomTabstyles.selectedstyle}
                            />
                        </Pressable>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                            marginHorizontal: wp(5),
                            marginBottom: hp(2)
                        }}>
                        {[1, 2, 3,].map((e, index: any) => (
                            <View key={index}>
                                <Carousel
                                    ref={ref}
                                    width={wp(90)}
                                    style={{ marginTop: hp(2) }}
                                    height={hp(28)}
                                    data={[1, 2, 3]}
                                    renderItem={({ index }: { index: any }) => (
                                        <View>
                                            <Image
                                                source={require('../assets/image(1).png')}
                                                style={{
                                                    justifyContent: "center",
                                                    height: hp(28),
                                                    width: wp(89),
                                                    alignSelf: 'center',
                                                    borderRadius: 20
                                                }} />
                                        </View>
                                    )}
                                />
                                <View style={{
                                    position: 'absolute',
                                    marginHorizontal: wp(5)
                                }}>
                                    <View style={{
                                        left: wp(70),
                                        top: hp(4)
                                    }}>
                                        <View />
                                        <Pressable
                                            style={{
                                                justifyContent: 'center',
                                                backgroundColor: '#ffffff',
                                                alignItems: 'center',
                                                height: hp(4),
                                                width: hp(4),
                                                borderRadius: 20,
                                            }}
                                        >
                                            <Image
                                                source={require('../assets/shop1.png')}
                                                style={BottomTabstyles.nonselectedstyle}
                                            />
                                        </Pressable>
                                    </View>
                                    <View style={{
                                        top: hp(18),
                                        flexDirection: 'row',
                                    }}>
                                        <View>
                                            <Text style={{
                                                color: '#FBC41D',
                                                fontSize: 24,
                                                fontWeight: 'bold'
                                            }}>₹3980</Text>
                                            <Text
                                                style={{
                                                    color: '#FFFFFF',
                                                    fontSize: 18
                                                }}>₹199 /hr</Text>
                                        </View>
                                        <View style={{
                                            borderWidth: 0.2,
                                            borderColor: '#666666',
                                            backgroundColor: '#666666',
                                            marginHorizontal: wp(5)
                                        }} />
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly'
                                        }}>
                                            <View>
                                                <Image
                                                    source={require('../assets/IconAir.png')}
                                                    style={{
                                                        height: 15,
                                                        width: 15
                                                    }} />
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#ffffff',
                                                    fontWeight: 500,
                                                    top: hp(1)
                                                }}>AC</Text>
                                            </View>
                                            <View style={{ marginHorizontal: wp(3) }}>
                                                <Image
                                                    source={require('../assets/Compass.png')}
                                                    style={{
                                                        height: 15,
                                                        width: 15
                                                    }} />
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    color: '#ffffff',
                                                    top: hp(1)
                                                }}>GPS</Text>
                                            </View>
                                            <View>
                                                <Image
                                                    source={require('../assets/Steer.png')}
                                                    style={{
                                                        height: 15,
                                                        width: 15
                                                    }} />
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#ffffff',
                                                    fontWeight: 500,
                                                    top: hp(1)
                                                }}>Manual</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: wp(2), }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginVertical: hp(0.5)
                                    }}>
                                        <Text style={{
                                            fontSize: 17,
                                            fontWeight: 'bold'
                                        }}>Audi A1 1.4 TFSI</Text>
                                        <Image
                                            source={require('../assets/fastag.png')}
                                            style={{
                                                height: hp(2),
                                                width: wp(15)
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={
                                                    require('../assets/Location.png')
                                                }
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    tintColor: '#000000'
                                                }} />
                                            <Text style={{
                                                marginHorizontal: 1,
                                                fontWeight: '500'
                                            }}>5kms away</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: wp(1)
                                        }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: '400',
                                                    color: '#666666'
                                                }}>
                                                3.5
                                            </Text>
                                            <Image
                                                source={require('../assets/Star.png')}
                                                style={{
                                                    height: 14,
                                                    width: 14,
                                                    marginHorizontal: wp(1)
                                                }} />
                                            <Text>
                                                - <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: '400',
                                                    color: '#666666'
                                                }}>2017
                                                </Text> - <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '400',
                                                        color: '#666666'
                                                    }}>4 seats
                                                </Text>
                                            </Text>
                                        </View>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                }}>Note </Text>
                                            : For Documents Aadhar,
                                            Driving License, Bike</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}
export default SelectVehicleScreen