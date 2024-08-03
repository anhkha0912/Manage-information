import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../item';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class FormUpdateComponent implements OnInit, OnChanges {
  itemForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
  constructor(
    public dialogRef: MatDialogRef<FormUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.itemForm.controls.id.setValue(this.data.id);
    this.itemForm.controls.name.setValue(this.data.name);
    this.itemForm.controls.type.setValue(this.data.type);
    this.itemForm.controls.category.setValue(this.data.category);
    this.itemForm.controls.price.patchValue(this.data.price);
    this.itemForm.controls.description.setValue(this.data.description);
  }
  ngOnInit(): void {
    this.itemForm.controls.id.setValue(this.data.id);
    this.itemForm.controls.name.setValue(this.data.name);
    this.itemForm.controls.type.setValue(this.data.type);
    this.itemForm.controls.category.setValue(this.data.category);
    this.itemForm.controls.price.setValue(this.data.price);
    this.itemForm.controls.description.setValue(this.data.description);
  }
  onClose() {
    this.dialogRef.close();
  }

  onUpdate() {
    if (this.checkAnswer(this.itemForm.controls)) {
      this.dialogRef.close(this.itemForm.value);
    }
  }

  checkAnswer(data: any) {
    let result = true;
    if (
      data.id.invalid ||
      data.name.invalid ||
      data.type.invalid ||
      data.category.invalid ||
      data.price.invalid ||
      data.description.invalid
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
    } else {
      return;
    }
  }
}
