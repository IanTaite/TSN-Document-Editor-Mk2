import { Component, Input } from '@angular/core';
import {
	FormArray,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import {
	EComponentType,
	IComponentBase,
	IComponentDirectSmile,
} from '../../image-definitions/interfaces';
import { ComponentDirectsmileEditorComponent } from '../component-directsmile-editor/component-directsmile-editor';
import { DatasetEditorComponent } from '../dataset-editor/dataset-editor';
import { DefaultImageEditorComponent } from '../default-image-editor/default-image-editor';

@Component({
	selector: 'app-image-layer-text-editor',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		ComponentDirectsmileEditorComponent,
		DatasetEditorComponent,
		DefaultImageEditorComponent,
	],
	templateUrl: './image-layer-text-editor.html',
	styleUrl: './image-layer-text-editor.scss',
})
export class ImageLayerTextEditorComponent {
	@Input({ required: true }) layerFormGroup!: FormGroup;
	@Input({ required: true }) canMoveEarlier!: boolean;
	@Input({ required: true }) canMoveLater!: boolean;

	get components(): FormGroup[] {
		const result = (this.layerFormGroup.get('components') as FormArray)
			.controls as FormGroup[];
		return result;
	}

	get dataset(): FormControl {
		return this.layerFormGroup.get('dataset') as FormControl;
	}

	get defaultImage(): FormControl {
		return this.layerFormGroup.get('defaultImage') as FormControl;
	}

	componentIsDirectsmile(component: FormGroup): boolean {
		return component.get('componentType')?.value === EComponentType.Directsmile;
	}
}
