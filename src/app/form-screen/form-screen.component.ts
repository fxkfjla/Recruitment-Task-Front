import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiPaths } from '../shared/api-paths.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.sass']
})
export class FormScreenComponent
{
  @ViewChild('fileInputRef', { static: false }) fileInputRef!: ElementRef;

  constructor(private http: HttpClient) {}

  public loadXMLFile(event: Event): void
  {
    event.preventDefault()

    const fileInput = this.fileInputRef.nativeElement as HTMLInputElement
    const file = fileInput?.files?.[0]

    if(file)
    {
      let formParams = new FormData();
      formParams.append('file', file)

      this.http.post(this.url + '/load-xml', formParams, {responseType: 'text'}).subscribe
      ({
        next: (response) =>
        {
          console.log("Response:", response)
        },
        error: (error) =>
        {
          console.error("Error:", error)
        },
        complete: () => {
          fileInput.value = '';
        }
      })
    }
  }

  private url = environment.apiUrl + '/' + ApiPaths.Users; 
}
