var id = 0;

function read(url = "producto") {
  axios
    .get(url)
    .then(function (response) {
      let productos = "";
      response.data.forEach((element, index) => {
        productos += `<tr>`;
        productos += `<td>${element.nombre} </td>`;
        productos += `<td>${element.cantidad}</td>`;
        productos += `<td>${element.marca}</td>`;
        productos += `<td>${element.descripcion}</td>`;
        productos += `<td>${element.precio}</td>`;
        productos += `<td>${element.categoria}</td>`;
        productos += `</tr>`;
      });
      tableBodyInventario.innerHTML = productos;
    })
    .catch(function (error) {
      console.log(error);
    });

  new DataTable("#tablaSimple", {
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
        extend: "excel",
        text: "<i class='fa-solid fa-file-excel fa-bounce'></i>",
        titleAttr: "Excel",
        className: "excel",
        exportOptions: { columns: [0, 1, 2] },
      },
      {
        extend: "print",
        text: "<i class='fa-solid fa-print fa-bounce'></i>",
        titleAttr: "Imprimir",
        className: "imprimir",
        exportOptions: { columns: [0, 1, 2] },
      },
      {
        download: "open",
        extend: "pdf",
        text: "<i class='fa-solid fa-file-pdf fa-bounce'></i>",
        titleAttr: "PDF",
        className: "pdf",
        exportOptions: { columns: [0, 1, 2] },
      },
      {
        extend: "copy",
        text: "<i class='fa-solid fa-copy fa-bounce'></i>",
        titleAttr: "Copiar",
        className: "copy",
        exportOptions: { columns: [0, 1, 2] },
      },
    ],
  });
}

function update() {
  axios
    .put(`producto/${this.id}`, {
      id: this.id,
      nombre: txtNombre.value,
      cantidad: txtCantidad.value,
      precio: txtPrecio.value,
    })
    .then(function (response) {
      console.log(response);
      read();
      clear();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deletes() {
  let respuesta = confirm("Seguro de eliminar el siguiente producto?");
  if (respuesta) {
    axios
      .delete(`producto/${this.id}`)
      .then(function (response) {
        console.log(response);
        read();
        clear();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function clear() {
  txtNombre.value = "";
  txtCantidad.value = "";
  txtPrecio.value = "";
}

read();
