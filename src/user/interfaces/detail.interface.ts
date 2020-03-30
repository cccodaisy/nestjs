import { Document } from 'mongoose';

export interface Detail extends Document {
    readonly name: string;
    readonly age: number;
    readonly description: string;
    readonly date: string;
}