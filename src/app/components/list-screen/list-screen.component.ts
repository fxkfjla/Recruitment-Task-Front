import { Component, OnInit } from '@angular/core';
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
    this.userService.getUsersPage(0, 13).subscribe
    ({
      next: data =>
      {
        this.users = data
      },
      error: error =>
      {
        console.log("Error:", error)
      }
    })
  }
  users: User[] = []
}
