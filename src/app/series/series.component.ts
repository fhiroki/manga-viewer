import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Series } from '../models/series';
import { BookService } from '../book.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  series: Series;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) { }

  ngOnInit() {
    this.getSeries();
  }

  getSeries(): void {
    const id = this.route.snapshot.params['seriesId'];
    this.bookService.getSeries(id)
      .subscribe((series: any) => {
        this.series = series;
      });
  }
}
