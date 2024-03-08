import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-sets-editor',
  standalone: true,
  imports: [],
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
export class SetsEditorComponent implements ControlValueAccessor {

	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(obj: any): void {
		// TODO: Complete writeValue in SetsEditorComponent
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
