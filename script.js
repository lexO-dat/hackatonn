document.addEventListener("DOMContentLoaded", function () {
    //hopefully real zoom fuction
    $('p').each(function () {
        var text = $(this).text().split('') ;
        for (var i = 0, len = text.length; i < len; i = i + 1) {
            text[i] = '<span>' + text[i] + '</span>';
        }
        $(this).html(text.join(' '));
    });
});

// glass effect 
document.addEventListener("DOMContentLoaded", function () {
    const magnifier = document.querySelector(".magnifier");
    const content = document.querySelector(".content");

    // Tamaño del magnifier
    const magnifierSize = 100;

    document.addEventListener("mousemove", function (event) {
        // Obtén las coordenadas del mouse ajustadas al desplazamiento de la página
        const mouseX = event.clientX + window.scrollX;
        const mouseY = event.clientY + window.scrollY;

        // Calcula la posición para centrar la lupa en el mouse
        const magnifierX = mouseX - magnifierSize / 2;
        const magnifierY = mouseY - magnifierSize / 2;

        // Actualiza la posición del magnifier para seguir al mouse
        magnifier.style.left = magnifierX + "px";
        magnifier.style.top = magnifierY + "px";

        // Calcula el porcentaje de desplazamiento en relación con el tamaño de la página
        const offsetX = (mouseX / window.innerWidth) * 100;
        const offsetY = (mouseY / window.innerHeight) * 100;

        // Cambia la posición de la lupa y el contenido en consecuencia
        magnifier.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
        content.style.backgroundPosition = `-${offsetX}% -${offsetY}%`;
           });
       });