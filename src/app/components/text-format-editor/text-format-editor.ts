import { Component, OnDestroy, OnInit, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-text-format-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './text-format-editor.html',
	styleUrl: './text-format-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFormatEditorComponent),
			multi: true,
		},
	],
})
export class TextFormatEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};
	isDisabled = false;

	private fb = inject(FormBuilder);
	form = this.fb.group({
		textFormat: this.fb.control<string|null>(null)
	});
	formSubscription!: Subscription;

	ngOnInit() {
		this.formSubscription = this.form.valueChanges.subscribe((formValue) => {
			this.onChange(formValue.textFormat);
		});
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
	}

	writeValue(obj: any): void {
		this.form.setValue({ textFormat: obj ?? '' });
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
		this.isDisabled ? this.form.disable({onlySelf: true}) : this.form.enable({onlySelf: true});
	}
}
