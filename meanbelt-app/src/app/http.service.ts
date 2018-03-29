import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
  
    return this._http.get('/products');
  }
  //Add Product
  addProduct(newProduct){
    return this._http.post('/products', newProduct);
  }
  //Get One Product
  getProduct(id){
    return this._http.get('/products/'+id);
  }
  //Edit Product
  editProduct(product){
    return this._http.put('/products/'+product._id, product);
  }
  //Delete Product
  deleteProduct(id){
    return this._http.delete('/products/'+id);
  }

}
