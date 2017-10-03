import { UserService } from './../../../servicios/users/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  public id: number;
  public name: string;
  public username: string;
  public password: string;
  public type: string;
  types = [
    {name: 'encuestador'},
    {name: 'coordinador'},
    {name: 'administrador'}
  ];

  constructor(public userService: UserService,
              public dialogRef: MdDialogRef<NewUserComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  save() {
    let user: any = new Object;
    user.id = this.id;
    user.name = this.name;
    user.username = this.username;
    user.password = this.password;
    user.type = this.type;
    console.log(user);
    
    this.userService.saveUsers(user).subscribe((result: any) => {
       console.log(result);
       if (result.text() == 'ok') {
          this.dialogRef.close({"updated": true});
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }


}
