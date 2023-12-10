function redirectToWhatsApp() {
    // Reemplaza 'tu_numero_de_whatsapp' con tu número de WhatsApp (incluyendo el código de país)
    var numeroWhatsApp = '+573102445188';

    var mensaje = 'Hola me gustaría ser parte de esta página!';

    var urlWhatsApp = 'https://api.whatsapp.com/send?phone=' + numeroWhatsApp + '&text=' + encodeURIComponent(mensaje);

    // Abre la URL en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
}