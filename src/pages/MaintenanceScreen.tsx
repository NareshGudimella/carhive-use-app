import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import FastImage from "react-native-fast-image";
import PrimaryButton from "../components/PrimaryButton";

class Componentprops extends Baseprops { }

const MaintenanceScreen: React.FC<Componentprops> = (props) => {

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
                    elevation: 1,
                }}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('../assets/mainten.gif')}
                        style={{
                            height: hp(20),
                            width: hp(20),
                            left:hp(-2)
                        }}
                    />
                </View>
                <View>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginVertical: hp(1.5)
                    }}>
                        App Under Maintenance
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: 'gray',
                        textAlign: 'center',
                        marginHorizontal: wp(15)
                    }}>
                        We're currently performing some scheduled maintenance. Please check back again after some time.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MaintenanceScreen;