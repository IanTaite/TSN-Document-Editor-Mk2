import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageLayerStaticEditorComponent } from '../image-layer-static-editor/image-layer-static-editor';
import { ImageLayerTextEditorComponent } from '../image-layer-text-editor/image-layer-text-editor';
import { ELayerType } from '../../image-definitions/interfaces/ELayerType';

@Component({
  selector: 'app-image-layer-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ImageLayerStaticEditorComponent, ImageLayerTextEditorComponent],
  templateUrl: './image-layer-editor.html',
  styleUrl: './image-layer-editor.scss'
})
export class ImageLayerEditorComponent {
  @Input({required: true}) layerFormGroup!: FormGroup;

  get isLayerStatic() {
    const result = this.layerFormGroup.value.layerType === ELayerType.Static;
    return result;
  }

  get isLayerText() {
    const result = this.layerFormGroup.value.layerType === ELayerType.Text;
    console.log('Comparing', this.layerFormGroup.value.layerType , ELayerType.Text, result);
    return result;
  }
}
