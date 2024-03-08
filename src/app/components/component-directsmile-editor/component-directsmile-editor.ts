import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SetsEditorComponent } from '../sets-editor/sets-editor';
import { PositionEditorComponent } from '../position-editor/position-editor';
import { VariantsEditorComponent } from '../variants-editor/variants-editor';
import { DefaultTextEditorComponent } from '../default-text-editor/default-text-editor';
import { TextFormatEditorComponent } from '../text-format-editor/text-format-editor';

@Component({
	selector: 'app-component-directsmile-editor',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		SetsEditorComponent,
		PositionEditorComponent,
		VariantsEditorComponent,
		DefaultTextEditorComponent,
		TextFormatEditorComponent,
	],
	templateUrl: './component-directsmile-editor.html',
	styleUrl: './component-directsmile-editor.scss',
})
export class ComponentDirectsmileEditorComponent {
	@Input({ required: true }) componentFormGroup!: FormGroup;

	get positionFormGroup(): FormGroup {
		return this.componentFormGroup.get('position') as FormGroup;
	}
}
