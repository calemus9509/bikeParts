function leerEmpresas() {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  axios.get('empresas')
    .then(res => {
      const empresas = res.data;

      const container = document.createElement('div');
      container.classList.add('container');

      for (let i = 0; i < empresas.length; i += 3) {
        const empresasChunk = empresas.slice(i, i + 3);

        const row = document.createElement('div');
        row.classList.add('row');

        empresasChunk.forEach(element => {
          const cardColumn = document.createElement('div');
          cardColumn.classList.add('col-md-4');

          const textCarta = `<div class="card mt-5 mb-5" style="max-width: 25rem;">
                             <img src="${element.imagen}" class="card-img-top" alt="...">
                             <div class="card-body">
                               <h5 class="card-title">${element.nombre}</h5>
                               <p class="card-text">${element.nit}</p>
                               <p class="card-text">${element.descripcion}</p>
                               <a href="/pagina-principal" class="btn btn-dark" onclick="seleccionarEmpresa(${element.id})">Ver tienda</a>
                             </div>
                           </div>`;

          cardColumn.innerHTML = textCarta;
          row.appendChild(cardColumn);
        });

        container.appendChild(row);
      }
      contenedor.appendChild(container);
    })
    .catch(err => {
      console.error(err);
    });
}

// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//       results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// // Verifica si hay un parámetro scrollTo en la URL
// var scrollToElement = getParameterByName('scrollTo');

// // Si hay un parámetro scrollTo, desplázate al elemento correspondiente
// if (scrollToElement) {
//   var targetElement = document.getElementById(scrollToElement);
//   if (targetElement) {
//     targetElement.scrollIntoView({ behavior: 'smooth' });
//   }
// }