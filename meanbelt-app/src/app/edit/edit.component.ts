import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productName: any;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.productName = {name: "", qty: Number, price: Number}
    this.errors = {name: "", qty: "", price: ""}
   }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getProduct(params['id'])
    });
  }

  getProduct(id){
    let observable = this._httpService.getProduct(id)
    observable.subscribe(data=>{
      this.productName = data['data']
    })
  };
  addProduct(id){
    var status = this._httpService.editProduct(this.productName);
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
            else if(data['errors']['qty']['kind']=='min'){
              this.errors = {name: "", qty: "Cannot have a 0 value", price: ""}
            }
        }
        else if(data['errors']['price']){
          if(data['errors']['price']['kind']== 'required'){
            this.errors = {name: "", qty: "", price: "Price is required"}
        }
        else if(data['errors']['price']['kind']=='min'){
          this.errors = {name: "", qty: "", price: "Cannot have a 0 value"}
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
