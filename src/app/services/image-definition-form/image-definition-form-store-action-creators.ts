import { FormGroup } from '@angular/forms';
import { EComponentType, ELayerType } from '../../image-definitions/interfaces';
import { ActionType } from './image-definition-form-store-types';

export function componentAddNewAction(
	layer: FormGroup,
	componentType: EComponentType,
) {
	const action = {
		type: ActionType.ComponentAddNew,
		payload: {
			layer,
			componentType,
		},
	};
	return action;
}

export function componentDeleteAction(layer: FormGroup, component: FormGroup) {
	const action = {
		type: ActionType.ComponentDelete,
		payload: {
			layer,
			component,
		},
	};
	return action;
}

export function componentMoveEarlierAction(
	layer: FormGroup,
	component: FormGroup,
) {
	const action = {
		type: ActionType.ComponentMoveEarlier,
		payload: {
			layer,
			component,
		},
	};
	return action;
}

export function componentMoveLaterAction(
	layer: FormGroup,
	component: FormGroup,
) {
	const action = {
		type: ActionType.ComponentMoveLater,
		payload: {
			layer,
			component,
		},
	};
	return action;
}

export function layerAddNewAction(layerType: ELayerType) {
	const action = {
		type: ActionType.LayerAddNew,
		payload: {
			layerType
		}
	};
	return action;
}

export function layerDeleteAction(layer: FormGroup) {
	const action = {
		type: ActionType.LayerDelete,
		payload: {
			layer,
		},
	};
	return action;
}

export function layerMoveEarlierAction(layer: FormGroup) {
	const action = {
		type: ActionType.LayerMoveEarlier,
		payload: {
			layer,
		},
	};
	return action;
}

export function layerMoveLaterAction(layer: FormGroup) {
	const action = {
		type: ActionType.LayerMoveLater,
		payload: {
			layer,
		},
	};
	return action;
}
