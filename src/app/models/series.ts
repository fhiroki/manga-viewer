import { Book } from './book'

export class Series {
    title: string;
    author: string;
    publisher: string;
    volumes: number;
    description: string;
    seriesImage: string;
    books: Book[];
    width: number;
    height: number
}
