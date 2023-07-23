import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiPaths } from '../enums/api-paths.enum';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  constructor(private http: HttpClient) {}

  public uploadXMLFile(file: File)
  {
    let formParams = new FormData();
    formParams.append('file', file)

    return this.http.post(this.url + '/load-xml', formParams, {responseType: 'text'})
  }

  public getUsersPage(page: number, size: number)
  {
    let params = {page, size}

    return this.http.get<User[]>(this.url, {params})    
  }

  private url = environment.apiUrl + '/' + ApiPaths.Users; 
}
