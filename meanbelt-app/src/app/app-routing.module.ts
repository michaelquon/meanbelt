import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent}, 
  {path: 'products/new', component: NewComponent},
  {path: 'products/edit/:id', component: EditComponent},
  {path: 'products/:id', component: DetailComponent},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
