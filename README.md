Aplicación full-stack para gestionar inventario de una tienda pequeña.
Permite crear, leer, actualizar y eliminar productos, organizar stock y consultar información de manera sencilla.
Este proyecto fue creado como ejercicio práctico para fortalecer habilidades con Node.js, Express, PostgreSQL, React + TypeScript y TailwindCSS.

Instalacion
1-git clone https://github.com/Dfespinal7/Inventary-app.git
2-cd inventario
3-cd backend
4-npm install
5-Crea un archivo .env en la carpeta backend con estas variables (estos son ejemplos, puedes cambiar las contraseñas y el token):
PORT=5000
USER=postgres
PASSWORD=mi_contraseña
HOST=localhost
PORTDATABASE=5432
DATABASE=inventario_react
TOKEN_SECRET=mi_token_unico_secreto
6-Asegúrate de que la base de datos exista en PostgreSQL. Si no, crea la base:
CREATE DATABASE inventario_react;
7-ejecuta el backend con el sgte comando: npm run dev
8-abre otra terminal y ejecuta el cd frontend
9-npm install
10-npm run dev
