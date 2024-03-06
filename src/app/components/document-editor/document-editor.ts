import { Component, Input, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
	FormArray,
	FormGroup,
	FormBuilder,
	ReactiveFormsModule,
	FormControl,
} from '@angular/forms';
import { SAMPLE_DATA } from '../../../../SAMPLE_DATA';
import { VariantKeysEditorComponent } from '../variant-keys-editor/variant-keys-editor';
import { ImageLayerEditorComponent } from '../image-layer-editor/image-layer-editor';
import {
	EComponentType,
	ELayerType,
	IComponentBase,
	IComponentDirectSmile,
	IComponentStaticAsset,
	IDataSet,
	IFilePath,
	IImageDefinition,
	IImageLayer,
	IImageLayerStatic,
	IImageLayerText,
} from '../../image-definitions/interfaces';

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

	masterForm!: FormGroup;

	private fb = inject(FormBuilder);

	ngOnInit(): void {
		this.imageDefinition = SAMPLE_DATA;
		this.masterForm = this.buildFormFromModel(this.imageDefinition);
	}

	get layers(): FormGroup[] {
		return (this.masterForm.get('imageLayers') as FormArray)
			.controls as FormGroup[];
	}

	private buildFormFromModel(model: IImageDefinition) {
		const form = this.fb.group({
			id: [model.id],
			name: this.fb.control<string>(model.name ?? ''),
			clientId: this.fb.control<string>(model.clientId),
			imageSizeTemplateId: this.fb.control<string>(
				model.imageSizeTemplateId ?? '',
			),
			outputImageType: this.fb.control<number>(model.outputImageType),
			integrity: this.fb.control<string>(model.integrity ?? ''),
			variantKeys: this.fb.control<string[]>(model.variantKeys),
			imageLayers: this.fb.array([]),
		});

		const layerFormGroups = model.imageLayers
			.sort((a, b) => a.layerPosition - b.layerPosition)
			.map((modelLayer: IImageLayer, modelLayerIndex: number) => {
				if (modelLayer.layerType === ELayerType.Static) {
					const layerFormGroup = this.convertStaticLayerToFormGroup(
						modelLayer as IImageLayerStatic,
					);
					return layerFormGroup;
				}
				if (modelLayer.layerType === ELayerType.Text) {
					const layerFormGroup = this.convertTextLayerToFormGroup(
						modelLayer as IImageLayerText,
					);
					return layerFormGroup;
				}
				return null;
			})
			.filter((x) => x !== null);

		const layers = form.get('imageLayers') as FormArray;

		layerFormGroups.forEach((fg) => {
			layers.push(fg);
		});

		return form;
	}

	private convertStaticLayerToFormGroup(input: IImageLayerStatic): FormGroup {
		const layerGroup = this.fb.group({
			layerType: this.fb.control<number>(input.layerType),
			layerPosition: this.fb.control<number>(input.layerPosition),
			components: this.fb.array(
				this.convertImageLayerComponentArrayToFormGroupArray(input.components),
			),
			dataSet: this.fb.control<IDataSet | null>(input.dataSet),
			defaultImage: this.fb.control(null),
			useVariantKeys: this.fb.control<boolean>(input.useVariantKeys),
		});
		return layerGroup;
	}

	private convertTextLayerToFormGroup(input: IImageLayerText): FormGroup {
		let forTheLoveOfGod: any;

		if (input.defaultImage === null || input.defaultImage.files === null) {
			forTheLoveOfGod = this.fb.control(null);
		} else {
			forTheLoveOfGod = this.fb.group({
				files: this.fb.array(
					input.defaultImage.files.map((f) =>
						this.fb.group({
							name: this.fb.control<string | null>(f.name),
							path: this.fb.control<string | null>(f.path),
						}),
					),
				),
			});
		}

		const layerGroup = this.fb.group({
			layerType: this.fb.control<number>(input.layerType),
			layerPosition: this.fb.control<number>(input.layerPosition),
			components: this.fb.array(
				this.convertImageLayerComponentArrayToFormGroupArray(input.components),
			),
			dataSet: this.fb.control<IDataSet | null>(input.dataSet),
			defaultImage: forTheLoveOfGod,
			useVariantKeys: this.fb.control<boolean>(input.useVariantKeys),
		});
		return layerGroup;
	}

	private convertImageLayerComponentArrayToFormGroupArray(
		input: IComponentBase[],
	): FormGroup[] {
		const result: FormGroup[] = [];
		input.forEach((component: IComponentBase) => {
			let fg: FormGroup | null = null;
			if (component.componentType === EComponentType.StaticAsset) {
				fg = this.convertStaticAssetComponentToFormGroup(
					component as IComponentStaticAsset,
				);
			} else if (component.componentType === EComponentType.Directsmile) {
				fg = this.convertDirectSmileComponentToFormGroup(
					component as IComponentDirectSmile,
				);
			}
			if (fg !== null) {
				result.push(fg);
			}
		});
		return result;
	}

	private convertStaticAssetComponentToFormGroup(
		source: IComponentStaticAsset,
	): FormGroup {
		return this.fb.group({
			paths: this.fb.array(
				source.paths?.map((path) =>
					this.fb.group({
						name: this.fb.control<string>(path.name ?? ''),
						path: this.fb.control<string>(path.name ?? ''),
					}),
				) ?? [],
			),
			componentType: this.fb.control<number>(source.componentType),
			position: this.fb.group({
				x: this.fb.control<number>(source.position.x),
				y: this.fb.control<number>(source.position.y),
				width: this.fb.control<number>(source.position.width),
				height: this.fb.control<number>(source.position.height),
			}),
			variants: this.fb.control<string[]>(source.variants ?? []),
		});
	}

	private convertDirectSmileComponentToFormGroup(
		source: IComponentDirectSmile,
	): FormGroup {
		return this.fb.group({
			defaultText: this.fb.control<string>(source.defaultText ?? ''),
			textFormat: this.fb.control<string>(source.textFormat ?? ''),
			sets: this.fb.array(
				source.sets?.map((set) =>
					this.fb.group({
						setAccount: this.fb.control<string>(set.setAccount ?? ''),
						setName: this.fb.control<string>(set.setName ?? ''),
					}),
				) ?? [],
			),
			componentType: this.fb.control<number>(source.componentType),
			position: this.fb.group({
				x: this.fb.control<number>(source.position.x),
				y: this.fb.control<number>(source.position.y),
				width: this.fb.control<number>(source.position.width),
				height: this.fb.control<number>(source.position.height),
			}),
			variants: this.fb.control<string[]>(source.variants ?? []),
		});
	}
}