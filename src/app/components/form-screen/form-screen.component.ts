import { Component, ElementRef, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.sass']
})
export class FormScreenComponent
{
  @ViewChild('fileInputRef', { static: false }) fileInputRef!: ElementRef;

  constructor(private userService: UserService) {}

  uploadXMLFile(event: any)
  {
    const fileList = event.target.files

    if(fileList.length < 1) return

    const file = fileList[0]

    this.userService.uploadXMLFile(file).subscribe
    ({
      next: (response) =>
      {
        console.log("Response:", response)
      },
      error: (error) =>
      {
        alert("Failed to import data!")
        console.log("Error:", error)
      },
      complete: () =>
      {
        alert("Data imported successfully!")
        this.dataIsLoaded = true
        event.target.value = null
      }
    })
  }

  dataIsLoaded = false
}
