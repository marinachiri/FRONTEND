import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  // We load  Stripe
  stripePromise = loadStripe(environment.stripe);
  constructor(
    private http: HttpClient,
    private location: Location,
    public authService: AuthService
  ) {}

  async pay(id_bike: number): Promise<void> {
    const customer = this.authService.getCurrentUser();

    // here we create a payment object
    const payment = {
      id_bike: id_bike,
      currency: 'RON',
      userid: customer?.uid,

      // TODO: SET environment host instead of localhost.

      cancelUrl: `${window.location.origin}/cancel`,
      successUrl: `${window.location.origin}/success`,
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    if (stripe) {
      console.log(stripe, '?');
      console.log(payment.cancelUrl);
      this.http
        .post(`${environment.APIURL}/payment`, payment)
        .subscribe((data: any) => {
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour

          sessionStorage.setItem('stripe_sess', data.id);
          sessionStorage.setItem(
            'stripeSessionExpiration',
            expirationTime.toString()
          );

          stripe.redirectToCheckout({
            sessionId: data.id,
          });
        });
    }
  }

  /*
  async pay(name1: string, amount1: number): Promise<void> {
    // here we create a payment object
    const payment = {
      id_bike: "sss",
      name: name1,
      currency: 'RON',
      
      amount: amount1*10,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    if (stripe){ 
      console.log(stripe, "?")
    this.http
      .post(`${environment.APIURL}/payment`, payment)
      .subscribe((data: any) => {
      
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}*/
}
