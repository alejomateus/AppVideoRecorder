import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form_login:FormGroup;
  incorrect_login:boolean= false;
  complete=false;
  property="";
  constructor(private auth: AuthService,private router: Router) {
    this.form_login = new FormGroup({
      'email': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ]),
      'password': new FormControl('', Validators.required)
    })
  }
  login(){
    
    let data ={
      "password": this.form_login.value['password'],
      "email": this.form_login.value['email']
    };
    this.auth.login(data).subscribe((resp:any) => {
      this.auth.changeAutenticated(resp.data);
      $("#myModal").modal('hide');
      setTimeout(() => {
        
        if(resp.data.usuario.role == "admin"){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['home']);
        }
         
      }, 1000);
    },error=>{
      
      this.incorrect_login= true;
      console.log(error);
    });
  }


}
