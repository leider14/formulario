# Sistema de Formularios Públicos

Este sistema permite crear formularios públicos que pueden ser accedidos por usuarios finales mediante un ID único en la URL.

## Características Principales

### 🔐 Validación de Acceso
- Los usuarios deben ingresar su número de teléfono para acceder al formulario
- El teléfono debe coincidir exactamente con el registrado en la base de datos
- Validación automática de tiempo límite

### 📋 Tipos de Formularios
- **Formulario PEP**: Para Personas Expuestas Políticamente
- **Formulario de Vinculación**: Para vinculación de clientes y proveedores

### ⏰ Control de Tiempo
- Validación automática de fecha límite
- Mensaje de expiración cuando el tiempo límite ha pasado
- Estado del formulario visible (pendiente, completado, expirado)

## Estructura de Datos

### Colección: `formulariosEnviados`
```javascript
{
  id: "string",                    // ID único del formulario enviado
  formularioId: "string",         // ID del tipo de formulario
  empresaId: "string",            // ID de la empresa
  nombrePersona: "string",       // Nombre de la persona
  telefono: "string",             // Teléfono (CLAVE DE ACCESO)
  cedula: "string",              // Cédula de la persona
  fechaEnvio: "Date",            // Fecha cuando se envió
  fechaLimite: "Date",           // Fecha límite para completar
  estado: "string",              // 'pendiente', 'completado', 'expirado'
  urlAcceso: "string",           // URL de acceso única
  activo: "boolean",             // Si el formulario está activo
  tipoFormulario: "string",      // 'pep' o 'vinculacion_clientes'
  creadoPor: "string"            // ID del usuario que creó el formulario
}
```

## Uso del Sistema

### 1. Acceso Público a Formularios
Los usuarios pueden acceder directamente a un formulario usando la URL:
```
/formulario/{ID_DEL_FORMULARIO}
```

### 2. Flujo de Validación
1. El usuario ingresa la URL con el ID del formulario
2. El sistema carga la información del formulario desde Firestore
3. Se muestra la pantalla de validación con el teléfono
4. El usuario ingresa su número de teléfono
5. Si coincide, se permite el acceso al formulario
6. Si no coincide o el formulario está expirado, se muestra un error

### 3. Validaciones de Seguridad
- **Formulario no encontrado**: Si el ID no existe en la base de datos
- **Formulario inactivo**: Si el campo `activo` es `false`
- **Formulario expirado**: Si la fecha actual supera `fechaLimite`
- **Teléfono incorrecto**: Si el teléfono ingresado no coincide

## Componentes Principales

### `FormularioPublico`
Componente principal que maneja:
- Carga del formulario desde Firestore
- Validación de acceso
- Renderizado del formulario correspondiente
- Manejo de errores

### `ValidacionAcceso`
Componente que maneja:
- Pantalla de validación con teléfono
- Verificación de tiempo límite
- Mensajes de error
- Interfaz de usuario para el acceso

### `FormularioVinculacion` y `FormularioCliente`
Componentes de formularios existentes modificados para:
- Mostrar información del formulario en el header
- Recibir datos del formulario enviado
- Mantener la funcionalidad original

## Funciones de Firestore

### `obtenerFormularioEnviadoPorId(formularioId)`
Obtiene un formulario enviado por su ID desde Firestore.

```javascript
const formulario = await obtenerFormularioEnviadoPorId('formulario-id-123');
```

## Ejemplo de Creación de Formulario

```javascript
import { crearFormularioEnviado } from './firestore.js';

const nuevoFormulario = {
  formularioId: 'pep-form',
  empresaId: 'empresa-123',
  nombrePersona: 'Juan Pérez',
  telefono: '3001234567',
  cedula: '12345678',
  fechaEnvio: new Date(),
  fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
  estado: 'pendiente',
  urlAcceso: `/formulario/formulario-${Date.now()}`,
  activo: true,
  tipoFormulario: 'pep',
  creadoPor: 'usuario-123'
};

const id = await crearFormularioEnviado(nuevoFormulario);
console.log('URL de acceso:', `/formulario/${id}`);
```

## Rutas del Sistema

### Rutas Públicas (Sin autenticación)
- `/formulario/:id` - Acceso público a formularios

### Rutas del Dashboard (Con autenticación)
- `/` - Dashboard principal
- `/dashboard/formulario/:tipoFormulario/:personaId` - Formularios del dashboard
- `/login` - Página de login

## Archivos de Prueba

El archivo `src/utils/formulariosPrueba.js` contiene funciones para crear formularios de prueba:

```javascript
import { crearFormularioPrueba, crearFormularioVinculacionPrueba } from './utils/formulariosPrueba.js';

// Crear formulario PEP de prueba
const { id, urlAcceso } = await crearFormularioPrueba();

// Crear formulario de vinculación de prueba
const { id, urlAcceso } = await crearFormularioVinculacionPrueba();
```

## Consideraciones de Seguridad

1. **Validación de teléfono**: Solo el teléfono exacto permite el acceso
2. **Tiempo límite**: Los formularios expiran automáticamente
3. **Estado del formulario**: Solo formularios activos pueden ser accedidos
4. **URLs únicas**: Cada formulario tiene un ID único

## Notas de Desarrollo

- El sistema mantiene la funcionalidad original del dashboard
- Los formularios públicos son completamente independientes del sistema de autenticación
- La validación de tiempo límite se realiza tanto en el frontend como debería implementarse en el backend
- Los mensajes de error son informativos pero no revelan información sensible
