
import React, { useState, useEffect } from 'react'
import { onAuthStateChange, signOut } from './services/firebaseAuth';
import FormularioVinculacion from './components/FormularioVinculacion.jsx'
import FormularioCliente from './components/FormularioCliente.jsx'
import FormularioSelector from './components/FormularioSelector.jsx'
import Login from './components/Login.jsx'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFormulario, setSelectedFormulario] = useState(null);

  useEffect(() => {
    // Por ahora no necesitamos escuchar cambios de autenticación
    // Solo simulamos que el usuario está autenticado para desarrollo
  }, []);

  const handleLoginSuccess = () => {
    // Simular login exitoso
    setUser({ id: 'demo-user', phone: '1234567890' });
  };

  const handleSelectFormulario = (formularioId) => {
    setSelectedFormulario(formularioId);
  };

  const handleBackToSelector = () => {
    setSelectedFormulario(null);
  };

  const handleLogout = async () => {
    // Simular logout
    setUser(null);
    setSelectedFormulario(null);
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
      {user ? (
        <div>
          {selectedFormulario ? (
            // Mostrar formulario específico
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
                      {selectedFormulario === 'vinculacion' ? 'Formulario de Vinculación' : 
                       selectedFormulario === 'cliente' ? 'Formulario Registro de Clientes' : 
                       'Formulario'}
                    </h1>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
              {selectedFormulario === 'vinculacion' && <FormularioVinculacion />}
              {selectedFormulario === 'cliente' && <FormularioCliente />}
            </div>
          ) : (
            // Mostrar selector de formularios
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
              <FormularioSelector onSelectFormulario={handleSelectFormulario} />
            </div>
          )}
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
