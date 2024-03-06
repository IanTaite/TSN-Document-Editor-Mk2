import { IComponentBase } from './IComponentBase';
import { IFilePath } from './IFilePath';

export interface IComponentStaticAsset extends IComponentBase {
	readonly paths: IFilePath[] | null;
}
