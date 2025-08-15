import React, { useState } from 'react';
import {
  TextInput,
  LinkedTextInput,
  CheckboxGroup,
  SelectInput,
  DateInput,
  RadioGroup,
  TributaryTable,
  PEPSDeclaration
} from './FormComponents.jsx';
import FormularioPEP from './FormularioPEP.jsx';
import * as values from '../values.js';

const FormularioVinculacion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información general
    fechaDiligenciamiento: '',
    tipoVinculacion: { inicial: false, actualizacion: false },
    claseTercero: { cliente: false, codeudor: false },
    proveedorPersonaNatural: '',
    nombreClientePrincipal: '',

    // Datos Persona Jurídica
    nombreRazonSocial: '',
    nit: '',
    nombreComercial: '',
    sigla: '',
    direccionPrincipal: '',
    ciudad: '',
    numeroCelular: '',
    telefono: '',
    departamento: '',
    tipoEmpresa: { privada: false, mixta: false, publica: false },
    codigoCIIU: '',
    email: '',
    licitaVendeEstado: { si: false, no: false },
    promedioVentasEstado: '',

    // Datos Persona Natural
    nombreApellidos: '',
    tipoDocumento: { cc: false, ti: false, ce: false, rut: false, pasaporte: false, otro: false },
    otroTipoDocumento: '',
    numeroDocumento: '',
    expedidoEn: '',
    nacionalidad: '',
    direccionResidencia: '',
    departamentoResidencia: '',
    emailPersonaNatural: '',
    telefonoPersonaNatural: '',
    celularPersonaNatural: '',
    otroTelefono: '',

    // Campos exclusivos para persona natural
    empresaDondeLabora: '',
    direccionLaboral: '',
    ciudadMunicipioLaboral: '',
    departamentoLaboral: '',
    licitaVendeEstadoPersonaNatural: { si: false, no: false },
    promedioVentasEstadoPersonaNatural: '',
    descripcionActividad: '',

    // Dirección envío correspondencia
    emailRecepcionFactura: '',

    // Información Financiera
    fechaCorteEstadosFinancieros: '',
    soporteFinanciero: { estadosFinancieros: false, declaracionRenta: false, formularioNoDeclarante: false },

    // Perfil Tributario
    perfilTributario1: {
      esAutorretenedor: '',
      esContribuyente: '',
      esRegimenSimple: '',
      esResponsableIVA: ''
    },
    perfilTributario2: {
      importaBienes: '',
      exportaBienes: '',
      importaServicios: '',
      exportaServicios: '',
      realizaOperacionesMonedaExtranjera: '',
      tieneProductosMonedaExtranjera: ''
    },

    // Operaciones en moneda extranjera
    operacionesMonedaExtranjera: {
      tipoProducto: '',
      numeroIdentificacion: '',
      promedioMensual: '',
      pais: '',
      tipoMoneda: '',
      nombreEntidad: ''
    },

    // Declaración PEPS
    declaracionPEPS: {
      personaNatural: {
        manejaRecursosPublicos: '',
        tienePoderPublico: '',
        gozaReconocimientoPublico: '',
        esPersonaPoliticamenteExpuesta: ''
      },
      representanteLegal: {
        manejaRecursosPublicos: '',
        tienePoderPublico: '',
        gozaReconocimientoPublico: '',
        esPersonaPoliticamenteExpuesta: ''
      },
      sociosAccionistas: {
        manejaRecursosPublicos: '',
        tienePoderPublico: '',
        gozaReconocimientoPublico: '',
        esPersonaPoliticamenteExpuesta: ''
      },
      juntaDirectiva: {
        manejaRecursosPublicos: '',
        tienePoderPublico: '',
        gozaReconocimientoPublico: '',
        esPersonaPoliticamenteExpuesta: ''
      },
      familiares: {
        manejaRecursosPublicos: '',
        tienePoderPublico: '',
        gozaReconocimientoPublico: '',
        esPersonaPoliticamenteExpuesta: ''
      }
    },

    // Declaración origen de fondos
    origenFondos: '',

    // ===== NUEVO FORMULARIO PARA PERSONAS EXPUESTAS POLÍTICAMENTE =====
    
    // Información general del formulario PEP
    tipoDiligenciamientoPEP: { inicial: false, actualizacion: false },
    fechaDiligenciamientoPEP: '',
    tipoOperacionItalcol: '',

    // Información adicional PEP
    nombresApellidosPEP: '',
    tipoDocumentoPEP: { cc: false, ti: false, ce: false, rut: false, pasaporte: false, otro: false },
    otroTipoDocumentoPEP: '',
    numeroDocumentoPEP: '',
    ocupacionProfesionPEP: '',
    nacionalidadPEP: '',
    entidadPEP: '',
    cargoPEP: '',
    fechaVinculacionCargoPEP: '',
    fechaDesvinculacionCargoPEP: '',

    // Array de 10 componentes de familiares/relacionados PEP
    familiaresRelacionadosPEP: Array.from({ length: 10 }, (_, index) => ({
      numeroItem: index + 1,
      relacionParentesco: '',
      nombreApellidos: '',
      tipoIdentificacion: { cc: false, ti: false, ce: false, rut: false, pasaporte: false, otro: false },
      otroTipoIdentificacion: '',
      numeroIdentificacion: '',
      nacionalidad: '',
      entidad: '',
      cargoOcupacion: '',
      fechaVinculacionCargo: '',
      fechaDesvinculacionCargo: ''
    }))
  });

  const totalSteps = 9;

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isPersonaPoliticamenteExpuesta = () => {
    // Verificar si alguna de las categorías tiene "sí" en esPersonaPoliticamenteExpuesta
    return Object.values(formData.declaracionPEPS).some(categoria => 
      categoria.esPersonaPoliticamenteExpuesta === 'si'
    );
  };

  const saveToValues = () => {
    // Actualizar todas las variables en values.js
    Object.keys(formData).forEach(key => {
      if (values[key] !== undefined) {
        values[key] = formData[key];
      }
    });
    
    // Mensaje personalizado según si es PEP o no
    if (isPersonaPoliticamenteExpuesta()) {
      alert('Datos guardados exitosamente en values.js (incluyendo formulario PEP)');
    } else {
      alert('Datos guardados exitosamente en values.js');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información General</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Compromiso con Colombia</h3>
              <p className="text-blue-800 text-sm">
                Estamos comprometidos con Colombia!! Damos cumplimiento a la normatividad vigente de la Superintendencia de Sociedades respecto a SAGRILAFT -SISTEMA DE AUTOCONTROL Y GESTIÓN DEL RIESGO INTEGRAL DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO Y FINANCIACION DE LA PROLIFERACION DE ARMAS DE DESTRUCCION MASIVA -(Circular 100-000016 Y PTTE PROGRAMA CORPORATIVO DE TRANSPARENCIA Y ÉTICA EMPRESARIAL (Circular 100-000011)
              </p>
            </div>

            <DateInput
              label="FECHA DILIGENCIAMIENTO INFORMACIÓN (Día/Mes/Año)"
              value={formData.fechaDiligenciamiento}
              onChange={(e) => updateFormData('fechaDiligenciamiento', e.target.value)}
              required
            />

            <CheckboxGroup
              label="TIPO DE VINCULACIÓN"
              options={{ inicial: 'Inicial', actualizacion: 'Actualización' }}
              value={formData.tipoVinculacion}
              onChange={(value) => updateFormData('tipoVinculacion', value)}
              required
            />

            <CheckboxGroup
              label="CLASE DE TERCERO"
              options={{ cliente: 'Cliente', codeudor: 'Codeudor' }}
              value={formData.claseTercero}
              onChange={(value) => updateFormData('claseTercero', value)}
              required
            />

            <SelectInput
              label="PROVEEDOR PERSONA NATURAL"
              value={formData.proveedorPersonaNatural}
              onChange={(e) => updateFormData('proveedorPersonaNatural', e.target.value)}
              options={[
                { value: 'personaJuridica', label: 'Persona Jurídica' },
                { value: 'entidadesEstado', label: 'Entidades del Estado' },
                { value: 'entidadesMixtas', label: 'Entidades Mixtas' },
                { value: 'unionesTemporales', label: 'Uniones Temporales' },
                { value: 'consorcios', label: 'Consorcios' },
                { value: 'campanasPoliticas', label: 'Campañas Políticas' }
              ]}
              required
            />

            {formData.claseTercero.codeudor && (
              <TextInput
                label="NOMBRE O RAZÓN SOCIAL DEL CLIENTE PRINCIPAL"
                value={formData.nombreClientePrincipal}
                onChange={(e) => updateFormData('nombreClientePrincipal', e.target.value)}
                required
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos Persona Jurídica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="NOMBRE RAZÓN SOCIAL"
                linkedField="NIT"
                value={formData.nombreRazonSocial}
                onChange={(e) => updateFormData('nombreRazonSocial', e.target.value)}
                required
              />
              <TextInput
                label="NIT"
                value={formData.nit}
                onChange={(e) => updateFormData('nit', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="NOMBRE COMERCIAL"
                linkedField="SIGLA"
                value={formData.nombreComercial}
                onChange={(e) => updateFormData('nombreComercial', e.target.value)}
                required
              />
              <TextInput
                label="SIGLA"
                value={formData.sigla}
                onChange={(e) => updateFormData('sigla', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="DIRECCIÓN PRINCIPAL"
                linkedField="CIUDAD"
                value={formData.direccionPrincipal}
                onChange={(e) => updateFormData('direccionPrincipal', e.target.value)}
                required
              />
              <TextInput
                label="CIUDAD"
                value={formData.ciudad}
                onChange={(e) => updateFormData('ciudad', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LinkedTextInput
                label="NÚMERO CELULAR"
                linkedField="TELÉFONO"
                value={formData.numeroCelular}
                onChange={(e) => updateFormData('numeroCelular', e.target.value)}
                required
              />
              <TextInput
                label="TELÉFONO"
                value={formData.telefono}
                onChange={(e) => updateFormData('telefono', e.target.value)}
              />
              <TextInput
                label="DEPARTAMENTO"
                value={formData.departamento}
                onChange={(e) => updateFormData('departamento', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CheckboxGroup
                label="TIPO EMPRESA"
                options={{ privada: 'PRIVADA', mixta: 'MIXTA', publica: 'PÚBLICA' }}
                value={formData.tipoEmpresa}
                onChange={(value) => updateFormData('tipoEmpresa', value)}
                required
              />
              <TextInput
                label="CÓDIGO CIIU"
                value={formData.codigoCIIU}
                onChange={(e) => updateFormData('codigoCIIU', e.target.value)}
                required
              />
              <TextInput
                label="EMAIL"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxGroup
                label="LICITA Y/O VENDE A EMPRESAS DEL ESTADO"
                options={{ si: 'SÍ', no: 'NO' }}
                value={formData.licitaVendeEstado}
                onChange={(value) => updateFormData('licitaVendeEstado', value)}
                required
              />
              <TextInput
                label="PROMEDIO ANUAL DE VENTAS A EMPRESAS DEL ESTADO"
                value={formData.promedioVentasEstado}
                onChange={(e) => updateFormData('promedioVentasEstado', e.target.value)}
                placeholder="Ingrese el monto"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos Persona Natural y/o Representante Legal</h2>
            
            <TextInput
              label="NOMBRE Y APELLIDOS"
              value={formData.nombreApellidos}
              onChange={(e) => updateFormData('nombreApellidos', e.target.value)}
              required
            />

            <CheckboxGroup
              label="DOCUMENTO DE IDENTIFICACIÓN"
              options={{ 
                cc: 'CC', 
                ti: 'TI', 
                ce: 'CE', 
                rut: 'RUT', 
                pasaporte: 'PASAPORTE', 
                otro: 'OTRO' 
              }}
              value={formData.tipoDocumento}
              onChange={(value) => updateFormData('tipoDocumento', value)}
              required
            />

            {formData.tipoDocumento.otro && (
              <TextInput
                label="¿CUÁL?"
                value={formData.otroTipoDocumento}
                onChange={(e) => updateFormData('otroTipoDocumento', e.target.value)}
                required
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LinkedTextInput
                label="NÚMERO DOCUMENTO"
                linkedField="EXPEDIDO EN"
                value={formData.numeroDocumento}
                onChange={(e) => updateFormData('numeroDocumento', e.target.value)}
                required
              />
              <TextInput
                label="EXPEDIDO EN"
                value={formData.expedidoEn}
                onChange={(e) => updateFormData('expedidoEn', e.target.value)}
                required
              />
              <TextInput
                label="NACIONALIDAD"
                value={formData.nacionalidad}
                onChange={(e) => updateFormData('nacionalidad', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="DIRECCIÓN RESIDENCIA"
                linkedField="DEPARTAMENTO"
                value={formData.direccionResidencia}
                onChange={(e) => updateFormData('direccionResidencia', e.target.value)}
                required
              />
              <TextInput
                label="DEPARTAMENTO"
                value={formData.departamentoResidencia}
                onChange={(e) => updateFormData('departamentoResidencia', e.target.value)}
                required
              />
            </div>

            <TextInput
              label="EMAIL"
              type="email"
              value={formData.emailPersonaNatural}
              onChange={(e) => updateFormData('emailPersonaNatural', e.target.value)}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LinkedTextInput
                label="TELÉFONO"
                linkedField="CELULAR"
                value={formData.telefonoPersonaNatural}
                onChange={(e) => updateFormData('telefonoPersonaNatural', e.target.value)}
                required
              />
              <TextInput
                label="CELULAR"
                value={formData.celularPersonaNatural}
                onChange={(e) => updateFormData('celularPersonaNatural', e.target.value)}
                required
              />
              <TextInput
                label="OTRO TELÉFONO DE CONTACTO"
                value={formData.otroTelefono}
                onChange={(e) => updateFormData('otroTelefono', e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Campos Exclusivos para Persona Natural</h2>
            
            <TextInput
              label="EMPRESA DONDE LABORA"
              value={formData.empresaDondeLabora}
              onChange={(e) => updateFormData('empresaDondeLabora', e.target.value)}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LinkedTextInput
                label="DIRECCIÓN LABORAL"
                linkedField="CIUDAD/MUNICIPIO"
                value={formData.direccionLaboral}
                onChange={(e) => updateFormData('direccionLaboral', e.target.value)}
                required
              />
              <TextInput
                label="CIUDAD/MUNICIPIO"
                value={formData.ciudadMunicipioLaboral}
                onChange={(e) => updateFormData('ciudadMunicipioLaboral', e.target.value)}
                required
              />
              <TextInput
                label="DEPARTAMENTO"
                value={formData.departamentoLaboral}
                onChange={(e) => updateFormData('departamentoLaboral', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxGroup
                label="LICITA Y/O VENDE A EMPRESAS DEL ESTADO"
                options={{ si: 'SÍ', no: 'NO' }}
                value={formData.licitaVendeEstadoPersonaNatural}
                onChange={(value) => updateFormData('licitaVendeEstadoPersonaNatural', value)}
                required
              />
              <TextInput
                label="PROMEDIO ANUAL DE VENTAS A EMPRESAS DEL ESTADO"
                value={formData.promedioVentasEstadoPersonaNatural}
                onChange={(e) => updateFormData('promedioVentasEstadoPersonaNatural', e.target.value)}
                placeholder="Ingrese el monto"
              />
            </div>

            <TextInput
              label="DESCRIPCIÓN DE LA ACTIVIDAD"
              value={formData.descripcionActividad}
              onChange={(e) => updateFormData('descripcionActividad', e.target.value)}
              required
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dirección Envío de Correspondencia</h2>
            
            <TextInput
              label="CORREO ELECTRÓNICO DE RECEPCIÓN FACTURA ELECTRÓNICA"
              type="email"
              value={formData.emailRecepcionFactura}
              onChange={(e) => updateFormData('emailRecepcionFactura', e.target.value)}
              required
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Financiera</h2>
            
            <DateInput
              label="FECHA DE CORTE DE LOS ESTADOS FINANCIEROS QUE ADJUNTA"
              value={formData.fechaCorteEstadosFinancieros}
              onChange={(e) => updateFormData('fechaCorteEstadosFinancieros', e.target.value)}
              required
            />

            <CheckboxGroup
              label="SOPORTE FINANCIERO QUE ADJUNTA"
              options={{ 
                estadosFinancieros: 'Estados Financieros', 
                declaracionRenta: 'Declaración de Renta', 
                formularioNoDeclarante: 'Formulario de No Declarante' 
              }}
              value={formData.soporteFinanciero}
              onChange={(value) => updateFormData('soporteFinanciero', value)}
              required
            />

            <TributaryTable
              title="PERFIL TRIBUTARIO"
              data={formData.perfilTributario1}
              onChange={(value) => updateFormData('perfilTributario1', value)}
            />

            <TributaryTable
              title="PERFIL TRIBUTARIO"
              data={formData.perfilTributario2}
              onChange={(value) => updateFormData('perfilTributario2', value)}
            />

            {formData.perfilTributario2.tieneProductosMonedaExtranjera === 'si' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Si tiene y/o realiza operaciones y/o productos en moneda extranjera responda lo siguiente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="TIPO DE PRODUCTO DE MONEDA EXTRANJERA"
                    value={formData.operacionesMonedaExtranjera.tipoProducto}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'tipoProducto', e.target.value)}
                    required
                  />
                  <TextInput
                    label="N° IDENTIFICACIÓN PRODUCTO"
                    value={formData.operacionesMonedaExtranjera.numeroIdentificacion}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'numeroIdentificacion', e.target.value)}
                    required
                  />
                  <TextInput
                    label="PROMEDIO MENSUAL"
                    value={formData.operacionesMonedaExtranjera.promedioMensual}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'promedioMensual', e.target.value)}
                    required
                  />
                  <TextInput
                    label="PAÍS"
                    value={formData.operacionesMonedaExtranjera.pais}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'pais', e.target.value)}
                    required
                  />
                  <TextInput
                    label="TIPO DE MONEDA"
                    value={formData.operacionesMonedaExtranjera.tipoMoneda}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'tipoMoneda', e.target.value)}
                    required
                  />
                  <TextInput
                    label="NOMBRE DE LA ENTIDAD"
                    value={formData.operacionesMonedaExtranjera.nombreEntidad}
                    onChange={(e) => updateNestedFormData('operacionesMonedaExtranjera', 'nombreEntidad', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Declaración PEPS</h2>
            
            {isPersonaPoliticamenteExpuesta() && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-orange-800">
                      Formulario adicional requerido
                    </h3>
                    <div className="mt-2 text-sm text-orange-700">
                      <p>
                        Se ha identificado que la persona es políticamente expuesta. 
                        En el siguiente paso se deberá diligenciar un formulario adicional específico para PEP.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <PEPSDeclaration
              data={formData.declaracionPEPS}
              onChange={(value) => updateFormData('declaracionPEPS', value)}
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Declaración Origen de Fondos</h2>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-gray-600">Hola mundo - Aquí irá la declaración de origen de fondos</p>
            </div>

            <RadioGroup
              label="¿EL ORIGEN DE MIS BIENES Y/O RECURSOS PROVIENE DE?"
              value={formData.origenFondos}
              onChange={(value) => updateFormData('origenFondos', value)}
              required
            />

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-gray-600">Hola mundo - Aquí irá más información sobre origen de fondos</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-gray-600">Hola mundo - Aquí irá información adicional sobre origen de fondos</p>
            </div>
          </div>
        );

      case 9:
        // Solo mostrar si la persona es políticamente expuesta
        if (!isPersonaPoliticamenteExpuesta()) {
          return (
            <div className="text-center py-12">
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-4">
                  ✅ No se requiere formulario adicional
                </h2>
                <p className="text-green-700 text-lg">
                  Según la información proporcionada, no se requiere el diligenciamiento del formulario para personas expuestas políticamente.
                </p>
                <p className="text-green-600 mt-2">
                  Puede proceder a guardar los datos del formulario principal.
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Formulario para Personas Expuestas Políticamente
            </h2>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Nota:</strong> Este formulario solo se muestra porque se identificó que la persona es políticamente expuesta en la declaración PEPS.
              </p>
            </div>

            <FormularioPEP
              formData={formData}
              updateFormData={updateFormData}
              updateNestedFormData={updateNestedFormData}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FORMULARIO VINCULACIÓN DE CLIENTES
          </h1>
          <p className="text-gray-600">
            Paso {currentStep} de {totalSteps}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between w-full">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div key={index + 1} className="flex items-center flex-1">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                    index + 1 <= currentStep
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  onClick={() => setCurrentStep(index + 1)}
                >
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 sm:mx-2 ${
                      index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-md font-medium ${
              currentStep === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>

          <div className="flex space-x-4">
            {currentStep === totalSteps ? (
              <button
                onClick={saveToValues}
                className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
              >
                Guardar Datos
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioVinculacion;
