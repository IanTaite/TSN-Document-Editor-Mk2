import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-position-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './position-editor.html',
  styleUrl: './position-editor.scss'
})
export class PositionEditorComponent {
  @Input() positionFormGroup!: FormGroup;
}
