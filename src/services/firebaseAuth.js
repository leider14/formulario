import { auth } from './firebase';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider,
  RecaptchaVerifier 
} from 'firebase/auth';

// Configurar reCAPTCHA para autenticación por teléfono
export const setupRecaptcha = (containerId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'normal',
      'callback': (response) => {
        console.log('reCAPTCHA resuelto');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expirado');
        // Limpiar el reCAPTCHA expirado
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      }
    });
  }
  return window.recaptchaVerifier;
};

// Enviar código de verificación
export const sendVerificationCode = async (phoneNumber) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      formattedPhone, 
      window.recaptchaVerifier
    );
    
    return confirmationResult;
  } catch (error) {
    throw error;
  }
};

// Verificar código de verificación
export const verifyCode = async (verificationId, code) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const result = await auth.signInWithCredential(credential);
    return result;
  } catch (error) {
    throw error;
  }
};

// Cerrar sesión
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

// Obtener usuario actual
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Escuchar cambios en el estado de autenticación
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};
