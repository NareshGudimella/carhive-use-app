// JS replacement for @react-native-community/checkbox 0.6.0, whose npm package omits the
// `js/` codegen sources and breaks the RN 0.88 Android and iOS builds.
// Keeps the call-site API (value / onValueChange / tintColors / style).
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Props = {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    tintColors?: { true?: string; false?: string };
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
};

const CheckBox = ({ value, onValueChange, tintColors, style, disabled }: Props) => (
    <View style={style}>
        <Checkbox.Android
            status={value ? 'checked' : 'unchecked'}
            disabled={disabled}
            color={tintColors?.true ?? '#00354a'}
            uncheckedColor={tintColors?.false ?? '#ccc'}
            onPress={() => onValueChange?.(!value)}
        />
    </View>
);

export default CheckBox;
