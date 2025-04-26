import { Pressable, Text } from "react-native";
import { Baseprops } from "../utils/navigation";
import { PrimaryButtonStyle } from "../styles/PrimaryButton";

class Componentprops extends Baseprops {
    title: any;
    onclick?: any;
}

const PrimaryButton: React.FC<Componentprops> = (props) => {
    return (
        <Pressable
            onPress={() => props.onclick()}
            style={
                PrimaryButtonStyle.style}>
            <Text
                style={PrimaryButtonStyle.textstyle}
            >{props.title}</Text>
        </Pressable>
    )
}

export default PrimaryButton;