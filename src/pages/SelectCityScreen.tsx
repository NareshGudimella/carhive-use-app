import { Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import Textinput from "../components/TextInput";
import { wp, hp } from "../utils/ResponsiveScreen";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

class Componentprops extends Baseprops { }

const SelectCityScreen: React.FC<Componentprops> = (props) => {

    const [selectCity, setSelectCity] = useState<any>(null)
    const [citys, setCitys] = useState<any>([])

    useEffect(() => {
        const data = [
            { id: 1, city: 'Hyderbad' },
            { id: 2, city: 'Benglore' },
            { id: 3, city: 'Vizag' },
            { id: 4, city: 'Mumbai' }
        ]
        setCitys(data)
    }, [])




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{
                flex: 1,
                marginHorizontal: wp(5)
            }}>
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
                                onPress={() => setSelectCity(e.city)}
                                style={{
                                    borderWidth: 1,
                                    width: wp(42),
                                    height: hp(6),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    borderColor: '#FBC41D',
                                    marginHorizontal: wp(1),
                                    marginBottom: hp(1.5),
                                    backgroundColor: selectCity == e.city ? '#FBC41D' : '#ffffff'
                                }}
                                key={index}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: selectCity == e.city ? '#ffffff' : '#000000'
                                    }}>{e.city}</Text>
                            </Pressable>
                        ))
                    }
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
                        onclick={() => props.navigation.navigate('HomeScreen')} />
                </View>
            }
        </SafeAreaView>
    )
}
export default SelectCityScreen