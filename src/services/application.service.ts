import { Injectable } from '@nestjs/common';

import { AshbyhqService } from '../ashbyhq.service';
import { ConfigOptions } from '../types/global';
import {IApplicationResponse, CreateApplicationInput} from '../types/application.types';

@Injectable()
export class ApplicationService extends AshbyhqService {
    constructor(configOptions: ConfigOptions) {
      super(configOptions);
    }

    async create(input: CreateApplicationInput): Promise<IApplicationResponse> {
        return this.post('/application.create', input);
    }
}