function registrar() {
  axios
    .post("producto", {
      nombre: txtNombre.value,
      cantidad: txtCantidad.value,
      marca: txtMarca.value,
      descripcion: txtDescripcion.value,
      precio: txtPrecio.value,
      medidas: txtMedidas.value,
    })
    .then(function (response) {
      console.log(response);
      read();
      clear();
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post("categoria", {
      categoria: txtCategoria.value,
    })

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });

  axios
    .post("tipoMotos", {
      nombre: txtMotos.value,
    })

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}
