import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-image-layer-text-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './image-layer-text-editor.html',
	styleUrl: './image-layer-text-editor.scss',
})
export class ImageLayerTextEditorComponent {
	@Input({ required: true }) layerFormGroup!: FormGroup;
}
