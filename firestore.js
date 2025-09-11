// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, limit, startAfter, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-yCOt8Cc0cNtCxwXrQZLrG3vvYgX5nc8",
  authDomain: "formularios-9ecc5.firebaseapp.com",
  projectId: "formularios-9ecc5",
  storageBucket: "formularios-9ecc5.firebasestorage.app",
  messagingSenderId: "358726414251",
  appId: "1:358726414251:web:de988290955c5fb9b86cee"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Modelos de datos

// Modelo: Empresa
export const Empresa = {
  id: "",
  
  nombre: "",
  email: "",
  telefono: "",
  fechaCreacion: new Date(),
  activa: true
};

// Modelo: Formulario
export const Formulario = {
  id: "",
  empresaId: "",
  nombre: "",
  descripcion: "",
  fechaCreacion: new Date(),
  fechaLimite: null, // null significa sin límite
  duracionDias: null, // null significa sin límite de días
  activo: true,
  tipo: "vinculacion_clientes" // "vinculacion_clientes" o "pep"
};

// Modelo: ConfiguracionFormulario
export const ConfiguracionFormulario = {
  id: "",
  empresaId: "",
  tipoFormulario: "", // "vinculacion_clientes" o "pep"
  tiempoLimiteMaximo: 10, // días por defecto
  activo: true,
  fechaActualizacion: new Date()
};

// Modelo: Usuario (estructura simplificada)
export const Usuario = {
  id: "",
  empresaId: "",
  nombre: "",
  email: "", // Este es la "clave" de acceso
  cargo: "",
  telefono: "",
  fechaCreacion: new Date(),
  activo: true,
  permisos: {
    puedeCrearVinculacion: false,
    puedeVerVinculacion: false,
    puedeCrearPEP: false,
    puedeVerPEP: false,
    puedeVerHistorial: false,
    puedeVerEstadisticas: false,
    puedeGestionarAjustes: false
  }
};

// Modelo: FormularioEnviado
export const FormularioEnviado = {
  id: "",
  formularioId: "",
  empresaId: "",
  nombrePersona: "",
  telefono: "",
  cedula: "",
  fechaEnvio: new Date(),
  fechaLimite: null,
  estado: "pendiente", // "pendiente", "completado", "expirado"
  urlAcceso: "",
  activo: true,
  tipoFormulario: "" // "vinculacion_clientes" o "pep"
};

// Funciones de Firestore

// Empresas
export const crearEmpresa = async (empresa) => {
  try {
    const docRef = await addDoc(collection(db, "empresas"), empresa);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear empresa:", error);
    throw error;
  }
};

export const obtenerEmpresas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "empresas"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    throw error;
  }
};

export const obtenerEmpresaPorId = async (empresaId) => {
  try {
    const docRef = doc(db, "empresas", empresaId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No se encontró la empresa con ID:", empresaId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener empresa por ID:", error);
    throw error;
  }
};

// Formularios
export const crearFormulario = async (formulario) => {
  try {
    const docRef = await addDoc(collection(db, "formularios"), formulario);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear formulario:", error);
    throw error;
  }
};

export const obtenerFormularios = async (empresaId = null) => {
  try {
    let q = query(collection(db, "formularios"), orderBy("fechaCreacion", "desc"));
    if (empresaId) {
      q = query(collection(db, "formularios"), where("empresaId", "==", empresaId), orderBy("fechaCreacion", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener formularios:", error);
    throw error;
  }
};

// Formularios Enviados
export const crearFormularioEnviado = async (formularioEnviado) => {
  try {
    const docRef = await addDoc(collection(db, "formulariosEnviados"), formularioEnviado);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear formulario enviado:", error);
    throw error;
  }
};

export const crearFormularioEnviadoConId = async (id, formularioEnviado) => {
  try {
    const docRef = doc(db, "formulariosEnviados", id);
    await setDoc(docRef, formularioEnviado);
    return id;
  } catch (error) {
    console.error("Error al crear formulario enviado con ID:", error);
    throw error;
  }
};

export const obtenerFormulariosEnviados = async (formularioId = null, empresaId = null, creadoPor = null) => {
  try {
    let q = query(collection(db, "formulariosEnviados"), orderBy("fechaEnvio", "desc"));
    
    if (formularioId) {
      q = query(collection(db, "formulariosEnviados"), where("formularioId", "==", formularioId), orderBy("fechaEnvio", "desc"));
    } else if (empresaId) {
      q = query(collection(db, "formulariosEnviados"), where("empresaId", "==", empresaId), orderBy("fechaEnvio", "desc"));
    } else if (creadoPor) {
      // Si se especifica creadoPor, filtrar por ese usuario
      q = query(collection(db, "formulariosEnviados"), where("creadoPor", "==", creadoPor), orderBy("fechaEnvio", "desc"));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener formularios enviados:", error);
    throw error;
  }
};

export const actualizarEstadoFormularioEnviado = async (id, nuevoEstado) => {
  try {
    const docRef = doc(db, "formulariosEnviados", id);
    await updateDoc(docRef, { estado: nuevoEstado });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    throw error;
  }
};

export const obtenerFormularioEnviadoPorId = async (formularioId) => {
  try {
    console.log('Firestore: Obteniendo formulario enviado por ID:', formularioId);
    const docRef = doc(db, "formulariosEnviados", formularioId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Firestore: Formulario enviado obtenido:', data);
      return { id: docSnap.id, ...data };
    } else {
      console.log('Firestore: Formulario enviado no encontrado');
      console.log('Firestore: Intentando buscar en todas las colecciones...');
      
      // Función de depuración: buscar en todas las colecciones
      await debugBuscarFormulario(formularioId);
      
      return null;
    }
  } catch (error) {
    console.error("Error al obtener formulario enviado por ID:", error);
    throw error;
  }
};

// Función de depuración para buscar el formulario
export const debugBuscarFormulario = async (formularioId) => {
  try {
    console.log('=== DEBUG: Buscando formulario en todas las colecciones ===');
    console.log('Firebase App:', app);
    console.log('Firestore DB:', db);
    console.log('Project ID:', firebaseConfig.projectId);
    
    // Verificar conexión a Firestore
    console.log('Verificando conexión a Firestore...');
    
    // Buscar en formulariosEnviados
    console.log('1. Buscando en formulariosEnviados...');
    try {
      const formulariosEnviados = await getDocs(collection(db, "formulariosEnviados"));
      console.log('Total formularios enviados:', formulariosEnviados.size);
      
      formulariosEnviados.forEach(doc => {
        console.log('ID:', doc.id, 'Data:', doc.data());
      });
    } catch (error) {
      console.error('Error al obtener formulariosEnviados:', error);
    }
    
    // Buscar en formularios
    console.log('2. Buscando en formularios...');
    try {
      const formularios = await getDocs(collection(db, "formularios"));
      console.log('Total formularios:', formularios.size);
      
      formularios.forEach(doc => {
        console.log('ID:', doc.id, 'Data:', doc.data());
      });
    } catch (error) {
      console.error('Error al obtener formularios:', error);
    }
    
    // Buscar en empresas
    console.log('3. Buscando en empresas...');
    try {
      const empresas = await getDocs(collection(db, "empresas"));
      console.log('Total empresas:', empresas.size);
      
      empresas.forEach(doc => {
        console.log('ID:', doc.id, 'Data:', doc.data());
      });
    } catch (error) {
      console.error('Error al obtener empresas:', error);
    }
    
    // Buscar en usuarios
    console.log('4. Buscando en usuarios...');
    try {
      const usuarios = await getDocs(collection(db, "usuarios"));
      console.log('Total usuarios:', usuarios.size);
      
      usuarios.forEach(doc => {
        console.log('ID:', doc.id, 'Data:', doc.data());
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
    
    console.log('=== FIN DEBUG ===');
  } catch (error) {
    console.error('Error en debug:', error);
  }
};

// Información de Empresa
export const obtenerInformacionEmpresa = async (empresaId) => {
  try {
    console.log('Firestore: Obteniendo información de empresa:', empresaId);
    const empresaRef = doc(db, "empresas", empresaId);
    const empresaDoc = await getDoc(empresaRef);
    
    if (empresaDoc.exists()) {
      const data = empresaDoc.data();
      console.log('Firestore: Información de empresa obtenida:', data);
      return { id: empresaDoc.id, ...data };
    } else {
      console.log('Firestore: Empresa no encontrada');
      return null;
    }
  } catch (error) {
    console.error("Error al obtener información de empresa:", error);
    throw error;
  }
};

export const actualizarInformacionEmpresa = async (empresaId, informacion) => {
  try {
    console.log('Firestore: Actualizando información de empresa:', empresaId, 'con datos:', informacion);
    const empresaRef = doc(db, "empresas", empresaId);
    await updateDoc(empresaRef, {
      ...informacion,
      fechaActualizacion: new Date()
    });
    console.log('Firestore: Información de empresa actualizada exitosamente');
  } catch (error) {
    console.error("Error al actualizar información de empresa:", error);
    throw error;
  }
};

// Configuraciones de Formularios - Guardar en documento de empresa
export const obtenerConfiguracionesEmpresa = async (empresaId) => {
  try {
    console.log('Firestore: Obteniendo configuraciones de empresa:', empresaId);
    const empresaRef = doc(db, "empresas", empresaId);
    const empresaDoc = await getDoc(empresaRef);
    
    if (empresaDoc.exists()) {
      const data = empresaDoc.data();
      const configuraciones = data.configuracionesFormularios || {};
      console.log('Firestore: Configuraciones de empresa obtenidas:', configuraciones);
      return configuraciones;
    } else {
      console.log('Firestore: Empresa no encontrada');
      return {};
    }
  } catch (error) {
    console.error("Error al obtener configuraciones de empresa:", error);
    throw error;
  }
};

export const actualizarConfiguracionesEmpresa = async (empresaId, configuraciones) => {
  try {
    console.log('Firestore: Actualizando configuraciones de empresa:', empresaId, 'con datos:', configuraciones);
    const empresaRef = doc(db, "empresas", empresaId);
    await updateDoc(empresaRef, {
      configuracionesFormularios: configuraciones,
      fechaActualizacion: new Date()
    });
    console.log('Firestore: Configuraciones de empresa actualizadas exitosamente');
  } catch (error) {
    console.error("Error al actualizar configuraciones de empresa:", error);
    throw error;
  }
};

// Configuraciones de Formularios - Colección separada (DEPRECATED)
export const crearConfiguracionFormulario = async (configuracion) => {
  try {
    console.log('Firestore: Creando configuración con datos:', configuracion);
    const docRef = await addDoc(collection(db, "configuracionesFormularios"), configuracion);
    console.log('Firestore: Configuración creada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear configuración:", error);
    throw error;
  }
};

export const obtenerConfiguracionesFormularios = async (empresaId = null) => {
  try {
    console.log('Firestore: Obteniendo configuraciones para empresaId:', empresaId);
    let q = query(collection(db, "configuracionesFormularios"), orderBy("fechaActualizacion", "desc"));
    if (empresaId) {
      q = query(collection(db, "configuracionesFormularios"), where("empresaId", "==", empresaId), orderBy("fechaActualizacion", "desc"));
    }
    const querySnapshot = await getDocs(q);
    const configuraciones = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Firestore: Configuraciones obtenidas:', configuraciones);
    return configuraciones;
  } catch (error) {
    console.error("Error al obtener configuraciones:", error);
    throw error;
  }
};

export const actualizarConfiguracionFormulario = async (id, nuevaConfiguracion) => {
  try {
    console.log('Firestore: Actualizando configuración ID:', id, 'con datos:', nuevaConfiguracion);
    const docRef = doc(db, "configuracionesFormularios", id);
    const datosActualizacion = { ...nuevaConfiguracion, fechaActualizacion: new Date() };
    console.log('Firestore: Datos finales de actualización:', datosActualizacion);
    await updateDoc(docRef, datosActualizacion);
    console.log('Firestore: Configuración actualizada exitosamente');
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    throw error;
  }
};

// Usuarios
export const obtenerUsuarioPorEmail = async (email) => {
  try {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    throw error;
  }
};

export const obtenerUsuarios = async (empresaId = null) => {
  try {
    let q = query(collection(db, "usuarios"), orderBy("fechaCreacion", "desc"));
    if (empresaId) {
      q = query(collection(db, "usuarios"), where("empresaId", "==", empresaId), orderBy("fechaCreacion", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), usuario);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const actualizarUsuario = async (usuarioId, datosActualizacion) => {
  try {
    const docRef = doc(db, "usuarios", usuarioId);
    await updateDoc(docRef, { ...datosActualizacion, fechaActualizacion: new Date() });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (usuarioId) => {
  try {
    const docRef = doc(db, "usuarios", usuarioId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Función para verificar la conexión y listar todas las colecciones
export const verificarConexionFirestore = async () => {
  try {
    console.log('=== VERIFICACIÓN DE CONEXIÓN FIRESTORE ===');
    console.log('Firebase App:', app);
    console.log('Firestore DB:', db);
    console.log('Project ID:', firebaseConfig.projectId);
    console.log('Auth Domain:', firebaseConfig.authDomain);
    
    // Intentar una operación simple para verificar la conexión
    console.log('Probando conexión con una consulta simple...');
    
    // Listar todas las colecciones conocidas
    const colecciones = [
      'empresas',
      'formularios', 
      'formulariosEnviados',
      'usuarios',
      'configuracionesFormularios'
    ];
    
    for (const nombreColeccion of colecciones) {
      try {
        console.log(`\n--- Colección: ${nombreColeccion} ---`);
        const snapshot = await getDocs(collection(db, nombreColeccion));
        console.log(`Total documentos: ${snapshot.size}`);
        
        if (snapshot.size > 0) {
          console.log('Primeros 3 documentos:');
          snapshot.docs.slice(0, 3).forEach((doc, index) => {
            console.log(`  ${index + 1}. ID: ${doc.id}`);
            console.log(`     Data:`, doc.data());
          });
        }
      } catch (error) {
        console.error(`Error al acceder a ${nombreColeccion}:`, error);
      }
    }
    
    console.log('\n=== FIN VERIFICACIÓN ===');
    return true;
  } catch (error) {
    console.error('Error en verificación de conexión:', error);
    return false;
  }
};

export { db };