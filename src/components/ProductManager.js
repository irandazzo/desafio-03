import {promises as fs} from "fs"

export default class ProductManager {
    constructor (){
        this.path = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)
        console.log(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
        
    }
    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find ((product) => product.id === id)){
            console.log("El código del producto no existe");
        }else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async({id, ...producto}) => {
        await this.deleteProductById(id);
        let productoAnterior = await this.readProducts();
        let modificacionProd = [{...producto, id}, ...productoAnterior];
        await fs.writeFile(this.path, JSON.stringify(modificacionProd));
        
    };
}

/* const productos = new ProductManager(); */

/* productos.addProduct("producto1", "producto", 2300, "imagen1", "codigo1", 100);
productos.addProduct("producto2", "producto", 2300, "imagen2", "codigo2", 100);
productos.addProduct("producto3", "producto", 2300, "imagen3", "codigo3", 100);
productos.addProduct("producto4", "producto", 2300, "imagen4", "codigo4", 100);
productos.addProduct("producto5", "producto", 2300, "imagen5", "codigo5", 100);
productos.addProduct("producto6", "producto", 2300, "imagen6", "codigo6", 100);
productos.addProduct("producto7", "producto", 2300, "imagen7", "codigo7", 100);
productos.addProduct("producto8", "producto", 2300, "imagen8", "codigo8", 100);
productos.addProduct("producto9", "producto", 2300, "imagen9", "codigo9", 100);
productos.addProduct("producto10", "producto", 2300, "imagen10", "codigo10", 100); */

// productos.getProducts();

/* Buscar productos x ID */
/* productos.getProductById(5) */

/* Eliminar Producto */
/* productos.deleteProductById(2) */

/* Actualizar producto */
/* productos.updateProducts({
    title: 'Cerveza Heineken',
    description: 'Cerveza',
    price: 550,
    thumbnail: 'imagen4',
    code: 'cerveza2',
    stock: 600,
    id: 4
}) */