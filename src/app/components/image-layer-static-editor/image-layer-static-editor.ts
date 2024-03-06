import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-layer-static-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-layer-static-editor.html',
  styleUrl: './image-layer-static-editor.scss'
})
export class ImageLayerStaticEditorComponent {
  @Input({required: true}) layerFormGroup!: FormGroup;
}
