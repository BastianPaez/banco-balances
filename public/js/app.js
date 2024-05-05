

const formCrear = document.querySelector('#form-crear')


eventsListeners();
function eventsListeners (){
    document.addEventListener('DOMContentLoaded', cargarTransferencias)
    formCrear.addEventListener('submit', crearUsuario);
}


function cargarTransferencias() {
    axios.get('/usuarios')
        .then(({data}) => imprimirTransferencias(data.transferencias))
        .catch(e => console.log(e));
}

const imprimirTransferencias = (transferencias) =>{
    const tabla = document.querySelector('#tabla-transferencias')

    transferencias.forEach(transferencia => {
        const tr = document.createElement('tr');
        console.log(transferencia)
        const fecha = document.createElement('td');
        const emisor = document.createElement('td');
        const receptor = document.createElement('td');
        const monto = document.createElement('td');

        fecha.textContent = transferencia.fecha_formateada;
        emisor.textContent = transferencia.nombre_usuario_origen;
        receptor.textContent = transferencia.nombre_usuario_destino;
        monto.textContent = transferencia.monto_transferido;

        tr.append(fecha)
        tr.append(emisor)
        tr.append(receptor)
        tr.append(monto)
        tabla.append(tr)
    });
}


function crearUsuario (e){
    e.preventDefault();
    
    const nombre = document.querySelector('#nombre-crear').value;
    const saldo = parseInt(document.querySelector('#balance-crear').value);

    postAxios(nombre, saldo)
}


const postAxios = async (nombre, saldo) => {
    try {
        formCrear.reset();
        await axios.post('/', {nombre, saldo})
    } catch (error) {
        console.log(error)
    }
}


