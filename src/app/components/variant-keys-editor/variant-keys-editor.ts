import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-variant-keys-editor',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './variant-keys-editor.html',
	styleUrl: './variant-keys-editor.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => VariantKeysEditorComponent),
			multi: true,
		},
	],
})
export class VariantKeysEditorComponent implements ControlValueAccessor {
	@Input({ required: true }) controlId!: string;

	variantKeys: string[] = [];
	newKeyValue = '';
	isDisabled = false;
	onChange: (obj: any) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(obj: string[]): void {
		this.variantKeys = obj ?? [];
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
			this.newKeyValue.trim() !== '' &&
			!this.variantKeys.includes(this.newKeyValue)
		) {
			this.variantKeys.push(this.newKeyValue);
			this.newKeyValue = '';
			this.onTouched();
			this.onChange(this.variantKeys);
		}
	}

	onDeleteKeyButton_click(index: number) {
		this.variantKeys.splice(index, 1);
		this.onTouched();
		this.onChange(this.variantKeys);
	}
}
