import React from 'react';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { Baseprops } from '../utils/navigation';
import { hp, wp } from '../utils/ResponsiveScreen';

class Componentprops extends Baseprops {
    uri: any;
    onClose: any;
}

const CarViewScreen: React.FC<Componentprops> = (props) => (
        <SafeAreaView style={{
            height: hp(40),
            paddingVertical: hp(2),
            backgroundColor: '#fff', elevation: 4,
            marginHorizontal: wp(3), borderRadius: 20
        }}>
            <ImageZoom
                uri={props.uri}
                style={{ width: wp(90), height: hp(30), alignSelf: 'center' }}
                minScale={1}
                maxScale={3}
                doubleTapScale={2.5}
                isSingleTapEnabled
                isDoubleTapEnabled
                resizeMode="contain"
            />
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: '#00354a',
                    width: wp(50),
                    borderRadius: 8,
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingVertical: hp(2)
                }}
                onPress={props.onClose}
            >
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
);

export default CarViewScreen;
