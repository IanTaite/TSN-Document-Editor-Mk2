import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EComponentType, IComponentBase, IComponentStaticAsset } from '../../image-definitions/interfaces';
import { ComponentStaticAssetEditorComponent } from '../component-static-asset-editor/component-static-asset-editor';

@Component({
	selector: 'app-image-layer-static-editor',
	standalone: true,
	imports: [ReactiveFormsModule, ComponentStaticAssetEditorComponent],
	templateUrl: './image-layer-static-editor.html',
	styleUrl: './image-layer-static-editor.scss',
})
export class ImageLayerStaticEditorComponent {
	@Input({ required: true }) layerFormGroup!: FormGroup;

	get components(): FormGroup[] {
		const result = (this.layerFormGroup.get('components') as FormArray).controls as FormGroup[];
		return result;
	}

	componentIsStatic(component: FormGroup): boolean {
		return component.get('componentType')?.value === EComponentType.StaticAsset;
	}
}
