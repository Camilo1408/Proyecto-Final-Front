import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signupForm: FormGroup;
hidePassword = true;

  constructor(private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]],
    })
  }

  togglePasswordVisbility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password != confirmPassword){
      this.snackbar.open('Passwords do not match.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
    }

    this.authService.register(this.signupForm.value).subscribe(
    (response)=>{
      this.snackbar.open('Sign up succesfull!.', 'Close', {duration: 5000})
      this.router.navigateByUrl("/login");
    },
    (error)=>{
      this.snackbar.open('Sign up failed. Please try again', 'Close', {duration: 5000, panelClass: 'error-snackbar'})
    }
    )
  }
}
