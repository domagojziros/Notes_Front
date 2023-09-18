import { Component, OnInit } from '@angular/core';
import { NoteService } from './services/noteService';
import { Note } from './models/noteModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NotesFront';
  notes: Note[] = [];
  pinnedNotes: Note[] = [];
  editingNote: Note | null = null;
  newNote: Note = { title: '', content: '', createdAt: new Date().toISOString() };
  isCreatingNote = false;
  searchQuery: string = '';
  filteredNotes: Note[];

  constructor(
    private noteService: NoteService,
    ) {
      this.filteredNotes = [];
    }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe(
      (notes: Note[]) => {
        this.notes = notes;
        this.pinnedNotes = []; 
      },
      error => {
        console.error('Error loading notes:', error);
      }
    );
  }

  onSearch() {
    if (this.searchQuery) {
     
      const searchTerm = this.searchQuery.toLowerCase();
  
      
      this.filteredNotes = this.notes.filter(note => {
        const title = note.title.toLowerCase();
        const content = note.content ? note.content.toLowerCase() : '';  
  
       
        return title.includes(searchTerm) || content.includes(searchTerm);
      });
    } else {
      
      this.filteredNotes = this.notes;
    }
  }
  
  

  addNote() {
    this.isCreatingNote = true;
    this.newNote = { title: '', content: '', createdAt: new Date().toISOString() };
  }

  cancelNote() {
    this.isCreatingNote = false;
  }
  

  onPin(note: Note) {
    console.log('Toggling pin for note:', note);
  
    if (this.pinnedNotes.includes(note)) {
      console.log('Unpinning note:', note);

      this.notes = [...this.notes, note];
  
      this.pinnedNotes = this.pinnedNotes.filter(n => n !== note);
    } else {

      console.log('Pinning note:', note);
  
    
      this.pinnedNotes = [...this.pinnedNotes, note];
  

      this.notes = this.notes.filter(n => n !== note);
    }
  
    console.log('Pinned notes:', this.pinnedNotes);
    console.log('Notes:', this.notes);
  }
  

  
  
  
  onEdit(note: Note) {
    console.log('Editing note:', note);
    this.editingNote = { ...note }; 
  }
  
  saveNote() {
    this.noteService.createNote(this.newNote).subscribe(
      (createdNote: Note) => {
        if (this.pinnedNotes.includes(this.newNote)) {
          this.pinnedNotes.push(createdNote); 
        } else {
          this.notes.push(createdNote); 
        }
  
        this.newNote = { title: '', content: '', createdAt: new Date().toISOString() };
        this.isCreatingNote = false;
      },
      error => {
        console.error('Error adding note:', error);
      }
    );
  }

  saveEditNote() {
    if (this.editingNote) {
      console.log('Saving note:', this.editingNote);
      const index = this.editingNote && this.notes.findIndex(note => note.id === this.editingNote!.id);
      if (index !== undefined && index !== -1) {
        // Create a new array with the updated note
        this.notes = [
          ...this.notes.slice(0, index),
          { ...this.notes[index], ...this.editingNote! },
          ...this.notes.slice(index + 1)
        ];
      }
  
      this.editingNote = null;
    }
  }
  
  
  onDelete(note: Note) {
    const confirmed = confirm('Are you sure you want to delete this note?');
  
    if (confirmed) {
      console.log('Deleting note...');
  
      if (note.id !== undefined) {
        this.noteService.deleteNote(note.id).subscribe(
          () => {
            console.log('Note deleted successfully.');
            this.notes = this.notes.filter(n => n !== note);
            this.pinnedNotes = this.pinnedNotes.filter(n => n !== note);
          },
          error => {
            console.error('Error deleting note:', error);
          }
        );
      } else {
        console.error('Cannot delete note. Invalid note ID.');
      }
    } else {
      console.log('Deletion cancelled.');
    }
  }
  
}
