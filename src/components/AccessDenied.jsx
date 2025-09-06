import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = ({ message = "Acceso denegado" }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Icono de acceso denegado */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {message}
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a este formulario. 
          Asegúrate de tener un ID de persona válido en la URL.
        </p>

        {/* Información adicional */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            ℹ️ Información requerida:
          </h3>
          <p className="text-sm text-yellow-700">
            La URL debe incluir un ID de persona válido para acceder a los formularios.
          </p>
        </div>

        {/* Botón para volver */}
        <button
          onClick={handleGoHome}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
