import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activation-modal',
  templateUrl: './activation-modal.component.html',
  styleUrls: ['./activation-modal.component.scss']
})
export class ActivationModalComponent {
  constructor(public dialogRef: MatDialogRef<ActivationModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
