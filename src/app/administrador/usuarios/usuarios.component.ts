import { ServiceModalService } from './../../service-modal/service-modal.service';
import { UserService } from './../../servicios/users/user.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public users = [];
  constructor(public userService: UserService,
              public modalService: ServiceModalService) {}
  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getallUsers().subscribe((data: Response) => {
      this.users = data.json();
      console.log(this.users);
    })
  }

  public deleteUser(id: number) {
    this.userService.deleteUsers(id).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
        alert("Usuario Eliminado");
        this.getUsers();
      }
    })
  }

  public createUser() {
    this.modalService.createUser().subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Usuario Creado");
        this.getUsers();
      }
    });
  }

  public updateUser(users: Object) {
    this.modalService.updateUser(users).subscribe((data: any) => {
      if (data) {
        alert("Usuario Actualizado");
        this.getUsers();
      }
    });
  }

}
