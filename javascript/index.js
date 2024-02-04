
const productos = [
    { id: 1, nombre: 'mate', precio: 20.00, imagen: './multimedia/mate.jpeg' },
    { id: 2, nombre: 'termo', precio: 30.00, imagen: './multimedia/termo.jpg' },
    { id: 3, nombre: 'yerba', precio: 25.00, imagen: './multimedia/yerba.webp' },
];

const listaProductos = document.getElementById('listaProductos');
const inputBusqueda = document.getElementById('inputBusqueda');
const totalCarritoElemento = document.getElementById('totalCarrito');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos(productos) {
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        tarjeta.appendChild(imagen);

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = producto.nombre;
        tarjeta.appendChild(nombreProducto);

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `$${producto.precio.toFixed(2)}`;
        tarjeta.appendChild(precioProducto);

        const botonCompra = document.createElement('button');
        botonCompra.textContent = 'Agregar al Carrito';
        botonCompra.addEventListener('click', () => agregarAlCarritoAsync(producto));
        tarjeta.appendChild(botonCompra);

        listaProductos.appendChild(tarjeta);
    });
}

function actualizarResumenCarrito() {
    console.log('Actualizando resumen del carrito...');
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCarritoElemento.textContent = total.toFixed(2);
}

function iniciarSesion() {
    Swal.fire({
        title: 'Iniciar Sesión',
        html:
            '<input id="swal-usuario" class="swal2-input" placeholder="Usuario">' +
            '<input id="swal-contrasena" class="swal2-input" type="password" placeholder="Contraseña">',
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const usuario = Swal.getPopup().querySelector('#swal-usuario').value;
            const contrasena = Swal.getPopup().querySelector('#swal-contrasena').value;

            if (usuario === 'Coderhouse' && contrasena === 'JavaScript') {
                return { usuario, contrasena };
            } else {
                Swal.showValidationMessage('Usuario o contraseña incorrecta');
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('¡Inicio de sesión exitoso!', 'Bienvenido ' + result.value.usuario, 'success');
        }
    });
}

async function agregarAlCarritoAsync(producto) {
    try {
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        Swal.fire('¡Añadido al carrito!', `${producto.nombre} se ha agregado al carrito.`, 'success');

        mostrarCarrito();
        actualizarResumenCarrito();
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
    }
}

function eliminarItemDelCarrito(idProducto) {
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        if (itemExistente.cantidad > 1) {
            itemExistente.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== idProducto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Carrito actualizado:', carrito);

        mostrarCarrito();
        actualizarResumenCarrito();
    }
}

function mostrarCarrito() {
    const resumenCarrito = document.getElementById('resumenCarrito');
    resumenCarrito.innerHTML = '<h2>Resumen del Carrito</h2>';

    let totalCarrito = 0;

    carrito.forEach(item => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');

        const nombreItem = document.createElement('p');
        nombreItem.textContent = `${item.nombre} x${item.cantidad}`;
        itemCarrito.appendChild(nombreItem);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarItemDelCarrito(item.id));
        itemCarrito.appendChild(botonEliminar);

        resumenCarrito.appendChild(itemCarrito);

        totalCarrito += item.precio * item.cantidad;
    });

    const totalCarritoElemento = document.createElement('p');
    totalCarritoElemento.textContent = `Total del Carrito: $${totalCarrito.toFixed(2)}`;
    resumenCarrito.appendChild(totalCarritoElemento);

    const botonFinalizarCompra = document.createElement('button');
    botonFinalizarCompra.textContent = 'Finalizar Compra';
    botonFinalizarCompra.classList.add('btn', 'btn-success');
    botonFinalizarCompra.addEventListener('click', () => confirmarFinalizarCompra());
    resumenCarrito.appendChild(botonFinalizarCompra);

    const botonEliminarTodo = document.createElement('button');
    botonEliminarTodo.textContent = 'Eliminar Todo';
    botonEliminarTodo.classList.add('btn', 'btn-danger');
    botonEliminarTodo.addEventListener('click', () => confirmarEliminarTodo());
    resumenCarrito.appendChild(botonEliminarTodo);

    console.log('Carrito mostrado en resumen:', carrito);
}

function confirmarEliminarTodo() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todos los productos del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar todo'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarTodoElCarrito();
            Swal.fire('Eliminado', 'Todos los productos del carrito han sido eliminados.', 'success');
        }
    });
}

function eliminarTodoElCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarResumenCarrito();
}

function confirmarFinalizarCompra() {
    Swal.fire({
        title: '¿Finalizar compra?',
        text: 'Esta acción confirmará y finalizará la compra.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, finalizar compra'
    }).then((result) => {
        if (result.isConfirmed) {
            finalizarCompraExitosa();
        }
    });
}

function finalizarCompraExitosa() {
    Swal.fire({
        title: '¡Compra finalizada con éxito!',
        icon: 'success',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarResumenCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    actualizarResumenCarrito();
    mostrarCarrito();

    inputBusqueda.addEventListener('input', () => filtrarProductos(inputBusqueda.value));
});

function filtrarProductos(query) {
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
    mostrarProductos(productosFiltrados);
}