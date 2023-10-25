export const TaskRiskStatusMessages = (status:string) => {
    switch (status) {
        case 'PENDING-ASSESSMENT': {
            return 'Pendiente de evaluación';
        }
        case 'DRAFT-ASSESSMENT': {
            return 'Evaluacion en borrador pendiente de revisión';
        }
        case 'REVISED-ASSESSMENT': {
            return 'Evaluación revisada';
        }
        case 'APPROVED-ASSESSMENT': {
            return 'Evaluación aprobada';
        }
        default: {
            return 'Pendiente de evaluación';
        }
    }
}