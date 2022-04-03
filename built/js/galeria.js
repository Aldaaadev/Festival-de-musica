document.addEventListener('DOMContentLoaded', function( ){
    iniciarApp( );
});

function iniciarApp( ) {
    navegacionFija();
    crearGaleria( );
    scrollNav();
}

function navegacionFija ( ) {
     const barra = document.querySelector('.header');
     const sobreFestival = document.querySelector('.sobre-festival');
     const body = document.querySelector('body');
     let esFijo = false;

     window.addEventListener('scroll', function( ) {
        const alturaHeader = barra.offsetHeight;
        if ( sobreFestival.getBoundingClientRect( ).bottom - alturaHeader < 0) {
            barra.classList.add('fijo');
            //Si el ancho de la ventana es inferior al de tablet,
            //No se le aplica el atributo, pues no se incluye el header
            if (window.innerWidth > 768) {
                body.style.paddingTop = barra.offsetHeight + "px";
            }
            //body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            barra.classList.removeAttribute('style');
        }
     });
 }

function scrollNav( ){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault( );

                const seccionScroll = e.target.attributes.href.value;
                const seccion = document.querySelector(seccionScroll);
                seccion.scrollIntoView({ behavior: "smooth"});
        })
    });
}

function crearGaleria( ) {
    const galeria = document.querySelector('.galeria-imagenes');

    galeria.textContent = ' ';

    for( let i = 1; i<=12; i++)  {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="built/img/galeria/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="built/img/galeria/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function( ) {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    };
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="built/img/galeria/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="built/img/galeria/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }  

    //Boton para cerrar la imagen
    const cerrarFoto = document.createElement('P');
    cerrarFoto.textContent = 'X';
    cerrarFoto.classList.add('btn-cerrar');
    cerrarFoto.onclick = function ( ) {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarFoto);

    //Añadir al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
 }
