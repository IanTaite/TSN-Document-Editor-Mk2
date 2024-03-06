import { EComponentType } from './EComponentType';
import { IPosition } from './IPosition';

export interface IComponentBase {
	componentType: EComponentType;
	position: IPosition;
	readonly variants: string[] | null;
}
