import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { AshbyhqService } from './ashbyhq.service';
import { CandidateService } from './services/candidate.service';
import { ConfigOptions } from './types/global';
import { Global } from '@nestjs/common';

export interface AshbyhqAsyncOptions {
  imports?: Type<any>[];
  useFactory: (...args: any[]) => Promise<ConfigOptions> | ConfigOptions;
  inject?: any[];
}

@Global()
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

  static forRootAsync(options: AshbyhqAsyncOptions): DynamicModule {
    return {
      module: AshbyhqModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'ASHBY_HQ_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        AshbyhqService,
        CandidateService,
      ],
      exports: [AshbyhqService, CandidateService],
    };
  }

  private static createAsyncProviders(options: AshbyhqAsyncOptions): Provider[] {
    return [
      {
        provide: 'ASHBY_HQ_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }
}
