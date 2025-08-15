// Variables para almacenar los datos del formulario de registro de clientes

// Información general
export let fechaCliente = '';
export let empresaCliente = '';

// Información del cliente
export let tipoCliente = { nuevo: false, actualiza: false };
export let tipoPersonaCliente = { natural: false, juridica: false };
export let tipoDocumentoCliente = { cc: false, nit: false, ce: false, otro: false };
export let otroTipoDocumentoCliente = '';
export let nombreRazonSocialCliente = '';
export let nombreApellidosRepresentanteCliente = '';
export let tipoDocumentoRepresentanteCliente = { cc: false, otro: false, ce: false };
export let otroTipoDocumentoRepresentanteCliente = '';
export let numeroDocumentoRepresentanteCliente = '';
export let direccionCliente = '';
export let barrioCliente = '';
export let ciudadMunicipioCliente = '';
export let departamentoCliente = '';
export let telefonoCliente = '';
export let emailCliente = '';
export let sitioWebCliente = '';
export let nombreContactoCliente = '';
export let celularContactoCliente = '';

// Información tributaria
export let tipoIVACliente = '';
export let granContribuyenteCliente = '';
export let resolucionGranContribuyenteCliente = '';
export let autorretenedorCliente = '';
export let resolucionAutorretenedorCliente = '';
export let indicadorCREE41Cliente = '';
export let indicadorRetencion42Cliente = '';
export let actividadEconomicaDIANCliente = '';
export let codigoEANSupermercadosCliente = '';

// Tipo de documento de entrega y tipo de cliente
export let tipoDocumentoEntregaCliente = '';
export let tipoClienteCredito = '';
export let transaccionesInternacionalesCliente = '';
export let paisesTransaccionesCliente = '';
export let activosVirtualesCliente = '';
export let paisesActivosVirtualesCliente = '';

// Garantías
export let carteraHipotecaCliente = '';
export let valorCarteraHipotecaCliente = '';
export let pignoracionHipotecaCliente = '';
export let valorPignoracionHipotecaCliente = '';

// Personas expuestas políticamente
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

// Tabla personas expuestas políticamente (4 filas)
export let personasPEPCliente = Array.from({ length: 4 }, () => ({
  nombreApellido: '',
  tipoDocumento: '',
  numeroDocumento: '',
  tipoRelacion: '',
  cargo: '',
  entidad: ''
}));

// Tabla accionistas y beneficiarios finales (4 filas)
export let accionistasCliente = Array.from({ length: 4 }, () => ({
  nombreRazonSocial: '',
  nacionalidad: '',
  tipoDocumento: '',
  numeroDocumento: '',
  participacion: ''
}));

// Gloria Colombia SAS
export let contactoVentasCliente = '';

// Declaraciones y compromisos
export let declaracionOrigenFondosCliente = '';
export let compromisoCliente = '';
export let autorizacionTratamientoDatosCliente = '';



