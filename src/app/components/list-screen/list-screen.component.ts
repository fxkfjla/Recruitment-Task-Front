import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.sass']
})
export class ListScreenComponent implements OnInit
{
  constructor(private userService: UserService) {}

  ngOnInit()
  {
    this.findAllUsers() 
  }

  public findAllUsers()
  {
    this.userService.getUsersPage(this.currentPage, this.size).subscribe
    ({
      next: response =>
      {
        const headers = response.headers
        this.users = response.body

        if(this.users)
        {
          let totalElements = Number(headers.get('X-Total-Count'))
          // integer division, + 1 to create page for remainder
          this.totalPages = Math.floor(totalElements / this.size) + 1
        }
      },
      error: error =>
      {
        console.log("Error:", error)
      }
    })
  }

  public nextPage()
  {
    this.currentPage++
    this.findAllUsers()
  }

  public gotoPage(index: number)
  {
    this.currentPage = index
    this.findAllUsers()
  }

  public previousPage()
  {
    this.currentPage--
    this.findAllUsers()
  }

  users: User[] | null = []
  totalPages: number = 0
  private currentPage: number = 0
  private size: number = 13
}
