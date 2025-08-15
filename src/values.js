// Variables para almacenar los datos del formulario de vinculación de clientes

// Información general
export let fechaDiligenciamiento = '';
export let tipoVinculacion = { inicial: false, actualizacion: false };
export let claseTercero = { cliente: false, codeudor: false };
export let proveedorPersonaNatural = '';
export let nombreClientePrincipal = '';

// Datos Persona Jurídica
export let nombreRazonSocial = '';
export let nit = '';
export let nombreComercial = '';
export let sigla = '';
export let direccionPrincipal = '';
export let ciudad = '';
export let numeroCelular = '';
export let telefono = '';
export let departamento = '';
export let tipoEmpresa = { privada: false, mixta: false, publica: false };
export let codigoCIIU = '';
export let email = '';
export let licitaVendeEstado = { si: false, no: false };
export let promedioVentasEstado = '';

// Datos Persona Natural y/o Representante Legal
export let nombreApellidos = '';
export let tipoDocumento = { cc: false, ti: false, ce: false, rut: false, pasaporte: false, otro: false };
export let otroTipoDocumento = '';
export let numeroDocumento = '';
export let expedidoEn = '';
export let nacionalidad = '';
export let direccionResidencia = '';
export let departamentoResidencia = '';
export let emailPersonaNatural = '';
export let telefonoPersonaNatural = '';
export let celularPersonaNatural = '';
export let otroTelefono = '';

// Campos exclusivos para persona natural
export let empresaDondeLabora = '';
export let direccionLaboral = '';
export let ciudadMunicipioLaboral = '';
export let departamentoLaboral = '';
export let licitaVendeEstadoPersonaNatural = { si: false, no: false };
export let promedioVentasEstadoPersonaNatural = '';
export let descripcionActividad = '';

// Dirección envío correspondencia
export let emailRecepcionFactura = '';

// Información Financiera
export let fechaCorteEstadosFinancieros = '';
export let soporteFinanciero = { estadosFinancieros: false, declaracionRenta: false, formularioNoDeclarante: false };

// Perfil Tributario - Primera tabla
export let perfilTributario1 = {
  esAutorretenedor: '',
  esContribuyente: '',
  esRegimenSimple: '',
  esResponsableIVA: ''
};

// Perfil Tributario - Segunda tabla
export let perfilTributario2 = {
  importaBienes: '',
  exportaBienes: '',
  importaServicios: '',
  exportaServicios: '',
  realizaOperacionesMonedaExtranjera: '',
  tieneProductosMonedaExtranjera: ''
};

// Operaciones en moneda extranjera
export let operacionesMonedaExtranjera = {
  tipoProducto: '',
  numeroIdentificacion: '',
  promedioMensual: '',
  pais: '',
  tipoMoneda: '',
  nombreEntidad: ''
};

// Declaración PEPS
export let declaracionPEPS = {
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
};

// Declaración origen de fondos
export let origenFondos = '';

// ===== NUEVO FORMULARIO PARA PERSONAS EXPUESTAS POLÍTICAMENTE =====

// Información general del formulario PEP
export let tipoDiligenciamientoPEP = { inicial: false, actualizacion: false };
export let fechaDiligenciamientoPEP = '';
export let tipoOperacionItalcol = '';

// Información adicional PEP
export let nombresApellidosPEP = '';
export let tipoDocumentoPEP = { cc: false, ti: false, ce: false, rut: false, pasaporte: false, otro: false };
export let otroTipoDocumentoPEP = '';
export let numeroDocumentoPEP = '';
export let ocupacionProfesionPEP = '';
export let nacionalidadPEP = '';
export let entidadPEP = '';
export let cargoPEP = '';
export let fechaVinculacionCargoPEP = '';
export let fechaDesvinculacionCargoPEP = '';

// Array de 10 componentes de familiares/relacionados PEP
export let familiaresRelacionadosPEP = Array.from({ length: 10 }, (_, index) => ({
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
}));

// ===== FORMULARIO DE CLIENTE =====

// Información general del formulario de cliente
export let fechaCliente = '';
export let empresaCliente = '';

// Información del cliente
export let tipoCliente = '';
export let tipoPersonaCliente = '';
export let tipoDocumentoCliente = '';
export let otroTipoDocumentoCliente = '';
export let nombreRazonSocialCliente = '';
export let tipoDocumentoRepresentanteCliente = '';
export let otroTipoDocumentoRepresentanteCliente = '';
export let numeroDocumentoRepresentanteCliente = '';
export let nombreApellidosRepresentanteCliente = '';
export let direccionCliente = '';
export let barrioCliente = '';
export let ciudadMunicipioCliente = '';
export let departamentoCliente = '';
export let telefonoCliente = '';
export let emailCliente = '';
export let sitioWebCliente = '';
export let nombreContactoCliente = '';
export let telefonoContactoCliente = '';
export let celularContactoCliente = '';

// Información tributaria del cliente
export let tipoIVACliente = '';
export let granContribuyenteCliente = '';
export let resolucionGranContribuyenteCliente = '';
export let autorretenedorCliente = '';
export let resolucionAutorretenedorCliente = '';
export let indicadorCREE41Cliente = '';
export let indicadorRetencion42Cliente = '';
export let actividadEconomicaDIANCliente = '';
export let codigoEANSupermercadosCliente = '';

// Tipo de documento y cliente
export let tipoDocumentoEntregaCliente = '';
export let tipoClienteCredito = '';
export let transaccionesInternacionalesCliente = '';
export let paisesTransaccionesCliente = '';
export let activosVirtualesCliente = '';
export let paisesActivosVirtualesCliente = '';

// Garantías del cliente
export let carteraHipotecaCliente = '';
export let valorCarteraHipotecaCliente = '';
export let pignoracionHipotecaCliente = '';
export let valorPignoracionHipotecaCliente = '';

// Personas expuestas políticamente del cliente
export let esPEPCliente = false;
export let administraRecursosPoliticosCliente = '';
export let gozaReconocimientoPublicoCliente = '';
export let ejercePoderPublicoCliente = '';
export let nombreEntidadVinculadaCliente = '';
export let nitEntidadVinculadaCliente = '';
export let cargoDesempenadoCliente = '';
export let fechaVinculacionCliente = '';
export let fechaDesvinculacionCliente = '';
export let tieneRelacionPEPCliente = '';
export let tipoRelacionPEPCliente = '';

// Tabla PEP del cliente (4 filas)
export let personasPEPCliente = Array.from({ length: 4 }, () => ({
  nombreApellido: '',
  tipoDocumento: '',
  numeroDocumento: '',
  tipoRelacion: '',
  cargo: '',
  entidad: ''
}));

// Tabla accionistas del cliente (4 filas)
export let accionistasCliente = Array.from({ length: 4 }, () => ({
  nombreRazonSocial: '',
  nacionalidad: '',
  tipoDocumento: '',
  numeroDocumento: '',
  participacion: ''
}));

// Gloria Colombia SAS
export let contactoVentasCliente = '';

// Declaraciones del cliente
export let declaracionOrigenFondosCliente = '';
export let compromisoCliente = '';
export let autorizacionTratamientoDatosCliente = '';
