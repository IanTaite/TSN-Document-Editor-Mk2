import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-directsmile-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './component-directsmile-editor.html',
  styleUrl: './component-directsmile-editor.scss'
})
export class ComponentDirectsmileEditorComponent {
	@Input({required: true}) componentFormGroup!: FormGroup;
}
