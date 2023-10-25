export const TaskRiskTagClassMessages = (status:string) => {
    switch (status) {
        case 'PENDING-ASSESSMENT': {
            return 'badge-soft-danger';
        }
        case 'DRAFT-ASSESSMENT': {
            return 'badge-soft-warning';
        }
        case 'REVISED-ASSESSMENT': {
            return 'badge-soft-info';
        }
        case 'APPROVED-ASSESSMENT': {
            return 'badge-soft-success';
        }
        default: {
            return 'badge-soft-info';
        }
    }
}