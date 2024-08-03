import { Component, OnInit } from '@angular/core';
import { ListDetailService } from '../services/list-detail.service';
import { Item } from '../item';
import { MatDialog } from '@angular/material/dialog';
import { FormAddComponent } from '../form-add/form-add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private listServices: ListDetailService,
    private dialog: MatDialog
  ) {}
  data: Item[] = [];
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listServices.getAllData().subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  refreshData(evt: boolean) {
    if (evt) {
      this.getData();
    }
  }
}
