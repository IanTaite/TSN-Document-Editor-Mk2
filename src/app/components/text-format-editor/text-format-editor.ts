import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-text-format-editor',
	standalone: true,
	imports: [],
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
export class TextFormatEditorComponent implements ControlValueAccessor {
	onChange: (value: any) => void = () => {};
	onTouched: () => void = () => {};
	isDisabled = false;

	writeValue(obj: any): void {
		// TODO: Implement writeValue in TextFormatEditorComponent
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
