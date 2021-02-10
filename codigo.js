let titulo =  document.getElementById("titulo");
let anio =  document.getElementById("anio");
let alerta = document.getElementById("alert");
let tablaResultado = document.getElementById("tablaResultado");
let tBody = document.getElementById("tbodyKPO");
let select = document.getElementById("select");

const ValidarBusqueda = () =>  {
    let ValidoOno = false;
    if(titulo.value == ""){
        alerta.innerText = "Ingrese un titulo";
    }
    else if (isNaN(anio.value)){
        alerta.innerText = "Ingrese un anio valido";
    }
    else{
        alerta.innerText = "";
        ValidoOno = true;
    }
    return ValidoOno;
};
const ArmarLink = () =>{
    let link = `https://omdbapi.com/?apikey=2432d6a9&s=${titulo.value}`;
    if(anio.value != ""){
        link += `&y=${anio.value}`;
    }
    if(select.options[select.selectedIndex].value != "todo"){
        link += `&type=${select.options[select.selectedIndex].value}`;
    }
    return link;
}

const TraerDatos = ()=> {
    let link = ArmarLink();
    tBody.innerHTML = '';
    if(ValidarBusqueda() == true){
        fetch(link)
        .then(res=>res.json())
        .then(resultado=> {
            resultado.Search.forEach(pelicula => {
                let trPelicula = document.createElement("tr");

                let tdPoster = document.createElement("td");
                let imgPoster = document.createElement('img');
                imgPoster.src = `${pelicula.Poster}`;
                imgPoster.style = "height: 50%";
                tdPoster.appendChild(imgPoster);
                trPelicula.appendChild(tdPoster);

                let tdTitle = document.createElement("td");
                tdTitle.innerHTML = `${pelicula.Title}`;
                trPelicula.appendChild(tdTitle);
                
                let tdYear = document.createElement("td");
                tdYear.innerHTML = `${pelicula.Year}`;
                trPelicula.appendChild(tdYear);

                tBody.appendChild(trPelicula);

            });
            
        })
    }
} 