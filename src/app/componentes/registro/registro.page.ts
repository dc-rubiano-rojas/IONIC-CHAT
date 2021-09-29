import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string;
  password: string;
  name: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.authService.register(this.email, this.password, this.name)
        .then( auth => {
          this.router.navigateByUrl('home');
        })
        .catch( err => {
          console.log(err);
        });
  }

}
