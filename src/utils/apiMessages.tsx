// Turns backend error responses into messages a user can act on.
// excuteResponse returns { code: 2 } on network failure, and Laravel's throttle
// returns { message: 'Too Many Attempts.' } without a code.

export type MessageKind = 'error' | 'warning' | 'success' | 'info';

export type FriendlyMessage = {
    kind: MessageKind;
    title: string;
    message: string;
};

const MESSAGES: Record<string, FriendlyMessage> = {
    // Login
    OTP_SEND_FAILED: {
        kind: 'error',
        title: "Couldn't send OTP",
        message: "We couldn't send the OTP to your number right now. Please try again in a few minutes.",
    },
    // Login OTP
    'OTP mismatch or expired': {
        kind: 'warning',
        title: 'OTP expired',
        message: 'This OTP has expired. Tap "Resend OTP" to get a new one.',
    },
    // Aadhaar
    AADHAAR_SERVICE_UNAVAILABLE: {
        kind: 'warning',
        title: 'Aadhaar service is busy',
        message: 'The Aadhaar verification service is not responding right now. Please try again in a few minutes.',
    },
    AADHAAR_OTP_EXPIRED: {
        kind: 'warning',
        title: 'Aadhaar OTP expired',
        message: 'This OTP has expired or was already used. Please request a new OTP for your Aadhaar.',
    },
    // Driving licence
    LICIENCE_NOT_FOUND: {
        kind: 'error',
        title: 'Licence not found',
        message: 'We could not find a driving licence with this number and date of birth. Please check both and try again.',
    },
    LICIENCE_SERVICE_UNAVAILABLE: {
        kind: 'warning',
        title: 'Licence service is busy',
        message: 'The licence verification service is not responding right now. Please try again in a few minutes.',
    },
    LICIENCE_VERIFICATION_FAILED: {
        kind: 'error',
        title: 'Licence not verified',
        message: 'We could not verify your driving licence. Please check the details or contact support.',
    },
};

// What a generic failure ('Invalid', 'INVALID', ...) means depends on the step.
const FALLBACKS: Record<string, FriendlyMessage> = {
    login: {
        kind: 'error',
        title: "Couldn't send OTP",
        message: 'Please check your mobile number and try again.',
    },
    loginOtp: {
        kind: 'error',
        title: 'Incorrect OTP',
        message: 'The OTP you entered is incorrect. Please check the SMS and try again.',
    },
    aadharSend: {
        kind: 'error',
        title: 'Aadhaar not verified',
        message: 'We could not send an OTP for this Aadhaar number. Please check the number, or contact support.',
    },
    aadharOtp: {
        kind: 'error',
        title: 'Incorrect OTP',
        message: 'The Aadhaar OTP is incorrect. Please enter the OTP sent to your Aadhaar-linked mobile number.',
    },
    licence: {
        kind: 'error',
        title: 'Licence not verified',
        message: 'We could not verify your driving licence. Please check the details and try again.',
    },
    default: {
        kind: 'error',
        title: 'Something went wrong',
        message: 'Please try again in a moment.',
    },
};

export const getFriendlyError = (response: any, context: keyof typeof FALLBACKS = 'default'): FriendlyMessage => {
    if (!response || response.code == 2) {
        return {
            kind: 'warning',
            title: 'No connection',
            message: 'We could not reach Carhive. Please check your internet connection and try again.',
        };
    }
    const message = String(response.message || '');
    if (/too many attempts/i.test(message)) {
        return {
            kind: 'warning',
            title: 'Too many attempts',
            message: 'You have tried too many times. Please wait a minute and try again.',
        };
    }
    return MESSAGES[message] || FALLBACKS[context] || FALLBACKS.default;
};
