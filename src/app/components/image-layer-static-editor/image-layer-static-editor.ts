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
	IComponentStaticAsset,
} from '../../image-definitions/interfaces';
import { ComponentStaticAssetEditorComponent } from '../component-static-asset-editor/component-static-asset-editor';
import { DatasetEditorComponent } from '../dataset-editor/dataset-editor';
import { DefaultImageEditorComponent } from '../default-image-editor/default-image-editor';

@Component({
	selector: 'app-image-layer-static-editor',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		ComponentStaticAssetEditorComponent,
		DatasetEditorComponent,
		DefaultImageEditorComponent,
	],
	templateUrl: './image-layer-static-editor.html',
	styleUrl: './image-layer-static-editor.scss',
})
export class ImageLayerStaticEditorComponent {
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

	componentIsStatic(component: FormGroup): boolean {
		return component.get('componentType')?.value === EComponentType.StaticAsset;
	}
}
