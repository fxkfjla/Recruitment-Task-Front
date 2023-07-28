import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { MD5 } from 'crypto-js';

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

  private findUsers()
  {
    if(this.searchField)
    {
      this.findByNameOrSurnameOrLogin()
    }
    else
    {
      this.findAllUsers()
    }
  }

  private findAllUsers()
  {
    this.userService.findAll(this.currentPage, this.size, this.sortDirection, this.sortField).subscribe
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
          this.updateVisiblePages();
          this.addMd5Hash()
        }
      },
      error: error =>
      {
        console.log("Error:", error)
      }
    })
  }

  private findByNameOrSurnameOrLogin()
  {
    this.userService.findByNameOrSurnameOrLogin(this.searchField, this.currentPage, this.size, this.sortDirection, this.sortField)
    .subscribe({
      next: response =>
      {
        const headers = response.headers
        this.users = response.body

        if(this.users)
        {
          let totalElements = Number(headers.get('X-Total-Count'))
          // integer division, + 1 to create page for remainder
          this.totalPages = Math.floor(totalElements / this.size) + 1
          this.updateVisiblePages()
          this.addMd5Hash()

          if(this.currentPage >= this.totalPages)
          {
            this.currentPage = 0
            this.findUsers()
          }
        }
      },
      error: error =>
      {
        console.log("Error:", error)
      }
    })
  }

  private updateVisiblePages()
  {
    const halfVisiblePages = Math.floor(this.totalVisiblePages / 2)
    let startPage = Math.max(this.currentPage - halfVisiblePages, 0)
    let endPage = startPage + this.totalVisiblePages - 1

    if (endPage >= this.totalPages)
    {
      endPage = this.totalPages - 1
      startPage = Math.max(endPage - this.totalVisiblePages + 1, 0)
    }

    this.visiblePages = Array.from
    (
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  public onSortOptionChange()
  {
    const [sortField, sortDirection] = this.sortOption.split(':')
    this.sortField = sortField
    this.sortDirection = sortDirection

    this.findUsers()
  }

  public onSearchFieldChange()
  {
    this.findUsers()
  }

  public firstPage()
  {
    this.currentPage = 0
    this.findUsers()
  }

  public nextPage()
  {
    if(this.currentPage < this.totalPages - 1)
    {
      this.currentPage++
      this.findUsers()
    }
  }

  public gotoPage(index: number)
  {
    this.currentPage = index
    this.findUsers()
  }

  public previousPage()
  {
    if(this.currentPage > 0)
    {
      this.currentPage--
      this.findUsers()
    }
  }

  public lastPage()
  {
    this.currentPage = this.totalPages - 1
    this.findUsers()
  }

  private addMd5Hash()
  {
    this.users?.forEach(user =>
    {
      const hash = MD5(user.name).toString()
      user.surname += '_' + hash 
    })
  }

  users: User[] | null = []

  visiblePages: number[] = []
  totalVisiblePages: number = 5

  sortOption: string = ''
  sortField: string = 'id'
  sortDirection: string = 'asc'

  searchField: string = ''

  private totalPages: number = 0
  private currentPage: number = 0
  private size: number = 13
}
