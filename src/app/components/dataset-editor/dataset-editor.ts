import { Component, OnDestroy, OnInit, forwardRef, inject } from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDataSet } from '../../image-definitions/interfaces';
import { Subscription } from 'rxjs';
import { DefaultTextEditorComponent } from '../default-text-editor/default-text-editor';

@Component({
	selector: 'app-dataset-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './dataset-editor.html',
	styleUrl: './dataset-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatasetEditorComponent),
			multi: true,
		},
	],
})
export class DatasetEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	value: IDataSet | null = null;
	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};
	isDisabled = false;

	private fb = inject(FormBuilder);
	form = this.fb.group({
		name: this.fb.control<string|null>(null)
	});
	formSubscription!: Subscription;

	ngOnInit() {
		this.formSubscription = this.form.valueChanges.subscribe((value) => {
			this.onChange(value);
		});
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
	}

	writeValue(obj: IDataSet|null): void {
		if (obj === null) {
			this.form.setValue({ name: null });
		} else {
			this.form.setValue({ name: obj.name });
		}
		this.value = obj;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
