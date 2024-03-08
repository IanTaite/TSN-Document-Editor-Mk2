import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-default-text-editor',
	standalone: true,
	imports: [],
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
export class DefaultTextEditorComponent implements ControlValueAccessor {
	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};
	isDisabled = false;

	writeValue(obj: any): void {
		// TODO: Implement writeValue in DefaultTextEditorComponent
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
