import {
  Response,
  ListResponse,
  ContactInfo,
  SocialLink,
  Tag,
  FileHandle,
  ICreditedToUser,
  IPrimaryLocation,
  ILocationComponent
} from './global';
import { ICustomField, ISource } from './utils';

export interface ICandidate {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly name: string;
  readonly primaryEmailAddress?: ContactInfo;
  readonly emailAddresses: ContactInfo[];
  readonly primaryPhoneNumber?: ContactInfo;
  readonly phoneNumbers: ContactInfo[];
  readonly socialLinks: SocialLink[];
  readonly tags: Tag[];
  readonly position?: string;
  readonly company?: string;
  readonly school?: string;
  readonly applicationIds: string[];
  readonly resumeFileHandle?: FileHandle;
  readonly fileHandles: FileHandle[];
  readonly customFields?: ICustomField[];
  readonly profileUrl: string;
  readonly source?: ISource;
  readonly creditedToUser?: ICreditedToUser;
  readonly timezone?: string;
  readonly primaryLocation?: IPrimaryLocation;
}

export interface CreateCandidateLocation {
  readonly city?: string;
  readonly region?: string;
  readonly country?: string;
}

export interface CreateCandidateInput {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber?: string;
  readonly linkedinUrl?: string;
  readonly githubUrl?: string;
  readonly website?: string;
  readonly alternateEmailAddresses?: string[];
  readonly location?: CreateCandidateLocation;
  readonly sourceId?: string;
  readonly creditedToUserId?: string;
}

export interface UpdateCandidateInput {
  readonly candidateId: string;
  readonly name?: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly linkedinUrl?: string;
  readonly githubUrl?: string;
  readonly website?: string;
  readonly alternateEmail?: string;
  readonly socialLinks?: SocialLink[];
  readonly sourceId?: string;
  readonly creditedToUserId?: string;
  readonly location?: IPrimaryLocation;
  readonly sendNotifications?: boolean;
}

export interface GetCandidateInput {
  readonly email?: string;
  readonly name?: string;
}

interface FindCandidateByIdInput {
  readonly id: string;
}

interface FindCandidateByExternalMappingInput {
  readonly externalMappingId: string;
}

export type FindCandidateInput = FindCandidateByIdInput | FindCandidateByExternalMappingInput;

export interface UploadResumeInput {
  readonly candidateId: string;
  readonly resume: File;
}

export type IListCandidateResponse = ListResponse<ICandidate[]>;
export type ICandidateResponse = Response<ICandidate>; 