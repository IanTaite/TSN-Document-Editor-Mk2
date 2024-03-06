import { ELayerType } from './ELayerType';
import { IComponentBase } from './IComponentBase';
import { IDataSet } from './IDataSet';
import { IDefaultImage } from './IDefaultImage';

export interface IImageLayer {
	layerType: ELayerType;
	readonly layerPosition: number;
	readonly components: IComponentBase[];
	dataSet: IDataSet | null;
	defaultImage: IDefaultImage | null;
	readonly useVariantKeys: boolean;
}
