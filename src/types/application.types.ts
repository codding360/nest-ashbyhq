import {Status, Response, ListResponse, ICreditedToUser} from './global'
import {ICustomField, IInterviewStage, ISource, IArchiveReason} from './utils'

interface ICandidateResponse {
    id: string;
    name: string;
    primaryEmailAddress?: string;
    primaryPhoneNumber?: string;    
} 

interface IJob {
  id: string;
  title: string;
  locationId: string;
  departmentId: string;
}

interface IHiringTeam {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
interface IApplication {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: Status;
    customFields?: ICustomField[];
    candidate: ICandidateResponse;
    currentInterviewStage: IInterviewStage;
    source?: ISource;
    archiveReason?: IArchiveReason;
    archivedAt?: string;
    job: IJob;
    creditedToUser?: ICreditedToUser;
    hiringTeam: IHiringTeam[];
    appliedViaJobPostingId?: string;
    submitterClientIp?: string;
    submitterUserAgent?: string;
}

interface ApplicationHistory {
    stageId: string;
    stageNumber: number;
    enteredStageAt: Date;
    archiveReasonId?: string;
}

interface CreateApplicationInput {
    candidateId: string;
    jobId: string;
    interviewPlanId?: string;
    interviewStageId?: string;
    sourceId?: string;
    creditedToUserId?: string;
    applicationHistory?: ApplicationHistory[];
}

export { CreateApplicationInput };

export type IApplicationResponse = Response<IApplication>;
export type IListApplicationResponse = ListResponse<IApplication[]>;