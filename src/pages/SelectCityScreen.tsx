import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import Textinput from "../components/TextInput";
import { wp, hp } from "../utils/ResponsiveScreen";
import { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import { setCity } from "../storage/AsyncStorage";

class Componentprops extends Baseprops { }

const SelectCityScreen: React.FC<Componentprops> = (props) => {

    const [selectCity, setSelectCity] = useState<any>('')
    const [citys, setCitys] = useState<any>([])
    const [onselectcity, setOnSelectCity] = useState<any>('')


    useFocusEffect(
        useCallback(() => {
            handelSelectCity()
        }, [])
    )
    const handelSelectCity = async () => {
        const response = await excuteGetResponse(`auth/cities`)
        console.log('citiesdata', response)
        if (response.code == 0) {
            setCitys(response.data)
        } else {
            Alert.alert('Alert', 'Unable to cities details')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{
                flex: 1,
                marginHorizontal: wp(5)
            }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        marginTop: hp(4)
                    }}>
                        <Textinput placeholder='Search'
                            image={require('../assets/search.png')}
                            keyboardtype='default' />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: hp(2)
                    }}>Select City</Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {citys.map((e: any, index: any) => (
                            <Pressable
                                onPress={() => {
                                    setSelectCity(e.cityId)
                                    setOnSelectCity(e.cityname)
                                    setCity(JSON.stringify(e))
                                }
                                }
                                style={{
                                    borderWidth: 1,
                                    width: wp(42),
                                    height: hp(6),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    borderColor: '#00354a',
                                    marginHorizontal: wp(1),
                                    marginBottom: hp(1.5),
                                    backgroundColor: selectCity == e.cityId ? '#00354a' : '#ffffff'
                                }}
                                key={index}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: selectCity == e.cityId ? '#ffffff' : '#000000'
                                    }}>{e.cityname}</Text>
                            </Pressable>
                        ))
                        }
                    </View>
                </View>
            </ScrollView>
            {
                selectCity && selectCity != '' &&
                <View style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(3)
                }}>
                    <PrimaryButton
                        title='Submit'
                        onclick={() =>
                            props.navigation.navigate('HomeScreen', { id: selectCity })
                        } />
                </View>
            }
        </SafeAreaView>
    )
}
export default SelectCityScreen