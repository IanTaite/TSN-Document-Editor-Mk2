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
import { Subscription } from 'rxjs';
import { ISet } from '../../image-definitions/interfaces';

@Component({
  selector: 'app-sets-editor',
  standalone: true,
	imports: [ReactiveFormsModule],
  templateUrl: './sets-editor.html',
  styleUrl: './sets-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SetsEditorComponent),
			multi: true,
		},
	],
})
export class SetsEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		sets: this.fb.array([]),
	});

	private formSubscription!: Subscription;

	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	newSetValueForm = this.fb.group({
		setName: this.fb.control<string>('', Validators.required),
		setAccount: this.fb.control<string>('', Validators.required),
	});

	ngOnInit(): void {
		this.formSubscription = this.form.valueChanges.subscribe((value) => {
			this.onChange(value.sets);
		});
	}

	ngOnDestroy(): void {
		this.formSubscription.unsubscribe();
	}

	get formSetsArray(): FormArray {
		return this.form.get('sets') as FormArray;
	}

	get formSetsArrayContents(): FormGroup[] {
		return this.formSetsArray.controls as FormGroup[];
	}

	onDeleteSetButton_click(index: number) {
		this.formSetsArray.removeAt(index);
	}

	onAddNewSetButton_click() {
		const { setName, setAccount } = this.newSetValueForm.value;
		const newSetGroup = this.fb.group({
			setName: this.fb.control<string>(setName ?? ''),
			setAccount: this.fb.control<string>(setAccount ?? ''),
		});
		this.formSetsArray.push(newSetGroup);
		// this.onChange(this.form.value);
		this.onTouched();
		this.newSetValueForm.reset();
	}

	writeValue(obj: ISet[] | null): void {
		const values = obj ?? [];
		this.formSetsArray.clear();
		values.forEach((value) => {
			const newNameValueGroup = this.fb.group({
				setName: this.fb.control<string | null>(value.setName),
				setAccount: this.fb.control<string | null>(value.setAccount),
			});
			this.formSetsArray.push(newNameValueGroup, { emitEvent: false });
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
		if (this.isDisabled) {
			this.form.disable({onlySelf: true});
			this.newSetValueForm.disable({onlySelf: true});
		} else {
			this.form.enable({onlySelf: true});
			this.newSetValueForm.enable({onlySelf: true});
		}
	}
}
