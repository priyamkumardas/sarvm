import { NgModule } from '@angular/core';

import { LanguagePipe } from './language.pipe';
import { ProductFilterPipe } from './product-filter.pipe';


@NgModule({
  imports: [],
  declarations: [LanguagePipe, ProductFilterPipe],
  exports: [LanguagePipe, ProductFilterPipe],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [LanguagePipe],
    };
  }
}
