import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ListDataComponent } from './list-data/list-data.component';
import { MatTableModule } from '@angular/material/table';
import { FormAddComponent } from './form-add/form-add.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUpdateComponent } from './form-update/form-update.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListDataComponent,
    FormAddComponent,
    FormUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule {}
