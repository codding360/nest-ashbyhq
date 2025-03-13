import { DynamicModule, Module } from '@nestjs/common';
import { AshbyhqService } from './ashbyhq.service';
import { CandidateService } from './services/candidate.service';
import { ConfigOptions } from './types/global';

@Module({})
export class AshbyhqModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: AshbyhqModule,
      providers: [
        {
          provide: 'ASHBY_HQ_OPTIONS',
          useValue: options,
        },
        AshbyhqService,
        CandidateService,
      ],
      exports: [AshbyhqService, CandidateService],
    };
  }
} 