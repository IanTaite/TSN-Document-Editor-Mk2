import { Injectable, inject } from '@angular/core';
import { EComponentType, ELayerType, IComponentBase, IComponentDirectSmile, IComponentStaticAsset, IImageDefinition, IImageLayer, IImageLayerStatic, IImageLayerText } from '../../image-definitions/interfaces';
import { FormArray, FormGroup } from '@angular/forms';
import { STORE_TYPE } from './image-definition-form-store-types';
import { ImageDefinitionFormBuilderService } from './image-definition-form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ImageDefinitionFormReducerService {
	private readonly masterFormBuilder = inject(ImageDefinitionFormBuilderService);

	private readonly actionMap: Record<string, (state: STORE_TYPE, action: { type: string, payload: any }) => STORE_TYPE> = {
		ComponentAddNew: this.handleComponentAddNewAction.bind(this),
		ComponentDelete: this.handleComponentDeleteAction.bind(this),
		ComponentMoveEarlier: this.handleComponentMoveEarlierAction.bind(this),
		ComponentMoveLater: this.handleComponentMoveLaterAction.bind(this),
		LayerAddNew: this.handleLayerAddNewAction.bind(this),
		LayerDelete: this.handleLayerDeleteAction.bind(this),
		LayerMoveEarlier: this.handleLayerMoveEarlierAction.bind(this),
		LayerMoveLater: this.handleLayerMoveLaterAction.bind(this)
	};

	reduce(state: STORE_TYPE, action: { type: string, payload: any }): STORE_TYPE {
		const handler = this.actionMap[action.type];
		if (handler) {
			return handler(state, action);
		} else {
			return state;
		}
	}

	private handleComponentAddNewAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer, componentType } = action.payload;
		if (layer && componentType) {
			if (componentType === EComponentType.StaticAsset) {
				let component = this.masterFormBuilder.createStaticAssetComponentFormGroup();
				const layerComponents = layer.get('components') as FormArray;
				layerComponents.push(component);
			}
			if (componentType === EComponentType.Directsmile) {
				let component = this.masterFormBuilder.createDirectSmileComponentFormGroup();
				const layerComponents = layer.get('components') as FormArray;
				layerComponents.push(component);
			}
		}
		return state;
	}

	private handleComponentDeleteAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer, component } = action.payload;
		if (layer && component) {
			const layerComponents = layer.get('components') as FormArray;
			const index = layerComponents.controls.indexOf(component);
			layerComponents.removeAt(index);
		}
		return state;
	}

	private handleComponentMoveEarlierAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer, component } = action.payload;
		if (layer && component) {
			const layerComponents = layer.get('components') as FormArray;
			const index = layerComponents.controls.indexOf(component);
			layerComponents.removeAt(index);
			layerComponents.insert(index - 1, component);
		}
		return state;
	}

	private handleComponentMoveLaterAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer, component } = action.payload;
    if (layer && component) {
      const layerComponents = layer.get('components') as FormArray;
      const index = layerComponents.controls.indexOf(component);
      layerComponents.removeAt(index);
      layerComponents.insert(index + 1, component);
    }
    return state;
	}

	private handleLayerAddNewAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layerType } = action.payload;
		if (layerType) {
			if (layerType === ELayerType.Static) {
				const documentLayers = state.form.get('imageLayers') as FormArray;
				const highestLayerPosition = documentLayers.controls.reduce((max, layer) => {
					const layerGroup = layer as FormGroup;
					const actualLayerPosition = layerGroup?.get('layerPosition')?.value;
					return Math.max(max, actualLayerPosition);
				}, 0);
				let layer = this.masterFormBuilder.createStaticLayerFormGroup({ layerPosition: highestLayerPosition + 1 });
				documentLayers.push(layer);
			}
			if (layerType === ELayerType.Text) {
				const documentLayers = state.form.get('imageLayers') as FormArray;
				const highestLayerPosition = documentLayers.controls.reduce((max, layer) => {
					const layerGroup = layer as FormGroup;
					const actualLayerPosition = layerGroup?.get('layerPosition')?.value;
					return Math.max(max, actualLayerPosition);
				}, 0);
				let layer = this.masterFormBuilder.createTextLayerFormGroup({ layerPosition: highestLayerPosition + 1 });
				documentLayers.push(layer);
			}
		}
		return state;
	}

	private handleLayerDeleteAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer } = action.payload;
		if (layer) {
			const documentLayers = state.form.get('imageLayers') as FormArray;
			const index = documentLayers.controls.indexOf(layer);
			documentLayers.removeAt(index);
		}
		return state;
	}

	private handleLayerMoveEarlierAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer } = action.payload;
		if (layer) {
			const documentLayers = state.form.get('imageLayers') as FormArray;
			const index = documentLayers.controls.indexOf(layer);
			documentLayers.removeAt(index);
			documentLayers.insert(index - 1, layer);
		}
		return state;
	}

	private handleLayerMoveLaterAction(state: STORE_TYPE, action: { type: string, payload: any}): STORE_TYPE {
		const { layer } = action.payload;
		if (layer) {
			const documentLayers = state.form.get('imageLayers') as FormArray;
			const index = documentLayers.controls.indexOf(layer);
			documentLayers.removeAt(index);
			documentLayers.insert(index + 1, layer);
		}
		return state;
	}
}
