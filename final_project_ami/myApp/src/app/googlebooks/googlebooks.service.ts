import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../domain/book';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GooglebooksService {

  constructor(private http: HttpClient) {

  }

  getBookInfo(bookId: string): Observable<Book> {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    return this.http.get<any>(url).pipe(
      map(data => {
        let author = data.volumeInfo?.authors?.[0] ?? '';
        if (!author || author.trim() === '') {
          author = 'Unknown author';
        }
        let title = data.volumeInfo?.title ?? '';
        
        if (!title || title.trim() === '') {
          title = 'Unknown title';
        }
        let genre = data.volumeInfo?.categories?.[0] ?? '';
        let numPag = data.volumeInfo?.pageCount ?? 0;
        let desc = data.volumeInfo?.description ?? '';
        if (!desc || desc.trim() === '') {
          desc = 'Empty Description';
        }

        let refFoto = "";
        if ('imageLinks' in data.volumeInfo) {
          if ('thumbnail' in data.volumeInfo.imageLinks) {
            refFoto = data.volumeInfo.imageLinks.thumbnail;

          }
          else {
            refFoto = "default";
          }
        }

        return new Book(bookId, title, author, genre, 0, numPag, desc, refFoto);
      })
    );
  }

  getBooksByName(bookName: string, maxResultsNumb): Observable<Book[]> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=3`;

    return this.http.get<any>(url).pipe(
      map(data => {
        const books: Book[] = [];

        if ('items' in data) {
          for (const item of data.items) {
            let bookId = item.id;
            let title = item.volumeInfo?.title ?? '';
            if (!title || title.trim() === '') {
              title = 'Unknown title';
            }
            
            let author = item.volumeInfo?.authors?.[0] ?? '';

            if (!author || author.trim() === '') {
              author = 'Unknown author';
            }
            let genre = item.volumeInfo?.categories?.[0] ?? '';
            let numPag = item.volumeInfo?.pageCount ?? 0;
            let desc = item.volumeInfo?.description ?? '';
            if (!desc || desc.trim() === '') {
              desc = 'Empty Description';
            }

            let refFoto = '';

            if ('imageLinks' in item.volumeInfo) {
              if ('thumbnail' in item.volumeInfo.imageLinks) {
                refFoto = item.volumeInfo.imageLinks.thumbnail;
              } else {
                refFoto = 'default';
              }
            }

            const book = new Book(bookId, title, author, genre, 0, numPag, desc, refFoto);
            books.push(book);
          }
        }

        return books;
      })
    );
  }

  getBooksInfo(bookIds: string[]): Observable<Book[]> {
    // Create an array of observables for each bookId
    const observables = bookIds.map(bookId => {
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      return this.http.get<any>(url).pipe(
        map(data => {
          let author = data.volumeInfo?.authors?.[0];
          if (!author || author.trim() === '') {
            author = 'Unknown author';
          }
          let title = data.volumeInfo?.title ?? '';
          if (!title || title.trim() === '') {
            title = 'Unknown title';
          }
          
          let genre = data.volumeInfo?.categories?.[0] ?? '';
          let numPag = data.volumeInfo?.pageCount ?? 0;
          let desc = data.volumeInfo?.description ?? '';
          if (!desc || desc.trim() === '') {
            desc = 'Empty Description';
          }
          let refFoto = '';
          if ('imageLinks' in data.volumeInfo) {
            if ('thumbnail' in data.volumeInfo.imageLinks) {
              refFoto = data.volumeInfo.imageLinks.thumbnail;
            } else {
              refFoto = 'default';
            }
          }

          return new Book(
            bookId,
            title,
            author,
            genre,
            0,
            numPag,
            desc,
            refFoto
          );
        })
      );
    });

    // Use forkJoin to combine all observables into a single observable
    return forkJoin(observables);
  }




}
