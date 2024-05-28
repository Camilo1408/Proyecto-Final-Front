import { Component } from '@angular/core';
import { CostumerService } from '../../service/costumer.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  constructor(
    private costumerService : CostumerService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = [];
    this.costumerService.getCartByUserId().subscribe(res=>{
      this.order = res;
      res.cartItems.forEach(element=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }
}
