import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Comics } from './models/comics';
import { Series } from './models/series';
import { Book } from './models/book';


@Injectable({ providedIn: 'root' })
export class BookService {
  private mangasUrl = 'https://wfc2-image-api-259809.appspot.com/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getComics (): Observable<Comics[]> {
    return this.http.get<Comics[]>(`${this.mangasUrl}/series`)
      .pipe(
        tap(comics => this.log('fetched series')),
        catchError(this.handleError<Comics[]>('getComics', []))
      );
  }

  // getBooks (id: number): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.mangasUrl)
  //     .pipe(
  //       tap(heroes => this.log('fetched heroes')),
  //       catchError(this.handleError<Book[]>('getBookes', []))
  //     );
  // }

  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  // getBookNo404<Data>(id: number): Observable<Book> {
  //   const url = `${this.mangasUrl}/?id=${id}`;
  //   return this.http.get<Book[]>(url)
  //     .pipe(
  //       map(heroes => heroes[0]), // {0|1} 要素の配列を返す
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<Book>(`getBook id=${id}`))
  //     );
  // }

  getSeries(id: number): Observable<Series> {
    const url = `${this.mangasUrl}/series/${id}`;
    return this.http.get<Series>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Series>(`getSeries seriesId=${id}`))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.mangasUrl}/books/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /* 検索語を含むヒーローを取得する */
  searchBookes(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Book[]>(`${this.mangasUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBookes', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  addBook (hero: Book): Observable<Book> {
    return this.http.post<Book>(this.mangasUrl, hero, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added hero w/ id=${newBook.seriesId}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** BookServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
