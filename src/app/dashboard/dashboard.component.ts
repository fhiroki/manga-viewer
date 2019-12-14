import { BookService } from '../book.service';
import { Component, OnInit } from '@angular/core';
import { Comics } from '../models/comics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  comics: Comics[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getComics();
  }

  getComics(): void {
    this.bookService.getComics()
      .subscribe((comics: any) => {
        this.comics = comics.data;
      });
  }
}
