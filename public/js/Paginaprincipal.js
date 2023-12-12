// var myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
//     interval: 2000 // Configura el intervalo en 3 segundos
//   });
document.addEventListener("DOMContentLoaded", function () {
    // Obtén el input de búsqueda
    var searchInput = document.getElementById("searchInput");

    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

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
    axios
        .get(
            `/buscar-autocompletado?termino=${termino}&empresa=${localStorage.getItem(
                "empresaSeleccionada"
            )}`
        )
        .then((res) => {
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
        .catch((err) => {
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
        resultados.forEach((resultado) => {
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
                localStorage.setItem("productoId", resultado.idproducto);
                window.location.href = "/detalle";
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

function mostrarCategorias() {
    axios
        .get("/categorias")
        .then((res) => {
            console.log(res);
            var cardsHTML = "";
            res.data.forEach((element) => {
                const imagenesArray = JSON.parse(element.imagenes);
                cardsHTML += `
                <div class="d-flex flex-column align-items-center p-3  m-5"
                style="height: 250px; width: 250px; position: relative;">
    
                <div class="card text-bg-dark border-black border-3 rounded " onmouseover="growCard(this)"
                    onmouseout="shrinkCard(this)">
                    <a onclick="mostrarId(${element.idcategorias})">
                        <img src="${imagenesArray[0]}" alt="Amortiguador"
                            style="width: 300px; height: 300px; object-fit: cover; transition: transform 0.3s;">
                        <div class="card-img-overlay mt-5">
                            <h5 class="card-title rounded text-center text-white"
                                style="position: absolute; bottom: 0; width: 90%; background-color: rgba(0, 0, 0, 0.7); padding: 4px;">
                                ${element.nombre}</h5>
                        </div>
                    </a>
                </div>
            </div>
            `;
            });

            document.getElementById("mostrarCategorias").innerHTML = cardsHTML;
        })
        .catch((err) => {
            console.error(err);
        });
}

// efecto de carta de categorias inicio
function growCard(card) {
    card.style.transform = "scale(1.1)";
}

function shrinkCard(card) {
    card.style.transform = "scale(1)";
}
// fin de funciones efectos carta inicio

function mostrarId(categoriaId) {
    localStorage.setItem("idCategory", categoriaId);
    window.location.href = "/productos";
}

mostrarCategorias();

function mostrarProductosAleatorios() {
    // Obtener el ID de la empresa desde el localStorage
    const empresaId = localStorage.getItem("empresaSeleccionada");

    axios
        .get(`/obtener-productos?empresa=${empresaId}`)
        .then((res) => {
            console.log(res);
            var productos = res.data; // Solo la información de paginación
            var card = "";

            productos.data.slice(0, 4).forEach((element) => {
                const imagenesArray = JSON.parse(element.imagenes);
                card += `<div class="card mb-3" style="width: 17rem;">
                 <img src="${imagenesArray[0]}" class="card-img-top" alt="..."
                     style="object-fit: cover; height: 250px;object-position: center center;">
                 <div class="card-body text-center">
                     <h3 class="card-title">${element.nombre}-${element.marca}</h3>
                     <h5>Precio: $${element.precio}</h5>
                     <a href="/detalle" onclick="mostrarDetalle(${element.idproducto})" class="btn btn-primary">Ir</a>
                 </div>
             </div>`;
            });

            document.getElementById("productosAleatorios").innerHTML = card;
        })
        .catch((err) => {
            console.error(err);
        });
}

mostrarProductosAleatorios();

function nosotros() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .get(`/empresas/${empresaId}`)
        .then((res) => {
            console.log(res);
            const imagenesArrayss = JSON.parse(res.data.marca_aliada);
            const imgC = JSON.parse(res.data.imagen);
            const logoP = JSON.parse(res.data.logo);
            footer = "";
            marca = "";
            carrusel = "";
            log = "";
            log2 = "";

            footer += `<h3>Información de Contacto</h3>
            <p>Teléfono: +57-${res.data.telefono}</p>
            <p>Email: ${res.data.correo}</p>
            <p>Dirección: ${res.data.direccion}</p>
            <a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;
            
            marca += `<div class="slide-track mb-5 mt-5">
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[0]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[1]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[2]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[3]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[4]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[5]}" alt="">
            </div>
            <div class="slide  ms-5 me-5">
                <img src="${imagenesArrayss[6]}" alt="">
            </div>

            <div class="slide ms-5 me-5">
            <img src="${imagenesArrayss[0]}" alt="">
        </div>
        <div class="slide  ms-5 me-5">
            <img src="${imagenesArrayss[1]}" alt="">
        </div>
        <div class="slide ms-5 me-5">
            <img src="${imagenesArrayss[2]}" alt="">
        </div>
        <div class="slide ms-5 me-5">
            <img src="${imagenesArrayss[3]}" alt="">
        </div>
        <div class="slide  ms-5 me-5">
            <img src="${imagenesArrayss[4]}" alt="">
        </div>
        <div class="slide  ms-5 me-5">
            <img src="${imagenesArrayss[5]}" alt="">
        </div>
        <div class="slide  ms-5 me-5">
            <img src="${imagenesArrayss[6]}" alt="">
        </div>

        </div>`;

            carrusel += `<div class="carousel-item active">
            <img src="${imgC[0]}" class="d-block w-100 object-fit-cover" alt="...">
        </div>
        <div class="carousel-item">
            <img src="${imgC[1]}" class="d-block w-100 object-fit-cover" alt="...">
        </div>
        <div class="carousel-item">
            <img src="${imgC[2]}" class="d-block w-100 object-fit-cover" alt="...">
        </div>`;
        
            log += `<img src="${logoP[0]}" alt="" class="img-responsive">`;
            log2 += `<img src="${logoP[0]}" style="width: 30%;" alt="">`;

            document.getElementById("footer").innerHTML = footer;
            document.getElementById("mostrarMarcasAliadas").innerHTML = marca;
            document.getElementById("carrusel").innerHTML = carrusel;
            document.getElementById("logo").innerHTML = log;
            document.getElementById("logo2").innerHTML = log2;
        })
        .catch((err) => {
            console.error(err);
        });
}
nosotros();

function mostrarDetalle(idproducto) {
    // Guarda el ID en el localStorage
    localStorage.setItem("productoId", idproducto);
}

function mostrarcantidadcarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    tamañocarrito = `${carrito.length}+`;
    document.getElementById("cantidadItems").innerHTML = `${carrito.length}+`;
    console.log(tamañocarrito);
}
setInterval(mostrarcantidadcarrito, 500);


// funcion de la alerta de retiro
function validacioncarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    if (carrito.length >= 1) {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: 'Si te retiras de esta tienda, el carrito sera vaciado!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Retirarme',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            // Verifica cuál botón se presionó
            if (result.isConfirmed) {
                window.location.href = "/";
                localStorage.removeItem("productos");
            }
        });
    } else {
        window.location.href = "/";
    }
}

function enviarRecla() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .post("/reclamaciones", {
            reclamacion: txtRecla.value,
            empre_id: empresaId,
        })
        .then((res) => {
            console.log(res);
            txtRecla.value = "";
            alert("reclamacion o sugerencia enviada");
        })
        .catch((err) => {
            console.error(err);
        });
}
