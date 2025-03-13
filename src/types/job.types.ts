import { Pagination, Status, Response , ListResponse} from "@/types/global";
import { ICustomField, IHiringTeam,  } from "@/types/utils";

type Expand = "openings" | "location";
export type OpeningStateType = "Approved" | "Closed" | "Draft" | "Filled" | "Open";

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  globalRole: string;
  isEnabled: boolean;
  updatedAt: string;
}

export interface Opening {
  id: string;
  openedAt: string;
  closedAt: string;
  inActiveAt: string;
  archivedAt: string;
  openingState: OpeningStateType[];
}

interface IJob {
    readonly id: string;
    readonly title: string;
    readonly confidential: boolean;
    readonly status: Status;
    readonly employmentType: string;
    readonly departmentId: string;
    readonly defaultInterviewPlanId: string;
    readonly interviewPlanIds: string[];
    readonly customFields: ICustomField[];
    readonly jobPostingIds: string[];
    readonly customRequisitionId: string;
    readonly brandId: string;
    readonly hiringTeam?: IHiringTeam[];
    readonly author?: Author;
    readonly location?: Location;
    readonly openings?: Opening[];
}

interface ListJobInput extends Pagination {
    status?: Status[];
    openAfter?: number;
    openBefore?: number;
    closedAfter?: number;
    closedBefore?: number;
    includeUnpublishedJobPostingsIds?: boolean;
    expand?: Expand[];
}

export { ListJobInput };

export type ListJobResponse = ListResponse<IJob[]>
export type IJobResponse = Response<IJob>
