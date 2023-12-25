
class Producto {
  constructor(id, nombre, precio, stock) {
      this.id = id
      this.nombre = nombre
      this.precio = precio
      this.stock = stock
      this.cantidadSeleccionada = 0
  }
}

class Carrito {
  constructor() {
      this.productos = []
      this.total = 0
  }

  agregarProducto(producto) {
      if (producto.stock > 0) {
          this.productos.push(producto)
          producto.cantidadSeleccionada += 1
          this.total += producto.precio
          producto.stock -= 1
          actualizarStockEnLista()
      } else {
          console.log(`Producto "${producto.nombre}" sin stock`)
      }
  }

  mostrarCarrito() {
      console.log("Carrito de compras:")
      this.productos.forEach(producto => {
          console.log(`${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidadSeleccionada}`)
      })
      console.log(`Total: $${this.total}`)
  }
}

const carrito = new Carrito()
const productos = [
  new Producto(1, "Manzanas", 10, 2),
  new Producto(2, "Peras", 20, 3),
  new Producto(3, "Naranjas", 30, 1)
]

function mostrarProductos() {
  while (true) {
      let mensaje = "Lista de productos:\n\n"
      productos.forEach(producto => {
          mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio} - Stock: ${producto.stock}\n`
      })

      const seleccion = prompt(mensaje + "\n\nIngresa el número del producto que deseas comprar (o 'salir' para ver el resultado de las compras):\n\nUtiliza 'arriba' para ordenar de menor a mayor precio\n'abajo' para ordenar de mayor a menor precio")

      if (seleccion === null || seleccion.toLowerCase() === 'salir') {
          break
      } else if (seleccion.toLowerCase() === 'arriba') {
          productos.sort((a, b) => a.precio - b.precio)
      } else if (seleccion.toLowerCase() === 'abajo') {
          productos.sort((a, b) => b.precio - a.precio)
      } else {
          const idSeleccionado = parseInt(seleccion);
          const productoSeleccionado = productos.find(p => p.id === idSeleccionado)

          if (productoSeleccionado) {
              carrito.agregarProducto(productoSeleccionado)
          } else {
              alert("Producto no válido. Por favor, selecciona un producto válido.")
          }
      }
  }

  actualizarCarrito()
}

function actualizarStockEnLista() {
  console.clear()
  console.log("Actualizando stock...")
  productos.forEach(producto => {
      console.log(`${producto.nombre} - $${producto.precio} - Stock: ${producto.stock}`)
  });
}

function actualizarCarrito() {
  console.log("Actualizando carrito...")
  carrito.mostrarCarrito()
}