import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Item } from '../item';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddComponent {
  itemForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
  constructor(
    public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item[]
  ) {}
  onClose() {
    this.dialogRef.close();
  }

  onAdd() {
    if (
      this.checkAnswer(this.itemForm.controls) &&
      this.checkDoNotExistId(this.itemForm.controls.id)
    ) {
      this.dialogRef.close(this.itemForm.value);
    }
  }

  checkAnswer(dataItem: any) {
    let result = true;
    if (
      dataItem.id.invalid ||
      dataItem.name.invalid ||
      dataItem.type.invalid ||
      dataItem.category.invalid ||
      dataItem.price.invalid ||
      dataItem.description.invalid
    ) {
      result = false;
    }
    return result;
  }

  errorMessage(err: any) {
    if (err.hasError('required')) {
      return 'You must enter a value';
    } else if (err.hasError('email')) {
      return 'You must enter a email';
    } else if (err.hasError('value_exist')) {
      return 'Id already exists';
    } else {
      return;
    }
  }

  checkDoNotExistId(id: any) {
    const index = this.data.findIndex((item) => item.id == id.value);
    if (index && index >= 0) {
      this.itemForm.controls.id.setErrors({ value_exist: true });
      return false;
    } else {
      this.itemForm.controls.id.setErrors(null);
      return true;
    }
  }
}
