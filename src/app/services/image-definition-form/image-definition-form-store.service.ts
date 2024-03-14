import { Injectable, inject } from '@angular/core';
import { EComponentType, ELayerType, IComponentBase, IComponentDirectSmile, IComponentStaticAsset, IImageDefinition, IImageLayer, IImageLayerStatic, IImageLayerText } from '../../image-definitions/interfaces';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, filter, map } from 'rxjs';
import { ImageDefinitionFormBuilderService } from './image-definition-form-builder.service';
import { ImageDefinitionFormReducerService } from './image-definition-form-reducer.service';
import { STORE_TYPE } from './image-definition-form-store-types';

const initialState: STORE_TYPE = {
	form: new FormGroup({})
};

@Injectable({
  providedIn: 'root'
})
export class ImageDefinitionFormStoreService {
	private formBuilder = inject(ImageDefinitionFormBuilderService);
	private formReducer = inject(ImageDefinitionFormReducerService);
	private stateSubject = new BehaviorSubject<STORE_TYPE>(initialState);

	state$ = this.stateSubject.pipe(
		filter(s => s !== initialState),
		distinctUntilChanged()
	);

	select<K>(selector: (state: STORE_TYPE) => K): Observable<K> {
		return this.state$.pipe(
			map(selector),
			distinctUntilChanged()
		);
	}

	initialize(initialState: IImageDefinition) {
		const masterForm = this.formBuilder.createForm(initialState);
		this.stateSubject.next({
			form: masterForm
		});
	}

	dispatch(action: { type: string, payload: any }): void {
		const currentState = this.stateSubject?.value;
		const newState = this.formReducer.reduce(currentState, action);
  	this.stateSubject.next(newState);
	}
}
