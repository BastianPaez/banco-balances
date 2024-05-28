
const formCrear = document.querySelector('#form-crear')
const formTransferencia = document.querySelector('#form-transferencia')
// event listeners
eventsListeners();
function eventsListeners() {
    document.addEventListener('DOMContentLoaded', cargarTransferencias);
    document.addEventListener('DOMContentLoaded', cargarUsuarios);
    formCrear.addEventListener('submit', crearUsuario);
    formTransferencia.addEventListener('submit', transferirSaldo);
}

//cargar transferencias
function cargarTransferencias() {
    axios.get('/transferencias')
        .then(({ data }) => imprimirTransferencias(data.transferencias))
        .catch(e => console.log(e));
}

const imprimirTransferencias = (transferencias) => {
    const tablaTransferencias = document.querySelector('#transferencias')
    reiniciarTabla(tablaTransferencias);


    transferencias.forEach(transferencia => {
        const tr = document.createElement('tr');
        const fecha = document.createElement('td');
        const emisor = document.createElement('td');
        const receptor = document.createElement('td');
        const monto = document.createElement('td');

        fecha.textContent = transferencia.fecha;
        emisor.textContent = transferencia.nombre_emisor;
        receptor.textContent = transferencia.nombre_receptor;
        monto.textContent = transferencia.monto;

        tr.append(fecha)
        tr.append(emisor)
        tr.append(receptor)
        tr.append(monto)
        tablaTransferencias.append(tr)
    });
}

//crear usuario
function crearUsuario(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre-crear').value;
    const balance = parseInt(document.querySelector('#balance-crear').value);

    postAxios(nombre, balance)
    cargarUsuarios();
}


const postAxios = async (nombre, balance) => {
    try {
        formCrear.reset();
        await axios.post('/usuario', { nombre, balance })
    } catch (error) {
        console.log(error)
    }
}



// lista de usuarios

function cargarUsuarios() {
    axios.get('/usuarios')
        .then(({ data }) => imprimirUsuarios(data.usuarios))
        .catch(e => console.log(e));
}

const imprimirUsuarios = (usuarios) => {
    const tablaUsuarios = document.querySelector('#tabla-usuarios')
    const selectEmisor = document.querySelector('#emisor')
    const selectReceptor = document.querySelector('#receptor')

    reiniciarTabla(tablaUsuarios);



    usuarios.forEach(usuario => {
        //lista 
        const tr = document.createElement('tr');
        const nombre = document.createElement('td');
        const balance = document.createElement('td');
        const botonEliminar = document.createElement('button');
        const botonEditar = document.createElement('button');

        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn', 'btn-danger');
        botonEliminar.addEventListener('click', () => eliminarUsuario(usuario.id));

        botonEditar.textContent = 'Editar'
        botonEditar.classList.add('btn', 'btn-warning', 'mr-2');
        botonEditar.addEventListener('click', () => editarUsuario(usuario.id));

        tr.setAttribute('data-id', usuario.id)
        nombre.textContent = usuario.nombre;
        balance.textContent = usuario.balance;

        tr.append(nombre);
        tr.append(balance);
        tr.append(botonEditar)
        tr.append(botonEliminar);

        tablaUsuarios.append(tr)


        // select
        const emisor = document.createElement('option');
        const receptor = document.createElement('option');

        emisor.value = usuario.nombre;
        emisor.textContent = usuario.nombre;
        emisor.setAttribute('name', 'emisor')
        emisor.setAttribute('data-id', usuario.id)

        receptor.value = usuario.nombre;
        receptor.textContent = usuario.nombre;
        receptor.setAttribute('name', 'receptor')
        receptor.setAttribute('data-id', usuario.id)

        selectEmisor.append(emisor)
        selectReceptor.append(receptor)

    });
}


//reinicia tabla usuarios / transferencias
const reiniciarTabla = (selector) => {
    while (selector.firstChild) {
        selector.firstChild.remove();
    }
}


// funcion de editar usuario
const editarUsuario = (idUsuario) => {
    const tr = document.querySelector(`tr[data-id="${idUsuario}"]`);
    const botonAceptar = document.createElement('button');

    tr.firstElementChild.innerHTML = `
    <input type="text" class="form-control" placeholder="Nombre" aria-label="Nombre">`
    
    tr.firstElementChild.nextElementSibling.innerHTML = ` 
    <input type="number" class="form-control" placeholder="Monto" aria-label="Monto">`
    
    
    
    tr.firstElementChild.nextElementSibling.nextElementSibling.remove();
    tr.lastElementChild.remove();

    botonAceptar.textContent = 'Aceptar';
    botonAceptar.classList.add('btn', 'btn-success', 'mt-3');
    botonAceptar.addEventListener('click', () => usuarioUpdate(idUsuario));

    tr.appendChild(botonAceptar)
}

const usuarioUpdate = async (idUsuario) => {
    const tr = document.querySelector(`tr[data-id="${idUsuario}"]`);
    const id = tr.getAttribute('data-id');
    const nombreNuevo = tr.firstChild.querySelector('input').value;
    const montoNuevo = tr.firstChild.nextSibling.querySelector('input').value;

    try {
        await axios.put('/usuario', {id, nombreNuevo, montoNuevo})
        cargarUsuarios();
        cargarTransferencias();
    } catch (error) {
        console.log(error)
    }
}

// funcion para eliminar usuario
const eliminarUsuario = (idUsuario) => {
    const tr = document.querySelector(`tr[data-id="${idUsuario}"]`);
    const option = document.querySelectorAll(`option[data-id="${idUsuario}"]`);
    if (tr) {
        tr.remove();
        option[0].remove();
        option[1].remove();
        axiosDelete(idUsuario)
    }
};



const axiosDelete = async (id) => {
    try {
        await axios.delete('/usuario', { data: { id } });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}


// hacer transferencia
function transferirSaldo(e) {
    e.preventDefault();

    const emisorSelect = document.querySelector('#emisor');
    const emisorOptionId = emisorSelect.options[emisorSelect.selectedIndex].getAttribute('data-id');

    const receptorSelect = document.querySelector('#receptor');
    const receptorOptionId = receptorSelect.options[receptorSelect.selectedIndex].getAttribute('data-id');

    const monto = parseInt(document.querySelector('#monto').value);

    axiosTransferencia(emisorOptionId, receptorOptionId, monto);
    cargarTransferencias();
    formTransferencia.reset();
}

const axiosTransferencia = async (emisor, receptor, monto) => {
    try {
        await axios.post('/transferencia', { emisor, receptor, monto })
    } catch (error) {
        console.log(error)
    }
}