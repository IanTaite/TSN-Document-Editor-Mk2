import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PathsEditorComponent } from '../paths-editor/paths-editor';
import { PositionEditorComponent } from '../position-editor/position-editor';
import { VariantsEditorComponent } from '../variants-editor/variants-editor';

@Component({
	selector: 'app-component-static-asset-editor',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		PathsEditorComponent,
		PositionEditorComponent,
		VariantsEditorComponent,
	],
	templateUrl: './component-static-asset-editor.html',
	styleUrl: './component-static-asset-editor.scss',
})
export class ComponentStaticAssetEditorComponent {
	@Input({ required: true }) componentFormGroup!: FormGroup;

	get positionFormGroup(): FormGroup {
		return this.componentFormGroup.get('position') as FormGroup;
	}
}
