import { Component, Input, forwardRef, inject } from '@angular/core';
import {
	ControlValueAccessor,
	FormArray,
	FormBuilder,
	FormGroup,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { IFilePath } from '../../image-definitions/interfaces';

@Component({
	selector: 'app-paths-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './paths-editor.html',
	styleUrl: './paths-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PathsEditorComponent),
			multi: true,
		},
	],
})
export class PathsEditorComponent implements ControlValueAccessor {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		paths: this.fb.array([]),
	});

	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	newFilePathForm = this.fb.group({
		name: this.fb.control<string>('', Validators.required),
		path: this.fb.control<string>('', Validators.required),
	});

	get formPathsArray(): FormArray {
		return this.form.get('paths') as FormArray;
	}

	get formPathsArrayContents(): FormGroup[] {
		return this.formPathsArray.controls as FormGroup[];
	}

	onDeletePathButton_click(index: number) {
		this.formPathsArray.removeAt(index);
	}

	onAddNewPathButton_click() {
		const { name, path } = this.newFilePathForm.value;
		const newPathGroup = this.fb.group({
			name: this.fb.control<string>(name ?? ''),
			path: this.fb.control<string>(path ?? ''),
		});
		this.formPathsArray.push(this.newFilePathForm);
		this.newFilePathForm.reset();
	}

	writeValue(obj: IFilePath[] | null): void {
		const values = obj ?? [];
		this.formPathsArray.clear();
		values.forEach((value) => {
			const newPathGroup = this.fb.group({
				name: this.fb.control<string | null>(value.name),
				path: this.fb.control<string | null>(value.path),
			});
			this.formPathsArray.push(newPathGroup, { emitEvent: false });
		});
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
