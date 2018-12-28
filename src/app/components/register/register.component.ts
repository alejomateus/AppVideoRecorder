import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  forma: FormGroup;
  complete :boolean = false;
  errors_register:boolean=false;
  constructor(private auth: AuthService, private router: Router) {
    this.forma = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      company: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      position: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
      password1: new FormControl("", [Validators.required,
      Validators.minLength(8),Validators.maxLength(20)]),
      password2: new FormControl("", Validators.required)
    });
    this.forma.controls["password2"].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);
    
  }
  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== forma.controls["password1"].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }
  register() {
    let data = {
      name: this.forma.value["name"],
      last_name: this.forma.value["last_name"],
      company: this.forma.value["company"],
      email: this.forma.value["email"],
      position: this.forma.value["position"],
      address: this.forma.value["address"],
      city: this.forma.value["city"],
      phone: this.forma.value["phone"],
      password: this.forma.value["password1"]
    };
    console.log(data);
    this.auth.register(data).subscribe(
      (resp:any) => {
        this.auth.changeAutenticated(resp.data);
        this.complete = true;
        setTimeout(() => {
          this.router.navigate(["home"]);
        }, 1000);
        
      },
      error => {
        this.errors_register=true;
        console.log(error);
      }
    );
  }
}
