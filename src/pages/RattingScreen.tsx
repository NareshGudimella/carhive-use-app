import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Rating } from 'react-native-ratings';
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Ratting } from "../apis/api";

class Componentprops extends Baseprops { }

const RattingScreen: React.FC<Componentprops> = (props) => {
    const [rating, setRating] = useState(0);
    const [rateText, setRateText] = useState<any>('')

    const ratingLabels: { [key: number]: string } = {
        1: 'Terrible',
        2: 'Bad',
        3: 'Okay',
        4: 'Good',
        5: 'Excellent'
    };

    const loadRattingData = async (id: any) => {
        const response = await Ratting(id, rating, rateText)
        console.log('ratting', response)
        if (response.code == 0) {
            props.navigation.navigate('HomeScreen')
        } else {
            Alert.alert('Alert',
                'Unable to get details'
            )
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#ffffff'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: wp(5),
                marginTop: hp(2)
            }}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Image
                        source={require('../assets/Back.png')}
                        style={{
                            height: 35,
                            width: 35
                        }} />
                </Pressable>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginHorizontal: wp(2)
                }}>Rating</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: wp(5)
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: hp(2)
                }}>How was your ride?</Text>
                <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={40}
                    showRating={false}
                    startingValue={rating}
                    onFinishRating={(value: any) => setRating(value)}
                />
                <Text style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontWeight: '600'
                }}>
                    {ratingLabels[rating]}
                </Text>
                <TextInput
                    placeholder="Write your review..."
                    placeholderTextColor="#888"
                    style={{
                        marginTop: 20,
                        width: '100%',
                        minHeight: hp(10),
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        textAlignVertical: 'top',
                        fontSize: 16,
                        backgroundColor: '#f9f9f9',

                    }}
                    multiline
                    numberOfLines={3}
                    onChangeText={setRateText}
                    value={rateText}
                />
            </View>
            <View style={{
                marginHorizontal: wp(5),
                marginVertical: hp(4)
            }}>
                <PrimaryButton title='Submit' onclick={() => {
                    if (props.route.params && props.route.params.id) {
                        loadRattingData(props.route.params.id)
                        return
                    }
                }} />
            </View>
        </SafeAreaView>
    );
};

export default RattingScreen;
