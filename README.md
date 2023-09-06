# TP Backend TTADS

Autor: Giovanni, Martin - 44912

El trabajo a realizar se trata de una aplicacion de venta comercial que cuenta con las diferentes funciones necesarias para un comercio de cualquier indole. Permitirá administrar categorias, productos ventas, compras, usuarios. 

### Usuario
El sistema cuenta con dos diferentes tipos de usuarios: Cliente Y Administrador. El cliente es capaz de ver un listado de las Categorias, sus productos y realizar compras de los mismos. El administrador es capaz de ver todas las entidades del sistema y realizar un ABM de las mismas. La manera de autenticar los usuarios consiste un login con JWT.

### Categoría
Consiste en una entidad simple para poder agrupar los productos.

### Producto
Consiste en una entidad dependiente de categoía.

### Compra
Consiste en un conjunto de productos con su cantidad y un usuario que efectúa la compra.


|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|Categoría, Usuario|
|ABMC dependiente|1|2|Producto, Venta|
|Listado simple|1|1|Categoría|
|Listado complejo obligatorio|1|2|Productos (Categorias), Ventas (Productos, Usuario)|
|Listado adicional con filtro|0|0|Ninguno|
|Detalle básico|1(*)|2(*)|Categoria, Usuario|
|Detalle parametrizable|0|0|-|
|Otros|0|0||

### Modelo de Dominio
<img src="https://github.com/giovamarr/TTADS-Backend/assets/51095800/3c625df4-7879-4b73-8790-9aa16690a084" />

Tecnologias y Herramientas Utilizadas:
#### Frontend
  * React
  * Bootstrap
  * Npm

#### Backend
  * Express Js
  * TypeScript
  * Pnpm
  * MongoDB
  * JsonWebToken
