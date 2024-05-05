
const formCrear = document.querySelector('#form-crear')

formCrear.addEventListener('submit', crearUsuario);


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

