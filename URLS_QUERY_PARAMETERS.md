# Sistema de Formularios Públicos - URLs con Query Parameters

## 🔗 Nuevas URLs de Ejemplo

### **Formato de URL**
```
https://formularioclientes-zeta.vercel.app/formulario?idform=ID_DEL_FORMULARIO
```

### **Ejemplos Específicos**

#### **1. Formulario PEP Original**
```
https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G
```
- **Teléfono**: `3001234567`
- **Nombre**: Juan Pérez García
- **Tipo**: PEP
- **Estado**: Pendiente

#### **2. Localhost (para desarrollo)**
```
http://localhost:5174/formulario?idform=2UxEfD7zMcURyeapZV8G
```

### **3. Crear Formularios de Prueba**

#### **Formulario PEP**
```javascript
const pepForm = {
  formularioId: 'pep-form',
  empresaId: 'empresa-prueba-123',
  nombrePersona: 'María González López',
  telefono: '3007654321',
  cedula: '87654321',
  fechaEnvio: new Date(),
  fechaLimite: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  estado: 'pendiente',
  urlAcceso: '/formulario?idform=PEP-TEST-001',
  activo: true,
  tipoFormulario: 'pep',
  creadoPor: 'usuario-prueba'
};

const pepId = await crearFormularioEnviadoConId('PEP-TEST-001', pepForm);
console.log('URL PEP:', 'https://formularioclientes-zeta.vercel.app/formulario?idform=' + pepId);
```

#### **Formulario de Vinculación**
```javascript
const vinculacionForm = {
  formularioId: 'vinculacion-clientes-form',
  empresaId: 'empresa-prueba-123',
  nombrePersona: 'Carlos Rodríguez Martínez',
  telefono: '3009876543',
  cedula: '11223344',
  fechaEnvio: new Date(),
  fechaLimite: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  estado: 'pendiente',
  urlAcceso: '/formulario?idform=VINC-TEST-001',
  activo: true,
  tipoFormulario: 'vinculacion_clientes',
  creadoPor: 'usuario-prueba'
};

const vincId = await crearFormularioEnviadoConId('VINC-TEST-001', vinculacionForm);
console.log('URL Vinculación:', 'https://formularioclientes-zeta.vercel.app/formulario?idform=' + vincId);
```

## 🎯 Ventajas de Query Parameters

### **1. Simplicidad**
- No requiere configuración compleja de routing
- Funciona en cualquier servidor web
- Compatible con todos los CDNs

### **2. Compatibilidad**
- Funciona en Vercel sin configuración especial
- Funciona en Netlify sin configuración especial
- Funciona en cualquier hosting estático

### **3. Flexibilidad**
- Fácil de compartir por WhatsApp, SMS, email
- No requiere caracteres especiales en la URL
- Más fácil de recordar

## 📱 Ejemplos de Uso para Administradores

### **Enviar por WhatsApp**
```
Hola Juan,

Necesitamos que completes tu formulario PEP.

Accede aquí: https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G

Tu teléfono de acceso: 3001234567

Tienes hasta el [fecha límite] para completarlo.

Saludos,
[Tu empresa]
```

### **Enviar por Email**
```html
<p>Hola Juan,</p>
<p>Necesitamos que completes tu formulario PEP para continuar con el proceso.</p>
<p><a href="https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G">Acceder al Formulario</a></p>
<p>Tu teléfono de acceso: <strong>3001234567</strong></p>
<p>Tienes hasta el [fecha límite] para completarlo.</p>
<p>Saludos,<br>[Tu empresa]</p>
```

### **Enviar por SMS**
```
Formulario PEP: https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G
Teléfono: 3001234567
Vence: [fecha límite]
```

## 🔧 Funciones de Creación Actualizadas

### **Crear Formulario con URL Completa**
```javascript
const crearFormularioConURL = async (datosFormulario) => {
  const id = await crearFormularioEnviadoConId(datosFormulario.id, datosFormulario);
  const urlCompleta = `https://formularioclientes-zeta.vercel.app/formulario?idform=${id}`;
  
  return {
    id,
    url: urlCompleta,
    telefono: datosFormulario.telefono,
    nombre: datosFormulario.nombrePersona
  };
};

// Uso
const resultado = await crearFormularioConURL({
  id: 'FORM-001',
  nombrePersona: 'Ana García',
  telefono: '3001112222',
  tipoFormulario: 'pep',
  // ... otros datos
});

console.log('URL para enviar:', resultado.url);
console.log('Teléfono:', resultado.telefono);
```

## 🧪 URLs de Prueba

### **Formularios Existentes**
```
https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G
http://localhost:5174/formulario?idform=2UxEfD7zMcURyeapZV8G
```

### **Crear Nuevos Formularios**
```javascript
// Crear formulario PEP
const pep = await crearFormularioEnviadoConId('PEP-001', pepData);
console.log('https://formularioclientes-zeta.vercel.app/formulario?idform=' + pep);

// Crear formulario de vinculación
const vinc = await crearFormularioEnviadoConId('VINC-001', vincData);
console.log('https://formularioclientes-zeta.vercel.app/formulario?idform=' + vinc);
```

## ✅ Verificación

### **Probar URL**
1. Ve a: `https://formularioclientes-zeta.vercel.app/formulario?idform=2UxEfD7zMcURyeapZV8G`
2. Deberías ver la pantalla de validación
3. Ingresa el teléfono: `3001234567`
4. Deberías acceder al formulario PEP

### **Probar Sin ID**
1. Ve a: `https://formularioclientes-zeta.vercel.app/formulario`
2. Deberías ver el mensaje: "ID de Formulario Requerido"

### **Probar ID Inexistente**
1. Ve a: `https://formularioclientes-zeta.vercel.app/formulario?idform=ID-INEXISTENTE`
2. Deberías ver el mensaje: "Formulario no encontrado"
