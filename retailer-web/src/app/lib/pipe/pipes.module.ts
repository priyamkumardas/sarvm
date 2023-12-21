import { NgModule } from '@angular/core';

import { LanguagePipe } from './language.pipe';
import { ProductFilterPipe } from './product-filter.pipe';
import { TextTruncatePipe } from './text-truncate.pipe';

@NgModule({
  imports: [],
  declarations: [LanguagePipe, ProductFilterPipe, TextTruncatePipe],
  exports: [LanguagePipe, ProductFilterPipe, TextTruncatePipe],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [LanguagePipe,],
    };
  }
}
