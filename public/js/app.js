

const formCrear = document.querySelector('#form-crear')

// event listeners
eventsListeners();
function eventsListeners (){
    document.addEventListener('DOMContentLoaded', cargarTransferencias)
    document.addEventListener('DOMContentLoaded', cargarUsuarios)
    formCrear.addEventListener('submit', crearUsuario);
}

//cargar transferencias
function cargarTransferencias() {
    axios.get('/transferencias')
        .then(({data}) => imprimirTransferencias(data.transferencias))
        .catch(e => console.log(e));
}

const imprimirTransferencias = (transferencias) =>{
    const tablaTransferencias = document.querySelector('#tabla-transferencias')

    transferencias.forEach(transferencia => {
        const tr = document.createElement('tr');
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
        tablaTransferencias.append(tr)
    });
}

//crear usuario
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



// lista de usuarios

function cargarUsuarios() {
    axios.get('/usuarios')
        .then(({data}) => imprimirUsuarios(data.usuarios))
        .catch(e => console.log(e));
}

const imprimirUsuarios = (usuarios) => {
    const tablaUsuarios = document.querySelector('#tabla-usuarios')
    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        const nombre = document.createElement('td');
        const balance = document.createElement('td');

        nombre.textContent = usuario.nombre;
        balance.textContent = usuario.saldo;

        tr.append(nombre);
        tr.append(balance);
        tablaUsuarios.append(tr)
    });
}