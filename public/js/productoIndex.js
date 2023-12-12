function obtenerInformacionUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

function readI(url = "producto") {
  axios
    .get(url)
    .then(function (response) {
      let productos = "";
      const userData = obtenerInformacionUsuario();

      // Verifica si hay productos en la respuesta
      if (response.data.productos && response.data.productos.length > 0) {
        response.data.productos.forEach(element => {
          // Verifica si el producto pertenece a la empresa del usuario
          if (element.empresa_id === userData.empresa_id) {
            productos += `<tr>`;
            productos += `<td>${element.nombre} </td>`;
            productos += `<td>${element.cantidad}</td>`;
            productos += `<td>${element.descripcion}</td>`;
            productos += `<td>${element.precio}</td>`;
            productos += `<td>${element.marca}</td>`;
            productos += `<td>${element.nombreCategoria}</td>`;
            productos += `<td>${element.imagenUno}</td>`;
            productos += `</tr>`;
          }
        });
      } else {
        // Si no hay productos, podrías mostrar un mensaje o realizar alguna otra acción
        productos = `<tr><td colspan="7">No hay productos disponibles.</td></tr>`;
      }

      // Limpiar el cuerpo de la tabla antes de actualizar
      $("#tablaIndex tbody").empty();

      // Agregar nuevas filas a la tabla
      $("#tablaIndex tbody").append(productos);

      // Inicializar DataTables después de cargar los datos
      $("#tablaIndex").DataTable({
        retrieve: true,
        language: {
          url: "./json/es.json",
        },
        dom: "Bfrtip",
        buttons: [
          {
            extend: "colvis",
            text: "<i class='fa-solid fa-filter fa-beat'></i>",
            titleAttr: "Filtrar",
            className: "filtro",
          },
          {
            extend: "print",
            text: "<i class='fa-solid fa-print fa-bounce'></i>",
            titleAttr: "Imprimir",
            className: "imprimir",
            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
          },
          {
            download: "open",
            extend: "pdf",
            text: "<i class='fa-solid fa-file-pdf fa-bounce'></i>",
            titleAttr: "PDF",
            className: "pdf",
            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
          },
          {
            extend: "copy",
            text: "<i class='fa-solid fa-copy fa-bounce'></i>",
            titleAttr: "Copiar",
            className: "copy",
            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
          },
        ],
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}


// Llamada a la función
readI();
