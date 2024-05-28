import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin/service/admin.service';
import { CostumerService } from '../../service/costumer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private costumerService: CostumerService,
    private fb: FormBuilder,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.costumerService.getAllProducts().subscribe((res) =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.costumerService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  addToCart(id:any){
    this.costumerService.addToCart(id).subscribe(res=>{
      this.snackbar.open("Product added to cart succesfully","Close", {duration:5000})
    })
  }
}
