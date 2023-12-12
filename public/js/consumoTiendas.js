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
          const imagenesArray = JSON.parse(element.logo);

          const textCarta = `<div class="card mt-5 mb-5 " style="max-width: 25rem; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <img src="${imagenesArray[0]}" class="card-img-top" alt="..." style="object-fit: cover; border-radius: 15px 15px 0 0; height: 200px; width: 100%; object-position: center center;">
          <div class="card-body text-white bg-dark">
              <h5 class="card-title">${element.nombre}</h5>
              <p class="card-text">${element.nit}</p>
              <p class="card-text">${element.descripcion}</p>
              <a href="/pagina-principal" class="btn btn-dark" onclick="seleccionarEmpresa(${element.id})" style="background-color: rgb(245, 90, 0);">Ver tienda</a>
          </div>
      </div>
      `;

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
function seleccionarEmpresa(id){
  localStorage.setItem('empresaSeleccionada', id);
}