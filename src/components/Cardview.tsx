import { View } from "react-native"

export const Cardview = ({ children }: { children: any }) => {
    return (
        <View
            style={{
                backgroundColor: '#ffffff',
                elevation: 2,
                borderRadius: 15,
                borderWidth:0.5,
                borderColor:'#EAECF2'
            }}>
            {children}
        </View>
    )
}