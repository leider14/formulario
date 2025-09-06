// Configuración de IDs permitidos para desarrollo
export const CONFIG = {
  // ID fijo permitido para desarrollo (por ahora)
  ALLOWED_PERSONA_ID: 'PERSONA_DESARROLLO_2024',
  
  // Mensajes del sistema
  MESSAGES: {
    ACCESS_DENIED: 'ID de persona no válido',
    ACCESS_DENIED_DESCRIPTION: 'No tienes permisos para acceder a este formulario. Asegúrate de tener un ID de persona válido en la URL.',
    REQUIRED_INFO: 'La URL debe incluir un ID de persona válido para acceder a los formularios.',
    ONLY_ALLOWED_ID: 'Solo el ID "PERSONA_DESARROLLO_2024" está permitido por ahora. Cualquier otro ID mostrará un mensaje de acceso denegado.'
  }
};
