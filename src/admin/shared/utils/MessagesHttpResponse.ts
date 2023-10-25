export const MessagesHttpResponse = {
    //General
    ActionNotAllowedException :'Permisos insuficientes.',
    AccessDeniedException : 'Acceso denegado.',
    InternalError : 'Servicio no disponible.',
    SuccessCreatedResponse: 'Registro completado.',
    SuccessEditResponse: 'Editado con éxito.',
    SuccessReorderResponse: 'Elementos reordenados.',
    SuccessUploadDocumentResponse: 'Documento guardado.',
    ErrorUploadDocumentResponse: 'El documento no se ha podido guardar.',
    ErrorUploadDocumentInvalidFormatResponse: 'El archivo no tiene el formato y/o tamaño adecuado.',
    ErrorUnprocesableEntityResponse: 'Los datos introducidos no son válidos.',

    //Admin
    AdminAlreadyExistsException: 'Ya existe un Administrador con el email introducido.',
    AdminNotFoundException :'El administrador no existe en el sistema.',
    AdminInvalidCurrentPasswordException: 'La contraseña actual introducida no coincide con tu contraseña registrada en el sistema.',

    //Company
    CompanyAlreadyExistsException: 'Ya existe un Empresa con el mismo RUC.',
    CompanyNotFoundException :'La empresa no existe en el sistema.',
    HealthAndSafetyPolicyOfCompanyNotHasDocumentAssignedException :'La empresa no tienen el documento de politíca de seguridad y salud en el trabajo asignado.',

    //Workplace
    WorkplaceAlreadyExistsException: 'Ya existe un Centro de trabajo con el mismo nombre.',
    WorkplaceNotBelongToCompanyException: 'La empresa del centro de trabajo que intenmtas actualizar no existe.',
    WorkplaceNotFoundException: 'Centro de trabajo no encontrado',

    //HealthAndSafetyPolicy
    HealthAndSafetyNotFoundException: 'La política de la seguridad y salud de la empresa no existe en el sistema.',
    HealthAndSafetyStatusChangedSuccess: 'Estado de la política de la seguridad y salud actualizado',


    //AuditType
    //Company
    AuditTypeAlreadyExistsException: 'Ya existe un tipo de Auditoria con el mismo nombre.',

    //BaselineStudy
    WorkplaceBaselineStudyByCategoryNotFoundException: 'Estudio de línea base para la empresa no existe.',
    BaselineStudyIndicatorChangedSuccess: 'Indicador actualizado',

    //Process
    ProcessAlreadyExistsException: 'Ya existe un proceso con el mismo nombre.',
    ProcessNotFoundException: 'Proceso de trabajo no encontrado',
    ProcessActivityAlreadyExistsException: 'Ya existe una actividad en el proceso con el mismo nombre.',
    ProcessActivityNotFoundException: 'Actividad no encontrada',
    //ActivityTask
    ProcessActivityTaskAlreadyExistsException: 'Ya existe una tarea registrada en la actividad con el mismo nombre',
    ProcessActivityTaskNotFoundException: 'Tarea no encontrada',

    //TaskHazard
    TaskHazardAlreadyExistsException: 'Ya existe el peligro para la tarea',
    TaskHazardConflictException: 'El peligro y la tarea no pertenecen al mismo centro de trabajo',

    //TaskRisk
    TaskRiskNotFoundException: 'Riesgo no encontrado',
    //TaskRiskAssessment
    TaskRiskAssessmentCalculated: 'Evaluación de riegos guardada',
    TaskRiskAssessmentStatusUpdated: 'Estado de la valuación guardado'




}