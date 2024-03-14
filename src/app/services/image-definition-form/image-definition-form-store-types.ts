import { FormGroup } from "@angular/forms";

export enum ActionType {
	ComponentAddNew = "ComponentAddNew",
	ComponentDelete = "ComponentDelete",
	ComponentMoveEarlier = "ComponentMoveEarlier",
	ComponentMoveLater = "ComponentMoveLater",
	LayerAddNew = "LayerAddNew",
	LayerDelete = "LayerDelete",
	LayerMoveEarlier = "LayerMoveEarlier",
	LayerMoveLater = "LayerMoveLater"
}

export type STORE_TYPE = {
	form: FormGroup
};
