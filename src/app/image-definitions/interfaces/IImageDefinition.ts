import { IImageLayer } from "./IImageLayer";

export interface IImageDefinition {
	id: string ;
	name: string | null;
	clientId: string;
	imageSizeTemplateId: string | null;
	outputImageType: number;
	integrity: string | null;
	variantKeys: string[] ;
	imageLayers: IImageLayer[];
}
