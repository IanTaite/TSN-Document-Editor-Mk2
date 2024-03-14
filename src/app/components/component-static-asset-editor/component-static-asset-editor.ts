import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PathsEditorComponent } from '../paths-editor/paths-editor';
import { PositionEditorComponent } from '../position-editor/position-editor';
import { VariantsEditorComponent } from '../variants-editor/variants-editor';
import { ImageDefinitionFormStoreService } from '../../services/image-definition-form/image-definition-form-store.service';
import { componentDeleteAction, componentMoveEarlierAction, componentMoveLaterAction } from '../../services/image-definition-form/image-definition-form-store-action-creators';

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
	@Input({ required: true }) layerFormGroup!: FormGroup;
	@Input({ required: true }) componentFormGroup!: FormGroup;
	@Input({ required: true }) canMoveEarlier!: boolean;
	@Input({ required: true }) canMoveLater!: boolean;

	private store = inject(ImageDefinitionFormStoreService);

	get positionFormGroup(): FormGroup {
		return this.componentFormGroup.get('position') as FormGroup;
	}

	onDeleteButton_click() {
		this.store.dispatch(componentDeleteAction(this.layerFormGroup, this.componentFormGroup));
	}

	onMoveEarlierButton_click() {
		this.store.dispatch(componentMoveEarlierAction(this.layerFormGroup, this.componentFormGroup));
	}

	onMoveLaterButton_click() {
		this.store.dispatch(componentMoveLaterAction(this.layerFormGroup, this.componentFormGroup));
	}
}
