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
      <Pressable onPress={()=>onclick} style={BottomModelStyle.mainView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%' }}
        >
          <View style={BottomModelStyle.subView}>{children}</View>
        </KeyboardAvoidingView>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};
