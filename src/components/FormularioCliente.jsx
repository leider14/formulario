import React, { useState } from 'react';
import {
  TextInput,
  LinkedTextInput,
  CheckboxGroup,
  SelectInput,
  DateInput,
  RadioGroup
} from './FormComponents.jsx';
import { updateValuesCliente } from '../valuesCliente.js';

const FormularioCliente = ({ personaId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información general
    fechaCliente: '',
    empresaCliente: '',

    // Información del cliente
    tipoCliente: { nuevo: false, actualiza: false },
    tipoPersonaCliente: { natural: false, juridica: false },
    tipoDocumentoCliente: { cc: false, nit: false, ce: false, otro: false },
    otroTipoDocumentoCliente: '',
    nombreRazonSocialCliente: '',
    nombreApellidosRepresentanteCliente: '',
    tipoDocumentoRepresentanteCliente: { cc: false, otro: false, ce: false },
    otroTipoDocumentoRepresentanteCliente: '',
    numeroDocumentoRepresentanteCliente: '',
    direccionCliente: '',
    barrioCliente: '',
    ciudadMunicipioCliente: '',
    departamentoCliente: '',
    telefonoCliente: '',
    emailCliente: '',
    sitioWebCliente: '',
    nombreContactoCliente: '',
    celularContactoCliente: '',

    // Información tributaria
    tipoIVACliente: '',
    granContribuyenteCliente: '',
    resolucionGranContribuyenteCliente: '',
    autorretenedorCliente: '',
    resolucionAutorretenedorCliente: '',
    indicadorCREE41Cliente: '',
    indicadorRetencion42Cliente: '',
    actividadEconomicaDIANCliente: '',
    codigoEANSupermercadosCliente: '',

    // Tipo de documento de entrega y tipo de cliente
    tipoDocumentoEntregaCliente: '',
    tipoClienteCredito: '',
    transaccionesInternacionalesCliente: '',
    paisesTransaccionesCliente: '',
    activosVirtualesCliente: '',
    paisesActivosVirtualesCliente: '',

    // Garantías
    carteraHipotecaCliente: '',
    valorCarteraHipotecaCliente: '',
    pignoracionHipotecaCliente: '',
    valorPignoracionHipotecaCliente: '',

    // Personas expuestas políticamente
    esPEPCliente: false,
    administraRecursosPoliticosCliente: '',
    gozaReconocimientoPublicoCliente: '',
    ejercePoderPublicoCliente: '',
    nombreEntidadVinculadaCliente: '',
    nitEntidadVinculadaCliente: '',
    cargoDesempenadoCliente: '',
    fechaVinculacionCliente: '',
    fechaDesvinculacionCliente: '',
    tieneRelacionPEPCliente: '',
    tipoRelacionPEPCliente: '',

    // Tabla personas expuestas políticamente (4 filas)
    personasPEPCliente: Array.from({ length: 4 }, () => ({
      nombreApellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      tipoRelacion: '',
      cargo: '',
      entidad: ''
    })),

    // Tabla accionistas y beneficiarios finales (4 filas)
    accionistasCliente: Array.from({ length: 4 }, () => ({
      nombreRazonSocial: '',
      nacionalidad: '',
      tipoDocumento: '',
      numeroDocumento: '',
      participacion: ''
    })),

    // Gloria Colombia SAS
    contactoVentasCliente: '',

    // Declaraciones y compromisos
    declaracionOrigenFondosCliente: '',
    compromisoCliente: '',
    autorizacionTratamientoDatosCliente: ''
  });

  const totalSteps = 8;

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

  const updateTableData = (tableField, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tableField]: prev[tableField].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
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

  const saveToValues = () => {
    // Actualizar todas las variables en valuesCliente.js usando la función setter
    updateValuesCliente(formData);
    
    alert('Datos guardados exitosamente en valuesCliente.js');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información General</h2>
            
            {/* Información de la persona */}
            {personaId && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Información de la Persona</h3>
                <p className="text-green-800 text-sm">
                  <strong>ID de Persona:</strong> {personaId}
                </p>
                <p className="text-green-800 text-sm mt-1">
                  Este formulario PEP está asociado a la persona con el ID especificado en la URL.
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Registro de Clientes</h3>
              <p className="text-blue-800 text-sm">
                Formulario para el registro y actualización de información de clientes en el sistema.
              </p>
            </div>

            <DateInput
              label="FECHA (Día/Mes/Año)"
              value={formData.fechaCliente}
              onChange={(e) => updateFormData('fechaCliente', e.target.value)}
              required
            />

            <RadioGroup
              label="EMPRESA"
              value={formData.empresaCliente}
              onChange={(value) => updateFormData('empresaCliente', value)}
              options={[
                { value: 'gloria', label: 'GLORIA COLOMBIA S.A.S' },
                { value: 'conservas', label: 'CONSERVAS CALIFORNIA S.A' }
              ]}
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información del Cliente</h2>
            
            <CheckboxGroup
              label="TIPO DE CLIENTE"
              options={{ nuevo: 'Nuevo Cliente', actualiza: 'Actualiza Cliente' }}
              value={formData.tipoCliente}
              onChange={(value) => updateFormData('tipoCliente', value)}
              required
            />

            <CheckboxGroup
              label="TIPO DE PERSONA"
              options={{ natural: 'Persona Natural', juridica: 'Persona Jurídica' }}
              value={formData.tipoPersonaCliente}
              onChange={(value) => updateFormData('tipoPersonaCliente', value)}
              required
            />

            <CheckboxGroup
              label="TIPO DE DOCUMENTO"
              options={{ cc: 'CC', nit: 'NIT', ce: 'CE', otro: 'Otro tipo de documento' }}
              value={formData.tipoDocumentoCliente}
              onChange={(value) => updateFormData('tipoDocumentoCliente', value)}
              required
            />

            {formData.tipoDocumentoCliente.otro && (
              <TextInput
                label="ESPECIFIQUE EL TIPO DE DOCUMENTO"
                value={formData.otroTipoDocumentoCliente}
                onChange={(e) => updateFormData('otroTipoDocumentoCliente', e.target.value)}
                required
              />
            )}

            <TextInput
              label="NOMBRE O RAZÓN SOCIAL DE LA EMPRESA"
              value={formData.nombreRazonSocialCliente}
              onChange={(e) => updateFormData('nombreRazonSocialCliente', e.target.value)}
              required
            />

            <TextInput
              label="NOMBRE Y APELLIDO LEGAL DEL REPRESENTANTE LEGAL"
              value={formData.nombreApellidosRepresentanteCliente}
              onChange={(e) => updateFormData('nombreApellidosRepresentanteCliente', e.target.value)}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxGroup
                label="TIPO DE DOCUMENTO DEL REPRESENTANTE"
                options={{ cc: 'CC', otro: 'Otro', ce: 'CE' }}
                value={formData.tipoDocumentoRepresentanteCliente}
                onChange={(value) => updateFormData('tipoDocumentoRepresentanteCliente', value)}
                required
              />
              <TextInput
                label="NÚMERO DE DOCUMENTO"
                value={formData.numeroDocumentoRepresentanteCliente}
                onChange={(e) => updateFormData('numeroDocumentoRepresentanteCliente', e.target.value)}
                required
              />
            </div>

            {formData.tipoDocumentoRepresentanteCliente.otro && (
              <TextInput
                label="ESPECIFIQUE EL TIPO DE DOCUMENTO"
                value={formData.otroTipoDocumentoRepresentanteCliente}
                onChange={(e) => updateFormData('otroTipoDocumentoRepresentanteCliente', e.target.value)}
                required
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="DIRECCIÓN"
                linkedField="BARRIO"
                value={formData.direccionCliente}
                onChange={(e) => updateFormData('direccionCliente', e.target.value)}
                required
              />
              <TextInput
                label="BARRIO"
                value={formData.barrioCliente}
                onChange={(e) => updateFormData('barrioCliente', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="CIUDAD/MUNICIPIO"
                linkedField="DEPARTAMENTO"
                value={formData.ciudadMunicipioCliente}
                onChange={(e) => updateFormData('ciudadMunicipioCliente', e.target.value)}
                required
              />
              <TextInput
                label="DEPARTAMENTO"
                value={formData.departamentoCliente}
                onChange={(e) => updateFormData('departamentoCliente', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput
                label="TELÉFONO"
                value={formData.telefonoCliente}
                onChange={(e) => updateFormData('telefonoCliente', e.target.value)}
                required
              />
              <TextInput
                label="EMAIL"
                type="email"
                value={formData.emailCliente}
                onChange={(e) => updateFormData('emailCliente', e.target.value)}
                required
              />
              <TextInput
                label="SITIO WEB"
                value={formData.sitioWebCliente}
                onChange={(e) => updateFormData('sitioWebCliente', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedTextInput
                label="NOMBRE DE CONTACTO"
                linkedField="CELULAR"
                value={formData.nombreContactoCliente}
                onChange={(e) => updateFormData('nombreContactoCliente', e.target.value)}
                required
              />
              <TextInput
                label="CELULAR"
                value={formData.celularContactoCliente}
                onChange={(e) => updateFormData('celularContactoCliente', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Tributaria</h2>
            
            <SelectInput
              label="TIPO DE IVA - RÉGIMEN"
              value={formData.tipoIVACliente}
              onChange={(e) => updateFormData('tipoIVACliente', e.target.value)}
              options={[
                { value: 'r.comun', label: 'R. Común' },
                { value: 'r.simplificado', label: 'R. Simplificado' },
                { value: 'no.responsable', label: 'No Responsable' }
              ]}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="GRAN CONTRIBUYENTE"
                value={formData.granContribuyenteCliente}
                onChange={(value) => updateFormData('granContribuyenteCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.granContribuyenteCliente === 'no' && (
                <TextInput
                  label="RES. NO."
                  value={formData.resolucionGranContribuyenteCliente}
                  onChange={(e) => updateFormData('resolucionGranContribuyenteCliente', e.target.value)}
                  required
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="AUTORRETENEDOR"
                value={formData.autorretenedorCliente}
                onChange={(value) => updateFormData('autorretenedorCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.autorretenedorCliente === 'no' && (
                <TextInput
                  label="RES. NO."
                  value={formData.resolucionAutorretenedorCliente}
                  onChange={(e) => updateFormData('resolucionAutorretenedorCliente', e.target.value)}
                  required
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="INDICADOR CREE41"
                value={formData.indicadorCREE41Cliente}
                onChange={(value) => updateFormData('indicadorCREE41Cliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              <RadioGroup
                label="INDICADOR RETENCIÓN 42"
                value={formData.indicadorRetencion42Cliente}
                onChange={(value) => updateFormData('indicadorRetencion42Cliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="ACTIVIDAD ECONÓMICA DIAN"
                value={formData.actividadEconomicaDIANCliente}
                onChange={(e) => updateFormData('actividadEconomicaDIANCliente', e.target.value)}
                required
              />
              <TextInput
                label="CÓDIGO EAN SUPERMERCADOS"
                value={formData.codigoEANSupermercadosCliente}
                onChange={(e) => updateFormData('codigoEANSupermercadosCliente', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipo de Documento de Entrega y Tipo de Cliente</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="TIPO DE DOC. DE ENTREGA"
                value={formData.tipoDocumentoEntregaCliente}
                onChange={(value) => updateFormData('tipoDocumentoEntregaCliente', value)}
                options={[
                  { value: 'factura', label: 'Factura' },
                  { value: 'remision', label: 'Remisión' }
                ]}
                required
              />
              <RadioGroup
                label="TIPO DE CLIENTE"
                value={formData.tipoClienteCredito}
                onChange={(value) => updateFormData('tipoClienteCredito', value)}
                options={[
                  { value: 'contado', label: 'Contado' },
                  { value: 'credito', label: 'Crédito' }
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="¿REALIZA TRANSACCIONES INTERNACIONALES O EN MONEDA EXTRANJERA?"
                value={formData.transaccionesInternacionalesCliente}
                onChange={(value) => updateFormData('transaccionesInternacionalesCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.transaccionesInternacionalesCliente === 'si' && (
                <TextInput
                  label="PAÍS O PAÍSES"
                  value={formData.paisesTransaccionesCliente}
                  onChange={(e) => updateFormData('paisesTransaccionesCliente', e.target.value)}
                  required
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="¿MANEJA ACTIVOS VIRTUALES?"
                value={formData.activosVirtualesCliente}
                onChange={(value) => updateFormData('activosVirtualesCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.activosVirtualesCliente === 'si' && (
                <TextInput
                  label="PAÍS O PAÍSES"
                  value={formData.paisesActivosVirtualesCliente}
                  onChange={(e) => updateFormData('paisesActivosVirtualesCliente', e.target.value)}
                  required
                />
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Garantías</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="CARTERA HIPOTECA"
                value={formData.carteraHipotecaCliente}
                onChange={(value) => updateFormData('carteraHipotecaCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.carteraHipotecaCliente === 'si' && (
                <TextInput
                  label="VALOR DE LA GARANTÍA"
                  value={formData.valorCarteraHipotecaCliente}
                  onChange={(e) => updateFormData('valorCarteraHipotecaCliente', e.target.value)}
                  required
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                label="PIGNORACIÓN HIPOTECA"
                value={formData.pignoracionHipotecaCliente}
                onChange={(value) => updateFormData('pignoracionHipotecaCliente', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' }
                ]}
                required
              />
              {formData.pignoracionHipotecaCliente === 'si' && (
                <TextInput
                  label="VALOR DE LA GARANTÍA"
                  value={formData.valorPignoracionHipotecaCliente}
                  onChange={(e) => updateFormData('valorPignoracionHipotecaCliente', e.target.value)}
                  required
                />
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personas Expuestas Políticamente</h2>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Declaración PEP</h3>
              <p className="text-orange-800 text-sm">
                ¿Es usted o fue una persona políticamente expuesta?
              </p>
            </div>

            <CheckboxGroup
              label="¿ES USTED O FUE UNA PERSONA POLÍTICAMENTE EXPUESTA?"
              options={{ esPEP: 'Sí' }}
              value={{ esPEP: formData.esPEPCliente }}
              onChange={(value) => updateFormData('esPEPCliente', value.esPEP)}
            />

            {formData.esPEPCliente && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadioGroup
                    label="ADMINISTRA RECURSOS POLÍTICOS"
                    value={formData.administraRecursosPoliticosCliente}
                    onChange={(value) => updateFormData('administraRecursosPoliticosCliente', value)}
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' }
                    ]}
                    required
                  />
                  <RadioGroup
                    label="GOZA DE RECONOCIMIENTO PÚBLICO"
                    value={formData.gozaReconocimientoPublicoCliente}
                    onChange={(value) => updateFormData('gozaReconocimientoPublicoCliente', value)}
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' }
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadioGroup
                    label="EJERCE ALGÚN GRADO DE PODER PÚBLICO"
                    value={formData.ejercePoderPublicoCliente}
                    onChange={(value) => updateFormData('ejercePoderPublicoCliente', value)}
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' }
                    ]}
                    required
                  />
                  <TextInput
                    label="NOMBRE DE LA ENTIDAD VINCULADA"
                    value={formData.nombreEntidadVinculadaCliente}
                    onChange={(e) => updateFormData('nombreEntidadVinculadaCliente', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="NIT DE LA ENTIDAD VINCULADA"
                    value={formData.nitEntidadVinculadaCliente}
                    onChange={(e) => updateFormData('nitEntidadVinculadaCliente', e.target.value)}
                    required
                  />
                  <TextInput
                    label="CARGO QUE DESEMPEÑA O DESEMPEÑÓ"
                    value={formData.cargoDesempenadoCliente}
                    onChange={(e) => updateFormData('cargoDesempenadoCliente', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateInput
                    label="FECHA DE VINCULACIÓN"
                    value={formData.fechaVinculacionCliente}
                    onChange={(e) => updateFormData('fechaVinculacionCliente', e.target.value)}
                    required
                  />
                  <DateInput
                    label="FECHA DE DESVINCULACIÓN"
                    value={formData.fechaDesvinculacionCliente}
                    onChange={(e) => updateFormData('fechaDesvinculacionCliente', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadioGroup
                    label="¿TIENE RELACIÓN O VÍNCULO CON PERSONAS PEP?"
                    value={formData.tieneRelacionPEPCliente}
                    onChange={(value) => updateFormData('tieneRelacionPEPCliente', value)}
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' }
                    ]}
                    required
                  />
                  {formData.tieneRelacionPEPCliente === 'si' && (
                    <SelectInput
                      label="TIPO DE RELACIÓN"
                      value={formData.tipoRelacionPEPCliente}
                      onChange={(e) => updateFormData('tipoRelacionPEPCliente', e.target.value)}
                      options={[
                        { value: 'hasta2grado', label: 'Hasta 2° grado de consanguinidad o afinidad' },
                        { value: '1afinidad', label: '1° de afinidad' },
                        { value: '1civil', label: '1° civil' }
                      ]}
                      required
                    />
                  )}
                </div>

                {/* Tabla personas expuestas políticamente */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Personas Expuestas Políticamente o con Relación PEP
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre y Apellido</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Documento</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Documento</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Relación</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entidad</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.personasPEPCliente.map((persona, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.nombreApellido}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'nombreApellido', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.tipoDocumento}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'tipoDocumento', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.numeroDocumento}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'numeroDocumento', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.tipoRelacion}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'tipoRelacion', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.cargo}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'cargo', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={persona.entidad}
                                onChange={(e) => updateTableData('personasPEPCliente', index, 'entidad', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tabla accionistas */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Accionistas y Beneficiarios Finales con Participación Mayor o Igual al 5%
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre o Razón Social</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nacionalidad</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Documento</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Documento</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Participación</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.accionistasCliente.map((accionista, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={accionista.nombreRazonSocial}
                                onChange={(e) => updateTableData('accionistasCliente', index, 'nombreRazonSocial', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={accionista.nacionalidad}
                                onChange={(e) => updateTableData('accionistasCliente', index, 'nacionalidad', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={accionista.tipoDocumento}
                                onChange={(e) => updateTableData('accionistasCliente', index, 'tipoDocumento', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={accionista.numeroDocumento}
                                onChange={(e) => updateTableData('accionistasCliente', index, 'numeroDocumento', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={accionista.participacion}
                                onChange={(e) => updateTableData('accionistasCliente', index, 'participacion', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sección para Uso Exclusivo de Gloria Colombia S.A.S</h2>
            
            {formData.empresaCliente === 'gloria' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Quién Contacta con el Cliente?</h3>
                <p className="text-blue-800 text-sm mb-4">Ventas</p>
                <TextInput
                  label="CONTACTO DE VENTAS"
                  value={formData.contactoVentasCliente}
                  onChange={(e) => updateFormData('contactoVentasCliente', e.target.value)}
                  placeholder="Por favor especifique el contacto de ventas"
                />
              </div>
            )}

            {formData.empresaCliente !== 'gloria' && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                  Esta sección solo está disponible para clientes de GLORIA COLOMBIA S.A.S
                </p>
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Declaraciones y Compromisos</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Declaración Origen de Fondos</h3>
              <p className="text-gray-600 text-sm">
                Por favor, agregue aquí el texto de la declaración de origen de fondos.
              </p>
              <textarea
                value={formData.declaracionOrigenFondosCliente}
                onChange={(e) => updateFormData('declaracionOrigenFondosCliente', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Ingrese la declaración de origen de fondos..."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compromiso del Cliente</h3>
              <p className="text-gray-600 text-sm">
                Por favor, agregue aquí el texto del compromiso del cliente.
              </p>
              <textarea
                value={formData.compromisoCliente}
                onChange={(e) => updateFormData('compromisoCliente', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Ingrese el compromiso del cliente..."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Autorización Tratamiento Datos Personales</h3>
              <p className="text-gray-600 text-sm">
                Por favor, agregue aquí el texto de la autorización para el tratamiento de datos personales.
              </p>
              <textarea
                value={formData.autorizacionTratamientoDatosCliente}
                onChange={(e) => updateFormData('autorizacionTratamientoDatosCliente', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Ingrese la autorización para el tratamiento de datos personales..."
              />
            </div>
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
            FORMULARIO REGISTRO DE CLIENTES
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

export default FormularioCliente;



