import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit() {
    this.newProduct = {name: "", qty: Number, price: Number}
    this.errors = {name: "", qty: "", price: ""}
  }

  addProduct(){
    var status = this._httpService.addProduct(this.newProduct);
      status.subscribe(data => { console.log(data);
        if(data['errors']){
          if(data['errors']['name']){
            if(data['errors']['name']['kind']== 'required'){
              this.errors = {name: "Name is required", qty: "", price: ""}
            }
            else if(data['errors']['name']['kind']=='minlength'){
              this.errors = {name: "Name is must be greater than 3 characters!", qty: "", price: ""}
            }
          }
          else if(data['errors']['qty']){
            if(data['errors']['qty']['kind']== 'required'){
              this.errors = {name: "", qty: "Quantity is required", price: ""}
            }
        }
        else if(data['errors']['price']){
          if(data['errors']['price']['kind']== 'required'){
            this.errors = {name: "", qty: "", price: "Price is required"}
        }
      }
      }
            else{
              console.log("No errors")
              this._router.navigate(['/products'])
            }
        })
      }
      getHome(){
        this._router.navigate(['/products'])
      }
    }
