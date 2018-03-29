import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  productName: any;
  buttonDisabled = true;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.productName = {name: "", qty: "", price: ""}
   }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
    this.getProduct(params['id'])

    });
  }
  disable(){
    if(this.productName.qty == 0){
      return this.buttonDisabled = false;
    }else{
      return this.buttonDisabled = true;
    }
  }
  getProduct(id){
    let observable = this._httpService.getProduct(id)
    observable.subscribe(data=>{console.log(data)
      this.productName = data['data']
    })
  };
  getHome(){
    this._router.navigate(['/products'])
  }
  deleteProduct(id){
    
    let observable = this._httpService.deleteProduct(id)
    observable.subscribe(data =>{ console.log("Product was Deleted")
    this.getHome();
    
    })
  
  };

}
