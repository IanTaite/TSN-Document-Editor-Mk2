import {
	Component,
	OnDestroy,
	OnInit,
	forwardRef,
	inject,
} from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-default-image-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './default-image-editor.html',
	styleUrl: './default-image-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DefaultImageEditorComponent),
			multi: true,
		},
	],
})
export class DefaultImageEditorComponent
	implements OnInit, OnDestroy, ControlValueAccessor
{
	private fb = inject(FormBuilder);

	form = this.fb.group({
		files: this.fb.array([]),
	});

	private formSubscription!: Subscription;

	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	newFilePathForm = this.fb.group({
		name: this.fb.control<string>('', Validators.required),
		path: this.fb.control<string>('', Validators.required),
	});

	ngOnInit(): void {
		this.formSubscription = this.form.valueChanges.subscribe((value) => {
			this.onChange(value);
		});
	}

	ngOnDestroy(): void {
		this.formSubscription.unsubscribe();
	}

	get formFilesArray(): FormArray {
		return this.form.get('files') as FormArray;
	}

	get formFilesArrayContents(): FormGroup[] {
		return this.formFilesArray.controls as FormGroup[];
	}

	onDeletePathButton_click(index: number) {
		this.formFilesArray.removeAt(index);
	}

	onAddNewPathButton_click() {
		const { name, path } = this.newFilePathForm.value;
		const newPathGroup = this.fb.group({
			name: this.fb.control<string>(name ?? ''),
			path: this.fb.control<string>(path ?? ''),
		});
		this.formFilesArray.push(newPathGroup);
		// this.onChange(this.form.value);
		this.onTouched();
		this.newFilePathForm.reset();
	}

	writeValue(obj: { files: IFilePath[] } | null): void {
		let files: IFilePath[];
		if (obj === null) {
			files = [];
		} else {
			files = obj.files;
		}
		this.formFilesArray.clear();
		files.forEach((value) => {
			const newPathGroup = this.fb.group({
				name: this.fb.control<string | null>(value.name),
				path: this.fb.control<string | null>(value.path),
			});
			this.formFilesArray.push(newPathGroup, { emitEvent: false });
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
