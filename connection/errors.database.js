export const handleErrorPostgre = error => {
    if (error.code){
        switch (error.code) {
            case '23505':
                return { code: 400, msg: 'registro repetido, no se pudo crear'}
            case '23502':
                return { code: 400, msg: 'todos los campos son obligatorios'}
            case '42P02':
                return { code: 400, msg: 'Parametro indefinido'}
    
            default:
                return { code: 500, msg: 'error de postgre'}
        }
    }
    return {
        code: 500,
        msg: 'error en el servidor'
    }
}