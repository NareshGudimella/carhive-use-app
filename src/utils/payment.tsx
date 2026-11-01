// Razorpay checkout + server confirmation, shared by the booking, extension and
// extra-km payments. The webhook stays the source of truth; verify/status only let
// the app show the right screen sooner.

import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";
//@ts-ignore
import RazorpayCheckout from 'react-native-razorpay';
import { excuteGetResponse, paymentVerify } from "../apis/api";
import { showMessage } from "../components/MessageModal";
import { hp, wp } from "./ResponsiveScreen";

export type PaymentResult = 'SUCCESS' | 'PENDING' | 'FAILED'

const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 30000

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms))

// Calls verify with what checkout returned, then polls the order status while it is pending.
export const confirmPayment = async (orderId: string, checkoutData: any): Promise<PaymentResult> => {
    const verify = await paymentVerify(
        checkoutData?.razorpay_order_id || orderId,
        checkoutData?.razorpay_payment_id,
        checkoutData?.razorpay_signature,
    )
    if (verify.code == 0 && verify.message == 'PAYMENT_CONFIRMED') {
        return 'SUCCESS'
    }
    if (verify.message == 'PAYMENT_FAILED') {
        return 'FAILED'
    }
    // PAYMENT_PENDING (and anything unexpected, e.g. INVALID_SIGNATURE or no network):
    // the order status is authoritative, so poll it.
    const started = Date.now()
    while (Date.now() - started < POLL_TIMEOUT_MS) {
        await wait(POLL_INTERVAL_MS)
        const status = await excuteGetResponse(`secure/cars/payment/status/${orderId}`)
        if (status.code == 0 && status.data) {
            if (status.data.status == 'SUCCESS') {
                return 'SUCCESS'
            }
            if (status.data.status == 'FAILED') {
                return 'FAILED'
            }
        }
    }
    return 'PENDING'
}

type PayOptions = {
    // data from secure/cars/payment|extended_payment|extra_payment/{id}
    order: any
    user: any
    bookingId: any
    navigation: any
    description?: string
    // toggles the "Confirming your payment" overlay
    setConfirming: (value: boolean) => void
}

// Opens Razorpay checkout, confirms the payment and navigates to the result.
export const payWithRazorpay = async ({ order, user, bookingId, navigation, description, setConfirming }: PayOptions) => {
    const options = {
        description: description || 'Payment for booking',
        image: order.image,
        currency: 'INR',
        key: order.key,
        amount: order.amount,
        name: 'CARHIVE SERVICES',
        prefill: {
            email: user && user.email,
            contact: user && user.mobile,
            name: user && user.name
        },
        order_id: order.id,
        theme: { color: '#F37254' }
    }
    let checkoutData: any
    try {
        checkoutData = await RazorpayCheckout.open(options)
    } catch (error) {
        console.log('ERROR', error)
        Alert.alert('Payment failed', 'Please try again.', [{ text: 'OK' }]);
        return
    }

    setConfirming(true)
    let result: PaymentResult = 'PENDING'
    try {
        result = await confirmPayment(order.id, checkoutData)
    } finally {
        setConfirming(false)
    }

    if (result == 'SUCCESS') {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'PaymentSuccessScreen',
                params: { amount: order.actual_amount, Id: bookingId }
            }],
        });
    } else if (result == 'FAILED') {
        showMessage({
            kind: 'error',
            title: 'Payment failed',
            message: 'Your payment could not be completed. Please try again.',
        })
    } else {
        showMessage({
            kind: 'info',
            title: 'Confirming your payment',
            message: "Payment received. We're confirming it with the bank and will notify you once it's done.",
            onClose: () => navigation.reset({
                index: 1,
                routes: [{ name: 'HomeScreen' }, { name: 'RentalsScreen' }],
            }),
        })
    }
}

export const PaymentConfirmingModal: React.FC<{ visible: boolean }> = ({ visible }) => (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent onRequestClose={() => { }}>
        <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 20, 30, 0.55)',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 20,
                paddingVertical: hp(3),
                paddingHorizontal: wp(8),
                alignItems: 'center',
                width: wp(80),
            }}>
                <ActivityIndicator size="large" color="#00354a" />
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: hp(2), textAlign: 'center' }}>
                    Confirming your payment
                </Text>
                <Text style={{ fontSize: 14, color: '#5B6B73', marginTop: hp(1), textAlign: 'center' }}>
                    Please don't close the app.
                </Text>
            </View>
        </View>
    </Modal>
)
