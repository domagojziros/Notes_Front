import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '../models/noteModel';

@Injectable({
  providedIn: 'root',
})


export class NoteService {
  private apiUrl = 'https://localhost:7229/api' ;
  

  constructor(private http: HttpClient) {}

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/notes`, note).pipe(
      catchError(this.handleError)
    );
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/notes/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteNote(id: number): Observable<void> {
    const url = `${this.apiUrl}/notes/${id}`;
    return this.http.delete<void>(url);
  }
  

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/notes/${note.id}`, note).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
