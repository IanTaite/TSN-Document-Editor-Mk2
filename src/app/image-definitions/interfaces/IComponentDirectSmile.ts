import { IComponentBase } from './IComponentBase';
import { ISet } from './ISet';

export interface IComponentDirectSmile extends IComponentBase {
	readonly defaultText: string | null;
	readonly textFormat: string | null;
	readonly sets: ISet[] | null;
}
