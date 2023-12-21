import { NgModule } from '@angular/core';

import { LanguagePipe } from './language.pipe';
import { TextTruncatePipe } from './text-truncate.pipe';
import { GroupByDatePipe } from './group-by-date.pipe';

@NgModule({
  imports: [],
  declarations: [LanguagePipe, TextTruncatePipe, GroupByDatePipe],
  exports: [LanguagePipe, TextTruncatePipe, GroupByDatePipe],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [LanguagePipe,],
    };
  }
}
