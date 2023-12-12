function nosotros() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .get(`/empresas/${empresaId}`)
        .then((res) => {
            const imagenesArrayss = JSON.parse(res.data.marca_aliada);
            const imagen = JSON.parse(res.data.imagen);
            const logoP = JSON.parse(res.data.logo);
            console.log(imagen);
            descripcion = "";
            mision = "";
            vision = "";
            footer = "";
            marca = "";
            log = "";
            log2 = "";

            descripcion += `<div class="col-md-7 text-center mb-3 mb-md-0">
            <p>${res.data.descripcion}</p>
        </div>
        <div class="col-md-5 d-flex justify-content-center">
            <img src="${imagen[3]}" alt=""
                class="img-fluid img-thumbnail" style="max-width: 55%;">
        </div>`;

            mision += `<div class="row">
            <div>
                <h1>Nuestra Misión</h1>
                <div class="bg-primary" style="width: 30%; height: 8%;">

                </div>
            </div>
            <div class="text-center my-5 container col-10">
                <p>${res.data.mision}</p>
            </div>
        </div>`;

            vision += ` <div class="row">
        <div class="d-flex justify-content-end">
            <h1>Nuestra Visión</h1>

        </div>
        <div class="bg-primary" style="width: 30%; height: 2%; margin-left: 69%;">
        </div>
        <div class="text-center my-5 container col-10">
            <p>${res.data.vision}</p>
        </div>
    </div>
</div>`;

            footer += `<h3>Información de Contacto</h3>
<p>Teléfono: +57-${res.data.telefono}</p>
<p>Email: ${res.data.correo}</p>
<p>Dirección: ${res.data.direccion}</p>
<a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;

            marca += `<!-- Imagen 1 -->
            <img src="${imagenesArrayss[0]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">
            
            <!-- Imagen 2 -->
            <img src="${imagenesArrayss[1]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">
            
            <!-- Imagen 3 -->
            <img src="${imagenesArrayss[2]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">`;
            document.getElementById("descripcion").innerHTML = descripcion;
            
            log += `<img src="${logoP[0]}" alt="" class="img-responsive">`;
            log2 += `<img src="${logoP[0]}" style="width: 30%;" alt="">`;
            
            document.getElementById("mision").innerHTML = mision;
            document.getElementById("vision").innerHTML = vision;
            document.getElementById("mostrarMarcasAliadas").innerHTML = marca;
            document.getElementById("footer").innerHTML = footer;
            document.getElementById("logo").innerHTML = log;
            document.getElementById("logo2").innerHTML = log2;
        })
        .catch((err) => {
            console.error(err);
        });
}

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

    nosotros();
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
function mostrarcantidadcarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    tamaño = `${carrito.length}+`;
    document.getElementById("cantidadItems").innerHTML = `${carrito.length}+`;
    console.log(tamaño);
}


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
