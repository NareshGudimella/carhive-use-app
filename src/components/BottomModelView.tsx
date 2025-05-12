import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { BottomModelStyle } from '../styles/BottomModelStyle';
import { hp, wp } from '../utils/ResponsiveScreen';
import { Baseprops } from '../utils/navigation';

interface ComponentProps extends Baseprops {
  onclick?: () => void;
  children: React.ReactNode;
}

export const BottomModelView: React.FC<ComponentProps> = ({ children, onclick }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={BottomModelStyle.mainView}>
        <Pressable
          onPress={onclick}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            marginHorizontal: wp(46),
            paddingVertical: wp(1.5),
            borderRadius: 25,
            marginVertical: hp(1)
          }}
        >
          <Image
            source={require('../assets/close.png')}
            style={{
              height: 20,
              width: 20
            }}
          />
        </Pressable>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%' }}
        >
          <View style={BottomModelStyle.subView}>{children}</View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
