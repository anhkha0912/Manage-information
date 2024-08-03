import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Item } from '../item';
import { MatTableDataSource } from '@angular/material/table';
import { FormAddComponent } from '../form-add/form-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ListDetailService } from '../services/list-detail.service';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrl: './list-data.component.css'
})
export class ListDataComponent implements OnInit, OnChanges {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() data: Item[] = [];
  @Output() isUpdated = new EventEmitter();
  displayedColumns: string[] = ['id', 'name', 'type', 'category', 'price', 'description', 'action'];
  dataSource = new MatTableDataSource<Item>([]);
  pageSize = 10;
  pageSizeOptions = [10, 20, 50];
  dataVerify: Item[] = [];
  sortedData?: Item[];
  constructor(
    private dialog: MatDialog,
    private listServices: ListDetailService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataVerify = [...this.data];
    console.log('Data view child', this.dataSource);
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    console.log('Data view child', this.data);
  }

  addData() {
    let dialogRef;
    dialogRef = this.dialog.open(FormAddComponent, {
      width: '',
      height: '',
      position: {
        top: '50vh',
        left: '50vw'
      },
      panelClass: 'alignCenter',
      data: this.dataVerify
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.listServices.createData(data).subscribe((data) => {
          this.isUpdated.emit(true);
        });
      }
    });
  }

  updateData(element: Item) {
    let dialogRef;
    const el = { ...element };
    dialogRef = this.dialog.open(FormUpdateComponent, {
      width: '',
      height: '',
      position: {
        top: '50vh',
        left: '50vw'
      },
      panelClass: 'alignCenter',
      data: el
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.listServices.updateData(data).subscribe((res) => {
          this.isUpdated.emit(true);
        });
      }
    });
  }

  deleteData(element: Item) {
    return this.listServices.deleteData(element).subscribe((res) => {
      this.isUpdated.emit(true);
    });
  }

  filter(event: any) {
    if (this.dataSource) {
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }
  }
}
