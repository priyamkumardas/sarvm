import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { StorageService } from '../services/storage.service';

@Pipe({
  name: 'language',
  pure: false,
})
export class LanguagePipe implements PipeTransform {
  constructor(
    public storageService:StorageService
  ) {}

  transform(value: any, finalText?: string, ...args: unknown[]) {
    if (value) {
      if (this.storageService.getItem(Constants.ALL_LANGUAGES)) {
        const data = this.storageService.getItem(Constants.ALL_LANGUAGES);
        if (data[value] != undefined) {
          value = data[value];
        } else {
          value = finalText;
        }
        return value;
      }
    } else {
      return value;
    }
  }
}
