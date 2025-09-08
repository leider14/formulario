import React, { useState, useEffect } from 'react';
import { obtenerFormularioEnviadoPorId } from '../../firestore.js';
import ValidacionAcceso from './ValidacionAcceso.jsx';
import FormularioVinculacion from './FormularioVinculacion.jsx';
import FormularioCliente from './FormularioCliente.jsx';

const FormularioPublico = ({ formularioId }) => {
  const [formularioEnviado, setFormularioEnviado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [accesoValidado, setAccesoValidado] = useState(false);

  useEffect(() => {
    cargarFormularioEnviado();
  }, [formularioId]);

  const cargarFormularioEnviado = async () => {
    try {
      setCargando(true);
      setError('');
      
      if (!formularioId) {
        setError('ID de formulario no proporcionado');
        return;
      }

      const formulario = await obtenerFormularioEnviadoPorId(formularioId);
      
      if (!formulario) {
        setError('Formulario no encontrado');
        return;
      }

      if (!formulario.activo) {
        setError('Este formulario no está activo');
        return;
      }

      setFormularioEnviado(formulario);
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      setError('Error al cargar el formulario. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const handleAccesoValido = () => {
    setAccesoValidado(true);
  };

  const handleAccesoDenegado = () => {
    // El componente ValidacionAcceso ya maneja el error
  };

  const renderFormulario = () => {
    if (!formularioEnviado) return null;

    const propsFormulario = {
      personaId: formularioEnviado.id,
      formularioEnviado: formularioEnviado
    };

    switch (formularioEnviado.tipoFormulario) {
      case 'vinculacion_clientes':
        return <FormularioVinculacion {...propsFormulario} />;
      case 'pep':
        return <FormularioCliente {...propsFormulario} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Tipo de formulario no válido</h1>
              <p className="text-gray-600">El tipo de formulario "{formularioEnviado.tipoFormulario}" no es válido.</p>
            </div>
          </div>
        );
    }
  };

  const renderHeader = () => {
    if (!formularioEnviado) return null;

    const fechaCreacion = formularioEnviado.fechaEnvio?.toDate();
    const fechaLimite = formularioEnviado.fechaLimite?.toDate();

    return (
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-lg font-semibold text-gray-900 mb-2">
                {formularioEnviado.tipoFormulario === 'pep' ? 'Formulario PEP' : 'Formulario de Vinculación'}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Nombre:</strong> {formularioEnviado.nombrePersona}</p>
                <p><strong>Fecha de creación:</strong> {fechaCreacion?.toLocaleDateString('es-CO')}</p>
                <p><strong>Fecha límite:</strong> {fechaLimite?.toLocaleDateString('es-CO')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                formularioEnviado.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                formularioEnviado.estado === 'completado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {formularioEnviado.estado === 'pendiente' ? 'Pendiente' : 
                 formularioEnviado.estado === 'completado' ? 'Completado' : 'Expirado'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
              Error
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!accesoValidado) {
    return <ValidacionAcceso 
      formularioEnviado={formularioEnviado}
      onAccesoValido={handleAccesoValido}
      onAccesoDenegado={handleAccesoDenegado}
    />;
  }

  return (
    <div>
      {renderHeader()}
      {renderFormulario()}
    </div>
  );
};

export default FormularioPublico;
