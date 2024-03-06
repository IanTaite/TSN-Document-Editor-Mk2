import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-static-asset-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './component-static-asset-editor.html',
  styleUrl: './component-static-asset-editor.scss'
})
export class ComponentStaticAssetEditorComponent {
	@Input({required: true}) componentFormGroup!: FormGroup;
}
