import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [ColumnOneComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ColumnOneComponent //whoever using the shared module can
                      //get access to c1Component
  ]
})
export class SharedModule { }
