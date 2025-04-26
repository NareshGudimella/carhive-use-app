import { Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { FilterButtonStyle } from "../styles/FilterButtonStyle";
import React from "react";

class Componentprops extends Baseprops {
    title: any;
    onclick?: any;
}

const FilterButton: React.FC<Componentprops> = (props) => {
    return (
        <Pressable
            onPress={() => props.onclick()}
            style={FilterButtonStyle.buttonstyle}>
            <Text style={FilterButtonStyle.buttontext}>
                {props.title}
            </Text>
        </Pressable>
    )
}
export default FilterButton