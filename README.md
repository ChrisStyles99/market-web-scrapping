# Pasos para iniciar el proyecto

## Usando node 
1. Solamente usar el comando ```node index.js``` en la carpeta raíz del proyecto, lo iniciará
2. El puerto por default es el 5000, pero se puede utilizar otro creando un archivo ```.env``` con el puerto que se desea.

## Usando docker
1. Tener instalado docker en el sistema.
2. Usar el comando ```docker-compose up``` para crear la imagen y subir los contenedores.
3. Igualmente el puerto por default es el 5000, pero se puede utilizar otro creando un archivo ```.env``` con algun puerto distinto.

# Manual de uso

Este proyecto cuenta con dos rutas para llamar a dos API's distintas:

1. /site-menu, para poder ver el menu de productos de la página de Soriana.
2. /products, para ver el catalogo de productos de cierto tipo.

Solamente es necesario llamar a ambas API's con Postman, o una aplicación parecida.

1. Abrir postman, o similar.
2. Usar la URL ```http://localhost:5000/site-menu``` en un formato GET.
3. Esto traera la información.
4. Usar la URL ```http://localhost:5000/products``` en un formato POST.
5. El formato es ```{ "url": "<url>" }``` por ejemplo: https://www.tiendasjumbo.co/supermercado/despensa/enlatados-y-conservas
6. Esto traerá la información deseada.

# Librerías utilizadas

Las librerías que se utilizaron dentro de estre proyecto fueron:

- Puppeteer, como la librería de web scrapping.
- Express, para crear el servidor web.

Librerías de desarrollo:

- Nodemon, para escuchar cambios en el codigo y recrear el server.

# Incidencias.

En la ruta de ver los productos, puede haber veces en las cuales el API pueda regresar un error, o regrese una cantidad distinta de productos.
Igualmente en la ruta del menú, puede que haya problemas a la hora de mandar a llamar la API.