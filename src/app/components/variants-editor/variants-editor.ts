import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-variants-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './variants-editor.html',
  styleUrl: './variants-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => VariantsEditorComponent),
			multi: true,
		},
	],
})
export class VariantsEditorComponent implements ControlValueAccessor {
	@Input({ required: true }) controlId!: string;

	variants: string[] = [];
	newVariantValue = '';
	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(obj: string[]): void {
		this.variants = obj ?? [];
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

	onAddKeyButton_click() {
		if (
			this.newVariantValue.trim() !== '' &&
			!this.variants.includes(this.newVariantValue)
		) {
			this.variants.push(this.newVariantValue);
			this.newVariantValue = '';
			this.onTouched();
			this.onChange(this.variants);
		}
	}

	onDeleteKeyButton_click(index: number) {
		this.variants.splice(index, 1);
		this.onTouched();
		this.onChange(this.variants);
	}
}
