document.addEventListener("DOMContentLoaded", function () {
    //hopefully real zoom fuction
    $('p').each(function () {
        var text = $(this).text().split(' ');
        for (var i = 0, len = text.length; i < len; i = i + 1) {
            text[i] = '<mark>' + text[i] + '</mark>';
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



// control by keyword
// Asegura que el código se ejecute después de que el DOM se haya cargado completamente

document.addEventListener("DOMContentLoaded", function () {
    // Variable para rastrear el estado del switch
    let switchActivated = true;

    // Función para activar/desactivar la funcionalidad
    function toggleFunctionality() {
        // Obtiene todos los elementos con ID que comienza con "tab-"
        const tabs = document.querySelectorAll('[id^="tab"]');

        // Verifica el estado del switch y ajusta la funcionalidad en consecuencia
        if (switchActivated) {
            // Desactiva la funcionalidad eliminando el atributo tabindex
            tabs.forEach(tab => tab.removeAttribute("tabindex"));
        } else {
            // Activa la funcionalidad estableciendo el atributo tabindex a "0"
            tabs.forEach(tab => tab.setAttribute("tabindex", "0"));
        }

        // Cambia el estado del switch
        switchActivated = !switchActivated;
    }

    // Añade un evento de clic al botón con ID "tab-toggleSwitch"
    const toggleSwitchButton = document.getElementById("tab-toggleSwitch");
    toggleSwitchButton.addEventListener("click", toggleFunctionality);

    // Añade un evento de tecla para manejar las flechas arriba/abajo
    document.addEventListener("keydown", function (event) {
        // Verifica si la tecla presionada es ArrowDown o ArrowUp y si el switch está activado
        if ((event.key === "ArrowDown" || event.key === "ArrowUp") && switchActivated) {
            // Encuentra todos los elementos con ID que comienza con "tab-"
            const tabs = document.querySelectorAll('[id^="tab"]');
            
            // Encuentra el índice del elemento activo
            const currentIndex = Array.from(tabs).findIndex(tab => tab === document.activeElement);

            // Calcula el nuevo índice basado en la tecla presionada
            let newIndex;
            if (event.key === "ArrowDown") {
                newIndex = (currentIndex + 1) % tabs.length;
            } else {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }

            // Obtiene el elemento correspondiente al nuevo índice y lo enfoca
            const newTab = tabs[newIndex];
            
            // Asegura que el nuevo div pueda recibir el foco
            newTab.setAttribute("tabindex", "0");
            
            // Enfoca el nuevo div
            newTab.focus();

            // Agrega una clase de transición
            newTab.classList.add("transition-class");

            // Elimina la clase después de un pequeño retraso (300ms)
            setTimeout(() => {
                newTab.classList.remove("transition-class");
            }, 2000);
        }
    });
});
