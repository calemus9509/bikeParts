// Función para mostrar los detalles del producto
function mostrarDetalleProducto(id) {
    // Realiza una solicitud Axios para obtener los detalles del producto por ID
    axios.get(`/obtener-producto/${id}`)
        .then(res => {
            var producto = res.data.producto; // Accede al objeto producto
            // Aquí puedes usar la información del producto como desees
            console.log(producto);

            // Actualiza el contenido de "detalle"
            var detalle = `<div class="col-6 p-3 mt-5 d-flex align-items-center" style="flex-direction: column;">
                <h1 class="text-center">${producto.nombre}-${producto.marca}</h1>
                <div class="mt-5">
                    <h5 style="font-weight: 500;">${producto.descripcion}</h5>
                </div>
                <div class="mt-5 mb-5 d-flex justify-content-start">
                    <h5 style="font-weight: 500;">CANTIDAD: ${producto.cantidad}</h5>
                    
                </div>
                <div class="mt-3 mb-3 d-flex justify-content-start">
                    <h3>Precio: $${producto.precio}</h3>
                </div>
                <div class="mt-5 mb-5 bg-primary text-center rounded">
                    <h2>STOCK DISPONIBLE</h2>
                </div>
                <div class="mt-5 text-white">
                    <a class="btn btn-primary" style="width: 100%;font-weight: 600;">AGREGAR AL CARRITO</a>
                </div>
            </div>
            <div class="col-6">
                <div class="m-3 border border-black border-5 rounded-4"
                    style="height: 500px;background-color: rgb(209, 206, 206);">

                </div>
                <div class="m-3 bg-primary" style="height: 20px;">

                </div>
                <div class="mb-4 d-flex justify-content-around">
                    <div class="border border-black border-5"
                        style="height: 100px;background-color: rgb(209, 206, 206);width: 100px;">

                    </div>
                    <div class="border border-black border-5"
                        style="height: 100px;background-color: rgb(209, 206, 206);width: 100px;">

                    </div>
                    <div class="border border-black border-5"
                        style="height: 100px;background-color: rgb(209, 206, 206);width: 100px;">

                    </div>
                </div>
            </div>`;

            // Asigna el contenido de "detalle" al elemento con id "detalles"
            document.getElementById("detalles").innerHTML = detalle;
        })
        .catch(err => {
            console.error(err);
        });
}


// En tu archivo Detalle.js (o donde tengas tu lógica de la página de detalles)

document.addEventListener('DOMContentLoaded', function () {
    // Recupera el ID del producto almacenado en el localStorage
    var productoId = localStorage.getItem('productoId');

    // Verifica si el ID está presente
    if (productoId) {
        // Llama a la función para mostrar los detalles del producto
        mostrarDetalleProducto(productoId);
    } else {
        console.error('No se encontró el ID del producto en el localStorage');
    }
});
