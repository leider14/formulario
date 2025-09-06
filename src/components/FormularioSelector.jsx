import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config.js';

const FormularioSelector = () => {
  const navigate = useNavigate();

  const formularios = [
    {
      id: 'vinculacion-clientes-form',
      titulo: 'Formulario de Vinculación',
      descripcion: 'Formulario para vinculación de clientes y proveedores',
      icono: '📋',
      color: 'blue',
      disponible: true
    },
    {
      id: 'pep-form',
      titulo: 'Formulario PEP',
      descripcion: 'Formulario para Personas Expuestas Políticamente',
      icono: '🏛️',
      color: 'purple',
      disponible: true
    },
    {
      id: 'cliente-form',
      titulo: 'Formulario Registro de Clientes',
      descripcion: 'Formulario completo para registro y actualización de clientes con información tributaria y PEP',
      icono: '👤',
      color: 'green',
      disponible: false
    },
    {
      id: 'financiero',
      titulo: 'Formulario Financiero',
      descripcion: 'Formulario para información financiera y tributaria',
      icono: '💰',
      color: 'orange',
      disponible: false
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleFormularioClick = (formularioId) => {
    // ID fijo permitido para desarrollo
    const personaId = CONFIG.ALLOWED_PERSONA_ID;
    navigate(`/formulario/${formularioId}/${personaId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Formularios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecciona el formulario que necesitas completar. Cada formulario está diseñado 
            para recopilar información específica según el tipo de proceso.
          </p>
        </div>

        {/* Grid de formularios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formularios.map((formulario) => (
            <div
              key={formulario.id}
              className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${
                formulario.disponible 
                  ? `${getColorClasses(formulario.color)} cursor-pointer transform hover:scale-105 hover:shadow-lg` 
                  : 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => formulario.disponible && handleFormularioClick(formulario.id)}
            >
              {/* Badge de estado */}
              <div className="absolute top-4 right-4">
                {formulario.disponible ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Disponible
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                    Próximamente
                  </span>
                )}
              </div>

              {/* Icono */}
              <div className="text-4xl mb-4">{formulario.icono}</div>

              {/* Título */}
              <h3 className="text-xl font-semibold mb-2">{formulario.titulo}</h3>

              {/* Descripción */}
              <p className="text-sm opacity-80 mb-4">{formulario.descripcion}</p>

              {/* Botón */}
              <button
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  formulario.disponible
                    ? 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!formulario.disponible}
              >
                {formulario.disponible ? 'Seleccionar' : 'No disponible'}
              </button>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            📚 Información del Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700 mb-2">Formularios Disponibles:</p>
              <ul className="space-y-1">
                <li>• Formulario de Vinculación - Completamente funcional</li>
                <li>• Formulario PEP - Completamente funcional</li>
                <li>• Otros formularios - En desarrollo</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Características:</p>
              <ul className="space-y-1">
                <li>• URLs dinámicas con parámetros</li>
                <li>• Guardado automático de datos</li>
                <li>• Interfaz responsive</li>
                <li>• Validación de campos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Información sobre URLs */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🔗 URLs de Acceso Directo
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            Puedes acceder directamente a los formularios usando estas URLs con el ID fijo permitido:
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white p-3 rounded border">
              <code className="text-blue-600">
                /formulario/vinculacion-clientes-form/{CONFIG.ALLOWED_PERSONA_ID}
              </code>
              <p className="text-gray-600 mt-1">Para el formulario de vinculación</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <code className="text-blue-600">
                /formulario/pep-form/{CONFIG.ALLOWED_PERSONA_ID}
              </code>
              <p className="text-gray-600 mt-1">Para el formulario PEP</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Nota:</strong> {CONFIG.MESSAGES.ONLY_ALLOWED_ID}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSelector;
