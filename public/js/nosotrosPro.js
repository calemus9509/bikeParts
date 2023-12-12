function redirectToWhatsApp() {
    // Reemplaza 'tu_numero_de_whatsapp' con tu número de WhatsApp (incluyendo el código de país)
    var numeroWhatsApp = '+573213228547';


    var mensaje = 'Hola me gustaria ser partde de esa gran empresa';


    var urlWhatsApp = 'https://api.whatsapp.com/send?phone=' + numeroWhatsApp + '&text=' + encodeURIComponent(mensaje);


    window.location.href = urlWhatsApp;
}

