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
        botonCompra.addEventListener('click', () => agregarAlCarrito(producto));
        tarjeta.appendChild(botonCompra);

        listaProductos.appendChild(tarjeta);
    });
}

function actualizarResumenCarrito() {
    console.log('Actualizando resumen del carrito...'); //el console.log lo uso para comprobar que no ocurran errores 
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCarritoElemento.textContent = total.toFixed(2);
}

function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('Carrito actualizado:', carrito);
    
    mostrarCarrito();
    actualizarResumenCarrito();
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

    console.log('Carrito mostrado en resumen:', carrito);
}

mostrarProductos(productos);
actualizarResumenCarrito();
mostrarCarrito();

inputBusqueda.addEventListener('input', () => filtrarProductos(inputBusqueda.value));

function filtrarProductos(query) {
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
    mostrarProductos(productosFiltrados);
}