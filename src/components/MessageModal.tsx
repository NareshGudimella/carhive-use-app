import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FriendlyMessage, MessageKind } from "../utils/apiMessages";

// App-wide message popup. Mount <MessageModal /> once at the root, then call
// showMessage(...) from anywhere instead of Alert.alert.

type Payload = FriendlyMessage & { buttonText?: string; onClose?: () => void };

let listener: ((payload: Payload) => void) | null = null;

export const showMessage = (payload: Payload) => {
    if (listener) {
        listener(payload);
    }
};

const THEME: Record<MessageKind, { icon: string; color: string; tint: string }> = {
    error: { icon: '!', color: '#D64545', tint: '#FDECEC' },
    warning: { icon: '!', color: '#E0A100', tint: '#FFF6DB' },
    success: { icon: '✓', color: '#1E9E5A', tint: '#E6F6EE' },
    info: { icon: 'i', color: '#00354a', tint: '#E5EEF2' },
};

const MessageModal: React.FC = () => {
    const [payload, setPayload] = useState<Payload | null>(null);
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        listener = setPayload;
        return () => { listener = null; };
    }, []);

    useEffect(() => {
        if (payload) {
            scale.setValue(0.9);
            opacity.setValue(0);
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, friction: 7, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
            ]).start();
        }
    }, [payload]);

    const close = () => {
        const onClose = payload?.onClose;
        setPayload(null);
        if (onClose) {
            onClose();
        }
    };

    if (!payload) {
        return null;
    }
    const theme = THEME[payload.kind] || THEME.info;

    return (
        <Modal transparent visible animationType="fade" statusBarTranslucent onRequestClose={close}>
            <View style={styles.backdrop}>
                <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
                    <View style={[styles.iconRing, { backgroundColor: theme.tint }]}>
                        <View style={[styles.iconDot, { backgroundColor: theme.color }]}>
                            <Text style={styles.iconText}>{theme.icon}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{payload.title}</Text>
                    <Text style={styles.message}>{payload.message}</Text>
                    <Pressable
                        onPress={close}
                        style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}>
                        <Text style={styles.buttonText}>{payload.buttonText || 'Okay'}</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 20, 30, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(8),
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingTop: hp(3.5),
        paddingBottom: hp(2.5),
        paddingHorizontal: wp(6),
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
    },
    iconRing: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    iconDot: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#0F1F26',
        textAlign: 'center',
        marginBottom: hp(1),
    },
    message: {
        fontSize: 15,
        lineHeight: 22,
        color: '#5B6B73',
        textAlign: 'center',
        marginBottom: hp(3),
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#00354a',
        height: hp(5.5),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default MessageModal;
