import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AButtonComponent } from './a-button/a-button.component';

@NgModule({
  declarations: [AButtonComponent],
  exports: [
    AButtonComponent
  ],
  imports: [
      IonicModule
  ]
})
export class ComponentsModule {}