// Script de prueba para crear formularios enviados
// Este archivo es solo para demostración y testing

import { 
  crearFormularioEnviado, 
  obtenerFormularioEnviadoPorId,
  actualizarEstadoFormularioEnviado 
} from '../../firestore.js';

// Función para crear un formulario de prueba
export const crearFormularioPrueba = async () => {
  try {
    const formularioPrueba = {
      formularioId: 'pep-form',
      empresaId: 'empresa-prueba-123',
      nombrePersona: 'Juan Pérez García',
      telefono: '3001234567',
      cedula: '12345678',
      fechaEnvio: new Date(),
      fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días desde ahora
      estado: 'pendiente',
      urlAcceso: `/formulario/formulario-prueba-${Date.now()}`,
      activo: true,
      tipoFormulario: 'pep',
      creadoPor: 'usuario-prueba'
    };

    const id = await crearFormularioEnviado(formularioPrueba);
    console.log('Formulario de prueba creado con ID:', id);
    console.log('URL de acceso:', `/formulario/${id}`);
    
    return { id, urlAcceso: `/formulario/${id}` };
  } catch (error) {
    console.error('Error al crear formulario de prueba:', error);
    throw error;
  }
};

// Función para crear un formulario de vinculación de prueba
export const crearFormularioVinculacionPrueba = async () => {
  try {
    const formularioPrueba = {
      formularioId: 'vinculacion-clientes-form',
      empresaId: 'empresa-prueba-123',
      nombrePersona: 'María González López',
      telefono: '3007654321',
      cedula: '87654321',
      fechaEnvio: new Date(),
      fechaLimite: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días desde ahora
      estado: 'pendiente',
      urlAcceso: `/formulario/formulario-vinculacion-prueba-${Date.now()}`,
      activo: true,
      tipoFormulario: 'vinculacion_clientes',
      creadoPor: 'usuario-prueba'
    };

    const id = await crearFormularioEnviado(formularioPrueba);
    console.log('Formulario de vinculación de prueba creado con ID:', id);
    console.log('URL de acceso:', `/formulario/${id}`);
    
    return { id, urlAcceso: `/formulario/${id}` };
  } catch (error) {
    console.error('Error al crear formulario de vinculación de prueba:', error);
    throw error;
  }
};

// Función para crear un formulario expirado de prueba
export const crearFormularioExpiradoPrueba = async () => {
  try {
    const formularioPrueba = {
      formularioId: 'pep-form',
      empresaId: 'empresa-prueba-123',
      nombrePersona: 'Carlos Expired Test',
      telefono: '3009998888',
      cedula: '99999999',
      fechaEnvio: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 días atrás
      fechaLimite: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
      estado: 'expirado',
      urlAcceso: `/formulario/formulario-expirado-prueba-${Date.now()}`,
      activo: true,
      tipoFormulario: 'pep',
      creadoPor: 'usuario-prueba'
    };

    const id = await crearFormularioEnviado(formularioPrueba);
    console.log('Formulario expirado de prueba creado con ID:', id);
    console.log('URL de acceso:', `/formulario/${id}`);
    
    return { id, urlAcceso: `/formulario/${id}` };
  } catch (error) {
    console.error('Error al crear formulario expirado de prueba:', error);
    throw error;
  }
};

// Función para probar el acceso a un formulario
export const probarAccesoFormulario = async (formularioId) => {
  try {
    const formulario = await obtenerFormularioEnviadoPorId(formularioId);
    if (formulario) {
      console.log('Formulario encontrado:', formulario);
      console.log('Nombre:', formulario.nombrePersona);
      console.log('Teléfono:', formulario.telefono);
      console.log('Tipo:', formulario.tipoFormulario);
      console.log('Estado:', formulario.estado);
      console.log('Fecha límite:', formulario.fechaLimite?.toDate());
      return formulario;
    } else {
      console.log('Formulario no encontrado');
      return null;
    }
  } catch (error) {
    console.error('Error al probar acceso:', error);
    throw error;
  }
};

// Función para crear un formulario con ID específico
export const crearFormularioConIdEspecifico = async (idEspecifico) => {
  try {
    const formularioPrueba = {
      formularioId: 'pep-form',
      empresaId: 'empresa-prueba-123',
      nombrePersona: 'Juan Pérez García',
      telefono: '3001234567',
      cedula: '12345678',
      fechaEnvio: new Date(),
      fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días desde ahora
      estado: 'pendiente',
      urlAcceso: `/formulario/${idEspecifico}`,
      activo: true,
      tipoFormulario: 'pep',
      creadoPor: 'usuario-prueba'
    };

    // Usar setDoc en lugar de addDoc para crear con ID específico
    const { setDoc } = await import('../../firestore.js');
    const { doc } = await import('firebase/firestore');
    const { db } = await import('../../firestore.js');
    
    const docRef = doc(db, "formulariosEnviados", idEspecifico);
    await setDoc(docRef, formularioPrueba);
    
    console.log('Formulario creado con ID específico:', idEspecifico);
    console.log('URL de acceso:', `/formulario/${idEspecifico}`);
    
    return { id: idEspecifico, urlAcceso: `/formulario/${idEspecifico}` };
  } catch (error) {
    console.error('Error al crear formulario con ID específico:', error);
    throw error;
  }
};

// Ejemplo de uso:
/*
// Crear formularios de prueba
const { id: pepId } = await crearFormularioPrueba();
const { id: vinculacionId } = await crearFormularioVinculacionPrueba();
const { id: expiradoId } = await crearFormularioExpiradoPrueba();

// Crear formulario con ID específico
const { id } = await crearFormularioConIdEspecifico('2UxEfD7zMcURyeapZV8G');

// Probar acceso
await probarAccesoFormulario(pepId);
await probarAccesoFormulario(vinculacionId);
await probarAccesoFormulario(expiradoId);
await probarAccesoFormulario('2UxEfD7zMcURyeapZV8G');
*/
