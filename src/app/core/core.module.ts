import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from './material-example/material-example.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
// import { GetPhotoService } from './services/get-photo.service';
// import { ParamsInterceptor } from './interceptors/params.interceptor';

const materialModules = [
  MatFormFieldModule,
  MaterialExampleModule,
  FormsModule,
  ReactiveFormsModule,
  MatNativeDateModule,
  MatNativeDateModule,
  HttpClientModule,
  MatSliderModule,
];

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    ...materialModules,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...materialModules,
  ],
  // providers: [
  //   GetPhotoService, {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: ParamsInterceptor,
  //     multi: true
  //   }],
})
export class CoreModule { }
