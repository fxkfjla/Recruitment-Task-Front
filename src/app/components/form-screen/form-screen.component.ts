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

  public uploadXMLFile(event: Event): void
  {
    event.preventDefault()

    const fileInput = this.fileInputRef.nativeElement as HTMLInputElement
    const file = fileInput?.files?.[0]

    if(file)
    {
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
          fileInput.value = ''
          this.dataIsLoaded = true
        }
      })
    }
  }

  dataIsLoaded = false
}
