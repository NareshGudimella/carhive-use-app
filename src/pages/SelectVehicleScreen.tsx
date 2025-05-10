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
import React, { useCallback, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import FilterButton from "../components/FilterButton";
import PrimaryButton from "../components/PrimaryButton";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { CarsList } from "../apis/api";
import LinearGradient from "react-native-linear-gradient";

class Componentprops extends Baseprops { }

const segment = [
    { id: 1, model: 'Hatchback' },
    { id: 2, model: 'Sedan' },
    { id: 3, model: 'SUV' },
    { id: 4, model: 'Muv' }]

const Brand = [
    { id: 1, model: 'Maruti' },
    { id: 2, model: 'Tata' },
    { id: 3, model: 'Hyundai' },
    { id: 4, model: 'Honda' },
    { id: 5, model: 'Mahindra' }]
const FuelType = [
    { id: 1, type: 'Diesel' },
    { id: 1, type: 'Petrol' },
    { id: 1, type: 'Electric' },

]
const TransmissionType = [
    { id: 1, type: 'Automatic' },
    { id: 2, type: 'Manual' }
]
const SeatingCapacity = [
    { id: 1, type: '5 Seats' },
    { id: 2, type: '7 Seats' }
]
const short = [
    { id: 1, type: 'Low to High' },
    { id: 2, type: 'High to Low' }
]
const SelectVehicleScreen: React.FC<Componentprops> = (props) => {

    const ref = React.useRef<ICarouselInstance>(null);
    const [filterModel, setFilterModal] = useState(false);
    const [selectfilter, setSelectfilter] = useState<any>('')
    const [carsList, setCarsList] = useState<any>(null)

    useFocusEffect(
        useCallback(() => {
            handelCarList()
        }, [])
    )

    const handelCarList = async () => {
        const response = await CarsList(
            props.route.params.pickdate,
            props.route.params.drop,
            props.route.params.addressid,
            props.route.params.lat,
            props.route.params.long)
        console.log('carresponse', response)
        if (response.code == 0) {
            setCarsList(response.data)
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
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
                                    <ScrollView>
                                        <Text style={{
                                            color: '#64748B',
                                            fontSize: 17,
                                            fontWeight: 'bold'
                                        }}>Sort by</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: hp(1)
                                        }}>
                                            {
                                                short.map((e: any, index: any) => (
                                                    <FilterButton
                                                        title={e.type}
                                                        onclick={() => setSelectfilter(e.id)} />
                                                ))
                                            }
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold'
                                                }}
                                            >Segment</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    segment.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.model}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Brand</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    Brand.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.model}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Fuel Type</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    FuelType.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Transmission Type</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    TransmissionType.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Seating Capacity</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    SeatingCapacity.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View style={{ marginTop: hp(2) }}>
                                            <PrimaryButton title='Apply filter' />
                                        </View>
                                    </ScrollView>
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
                        marginVertical: hp(3),
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
                            alignItems: 'center',
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}> {carsList && carsList.from_date?.slice(0, 10)}</Text>
                                <Text style={{
                                    color: '#13131380',
                                    fontSize: 13,
                                    fontWeight: '500'
                                }}>{carsList && carsList.from_date?.slice(10, 16)}</Text>
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
                                    }}>{carsList && carsList.to_date?.slice(0, 10)}</Text>
                                <Text
                                    style={{
                                        color: '#13131380',
                                        fontSize: 13,
                                        fontWeight: '500'
                                    }}>{carsList && carsList.to_date?.slice(10, 16)}</Text>
                            </View>
                        </View>
                        <Pressable>
                            <Image source={require('../assets/edit.png')}
                                style={{ height: 25, width: 25 }}
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
                            {carsList && carsList.cars.map((e: any, index: any) => (
                                <Pressable
                                    onPress={() =>
                                        props.navigation.navigate('VehicleDetailsScreen',
                                            {fromdate:carsList.from_date,todate:carsList.to_date,id:e.carid})}
                                    key={index}>
                                    <Carousel
                                        ref={ref}
                                        width={wp(90)}
                                        style={{ marginTop: hp(2) }}
                                        height={hp(28)}
                                        data={e.images}
                                        renderItem={({ item }: { item: any }) => (
                                            <View>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        justifyContent: "center",
                                                        height: hp(28),
                                                        width: wp(89),
                                                        alignSelf: 'center',
                                                        borderRadius: 20,

                                                    }} />
                                            </View>
                                        )}
                                    />
                                    <View style={{
                                        position: 'absolute',

                                    }}>
                                        <View style={{
                                            left: wp(75),
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
                                           
                                            justifyContent: 'flex-end'
                                        }}>
                                            <LinearGradient
                                                colors={['transparent', '#000000', '#000000']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={{
                                                    top: hp(19.5),
                                                    width: wp(89.5),
                                                    flexDirection: 'row',
                                                    paddingHorizontal: wp(5),
                                                    paddingVertical: 2,
                                                    borderBottomLeftRadius: 20,
                                                    borderBottomRightRadius: 20,
                                                }}
                                            >
                                                <View>
                                                    <Text
                                                        style={{
                                                            color: '#FBC41D',
                                                            fontSize: 24,
                                                            fontWeight: 'bold',

                                                        }}

                                                    >
                                                        ₹{e.total_price}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: '#FFFFFF',
                                                            fontSize: 18,
                                                        }}
                                                    >
                                                        ₹{e.price}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        borderWidth: 0.2,
                                                        borderColor: '#666666',
                                                        backgroundColor: '#666666',
                                                        marginHorizontal: wp(5),
                                                    }}
                                                />

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                    }}
                                                >
                                                    {e.features.map((item: any, index: any) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                marginHorizontal: wp(1),
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Image
                                                                source={{ uri: item.icon }}
                                                                style={{
                                                                    height: 20,
                                                                    width: 20,
                                                                    tintColor: '#ffffff',
                                                                }}
                                                            />
                                                            <Text
                                                                style={{
                                                                    fontSize: 13,
                                                                    fontWeight: '500',
                                                                    color: '#ffffff',
                                                                    top: hp(1.5),
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: wp(2), }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginVertical: hp(1)
                                        }}>
                                            <Text style={{
                                                fontSize: 17,
                                                fontWeight: 'bold'
                                            }}>{e.brand_name}  {e.model_name}</Text>
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
                                                }}>{e.distance} away</Text>
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
                                                    {e.rating}
                                                </Text>
                                                <Rating
                                                    readonly
                                                    startingValue={e.rating}
                                                    imageSize={13}
                                                    ratingCount={5}
                                                    fractions={1}
                                                    style={{ marginLeft: 8 }}
                                                />
                                                <Text>
                                                    - <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: '400',
                                                        color: '#666666'
                                                    }}>{e.year_of_registeration}
                                                    </Text> - <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: '400',
                                                            color: '#666666'
                                                        }}>{e.seating} seats
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
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default SelectVehicleScreen