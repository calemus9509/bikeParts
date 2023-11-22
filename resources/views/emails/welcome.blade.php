<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a BikeParts</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .header {
            background-color: #007BFF;
            text-align: center;
            padding: 20px;
        }

        .logo {
            width: 100px;
            height: 100px;
            /* Asegura que la imagen sea cuadrada */
            border-radius: 50%;
            object-fit: cover;
            /* Ajusta el tamaño para que cubra el cuadro sin distorsión */
        }

        .message {
            text-align: center;
            padding: 20px;
        }

        .thanks {
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>

<body>

    <div class="header">
        <img src="https://img.freepik.com/foto-gratis/persona-que-conduce-motocicleta-potente-alta-velocidad_23-2150704743.jpg" alt="Logo BikeParts" class="logo">
    </div>

    <div class="message">
        <p style="font-size: 25px; color: #333;">Bienvenido a BikeParts, su registro fue exitoso.</p>
        <p>Usuario: {{ $usuario }}</p>
        <p>Contraseña: {{ $contraseña }}</p>
    </div>

    <div class="thanks">
        <h3>GRACIAS POR TRABAJAR CON NOSOTROS ;)</h3>
    </div>

</body>

</html>