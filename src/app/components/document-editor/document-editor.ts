import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
	FormArray,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { SAMPLE_DATA } from '../../../../SAMPLE_DATA';
import { VariantKeysEditorComponent } from '../variant-keys-editor/variant-keys-editor';
import { ImageLayerEditorComponent } from '../image-layer-editor/image-layer-editor';
import { ELayerType, IImageDefinition } from '../../image-definitions/interfaces';
import { Subscription, filter } from 'rxjs';
import { ImageDefinitionFormBuilderService } from '../../services/image-definition-form/image-definition-form-builder.service';
import { ImageDefinitionFormStoreService } from '../../services/image-definition-form/image-definition-form-store.service';
import { layerAddNewAction } from '../../services/image-definition-form/image-definition-form-store-action-creators';

// type FiltersFormType = { [K in keyof Omit<InvoiceFilters, 'raisedDate' | 'dueDate' | 'toString'>]: AbstractControl<InvoiceFilters[K]>; };

@Component({
	selector: 'app-document-editor',
	standalone: true,
	imports: [
		JsonPipe,
		ReactiveFormsModule,
		VariantKeysEditorComponent,
		ImageLayerEditorComponent,
	],
	templateUrl: './document-editor.html',
	styleUrl: './document-editor.scss',
})
export class DocumentEditorComponent implements OnInit {
	@Input({ required: true }) imageDefinition!: IImageDefinition;
	@Output() documentChanged = new EventEmitter<IImageDefinition|null>();

	private masterFormSubscription!: Subscription;
	private formStoreSubscription!: Subscription;
	private formBuilder = inject(ImageDefinitionFormBuilderService);
	private formStore = inject(ImageDefinitionFormStoreService);
	masterForm!: FormGroup;

	ngOnInit(): void {
		this.masterFormSubscription = this.formStore.select(s => s.form)
			.pipe(filter(s => s !== null))
			.subscribe((masterForm) => {
				this.masterForm = masterForm;
				this.masterFormSubscription = this.masterForm.valueChanges.subscribe(
					(value) => {
						this.documentChanged.emit(value);
					},
				);
				this.documentChanged.emit(this.masterForm.value);
			});
		this.formStore.initialize(this.imageDefinition);
	}

	ngOnDestroy(): void {
		if (this.formStoreSubscription) {
			this.formStoreSubscription.unsubscribe();
		}
		if (this.masterFormSubscription) {
			this.masterFormSubscription.unsubscribe();
		}
	}

	get layers(): FormGroup[] {
		if (!this.masterForm) return [];
		return (this.masterForm.get('imageLayers') as FormArray).controls as FormGroup[];
	}

	onNewStaticLayer_click() {
		this.formStore.dispatch(layerAddNewAction(ELayerType.Static));
	}

	onNewTextLayer_click() {
		this.formStore.dispatch(layerAddNewAction(ELayerType.Text));
	}
}
