import React from 'react';

// Componente para campos de texto
export const TextInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false, 
  type = 'text',
  className = '',
  linkedField = null 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {linkedField && (
          <span className="text-blue-600 ml-1">| {linkedField}</span>
        )}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Componente para campos de texto con referencia visual
export const LinkedTextInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  linkedField,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Componente para checkboxes
export const CheckboxGroup = ({ 
  label, 
  options, 
  value, 
  onChange, 
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {Object.entries(options).map(([key, label]) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Componente para dropdown
export const SelectInput = ({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Componente para campos de fecha
export const DateInput = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Componente para campos de radio (Si/No)
export const RadioGroup = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="si"
            checked={value === 'si'}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Sí</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="no"
            checked={value === 'no'}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
  );
};

// Componente para tabla de perfil tributario
export const TributaryTable = ({ 
  title, 
  data, 
  onChange, 
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                El cliente o proveedor
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center text-sm font-medium text-gray-700">
                Sí
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center text-sm font-medium text-gray-700">
                No
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {key === 'esAutorretenedor' && 'Es autorretenedor'}
                  {key === 'esContribuyente' && 'Es contribuyente'}
                  {key === 'esRegimenSimple' && 'Es régimen Simple'}
                  {key === 'esResponsableIVA' && 'Es responsable de IVA'}
                  {key === 'importaBienes' && 'Importa bienes'}
                  {key === 'exportaBienes' && 'Exporta bienes'}
                  {key === 'importaServicios' && 'Importa servicios'}
                  {key === 'exportaServicios' && 'Exporta servicios'}
                  {key === 'realizaOperacionesMonedaExtranjera' && 'Realiza operaciones en moneda extranjera'}
                  {key === 'tieneProductosMonedaExtranjera' && 'Tiene productos en moneda extranjera'}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="radio"
                    name={key}
                    value="si"
                    checked={value === 'si'}
                    onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="radio"
                    name={key}
                    value="no"
                    checked={value === 'no'}
                    onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente para sección de declaración PEPS
export const PEPSDeclaration = ({ 
  data, 
  onChange, 
  className = ''
}) => {
  const categories = [
    { key: 'personaNatural', label: 'Persona Natural o a nombre propio' },
    { key: 'representanteLegal', label: 'Representante Legal' },
    { key: 'sociosAccionistas', label: 'Socios o Accionistas' },
    { key: 'juntaDirectiva', label: 'Junta Directiva' },
    { key: 'familiares', label: 'Familiares' }
  ];

  const questions = [
    { key: 'manejaRecursosPublicos', label: '¿Maneja o manejó recursos públicos?' },
    { key: 'tienePoderPublico', label: '¿Tiene o tuvo algún grado de poder público?' },
    { key: 'gozaReconocimientoPublico', label: '¿Goza o gozó de reconocimiento público?' },
    { key: 'esPersonaPoliticamenteExpuesta', label: '¿Alguno de los administrativos es persona políticamente expuesta?' }
  ];

  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Declaración PEPS</h3>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <p className="text-gray-600">Hola mundo - Aquí irá la declaración PEPS</p>
      </div>
      
      {categories.map((category) => (
        <div key={category.key} className="mb-6">
          <h4 className="text-md font-medium text-gray-800 mb-3">{category.label}</h4>
          {questions.map((question) => (
            <RadioGroup
              key={question.key}
              label={question.label}
              value={data[category.key][question.key]}
              onChange={(value) => {
                const newData = { ...data };
                newData[category.key][question.key] = value;
                onChange(newData);
              }}
              className="ml-4"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
