import { Injectable } from '@nestjs/common';
import { AshbyhqService } from '../ashbyhq.service';
import { Pagination } from '../types/global';
import {
  CreateCandidateInput,
  FindCandidateInput,
  GetCandidateInput,
  UpdateCandidateInput,
  UploadResumeInput,
  ICandidateResponse,
  IListCandidateResponse,
} from '../types/candidate.types';
import { EmailNameError } from '../errors/email-name.error';

@Injectable()
export class CandidateService extends AshbyhqService {
  async create(input: CreateCandidateInput): Promise<ICandidateResponse> {
    return this.post<ICandidateResponse, CreateCandidateInput>('/candidate.create', input);
  }

  async list(input: Pagination = {}): Promise<IListCandidateResponse> {
    return this.post<IListCandidateResponse, Pagination>('/candidate.list', input);
  }

  async search(input: GetCandidateInput): Promise<IListCandidateResponse> {
    if (!input.email && !input.name) {
      throw new EmailNameError();
    }
    return this.post<IListCandidateResponse, GetCandidateInput>('/candidate.search', input);
  }

  async update(input: UpdateCandidateInput): Promise<ICandidateResponse> {
    return this.post<ICandidateResponse, UpdateCandidateInput>('/candidate.update', input);
  }

  async find(input: FindCandidateInput): Promise<ICandidateResponse> {
    return this.post<ICandidateResponse, FindCandidateInput>('/candidate.info', input);
  }

  async uploadResume(input: UploadResumeInput): Promise<ICandidateResponse> {
    const formData = new FormData();
    formData.append('candidateId', input.candidateId);
    formData.append('resume', input.resume);
    return this.upload<ICandidateResponse>('/candidate.uploadResume', formData);
  }
} 