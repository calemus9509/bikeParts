let detallecarrito = '';
let totalGlobal = 0;
let carrito = [];

document.addEventListener('DOMContentLoaded', function () {
    // Obtén el input de búsqueda
    var searchInput = document.getElementById("searchInput");

    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

    
    // recuperamos el array que viene desde otras paginas
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];


    // aqui miramos si el carrito tiene productos o no
    if (carrito.length > 0) {
        // ejecutamos la funcion donde extraeremos los detalles de cada producto
        mostrarcarrito(carrito)
    }
    else {
        console.error('No hay nada agregado al carrito');
    }

    // Maneja el evento de cambio en el input de búsqueda
    searchInput.addEventListener("keyup", function () {
        var searchTerm = searchInput.value.trim();

        // Si el término de búsqueda no está vacío, realiza la búsqueda
        if (searchTerm !== "") {
            buscarAutocompletado(searchTerm);
        } else {
            // Si el término de búsqueda está vacío, oculta el contenedor de resultados
            autocompleteResults.style.display = "none";
        }
    });
});

// Modifica tu función de autocompletado en JavaScript
function buscarAutocompletado(termino) {
    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

    // Realiza una solicitud al servidor para obtener resultados de autocompletado
    axios.get(`/buscar-autocompletado?termino=${termino}&empresa=${localStorage.getItem('empresaSeleccionada')}`)
        .then(res => {
            // Muestra los resultados en la consola
            mostrarResultadosAutocompletado(res.data);

            // Controla la visibilidad del contenedor de resultados
            if (res.data.length > 0) {
                autocompleteResults.style.display = "block";
            } else {
                autocompleteResults.style.display = "none";
            }

            console.log("Resultados de la búsqueda:", res.data);
        })
        .catch(err => {
            console.error(err);
        });
}




function mostrarResultadosAutocompletado(resultados) {
    var autocompleteResults = document.getElementById("autocompleteResults");
    autocompleteResults.innerHTML = ""; // Limpia los resultados anteriores

    // Verifica si hay resultados
    if (resultados.length > 0) {
        // Crea un contenedor para los resultados
        var resultsContainer = document.createElement("div");

        // Crea elementos para cada resultado y agrégales al contenedor
        resultados.forEach(resultado => {
            var resultItem = document.createElement("div");
            resultItem.className = "card";
            resultItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${resultado.nombre}</h5>
                    <p class="card-text">Marca: ${resultado.marca}</p>
                    <p class="card-text">Descripción: ${resultado.descripcion}</p>
                </div>
            `;

            // Agrega un evento de clic al resultado
            resultItem.addEventListener("click", function () {
                // Al hacer clic, guarda el ID en localStorage y redirige a la página de detalles
                localStorage.setItem('productoId', resultado.idproducto);
                window.location.href = '/detalle';
            });

            resultsContainer.appendChild(resultItem);
        });

        autocompleteResults.addEventListener("click", function () {
            // Borra el contenido del input cuando se hace clic en el contenedor de resultados
            searchInput.value = "";
            autocompleteResults.style.display = "none";
        });

        // Agrega el contenedor de resultados al contenedor principal
        autocompleteResults.appendChild(resultsContainer);

        // Muestra el contenedor de resultados
        autocompleteResults.style.display = "block";
    } else {
        // Si no hay resultados, oculta el contenedor
        autocompleteResults.style.display = "none";
    }
}


// funciones de jaime del carrito
// evento que se ejecuta cuando se carga la pagina ademas de una validcion del carrito
// tambien se recupera lo del local storage
//Funcion donde extraemos los datos del array carrito y lo recorremos con la funcion del controlador
// del producto el cual ya tiene una ruta que es la que utilizamos buscando por id

function mostrarcarrito(carrito) {
    // Reiniciar el totalGlobal antes de empezar a mostrar el carrito
    totalGlobal = 0;
    detallecarrito = '';

    // Itera sobre cada ID y realiza una solicitud para cada uno
    carrito.forEach(function (idProducto, index) {

        // Llamada a la función del controlador de producto
        axios.get(`/obtener-producto/${idProducto}`)
            .then(function (res) {
                var producto = res.data.producto
                console.log(producto);

                detallecarrito += `<div class="card mb-3" style="background-color: rgb(209, 206, 206);">
                    <div class="d-flex justify-content-center align-items-center"
                        style="max-height: 200px; overflow: hidden;">
                        <img src="https://tiendaonlinebmw.vtexassets.com/arquivos/ids/158586-800-auto?v=637498647336900000&width=800&height=auto&aspect=true"
                            class="card-img-top" alt="..." style="max-width: 100%;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre} - ${producto.marca} </h5>
                        <p class="card-text text-primary">${producto.descripcion}</p>
                        <h3 id="precio${index}">Precio: $${producto.precio}</h3>
                    

                        <!-- Botón de eliminar y campo de cantidad -->
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-danger btn-block" onclick="eliminardelcarrito(${producto.idproducto})">Eliminar</button>
                            <div class="input-group" style="width: 120px;">
                                <input type="number" class="form-control" value="1" min="1" id="cantidadporca${index}" oninput='actCantidad(${JSON.stringify(producto)}, ${index}),enviarCarritoPorWhatsApp(${index})'>
                            </div>
                        </div>
                    </div>
                </div>`

                // sumamos el precio unitario para el primer subtotal
                totalGlobal += producto.precio;

                // Asigna el contenido de "detallecarrito" al elemento con id "detallecarrito"
                document.getElementById("detallecarrito").innerHTML = detallecarrito;
                document.getElementById("total").innerHTML = "$" + totalGlobal;

            })
            .catch(function (error) {
                // Manejar errores
                console.error(`Error para el producto ${idProducto}:`, error);
            });
    });
}

// funcion que esta sirviendo
function actCantidad(producto, index) {
    let cantidadInput = document.getElementById(`cantidadporca${index}`);
    let cantidadNueva = parseInt(cantidadInput.value, 10);

    // Obtener la cantidad anterior almacenada en un atributo data-prev-cantidad
    let cantidadAnterior = parseInt(cantidadInput.getAttribute("data-prev-cantidad"), 10) || 1;

    // Restar el precio anterior multiplicado por la cantidad anterior al totalGlobal
    totalGlobal -= cantidadAnterior * producto.precio;

    // Sumar el nuevo precio multiplicado por la nueva cantidad al totalGlobal
    totalGlobal += cantidadNueva * producto.precio;

    // Actualizar el precio en el HTML
    document.getElementById(`precio${index}`).innerHTML = `Precio: $${cantidadNueva * producto.precio}`;

    // Actualizar el totalGlobal en el HTML
    document.getElementById("total").innerHTML = "$" + totalGlobal;

    // Almacenar la nueva cantidad como cantidad anterior para la próxima iteración
    cantidadInput.setAttribute("data-prev-cantidad", cantidadNueva);
}

// funcion que esta sirviendo... 
function eliminardelcarrito(id) {
    carrito = JSON.parse(localStorage.getItem('productos')) || [];

    let index = carrito.indexOf(id);

    if (index !== -1) {
        carrito.splice(index, 1);
        console.log("Producto eliminado del array:", id);

        if (carrito.length === 0) {
            // Si el carrito está vacío, establecer contenido y totalGlobal en cero
            detallecarrito = '';
            totalGlobal = 0;
            document.getElementById("detallecarrito").innerHTML = detallecarrito;
            document.getElementById("total").innerHTML = "$" + totalGlobal;
            localStorage.removeItem('productos');
        } else {
            // Si el carrito no está vacío, actualizar la interfaz de usuario
            localStorage.productos = JSON.stringify(carrito);
            mostrarcarrito(carrito);
        }
    } else {
        console.log("El producto no se encontró en el array");
    }
}

function completarCompra() {
    // Enviar detalles del carrito por WhatsApp
    enviarCarritoPorWhatsApp(carrito);
}

// Función para enviar el carrito por WhatsApp utilizando Click to Chat
async function enviarCarritoPorWhatsApp(producto, index) {

    // Obtén la información del carrito actualizada (solo los IDs)
    const carritoActualizado = JSON.parse(localStorage.getItem('productos')) || [];

    // Array para almacenar los detalles completos de los productos
    const detallesProductos = [];

    // Itera sobre los IDs del carrito y obtén los detalles de cada producto
    for (const idProducto of carritoActualizado) {
        try {
            // Llamada a la función del controlador para obtener detalles del producto
            const response = await axios.get(`/obtener-producto/${idProducto}`);
            const producto = response.data.producto;

            // Agrega los detalles del producto al array
            detallesProductos.push(producto);
        } catch (error) {
            console.error(`Error al obtener detalles del producto ${idProducto}:`, error);
        }
    }

    // Formatea la información del carrito para enviarla por WhatsApp
    let mensajeWhatsApp = '¡Gracias Por Elegir a BIKEPARTS!\nDetalles del carrito:\nTotal Compra:' + totalGlobal + '\n';

    detallesProductos.forEach((producto, index) => {
        // Obtén la cantidad seleccionada por el usuario
        const cantidadInput = document.getElementById(`cantidadporca${index}`);
        const cantidadElegida = parseInt(cantidadInput.value, 10);


        mensajeWhatsApp += `${index + 1}. ${producto.nombre} - ${producto.marca}\n`;
        mensajeWhatsApp += `   Precio x unidad: $${producto.precio}\n`;
        mensajeWhatsApp += `   Cantidad: ${cantidadElegida}\n\n`;

    });

    // Número de teléfono al que se enviará el mensaje (incluyendo el prefijo internacional)
    const numeroDestino = '+573217361556';
    //  +573217361556 lemus
    // +573185958871 kevin
    //  +573102445188 Jaime

    // Generar el enlace "Click to Chat" de WhatsApp
    const enlaceWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    console.log(mensajeWhatsApp);
    // Abrir una nueva ventana o redirigir a la URL del enlace
    window.open(enlaceWhatsApp, '_blank');
}


// onclicks del modal
function retirodepagina() {
    window.location.href = '/';
    localStorage.removeItem('productos')
}
function noretiro() {
    window.location.href = '/carrito';
}
function validacioncarrito() {
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    if (carrito.length >= 1) {
        $('#exampleModal').modal('show');
    } else {
        window.location.href = '/';
    }
}

function nosotros() {
    const empresaId = localStorage.getItem('empresaSeleccionada');
    axios.get(`/empresas/${empresaId}`)
        .then(res => {
            console.log(res);
            footer = "";

            footer += `<h3>Información de Contacto</h3>
            <p>Teléfono: +57-${res.data.telefono}</p>
            <p>Email: ${res.data.correo}</p>
            <p>Dirección: ${res.data.direccion}</p>
            <a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;

            document.getElementById("footer").innerHTML = footer;
        })
        .catch(err => {
            console.error(err);
        })
}
nosotros();