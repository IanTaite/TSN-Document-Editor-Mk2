import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

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
      multi: true
    }
  ]
})
export class VariantKeysEditorComponent implements ControlValueAccessor {
  @Input({required: true}) controlId!: string;

  keys: string[] = [];
  newKeyValue = '';
  isDisabled = false;
  onChange: (obj: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: string[]): void {
    this.keys = obj ?? [];
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
    if ((this.newKeyValue.trim() !== '') && !this.keys.includes(this.newKeyValue)) {
      this.keys.push(this.newKeyValue);
      this.newKeyValue = '';
      this.onTouched();
      this.onChange(this.keys);
    }
  }

  onDeleteKeyButton_click(keyToBeDeleted: string) {
    this.keys = this.keys.filter(key => key !== keyToBeDeleted);
    this.onTouched();
    this.onChange(this.keys);
  }
}
