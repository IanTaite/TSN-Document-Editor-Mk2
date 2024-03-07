import { Component, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paths-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './paths-editor.html',
  styleUrl: './paths-editor.scss'
})
export class PathsEditorComponent {
	@Input({ required: true }) pathsFormArray!: FormArray;
}
