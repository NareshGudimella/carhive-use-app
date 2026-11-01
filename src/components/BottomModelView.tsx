import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { BottomModelStyle } from '../styles/BottomModelStyle';
import { Baseprops } from '../utils/navigation';

interface ComponentProps extends Baseprops {
  onclick?: () => void;
  children: React.ReactNode;
}

export const BottomModelView: React.FC<ComponentProps> = ({ children, onclick }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Pressable onPress={onclick} style={BottomModelStyle.mainView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%' }}
        >
          {/* Taps inside the sheet must not reach the backdrop (which closes it). */}
          <Pressable onPress={Keyboard.dismiss} style={BottomModelStyle.subView}>{children}</Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};
