import {ObjectType, FieldType, SelectableValue, GlobalRole} from './global'

export interface ICustomField {
  readonly id: string;                                // required - The field's unique id
  readonly isPrivate: boolean;                        // Whether the field is private
  readonly title: string;                             // required - The field's title
  readonly objectType: ObjectType;    
  readonly isArchived: boolean;
  readonly fieldType: FieldType;
  readonly selectableValues?: SelectableValue[];
}

export interface IHiringTeam {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ISource {
  readonly id: string;
  readonly title: string;
  readonly isArchived: boolean;
  readonly sourceType?: string;
}

export interface IArchiveReason {
  readonly id: string;
  readonly text: string;
  readonly reasonType: string;
  readonly isArchived: boolean;
}

export interface IInterviewStage {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly orderInInterviewPlan: number;
  readonly interviewStageGroupId: string;
  readonly interviewPlanId: string;
}