import { InterpretationService } from './../../../servicios/interpretations/interpretation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public correo: string;
  constructor(private service: InterpretationService,
              public dialogRef: MatDialogRef<SendEmailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  save() {
    let interven: any = new Object;
    interven.correo = this.correo;
    interven.observacion = this.data.observacion;
    interven.resultado = this.data.resultado;
    interven.interpretaciones = this.data.interpretaciones;
    this.service.sendEmail(interven).subscribe((result: any) => {
       if (result.text() == 'ok') {
          this.dialogRef.close({"updated": true, "correo": this.correo});
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }

}
