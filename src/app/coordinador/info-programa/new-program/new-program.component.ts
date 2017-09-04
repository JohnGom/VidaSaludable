import { ProgramService } from './../../../servicios/programas/program.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.css']
})
export class NewProgramComponent {

  public name: string;
  public description: string;
  public entity: string;
  constructor(public programService: ProgramService,
              public dialogRef: MdDialogRef<NewProgramComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  save() {
    let program: any = new Object;
    program.name = this.name;
    program.description = this.description;
    program.entity = this.entity;
    this.programService.saveProgram(program).subscribe((result: any) => {
       console.log(result);
       /*if (result.created == true) {
          this.dialogRef.close({"created": true});
       } else {
          this.dialogRef.close({"created": false});
       }*/
    });
  }

}
