import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CostumerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/costumer/products', {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/costumer/search/${name}` , {
      headers: this.createAuthorizationHeader()
    })
  }

  addToCart(productId:any): Observable<any>{
    const cartDto ={
      productId : productId,
      userId : UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/costumer/cart', cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCartByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/costumer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

}
