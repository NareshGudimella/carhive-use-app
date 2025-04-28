import { Image, Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp } from "../utils/ResponsiveScreen";

class Componentprops extends Baseprops {
    title?: any;
    image?: any;
    onclick?: any;
}

export const CameraView: React.FC<Componentprops> = (props) => {
    return (
        <Pressable
            onPress={() => props.onclick()}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: hp(3),
                paddingHorizontal: hp(4.5),
            }}>
            <Image
                source={props.image}
                style={{
                    height: 35,
                    width: 35
                }} />
            <Text style={{
                color: '#64748B',
                fontWeight: '500',
                marginVertical: hp(1)
            }}>{props.title}</Text>
        </Pressable>
    )
}