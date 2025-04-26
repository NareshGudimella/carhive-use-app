import { Image, TextInput, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { input } from "../styles/TextInputStyle";

class Componentprops extends Baseprops {
    placeholder?: any;
    image?: any;
    keyboardtype:any
}

const Textinput: React.FC<Componentprops> = (props) => {
    return (
        <View style={input.continerstyle}>
            <Image
                style={input.style}
                source={props.image} />
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor="#9CA3AF"
                style={input.textinput}
                keyboardType={props.keyboardtype}
            />
        </View>
    )
}
export default Textinput