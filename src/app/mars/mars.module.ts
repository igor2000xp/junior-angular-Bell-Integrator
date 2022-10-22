import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { CoreModule } from '../core/core.module';
import { ImgCardComponent } from './component/img-card/img-card.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ImgCardComponent
  ],
  exports: [
    MainPageComponent,
    CoreModule,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class MarsModule { }
