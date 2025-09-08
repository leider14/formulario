import React, { useState } from 'react';

const ValidacionAcceso = ({ formularioEnviado, onAccesoValido, onAccesoDenegado }) => {
  const [telefonoIngresado, setTelefonoIngresado] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarAcceso = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Validar que el teléfono coincida con el del formulario
      if (telefonoIngresado.trim() === formularioEnviado.telefono) {
        onAccesoValido();
      } else {
        setError('El teléfono ingresado no coincide con el registrado para este formulario.');
        onAccesoDenegado();
      }
    } catch (error) {
      setError('Error al validar el acceso. Por favor, intente nuevamente.');
      console.error('Error en validación:', error);
    } finally {
      setCargando(false);
    }
  };

  const verificarTiempoLimite = () => {
    const ahora = new Date();
    const fechaLimite = formularioEnviado.fechaLimite?.toDate();
    
    if (fechaLimite && ahora > fechaLimite) {
      return true; // El formulario ha expirado
    }
    return false;
  };

  const estaExpirado = verificarTiempoLimite();

  if (estaExpirado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Formulario Expirado
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Lo sentimos, el tiempo límite para completar este formulario ha expirado.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-sm text-red-800">
                <p className="font-medium mb-2">Detalles del formulario:</p>
                <p><strong>Nombre:</strong> {formularioEnviado.nombrePersona}</p>
                <p><strong>Fecha límite:</strong> {formularioEnviado.fechaLimite?.toDate().toLocaleDateString('es-CO')}</p>
                <p><strong>Estado:</strong> <span className="text-red-600 font-medium">Expirado</span></p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Si considera que esto es un error, por favor contacte a la empresa que le envió este formulario.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Validación de Acceso
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Para acceder al formulario, ingrese su número de teléfono registrado.
          </p>
        </div>

        {/* Información del formulario */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Formulario</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="font-medium text-gray-900">{formularioEnviado.nombrePersona}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="font-medium text-gray-900">
                {formularioEnviado.tipoFormulario === 'pep' ? 'Formulario PEP' : 'Formulario de Vinculación'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha límite:</span>
              <span className="font-medium text-gray-900">
                {formularioEnviado.fechaLimite?.toDate().toLocaleDateString('es-CO')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className={`font-medium ${
                formularioEnviado.estado === 'pendiente' ? 'text-yellow-600' : 
                formularioEnviado.estado === 'completado' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {formularioEnviado.estado === 'pendiente' ? 'Pendiente' : 
                 formularioEnviado.estado === 'completado' ? 'Completado' : 'Expirado'}
              </span>
            </div>
          </div>
        </div>

        {/* Formulario de validación */}
        <form className="mt-8 space-y-6" onSubmit={validarAcceso}>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Número de Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              value={telefonoIngresado}
              onChange={(e) => setTelefonoIngresado(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Ingrese su número de teléfono"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={cargando || !telefonoIngresado.trim()}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                cargando || !telefonoIngresado.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {cargando ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validando...
                </div>
              ) : (
                'Acceder al Formulario'
              )}
            </button>
          </div>
        </form>

        {/* Información adicional */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Si no recuerda su número de teléfono, contacte a la empresa que le envió este formulario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidacionAcceso;
