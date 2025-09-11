
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChange, signOut } from './services/firebaseAuth';
import FormularioVinculacion from './components/FormularioVinculacion.jsx'
import FormularioCliente from './components/FormularioCliente.jsx'
import FormularioSelector from './components/FormularioSelector.jsx'
import FormularioPublico from './components/FormularioPublico.jsx'
import Login from './components/Login.jsx'
import AccessDenied from './components/AccessDenied.jsx'
import { CONFIG } from './config.js'

// Componente para manejar formularios públicos con query parameters
const FormularioPublicoConQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el ID del formulario desde query parameters
  const urlParams = new URLSearchParams(location.search);
  const formularioId = urlParams.get('idform');
  
  // Si hay un ID de formulario, mostrar el formulario público
  if (formularioId) {
    return <FormularioPublico formularioId={formularioId} />;
  }
  
  // Si no hay ID de formulario, mostrar mensaje informativo
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sistema de Formularios</h1>
          <p className="text-gray-600 mb-6">
            Accede a tu formulario usando el enlace que te fue enviado.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Ejemplo de URL:</strong><br />
              https://formularioclientes-zeta.vercel.app/?idform=ABC123XYZ
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Si no tienes un enlace de formulario, contacta a la empresa que te lo envió.
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para manejar formularios con parámetros de URL
const FormularioWithParams = () => {
  const { tipoFormulario, personaId } = useParams();
  const navigate = useNavigate();

  // Validar que el personaId sea válido
  if (!personaId || personaId !== CONFIG.ALLOWED_PERSONA_ID) {
    return <AccessDenied message={CONFIG.MESSAGES.ACCESS_DENIED} />;
  }

  const handleBackToSelector = () => {
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderFormulario = () => {
    switch (tipoFormulario) {
      case 'vinculacion-clientes-form':
        return <FormularioVinculacion personaId={personaId} />;
      case 'pep-form':
        return <FormularioCliente personaId={personaId} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Formulario no encontrado</h1>
              <p className="text-gray-600 mb-4">El tipo de formulario "{tipoFormulario}" no existe.</p>
              <button
                onClick={handleBackToSelector}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        );
    }
  };

  const getFormularioTitle = () => {
    switch (tipoFormulario) {
      case 'vinculacion-clientes-form':
        return 'Formulario de Vinculación de Clientes';
      case 'pep-form':
        return 'Formulario PEP (Personas Expuestas Políticamente)';
      default:
        return 'Formulario';
    }
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToSelector}
              className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              ← Volver al Selector
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {getFormularioTitle()}
            </h1>
            {personaId && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                ID: {personaId}
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      {renderFormulario()}
    </div>
  );
};

// Componente principal de la aplicación
const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Por ahora no necesitamos escuchar cambios de autenticación
    // Solo simulamos que el usuario está autenticado para desarrollo
    setUser({ id: 'demo-user', phone: '1234567890' });
  }, []);

  const handleLoginSuccess = () => {
    // Simular login exitoso
    setUser({ id: 'demo-user', phone: '1234567890' });
  };

  const handleLogout = async () => {
    // Simular logout
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Ruta raíz que maneja formularios públicos con query parameters */}
        <Route path="/" element={<FormularioPublicoConQuery />} />
        
        {/* Rutas del dashboard (requieren autenticación) */}
        {user ? (
          <>
            <Route path="/dashboard" element={
              <div>
                <div className="bg-white shadow-sm border-b px-4 py-3">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-900">Sistema de Formularios</h1>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
                <FormularioSelector />
              </div>
            } />
            <Route path="/dashboard/formulario/:tipoFormulario/:personaId" element={<FormularioWithParams />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          </>
        ) : (
          <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
