import { Injectable, inject } from '@angular/core';
import {
	EComponentType,
	ELayerType,
	IComponentBase,
	IComponentDirectSmile,
	IComponentStaticAsset,
	IDataSet,
	IDefaultImage,
	IFilePath,
	IImageDefinition,
	IImageLayer,
	IImageLayerStatic,
	IImageLayerText,
	ISet,
} from '../../image-definitions/interfaces';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ImageDefinitionFormBuilderService {
	fb = inject(FormBuilder);

	public createForm(model: IImageDefinition): FormGroup {
		const form = this.fb.group({
			id: [model.id],
			name: this.fb.control<string>(model.name ?? ''),
			clientId: this.fb.control<string>(model.clientId),
			imageSizeTemplateId: this.fb.control<string>(
				model.imageSizeTemplateId ?? '',
			),
			outputImageType: this.fb.control<number>(model.outputImageType),
			integrity: this.fb.control<string>(model.integrity ?? ''),
			variantKeys: this.fb.control<string[]>([...model.variantKeys]),
			imageLayers: this.fb.array([]),
		});

		const layerFormGroups = model.imageLayers
			.sort((a, b) => a.layerPosition - b.layerPosition)
			.map((modelLayer: IImageLayer) => {
				if (modelLayer.layerType === ELayerType.Static) {
					const layerFormGroup = this.createStaticLayerFormGroup(
						modelLayer as IImageLayerStatic,
					);
					return layerFormGroup;
				}
				if (modelLayer.layerType === ELayerType.Text) {
					const layerFormGroup = this.createTextLayerFormGroup(
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

	public createStaticLayerFormGroup(source?: Partial<IImageLayerStatic>): FormGroup {
		const defaultData: IImageLayerStatic = {
			layerType: ELayerType.Static,
      layerPosition: 0,
      components: [],
      dataSet: null,
      defaultImage: null,
      useVariantKeys: false,
		};
		const data: IImageLayerStatic = Object.assign({}, defaultData, source);
		const layerGroup = this.fb.group({
			layerType: this.fb.control<number>(data.layerType),
			layerPosition: this.fb.control<number>(data.layerPosition),
			components: this.fb.array(
				this.convertImageLayerComponentArrayToFormGroupArray(data.components),
			),
			dataSet: this.fb.control<IDataSet | null>(data.dataSet),
			defaultImage: this.fb.control<IDefaultImage | null>(data.defaultImage),
			useVariantKeys: this.fb.control<boolean>(data.useVariantKeys),
		});
		return layerGroup;
	}

	public createTextLayerFormGroup(source?: Partial<IImageLayerText>): FormGroup {
		const defaultData: IImageLayerText = {
			layerType: ELayerType.Text,
			layerPosition: 0,
			components: [],
			dataSet: null,
			defaultImage: null,
			useVariantKeys: false
		};
		const data: IImageLayerText = Object.assign({}, defaultData, source);
		const layerGroup = this.fb.group({
			layerType: this.fb.control<number>(data.layerType),
			layerPosition: this.fb.control<number>(data.layerPosition),
			components: this.fb.array(
				this.convertImageLayerComponentArrayToFormGroupArray(data.components),
			),
			dataSet: this.fb.control<IDataSet | null>(data.dataSet),
			defaultImage: this.fb.control<IDefaultImage | null>(data.defaultImage),
			useVariantKeys: this.fb.control<boolean>(data.useVariantKeys),
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
				fg = this.createStaticAssetComponentFormGroup(
					component as IComponentStaticAsset,
				);
			} else if (component.componentType === EComponentType.Directsmile) {
				fg = this.createDirectSmileComponentFormGroup(
					component as IComponentDirectSmile,
				);
			}
			if (fg !== null) {
				result.push(fg);
			}
		});
		return result;
	}

	public createStaticAssetComponentFormGroup(source?: Partial<IComponentStaticAsset>): FormGroup {
		const defaultData: IComponentStaticAsset = {
			paths: [],
			componentType: EComponentType.StaticAsset,
			position: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			},
			variants: []
		};
		const data: IComponentStaticAsset = Object.assign({}, defaultData, source);
		return this.fb.group({
			paths: this.fb.control<IFilePath[]>(data.paths ?? []),
			componentType: this.fb.control<number>(data.componentType),
			position: this.fb.group({
				x: this.fb.control<number>(data.position.x),
				y: this.fb.control<number>(data.position.y),
				width: this.fb.control<number>(data.position.width),
				height: this.fb.control<number>(data.position.height),
			}),
			variants: this.fb.control<string[]>(
				data.variants ? [...data.variants] : [],
			),
		});
	}

	public createDirectSmileComponentFormGroup(
		source?: Partial<IComponentDirectSmile>,
	): FormGroup {
		const defaultData: IComponentDirectSmile = {
			defaultText: '',
			textFormat: '',
			sets: [],
			componentType: EComponentType.Directsmile,
			position: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			},
			variants: [],
		};
		const data: IComponentDirectSmile = Object.assign({}, defaultData, source);
		return this.fb.group({
			defaultText: this.fb.control<string>(data.defaultText ?? ''),
			textFormat: this.fb.control<string>(data.textFormat ?? ''),
			sets: this.fb.control<ISet[]>(data.sets ?? []),
			componentType: this.fb.control<number>(data.componentType),
			position: this.fb.group({
				x: this.fb.control<number>(data.position.x),
				y: this.fb.control<number>(data.position.y),
				width: this.fb.control<number>(data.position.width),
				height: this.fb.control<number>(data.position.height),
			}),
			variants: this.fb.control<string[]>(
				data.variants ? [...data.variants] : [],
			),
		});
	}
}
