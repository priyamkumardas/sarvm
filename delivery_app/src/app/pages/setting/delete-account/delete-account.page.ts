import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  userData: any;
  selectedReason: any;
  otherReason = '';
  deleteReason = [
    { 
      name: "I don’t want to use this app anymore",
      languageKey: "I don’t want to use this app anymore",
    },
    { 
      name: "I am using different account",
      languageKey: "I am using different account",
    },
    { 
      name: "I am worried about my privacy",
      languageKey: "I am worried about my privacy",
    },
    { 
      name: "This app is not working properly",
      languageKey: "This app is not working properly",
    },
    { 
      name: "Other",
      languageKey: "other",
    },
  ]

  constructor(public commonService: CommonService,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.userData = this.commonService.userData;
  }

  deleteReasonChange(event) {
    this.selectedReason = event.detail.value;
  }

  otherReasonChange() {
    console.log(this.otherReason)
  }

  submitDeleteAccount() {
    if(this.selectedReason !== undefined && this.selectedReason !== '' && this.selectedReason !== null) {
      if(this.selectedReason == "Other") {
        if(this.otherReason == undefined || this.otherReason == "" || this.otherReason == null) {
          return false;
        }
      }
      let userId = this.userData?.userId
      this.userService.deleteAccount(userId).subscribe(res => {
        localStorage.clear();
        this.router.navigate(['/login'])
      },err=>{
        console.log(err)
        this.commonService.danger(err.error?.error?.error?.message)
      })
    } else {
      this.commonService.danger("Please Select an Reason");
    }
  }

}
