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

          const textCarta = `<div class="card mt-5 mb-5" style="width: 18rem;">
                             <img src="${element.imagen}" class="card-img-top" alt="...">
                             <div class="card-body">
                               <h5 class="card-title">${element.nombre}</h5>
                               <p class="card-text">${element.identificacion}</p>
                               <p class="card-text">${element.descripcion}</p>
                               <a href="#" class="btn btn-dark">Ver tienda</a>
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
