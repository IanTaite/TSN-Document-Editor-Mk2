import { Component, OnDestroy, OnInit, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-default-text-editor',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './default-text-editor.html',
	styleUrl: './default-text-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DefaultTextEditorComponent),
			multi: true,
		},
	],
})
export class DefaultTextEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};
	isDisabled = false;

	private fb = inject(FormBuilder);
	form = this.fb.group({
		defaultText: this.fb.control<string|null>(null)
	});
	formSubscription!: Subscription;

	ngOnInit() {
		this.formSubscription = this.form.valueChanges.subscribe((formValue) => {
			this.onChange(formValue.defaultText);
		});
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
	}

	writeValue(obj: string|null): void {
		this.form.setValue({ defaultText: obj ?? '' });
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
