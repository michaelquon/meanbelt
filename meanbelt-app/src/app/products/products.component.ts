import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = []
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    let observable = this._httpService.getProducts();
    observable.subscribe(data => {
    this.products = data['data'];
  })
  };
  getNew(){
    this._router.navigate(['/products/new'])
  };
  getDetail(id){
    this._router.navigate(['/products/'+id])
  };
  getEdit(id){
    this._router.navigate(['/products/edit/'+id])
  }
  getHome(){
    this._router.navigate(['/products'])
  }
}
