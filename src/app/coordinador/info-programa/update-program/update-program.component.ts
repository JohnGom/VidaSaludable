import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgramService } from './../../../servicios/programas/program.service';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.component.html',
  styleUrls: ['./update-program.component.css']
})
export class UpdateProgramComponent implements OnInit {

  public id: number;
  public name: string;
  public description: string;
  public entity: string;
  constructor(public programService: ProgramService,
              public dialogRef: MatDialogRef<UpdateProgramComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.fillProgram();
  }

  fillProgram() {
      this.id = this.data.id;
      this.name = this.data.name;
      this.description = this.data.description;
      this.entity = this.data.entity;
  }

  update() {
    let program: any = new Object;
    program.id = this.id;
    program.name = this.name;
    program.description = this.description;
    program.entity = this.entity;
    this.programService.updateProgram(program).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
          this.dialogRef.close({"updated": true });
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }

}

