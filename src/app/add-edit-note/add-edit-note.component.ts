// add-edit-note.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css']
})
export class AddEditNoteComponent {
  note: { title: string, content: string } = { title: '', content: '' };
  notes: { title: string, content: string }[] = [];

  onSubmit() {
    // Push the current note into the notes array
    this.notes.push({ ...this.note });
    // Clear the form
    this.note.title = '';
    this.note.content = '';
  }
}
