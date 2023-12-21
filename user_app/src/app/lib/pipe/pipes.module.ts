import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { LanguagePipe } from './language.pipe';
import { CustomeDatePipe } from './custome-date.pipe';

@NgModule({
  imports: [TranslateModule],
  declarations: [
    LanguagePipe,
    CustomeDatePipe,
  ],
  exports: [
    LanguagePipe,
    CustomeDatePipe
  ],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [
        LanguagePipe,
        CustomeDatePipe
      ],
    };
  }
}
