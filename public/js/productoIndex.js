function readI(url = "producto") {
  axios
    .get(url)
    .then(function (response) {
      let producto = "";
      response.data.forEach((element) => {
        producto += `<tr>`;
        producto += `<td>${element.nombre} </td>`;
        producto += `<td>${element.cantidad}</td>`;
        producto += `<td>${element.descripcion}</td>`;
        producto += `<td>${element.precio}</td>`;
        producto += `<td>${element.marca}</td>`;
        producto += `<td>${element.categoria}</td>`;
        producto += `<td>${element.imagenUno}</td>`;
        producto += `</tr>`;
      });

      // Limpiar el cuerpo de la tabla antes de actualizar
      $("#tablaIndex tbody").empty();

      // Agregar nuevas filas a la tabla
      $("#tablaIndex tbody").append(producto);

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
