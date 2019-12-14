import { BookService } from '../book.service';
import { Component, OnInit } from '@angular/core';
import { ImageViewerConfig } from '../image-viewer/image-viewer-config.model';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  title = 'manga-viewer';
  book: Book;
  images = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  imageIndex = 1;
  config: ImageViewerConfig = {customBtns: [{name: 'print', icon: 'fa fa-print'}, {name: 'link', icon: 'fa fa-link'}]};

  ngOnInit() {
    this.getBook()
  }

  getBook(): void {
    const id = this.route.snapshot.params['id'];
    this.bookService.getBook(id)
      .subscribe((data: any) => {
        console.log(data);
        this.book = data;

        data.imageData.forEach((image) => {
          this.images.push(image.imageUrl);
        });
      });
  }

}
