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

// Función para guardar el ID de la empresa seleccionada en el localStorage
function seleccionarEmpresa(idEmpresa) {
  localStorage.setItem('empresaSeleccionada', idEmpresa);
}