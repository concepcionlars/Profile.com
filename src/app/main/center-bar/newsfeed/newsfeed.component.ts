import { Component, OnInit } from '@angular/core';

import { NewsfeedService } from './newsfeed.service';
import { newsfeedJSON } from 'src/app/newsfeedData';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})

export class NewsfeedComponent implements OnInit {

  username = 'Lars O. Concepcion';
  usercourse = 'BSIT / Web Developer / Python Programmer'

  constructor(public newsfeedService: NewsfeedService) { }

  getJSON(): void {
    this.newsfeedService.getData()
     .subscribe(newsfeed => this.newsfeed = newsfeed)
  }

  getData(): void {
    this.newsfeedService.getData()
      .subscribe(newsfeed => console.log(newsfeed))
  }

  ngOnInit() {
    this.getJSON();
    this.getData();
  }

  newsfeed: newsfeedJSON[];

}
