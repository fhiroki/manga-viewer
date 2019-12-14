import { Image } from './image'

export class Book {
    title: string;
    id: string;
    image: string;
    seriesId: string;
    pageNum: number;
    imageData: Image[];
    width: number;
    height: number
}
