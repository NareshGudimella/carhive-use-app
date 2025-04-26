import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { input } from "../styles/TextInputStyle";

class Componentprops extends Baseprops {
    title?: any;
    image?: any;
    img?: any;
}

const DropdownTextinput: React.FC<Componentprops> = (props) => {
    return (
        <Pressable style={input.continer}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image
                    style={input.style}
                    source={props.image} />
                <Text
                    style={[input.textinput, { color: '#9CA3AF' }]}>
                    {props.title}</Text>
            </View>
            <Image
                source={props.img}
                style={input.style} />
        </Pressable>
    )
}
export default DropdownTextinput