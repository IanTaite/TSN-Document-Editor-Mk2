import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EComponentType, IComponentBase } from '../../image-definitions/interfaces';
import { ComponentDirectsmileEditorComponent } from '../component-directsmile-editor/component-directsmile-editor';

@Component({
	selector: 'app-image-layer-text-editor',
	standalone: true,
	imports: [ReactiveFormsModule, ComponentDirectsmileEditorComponent],
	templateUrl: './image-layer-text-editor.html',
	styleUrl: './image-layer-text-editor.scss',
})
export class ImageLayerTextEditorComponent {
	@Input({ required: true }) layerFormGroup!: FormGroup;

	get components(): FormGroup[] {
		const result = (this.layerFormGroup.get('components') as FormArray).controls as FormGroup[];
		return result;
	}

	componentIsDirectsmile(component: FormGroup): boolean {
		return component.get('componentType')?.value === EComponentType.Directsmile;
	}
}
