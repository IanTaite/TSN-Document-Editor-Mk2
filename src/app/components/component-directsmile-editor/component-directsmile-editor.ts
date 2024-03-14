import { Component, Input, inject } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SetsEditorComponent } from '../sets-editor/sets-editor';
import { PositionEditorComponent } from '../position-editor/position-editor';
import { VariantsEditorComponent } from '../variants-editor/variants-editor';
import { DefaultTextEditorComponent } from '../default-text-editor/default-text-editor';
import { TextFormatEditorComponent } from '../text-format-editor/text-format-editor';
import { ImageDefinitionFormStoreService } from '../../services/image-definition-form/image-definition-form-store.service';
import {
	componentDeleteAction,
	componentMoveEarlierAction,
	componentMoveLaterAction,
} from '../../services/image-definition-form/image-definition-form-store-action-creators';

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
	@Input({ required: true }) layerFormGroup!: FormGroup;
	@Input({ required: true }) componentFormGroup!: FormGroup;
	@Input({ required: true }) canMoveEarlier!: boolean;
	@Input({ required: true }) canMoveLater!: boolean;

	private store = inject(ImageDefinitionFormStoreService);

	get positionFormGroup(): FormGroup {
		return this.componentFormGroup.get('position') as FormGroup;
	}

	onDeleteButton_click() {
		this.store.dispatch(
			componentDeleteAction(this.layerFormGroup, this.componentFormGroup),
		);
	}

	onMoveEarlierButton_click() {
		this.store.dispatch(
			componentMoveEarlierAction(this.layerFormGroup, this.componentFormGroup),
		);
	}

	onMoveLaterButton_click() {
		this.store.dispatch(
			componentMoveLaterAction(this.layerFormGroup, this.componentFormGroup),
		);
	}
}
