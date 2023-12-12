// function registrar() {
//   axios
//     .post("producto", {
//       nombre: txtNombre.value,
//       cantidad: txtCantidad.value,
//       descripcion: txtDescripcion.value,
//       precio: txtPrecio.value,
//       marca: txtMarca.value,
//       categoriaF: txtCategoria.value,
//       imagenUno: txtImagen1.value,
//     })
//     .then(function (response) {
//       console.log(response);

//       clear();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   alert("Producto Creado!");

//   // Crea un objeto FormData para enviar archivos
//   // const formData = new FormData();
//   // formData.append("nombre", txtNombre.value);
//   // formData.append("cantidad", txtCantidad.value);
//   // formData.append("categoriaF", txtCategoria.value);
//   // formData.append("descripcion", txtDescripcion.value);
//   // formData.append("precio", txtPrecio.value);
//   // formData.append("marca", txtMarca.value);
//   // // Agrega los archivos de imagen al FormData
//   // addFileToFormData("imagenUno", txtImagen1, formData);
//   // addFileToFormData("imagenDos", txtImagen2, formData);
//   // addFileToFormData("imagenTres", txtImagen3, formData);
//   // addFileToFormData("imagenCuatro", txtImagen4, formData);
//   // // Realiza la solicitud POST usando Axios
//   // axios
//   //   .post("producto", formData, {
//   //     headers: {
//   //       "Content-Type": "multipart/form-data",
//   //     },
//   //   })
//   //   .then(function (response) {
//   //     console.log(response);
//   //     // Recupera las rutas de las imágenes guardadas
//   //     const data = response.data;
//   //     const rutaImagenUno = data.rutaImagenUno;
//   //     const rutaImagenDos = data.rutaImagenDos;
//   //     const rutaImagenTres = data.rutaImagenTres;
//   //     const rutaImagenCuatro = data.rutaImagenCuatro;
//   //     // Puedes utilizar las rutas de las imágenes como sea necesario
//   //     alert("Su producto ha sido Registrado");
//   //     alertify.success(data);
//   //   })
//   //   .catch(function (error) {
//   //     if (error.response) {
//   //       // El servidor respondió con un código de error
//   //       console.log("Error de respuesta del servidor:", error.response.data);
//   //     } else if (error.request) {
//   //       // La solicitud fue hecha pero no se recibió respuesta
//   //       console.log("Error sin respuesta del servidor:", error.request);
//   //     } else {
//   //       // Algo sucedió en la configuración de la solicitud que causó el error
//   //       console.log("Error de configuración:", error.message);
//   //     }
//   //   });
// }

// Función para agregar un archivo al FormData si está presente

function registrar() {
<<<<<<< HEAD
  axios.post("producto", {
      nombre: txtNombre.value,
      cantidad: txtCantidad.value,
      descripcion: txtDescripcion.value,
      precio: txtPrecio.value,
      marca: txtMarca.value,
      categoriaF: txtCategoria.value,
      imagenUno: txtImagen1.value,
      empresa_id: txtEmpresa.value,
  })
  .then(function (response) {
      console.log(response);
      clear();
  })
  .catch(function (error) {
      console.log(error);
  });

  alert("Producto Creado!");
=======
    const formData = new FormData();
    const files = document.getElementById("txtImagenes").files;

    // Agregar imágenes al formulario solo si hay imágenes seleccionadas
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append("imagenes[]", files[i]);
        }
    }

    formData.append("nombre", txtNombre.value);
    formData.append("cantidad", txtCantidad.value);
    formData.append("descripcion", txtDescripcion.value);
    formData.append("precio", txtPrecio.value);
    formData.append("marca", txtMarca.value);
    formData.append("categoriaF", txtCategoria.value);
    formData.append("empresa_id", txtEmpresa.value);

    axios
        .post("producto", formData, {})
        .then(function (response) {
            console.log(response);
            alert("Producto Creado!");

            clear();
        })
        .catch(function (error) {
            console.log(error);
        });
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
}



function addFileToFormData(fieldName, fileInput, formData) {
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    formData.append(fieldName, fileInput.files[0]);
  }
}




function foraneas() {
  // Llamada para obtener las categorías
  axios.get("/categorias")
      .then(function (response) {
          const select = document.getElementById("txtCategoria");
          
          // Agrega las opciones al select
          select.innerHTML = '<option value="" selected disabled>Seleccionar</option>';
          response.data.forEach((element) => {
              const option = document.createElement("option");
              option.value = element.idcategorias;
              option.text = element.nombre;
              select.appendChild(option);
          });
      })
      .catch(function (error) {
          console.log(error);
      });

  // Llamada para obtener la información del usuario (incluido el ID de la empresa)
  axios.get("/check-session")
      .then(function (response) {
          const empresaInput = document.getElementById("txtEmpresa");

          // Verifica si la sesión está activa
          if (response.data.success) {
              const empresaId = response.data.user.empresa_id;
              // Establece el valor del input de la empresa
              empresaInput.value = empresaId;
          }
      })
      .catch(function (error) {
          console.log(error);
      });
}




function clear() {}

foraneas();
