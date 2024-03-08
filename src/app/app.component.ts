import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SAMPLE_DATA } from '../../SAMPLE_DATA';
import { DocumentEditorComponent } from './components/document-editor/document-editor';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer';
import { IImageDefinition } from './image-definitions/interfaces';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, DocumentEditorComponent, DocumentViewerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	readonly apidata = SAMPLE_DATA;
	documentData: any;

	onDocumentChanged(documentData: IImageDefinition|null) {
		this.documentData = documentData;
	}
}
