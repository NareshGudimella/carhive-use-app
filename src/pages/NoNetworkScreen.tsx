import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import FastImage, { FastImageProps } from "@d11/react-native-fast-image";
import NetInfo from '@react-native-community/netinfo';

class Componentprops extends Baseprops { }

const NoNetworkScreen: React.FC<Componentprops> = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    padding: 20,
                    borderRadius: 30,
                    elevation: 1
                }}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('../assets/signal.gif')}
                        style={{
                            height: hp(15),
                            width: hp(15),
                        } as FastImageProps['style']}
                    />
                </View>
                <View>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginVertical: hp(1.5)
                    }}>
                        No internet connection
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'gray',
                        textAlign: 'center',
                        marginHorizontal: wp(7)
                    }}>
                        Please check your internet connection and try again
                    </Text>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default NoNetworkScreen;
