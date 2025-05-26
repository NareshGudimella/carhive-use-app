import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Baseprops } from "../utils/navigation";
import {
    Alert,
    Image, Modal, Pressable, ScrollView, Text,
    TextInput, View
} from "react-native";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { wp, hp } from "../utils/ResponsiveScreen";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useCallback, useEffect, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import FilterButton from "../components/FilterButton";
import PrimaryButton from "../components/PrimaryButton";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { CarsList, excuteGetResponse, Login, LoginCarsList, Otp, removeWishlist, wishlist } from "../apis/api";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";


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
    { id: 1, type: '5 Seats', value: '5' },
    { id: 2, type: '7 Seats', value: '7' }
]
const short = [
    { id: 1, type: 'Low to High' },
    { id: 2, type: 'High to Low' }
]
const SelectVehicleScreen: React.FC<Componentprops> = (props) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const [filterModel, setFilterModal] = useState(false);
    const [carsList, setCarsList] = useState<any>(null)
    const [search, SetSearch] = useState('')
    const [carBrand, setCarBrand] = useState<any>([])
    const [shortBy, setShortBuy] = useState<string>('')
    const [brand, setBrand] = useState<any[]>([])
    const [fuel, setFuel] = useState<any[]>([])
    const [transmission, setTransmission] = useState<any>([])
    const [seaters, setSeaters] = useState<any[]>([])
    useFocusEffect(
        useCallback(() => {
            handelCarList()

        }, [])
    )
    {/* Car List api */ }
    const handelCarList = async () => {
        const response = await CarsList(
            props.route.params.pickdate,
            props.route.params.drop,
            props.route.params.addressid,
            props.route.params.lat,
            props.route.params.long,
            shortBy,
            brand,
            fuel,
            transmission,
            seaters

        )
        console.log('carresponse',
            response,
            shortBy,
            brand,
            fuel,
            transmission,
            seaters)

        if (response.code == 0) {
            setCarsList(response.data)
        } else {
            Alert.alert('Alert', 'unable to get details of unlogin')
            return
        }
    }
    {/* Car model List */ }
    const carsModalList = async () => {
        const response = await excuteGetResponse(`auth/cars/brands`)
        console.log('brand', response)
        if (response.code == 0) {
            setCarBrand(response.data)
        }
    }
    {/* Toggel elements */ }
    const toggleSelection = (item: any) => {
        if (brand.includes(item)) {
            setBrand((prev: any[]) => prev.filter(i => i !== item));
        } else {
            setBrand((prev: any) => [...prev, item]);
        }
    };
    const toggelFuel = (item: any) => {
        if (fuel.includes(item)) {
            setFuel((prev: any[]) => prev.filter(i => i != item))
        } else {
            setFuel((prev: any[]) => [...prev, item])
        }
    }
    const toggeltransmission = (item: any) => {
        if (transmission.includes(item)) {
            setTransmission((prev: any[]) => prev.filter(i => i !== item));
        } else {
            setTransmission((prev: any[]) => [...prev, item])
        }
    }
    const toggelseater = (item: any) => {
        if (seaters.includes(item)) {
            setSeaters((prev: any[]) => prev.filter(i => i != item))
        } else {
            setSeaters((prev: any[]) => [...prev, item])
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* */}
                {
                    filterModel && <View style={{}}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={filterModel}
                            onRequestClose={() => {
                                setFilterModal(!filterModel);
                            }}>
                            <BottomModelView onclick={() => setFilterModal(false)}>
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
                                                style={{
                                                    height: 25,
                                                    width: 25,
                                                    tintColor: '#FBC41D'
                                                }}
                                                source={require('../assets/close.png')} />
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
                                                        key={index}
                                                        title={e.type}
                                                        onclick={() => setShortBuy(e.type)}
                                                        selected={shortBy === e.type} />
                                                ))
                                            }
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
                                                    carBrand && carBrand.map((e: any, index: any) => (
                                                        <FilterButton
                                                            key={index}
                                                            title={e.brand}
                                                            onclick={() => toggleSelection(e.brand)}
                                                            selected={brand.includes(e.brand)}
                                                        />
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
                                                            key={index}
                                                            title={e.type}
                                                            onclick={() => toggelFuel(e.type)}
                                                            selected={fuel.includes(e.type)} />
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
                                                            key={index}
                                                            title={e.type}
                                                            onclick={() => toggeltransmission(e.type)}
                                                            selected={transmission.includes(e.type)} />
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
                                                            key={index}
                                                            title={e.type}
                                                            onclick={() => toggelseater(e.value)}
                                                            selected={seaters.includes(e.value)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View style={{ marginTop: hp(2) }}>
                                            <PrimaryButton title='Apply filter'
                                                onclick={() => {
                                                    handelCarList(),
                                                        setFilterModal(false),
                                                        console.log('datafilter', shortBy,
                                                            brand,
                                                            fuel,
                                                            transmission,
                                                            seaters)
                                                }} />
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
                                }}> {carsList && moment(carsList.from_date).format('DD MMM YYYY')}</Text>
                                <Text style={{
                                    color: '#13131380',
                                    fontSize: 13,
                                    fontWeight: '500'
                                }}>{carsList && moment(carsList.from_date).format('h:mm A')}</Text>
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
                                    }}>{carsList && moment(carsList.to_date).format('DD MMM YYYY')}</Text>
                                <Text
                                    style={{
                                        color: '#13131380',
                                        fontSize: 13,
                                        fontWeight: '500'
                                    }}>{carsList && moment(carsList.to_date).format('h:mm A')}</Text>
                            </View>
                        </View>
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
                                    onChangeText={SetSearch}
                                    value={search}
                                    style={{
                                        marginHorizontal: wp(2),
                                        width: wp(60)
                                    }}
                                />
                            </View>
                            <Pressable onPress={() => { setFilterModal(true), carsModalList() }}>
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


                            {carsList && carsList.cars.filter((e1: any) =>
                                search.trim() === '' || e1.brand_name?.toLowerCase().
                                    includes(search.toLowerCase())).
                                map((e: any, index: any) => (
                                    <Pressable
                                        style={{ marginTop: hp(2) }}
                                        onPress={() =>
                                            props.navigation.navigate('VehicleDetailsScreen',
                                                { fromdate: carsList.from_date, todate: carsList.to_date, id: e.carid })}
                                        key={index}>
                                        <Carousel
                                            ref={ref}
                                            width={wp(90)}
                                            style={{}}
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
                                            marginLeft: 0.5,
                                            height: hp(28),
                                            justifyContent: 'flex-end'
                                        }}>
                                            <LinearGradient
                                                colors={['transparent', '#000000', '#000000']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={{
                                                    width: wp(89.6),
                                                    flexDirection: 'row',
                                                    paddingHorizontal: wp(5),
                                                    borderBottomLeftRadius: 20,
                                                    borderBottomRightRadius: 20,
                                                    paddingVertical: wp(1.5)
                                                }}
                                            >
                                                <View>
                                                    <Text
                                                        style={{
                                                            color: '#FBC41D',
                                                            fontSize: 22,
                                                            fontWeight: 'bold',

                                                        }}

                                                    >
                                                        ₹{e.total_price}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: '#FFFFFF',
                                                            fontSize: 16,
                                                        }}
                                                    >
                                                        {e.total_kms} kms
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

                                                <ScrollView
                                                    horizontal
                                                    style={{
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    {e.features.slice(0, 2).map((item: any, index: any) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                marginHorizontal: wp(2),
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
                                                                    fontSize: 11,
                                                                    fontWeight: '500',
                                                                    color: '#ffffff',
                                                                    top: hp(1.5),
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    ))}

                                                </ScrollView>
                                            </LinearGradient>

                                        </View>
                                        <View style={{ marginHorizontal: wp(2), marginTop: hp(1) }}>
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