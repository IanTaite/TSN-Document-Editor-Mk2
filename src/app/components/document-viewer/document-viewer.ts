import { Component, Input } from '@angular/core';
import { IImageDefinition } from '../../image-definitions/interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-document-viewer',
	standalone: true,
	imports: [JsonPipe],
	templateUrl: './document-viewer.html',
	styleUrl: './document-viewer.scss',
})
export class DocumentViewerComponent {
	@Input() imageDefinition!: IImageDefinition;
	@Input() documentData!: IImageDefinition;
}
