

const formCrear = document.querySelector('#form-crear')
const formTransferencia = document.querySelector('#form-transferencia')
// event listeners
eventsListeners();
function eventsListeners (){
    document.addEventListener('DOMContentLoaded', cargarTransferencias);
    document.addEventListener('DOMContentLoaded', cargarUsuarios);
    formCrear.addEventListener('submit', crearUsuario);
    formTransferencia.addEventListener('submit', transferirSaldo);
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
    const selectEmisor = document.querySelector('#emisor')
    const selectReceptor = document.querySelector('#receptor')

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        const nombre = document.createElement('td');
        const balance = document.createElement('td');

        nombre.textContent = usuario.nombre;
        balance.textContent = usuario.saldo;

        tr.append(nombre);
        tr.append(balance);
        tablaUsuarios.append(tr)


        const emisor = document.createElement('option');
        const receptor = document.createElement('option');

        emisor.value = usuario.nombre;
        emisor.textContent = usuario.nombre;
        emisor.setAttribute('name', 'emisor')

        receptor.value = usuario.nombre;
        receptor.textContent = usuario.nombre;
        receptor.setAttribute('name', 'receptor')

        selectEmisor.append(emisor)
        selectReceptor.append(receptor)

    });
}

// hacer transferencia

function transferirSaldo(e){
    e.preventDefault();

    const emisor = document.querySelector('#emisor').value;
    const receptor = document.querySelector('#receptor').value;
    const monto = parseInt(document.querySelector('#monto').value);

    axiosTransferencia(emisor, receptor, monto)
}

const axiosTransferencia = async (emisor, receptor, monto) => {
    try {
        formCrear.reset();
        await axios.put('/', {emisor, receptor, monto})
    } catch (error) {
        console.log(error)
    }
}