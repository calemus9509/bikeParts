function registrar() {
  axios
    .post("producto", {
      nombre: txtNombre.value,
      cantidad: txtCantidad.value,
      descripcion: txtDescripcion.value,
      precio: txtPrecio.value,
      marca: txtMarca.value,
      categoriaF: txtCategoria.value,
      imagenUno: txtImagen1.value,
    })
    .then(function (response) {
      console.log(response);

      clear();
    })
    .catch(function (error) {
      console.log(error);
    });

  alert("Producto Creado!");

  // Crea un objeto FormData para enviar archivos
  // const formData = new FormData();
  // formData.append("nombre", txtNombre.value);
  // formData.append("cantidad", txtCantidad.value);
  // formData.append("categoriaF", txtCategoria.value);
  // formData.append("descripcion", txtDescripcion.value);
  // formData.append("precio", txtPrecio.value);
  // formData.append("marca", txtMarca.value);
  // // Agrega los archivos de imagen al FormData
  // addFileToFormData("imagenUno", txtImagen1, formData);
  // addFileToFormData("imagenDos", txtImagen2, formData);
  // addFileToFormData("imagenTres", txtImagen3, formData);
  // addFileToFormData("imagenCuatro", txtImagen4, formData);
  // // Realiza la solicitud POST usando Axios
  // axios
  //   .post("producto", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     // Recupera las rutas de las imágenes guardadas
  //     const data = response.data;
  //     const rutaImagenUno = data.rutaImagenUno;
  //     const rutaImagenDos = data.rutaImagenDos;
  //     const rutaImagenTres = data.rutaImagenTres;
  //     const rutaImagenCuatro = data.rutaImagenCuatro;
  //     // Puedes utilizar las rutas de las imágenes como sea necesario
  //     alert("Su producto ha sido Registrado");
  //     alertify.success(data);
  //   })
  //   .catch(function (error) {
  //     if (error.response) {
  //       // El servidor respondió con un código de error
  //       console.log("Error de respuesta del servidor:", error.response.data);
  //     } else if (error.request) {
  //       // La solicitud fue hecha pero no se recibió respuesta
  //       console.log("Error sin respuesta del servidor:", error.request);
  //     } else {
  //       // Algo sucedió en la configuración de la solicitud que causó el error
  //       console.log("Error de configuración:", error.message);
  //     }
  //   });
}

// Función para agregar un archivo al FormData si está presente
function addFileToFormData(fieldName, fileInput, formData) {
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    formData.append(fieldName, fileInput.files[0]);
  }
}

// async function registrar() {
//   try {
//     // Crear la categoría
//     const categoriaResponse = await axios.post("categoria", {
//       nombre: txtCategoria.value,
//     });

//     console.log(categoriaResponse);

//     // Verificar si la categoría se creó con éxito
//     if (categoriaResponse.status === 200) {
//       // Crear el tipo de moto
//       const tipoMotoResponse = await axios.post("tipoMotos", {
//         nombre: txtMotos.value,
//       });

//       console.log(tipoMotoResponse);

//       // Verificar si el tipo de moto se creó con éxito
//       if (tipoMotoResponse.status === 200) {
//         // Crear el producto
//         const productoResponse = await axios.post("producto", {
//           nombre: txtNombre.value,
//           cantidad: txtCantidad.value,
//           marca: txtMarca.value,
//           descripcion: txtDescripcion.value,
//           precio: txtPrecio.value,
//           medidas: txtMedidas.value,
//         });

//         console.log(productoResponse);

//         readP();
//         clear();
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

function foraneas() {
  axios
    .get("categorias")
    .then(function (response) {
      const select = document.getElementById("txtCategoria");
      const categoria = response.data;
      select.innerHTML =
        '<option value="" selected disabled>Seleccionar</option>';
      categoria.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.idcategorias;
        option.text = element.nombre;
        select.appendChild(option);
      });
    })

    .catch(function (error) {
      console.log(error);
    });
}
function clear() {}

foraneas();
