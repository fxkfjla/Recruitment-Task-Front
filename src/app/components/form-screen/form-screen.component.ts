import { Component, ElementRef, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.sass']
})
export class FormScreenComponent
{
  @ViewChild('fileInputRef', { static: false }) fileInputRef!: ElementRef;

  constructor(private userService: UserService, private toastr: ToastrService) {}

  uploadXMLFile(event: any)
  {
    const fileList = event.target.files

    if(fileList.length < 1) return

    const file = fileList[0]

    this.toastr.info('Importing data!', 'Please wait!', { positionClass: 'toast-top-center' });
    this.userService.uploadXMLFile(file).subscribe
    ({
      next: (response) =>
      {
        console.log("Response:", response)
      },
      error: (error) =>
      {
        this.toastr.error('Failed to import data!', 'Failure!', { positionClass: 'toast-top-center' });
        console.log("Error:", error)
      },
      complete: () =>
      {
        this.toastr.success('Data imported successfully!', 'Success!', { positionClass: 'toast-top-center' });
        this.dataIsLoaded = true
        event.target.value = null
      }
    })
  }

  dataIsLoaded = false
}
