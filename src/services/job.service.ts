import { Injectable } from '@nestjs/common';

import { ConfigOptions } from '../types/global';
import { ListJobInput, ListJobResponse } from '../types/job.types';

import { AshbyhqService } from 'src/ashbyhq.service';

@Injectable()
export class JobService extends AshbyhqService {
    constructor(configOptions: ConfigOptions) {
      super(configOptions);
    }
    async list(input: ListJobInput = {}): Promise<ListJobResponse> {
      return this.post('/job.list', input);
  }
}