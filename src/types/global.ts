export type ObjectType = 'Application' | 'Candidate' | 'Employee' | 'Job' | 'Offer' | 'Opening' | 'Talent_Project';
export type FieldType = 'MultiValueSelect' | 'NumberRange' | 'String' | 'Date' | 'ValueSelect' | 'Number' | 'Currency' | 'Boolean' | 'LongText' | 'CompensationRange';
export type Status = 'Draft' | 'Closed' | 'Open' | 'Archived';
export type GlobalRole = 'Organization' | 'Admin' | 'Elevated Access' | 'Limited Access' | 'External Recruiter';

export interface SelectableValue {
  readonly label?: string;
  readonly value?: string;
  readonly isArchived?: boolean;
}

export interface AuthOptions {
  apiKey?: string;
  username?: string;
  password?: string;
}

export interface ConfigOptions {
  readonly auth: AuthOptions;
  readonly baseURL?: string;
  readonly timeout?: number;
  readonly headers?: Record<string, string>;
}

export interface Pagination {
  readonly limit?: number;
  readonly cursor?: string;
  readonly syncToken?: string;
}

export interface Response<T> {
  readonly success: boolean;
  readonly results: T;
  readonly errors?: string[];
  readonly warnings?: string[];
}

export interface ListResponse<T> {
  readonly success: boolean;
  readonly results: T;
  readonly errors?: string[];
  readonly warnings?: string[];
  readonly moreDataAvailable?: boolean;
  readonly nextCursor?: string;
  readonly syncToken?: string;
}

export interface ContactInfo {
  readonly value: string;
  readonly type: string;
  readonly isPrimary: boolean;
}

export interface SocialLink {
  readonly type: string;
  readonly url: string;
}

export interface Tag {
  readonly id: string;
  readonly title: string;
  readonly isArchived: boolean;
}

export interface FileHandle {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
}

export interface ICreditedToUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly globalRole: GlobalRole;
  readonly isEnabled: boolean;
  readonly updatedAt: string;
}

export interface ILocationComponent {
  readonly type: 'Country' | 'Region' | 'City';
  readonly name: string;
}

export interface IPrimaryLocation {
  readonly id: string;
  readonly locationSummary: string;
  readonly locationComponents: ILocationComponent[];
} 