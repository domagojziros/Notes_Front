import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NoteService } from './services/noteService';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DividerModule } from 'primeng/divider';
import { AddEditNoteComponent } from './add-edit-note/add-edit-note.component';
import { PinnedNotesComponent } from './pinned-notes/pinned-notes.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button'

@NgModule({
  declarations: [
    AppComponent,
    AddEditNoteComponent,
    PinnedNotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DividerModule,
    DataViewModule,
    ButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
