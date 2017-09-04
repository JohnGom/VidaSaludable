import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../servicios/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    returnUrl: string;
 
   constructor(private service: AuthserviceService,
               private route: ActivatedRoute,
               private router: Router){
  }

  ngOnInit() {
      this.service.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;
        this.service.login(this.model.username, this.model.password).subscribe(
            data => {
                if (data) {
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.error = 'Usuario o contraseña incorrecta';
                    this.loading = false;
                }
            });
    }

}
