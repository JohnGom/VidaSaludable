import { UserService } from './../../../servicios/users/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

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
              public dialogRef: MdDialogRef<UpdateUserComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.fillProgram();
  }

  fillProgram() {
      this.id = this.data.id;
      this.name = this.data.name;
      this.username = this.data.username;
      this.password = this.data.password;
      this.type = this.data.type;
  }

  update() {
    let user: any = new Object;
    user.id = this.id;
    user.name = this.name;
    user.username = this.username;
    user.password = this.password;
    user.type = this.type;
    console.log(user);
    this.userService.updateUsers(user).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
          this.dialogRef.close({"update": true});
       } else {
          this.dialogRef.close({"update": false});
       } 
    });
  }
}
