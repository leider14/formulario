import React, { useState, useEffect } from 'react';
import { setupRecaptcha, sendVerificationCode, verifyCode } from '../services/firebaseAuth';

const Login = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' o 'code'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Configurar reCAPTCHA
    setupRecaptcha('recaptcha-container');
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Enviar código de verificación
      const confirmationResult = await sendVerificationCode(phoneNumber);
      
      setVerificationId(confirmationResult.verificationId);
      setStep('code');
      setLoading(false);
    } catch (error) {
      console.error('Error al enviar código:', error);
      setError('Error al enviar el código. Verifica el número de teléfono.');
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Verificar código
      await verifyCode(verificationId, verificationCode);
      
      // Login exitoso
      onLoginSuccess();
    } catch (error) {
      console.error('Error al verificar código:', error);
      setError('Código incorrecto. Intenta nuevamente.');
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setVerificationCode('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa con tu número de teléfono
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'phone' ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Número de Teléfono
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div id="recaptcha-container"></div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar Código'}
                </button>
                
                <button
                  type="button"
                  onClick={() => onLoginSuccess()}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  🧪 Ingresar sin Login (Pruebas)
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Código de Verificación
                </label>
                <div className="mt-1">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Ingresa el código de 6 dígitos enviado a {phoneNumber}
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verificando...' : 'Verificar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
