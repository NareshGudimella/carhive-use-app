import { Pressable, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { FilterButtonStyle } from "../styles/FilterButtonStyle";
import React from "react";

class Componentprops extends Baseprops {
    title: any;
    onclick?: any;
    selected?: any;
}

const FilterButton: React.FC<Componentprops> = (props) => {
    return (
        <Pressable
            onPress={() => props.onclick()}
            style={props.selected ?
                FilterButtonStyle.selectedbutton :
                FilterButtonStyle.buttonstyle}>
            <Text style={props.selected ?FilterButtonStyle.onselecttext:FilterButtonStyle.buttontext}>
                {props.title}
            </Text>
        </Pressable>
    )
}
export default FilterButton