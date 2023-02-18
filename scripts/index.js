const contenedorProductos = document.getElementById("contenedorProductos")
const contadorCarrito = document.getElementById ("contadorCarrito"); 
const carritoOffcanvas = document.getElementById("carritoOffcanvas");
const contenedorContadorCarrito = document.getElementById("contenedorContadorCarrito");
const precioTotalCarrito = document.getElementById ("precioTotalCarrito");
const terminarCompra = document.getElementById ("terminarCompra");
const contador = document.createElement("p");


const zapatillas = [ 
    {id:1, nombre: "Choclo", imagen:"./images/choclo.webp", precio: 799, cantidad: 1},
    {id:2, nombre: "Jogger", imagen:"./images/jogger.webp", precio: 699, cantidad: 1},
    {id:3, nombre: "Loreto", imagen:"./images/loreto.webp", precio: 599, cantidad: 1},
    {id:4, nombre: "Metzli", imagen:"./images/metzli.webp", precio: 444, cantidad: 1},
]
const carritoDeCompras = [];


zapatillas.forEach (item => {
    const div = document.createElement("div");
    div.innerHTML += 
    `
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="flip-card-back">
                <h3 class="tituloCard">Tenis ${item.nombre} 2023</h3>
                <p>PRECIO: $${item.precio}</p>
                <button id="Tenis${item.id}">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
    contenedorProductos.appendChild(div);

    const botonAgregarCarrito = document.getElementById(`Tenis${item.id}`);
    botonAgregarCarrito.addEventListener ("click", ()=> {
        agregarAlCarrito(item.id, carritoDeCompras);
        agregarContadorCarrito();
        mostrarCarrito();
    })
})

const agregarAlCarrito = (productoSeleccionado, carrito)=> {
    const productoExiste = carritoDeCompras.some (Tenis => Tenis.id === productoSeleccionado);
    const productoElegido = zapatillas.find (Tenis => Tenis.id === productoSeleccionado);
    if (productoExiste) {
        let precioInicial = productoElegido.precio;
        productoElegido.cantidad++;
        productoElegido.nuevoPrecio = productoElegido.cantidad * precioInicial;
    } else {
        carrito.push (productoElegido);
        console.log ("Agregado con exito");
        console.log (carrito);
    }
}

const agregarContadorCarrito = ()=> {
    if (carritoDeCompras.length !== 0) {
        contenedorContadorCarrito.appendChild(contador);
        contador.textContent = carritoDeCompras.length;
        contador.classList.add("contadorCarrito");
    } else {
        contador.textContent ="";
        contador.classList.remove ("contadorCarrito");
    }
}

const mostrarCarrito = ()=>{
    carritoOffcanvas.innerHTML="";
    carritoDeCompras.forEach (producto => {
        tr = document.createElement ("tr");
        tr.classList.add("tablaProductos");
        tr.innerHTML += 
        `
            <td>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </td>
            <td class="infoProducto">Tenis ${producto.nombre}</td>
            <td class="infoProducto">${producto.cantidad}</td>
            <td class="infoProducto">${producto.precio}</td>
            <td class="infoProducto eliminarProducto">
                <iconify-icon icon="material-symbols:delete-outline" class="deleteIconify" id="eliminar${producto.id}"></iconify-icon>
            </td>
        `

        carritoOffcanvas.appendChild(tr)

        const botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", ()=> {
            eliminarProducto(producto.id)
        })
    })
    const totalCarrito = carritoDeCompras.reduce ((acumulador,producto) => acumulador + producto.precio,0);
    precioTotalCarrito.innerText =`Precio total: $${totalCarrito}`;
}


const eliminarProducto = (productoClickeado) => {
    const productoEliminado = carritoDeCompras.find (Tenis =>Tenis.id === productoClickeado);
    const index = carritoDeCompras.indexOf (productoEliminado);
    carritoDeCompras.splice (index,1);
    agregarContadorCarrito();
    mostrarCarrito();
}

const vaciarCarrito = ()=> {
    carritoDeCompras.innerHTML =[];
    carritoOffcanvas.innerHTML =[];
    contador.textContent ="";
    contador.classList.remove ("contadorCarrito");
}

terminarCompra.addEventListener ("click", ()=> {
    vaciarCarrito();
})

