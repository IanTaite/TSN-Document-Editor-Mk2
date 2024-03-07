import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-default-image-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './default-image-editor.html',
	styleUrl: './default-image-editor.scss',
})
export class DefaultImageEditorComponent implements OnInit {
  @Input({required: true}) defaultImageFormGroup!: AbstractControl;

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}

