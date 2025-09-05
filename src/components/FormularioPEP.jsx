import React, { useState } from 'react';
import {
  TextInput,
  LinkedTextInput,
  CheckboxGroup,
  DateInput,
  SelectInput
} from './FormComponents.jsx';

const FormularioPEP = ({ formData, updateFormData, updateNestedFormData, agregarFamiliar, eliminarFamiliar }) => {
  const [showFamiliares, setShowFamiliares] = useState(false);

  const opcionesRelacionParentesco = [
    { value: 'sociedadConyugal', label: '1. Sociedad conyugal de hecho o de derecho' },
    { value: 'primerGradoConsanguinidad', label: '2. Primer grado de consanguinidad: Padre, madre, hijos' },
    { value: 'segundoGradoConsanguinidad', label: '3. Segundo grado de consanguinidad: Abuelos, nietos, hermanos' },
    { value: 'primerGradoAfinidad', label: '4. Primer grado de afinidad: Suegros, Yerno, Nuera' },
    { value: 'segundoGradoAfinidad', label: '5. Segundo grado de afinidad: Abuelos del cónyuge, nietos del cónyuge, cuñados' },
    { value: 'primeroCivil', label: '6. Primero civil: Padres adoptantes, hijos adoptivos' }
  ];

  const opcionesTipoOperacion = [
    { value: 'compra', label: 'Compra' },
    { value: 'venta', label: 'Venta' },
    { value: 'arrendamiento', label: 'Arrendamiento' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'otro', label: 'Otro' }
  ];

  const updateFamiliar = (index, field, value) => {
    const newFamiliares = [...formData.familiaresRelacionadosPEP];
    newFamiliares[index] = {
      ...newFamiliares[index],
      [field]: value
    };
    updateFormData('familiaresRelacionadosPEP', newFamiliares);
  };

  const updateFamiliarNested = (index, parentField, childField, value) => {
    const newFamiliares = [...formData.familiaresRelacionadosPEP];
    newFamiliares[index] = {
      ...newFamiliares[index],
      [parentField]: {
        ...newFamiliares[index][parentField],
        [childField]: value
      }
    };
    updateFormData('familiaresRelacionadosPEP', newFamiliares);
  };

  return (
    <div className="space-y-8">
      {/* Información General */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          FORMULARIO VINCULACIÓN DE CLIENTES (Solo para personas expuestas políticamente)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxGroup
            label="TIPO DE DILIGENCIAMIENTO"
            options={{ inicial: 'Inicial', actualizacion: 'Actualización' }}
            value={formData.tipoDiligenciamientoPEP}
            onChange={(value) => updateFormData('tipoDiligenciamientoPEP', value)}
            required
          />
          
          <DateInput
            label="FECHA DE DILIGENCIAMIENTO INFORMACIÓN"
            value={formData.fechaDiligenciamientoPEP}
            onChange={(e) => updateFormData('fechaDiligenciamientoPEP', e.target.value)}
            required
          />
        </div>

        <div className="mt-6">
          <SelectInput
            label="TIPO DE OPERACIÓN A REALIZAR A TRAVÉS DE ITALCOL S.A/ITALCOL DE OCCIDENTE S.A"
            value={formData.tipoOperacionItalcol}
            onChange={(e) => updateFormData('tipoOperacionItalcol', e.target.value)}
            options={opcionesTipoOperacion}
            required
          />
        </div>
      </div>

      {/* Sección: Persona políticamente expuesta */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-4">
          Persona Políticamente Expuesta
        </h3>
        <div className="bg-white p-4 rounded-md">
          <p className="text-gray-600">HOLA MUNDO - Aquí irá el texto sobre persona políticamente expuesta</p>
        </div>
      </div>

      {/* Sección: Información adicional PEP */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Información Adicional PEP
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="NOMBRES Y APELLIDOS"
            value={formData.nombresApellidosPEP}
            onChange={(e) => updateFormData('nombresApellidosPEP', e.target.value)}
            required
          />
          
          <div className="space-y-4">
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
              value={formData.tipoDocumentoPEP}
              onChange={(value) => updateFormData('tipoDocumentoPEP', value)}
              required
            />
            
            {formData.tipoDocumentoPEP.otro && (
              <TextInput
                label="¿CUÁL?"
                value={formData.otroTipoDocumentoPEP}
                onChange={(e) => updateFormData('otroTipoDocumentoPEP', e.target.value)}
                required
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <LinkedTextInput
              label="NÚMERO DOCUMENTO"
              linkedField="OCUPACIÓN/PROFESIÓN"
              value={formData.numeroDocumentoPEP}
              onChange={(e) => updateFormData('numeroDocumentoPEP', e.target.value)}
              required
            />
            <TextInput
              label="OCUPACIÓN/PROFESIÓN"
              value={formData.ocupacionProfesionPEP}
              onChange={(e) => updateFormData('ocupacionProfesionPEP', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-4">
            <LinkedTextInput
              label="NACIONALIDAD"
              linkedField="ENTIDAD (SI APLICA)"
              value={formData.nacionalidadPEP}
              onChange={(e) => updateFormData('nacionalidadPEP', e.target.value)}
              required
            />
            <TextInput
              label="ENTIDAD (SI APLICA)"
              value={formData.entidadPEP}
              onChange={(e) => updateFormData('entidadPEP', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <TextInput
            label="CARGO QUE MANEJA"
            value={formData.cargoPEP}
            onChange={(e) => updateFormData('cargoPEP', e.target.value)}
            required
          />
          
          <DateInput
            label="FECHA DE VINCULACIÓN AL CARGO"
            value={formData.fechaVinculacionCargoPEP}
            onChange={(e) => updateFormData('fechaVinculacionCargoPEP', e.target.value)}
            required
          />
          
          <DateInput
            label="FECHA DE DESVINCULACIÓN AL CARGO"
            value={formData.fechaDesvinculacionCargoPEP}
            onChange={(e) => updateFormData('fechaDesvinculacionCargoPEP', e.target.value)}
          />
        </div>
      </div>

      {/* Sección: Familiares y relacionados PEP */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Persona Políticamente Expuesta (las fechas de vinculación y desvinculación al cargo aplican para políticamente expuesto)
          </h3>
          <button
            onClick={() => setShowFamiliares(!showFamiliares)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {showFamiliares ? 'Ocultar Familiares' : 'Mostrar Familiares'}
          </button>
        </div>

        {showFamiliares && (
          <div className="space-y-6">
            {formData.familiaresRelacionadosPEP.map((familiar, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-800">
                    Item {familiar.numeroItem}
                  </h4>
                  {formData.familiaresRelacionadosPEP.length > 1 && (
                    <button
                      onClick={() => eliminarFamiliar(index)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    >
                      Eliminar Familiar
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="RELACIÓN/PARENTESCO *"
                    value={familiar.relacionParentesco}
                    onChange={(e) => updateFamiliar(index, 'relacionParentesco', e.target.value)}
                    options={opcionesRelacionParentesco}
                    required
                  />
                  
                  <TextInput
                    label="NOMBRE APELLIDOS"
                    value={familiar.nombreApellidos}
                    onChange={(e) => updateFamiliar(index, 'nombreApellidos', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <CheckboxGroup
                      label="TIPO DE IDENTIFICACIÓN"
                      options={{ 
                        cc: 'CC', 
                        ti: 'TI', 
                        ce: 'CE', 
                        rut: 'RUT', 
                        pasaporte: 'PASAPORTE', 
                        otro: 'OTRO' 
                      }}
                      value={familiar.tipoIdentificacion}
                      onChange={(value) => updateFamiliar(index, 'tipoIdentificacion', value)}
                      required
                    />
                    
                    {familiar.tipoIdentificacion.otro && (
                      <TextInput
                        label="¿CUÁL?"
                        value={familiar.otroTipoIdentificacion}
                        onChange={(e) => updateFamiliar(index, 'otroTipoIdentificacion', e.target.value)}
                        required
                      />
                    )}
                  </div>
                  
                  <TextInput
                    label="N° DE IDENTIFICACIÓN"
                    value={familiar.numeroIdentificacion}
                    onChange={(e) => updateFamiliar(index, 'numeroIdentificacion', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <LinkedTextInput
                      label="NACIONALIDAD"
                      linkedField="ENTIDAD (SI APLICA)"
                      value={familiar.nacionalidad}
                      onChange={(e) => updateFamiliar(index, 'nacionalidad', e.target.value)}
                      required
                    />
                    <TextInput
                      label="ENTIDAD (SI APLICA)"
                      value={familiar.entidad}
                      onChange={(e) => updateFamiliar(index, 'entidad', e.target.value)}
                    />
                  </div>
                  
                  <TextInput
                    label="CARGO/OCUPACIÓN"
                    value={familiar.cargoOcupacion}
                    onChange={(e) => updateFamiliar(index, 'cargoOcupacion', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <DateInput
                    label="FECHA DE VINCULACIÓN AL CARGO"
                    value={familiar.fechaVinculacionCargo}
                    onChange={(e) => updateFamiliar(index, 'fechaVinculacionCargo', e.target.value)}
                    required
                  />
                  
                  <DateInput
                    label="FECHA DE DESVINCULACIÓN AL CARGO"
                    value={familiar.fechaDesvinculacionCargo}
                    onChange={(e) => updateFamiliar(index, 'fechaDesvinculacionCargo', e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            {/* Botón para agregar nuevo familiar */}
            <div className="flex justify-center pt-4">
              <button
                onClick={agregarFamiliar}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                + Agregar Familiar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioPEP;
