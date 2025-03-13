# Ashby HQ Client

A NestJS package for interacting with Ashby HQ API.

## Installation

```bash
npm install ashbyhq-client
```

## Usage

```typescript
import { AshbyhqModule } from 'ashbyhq-client';

@Module({
  imports: [
    AshbyhqModule.forRoot({
      auth: {
        // Use either username/password or apiKey
        username: 'your-username',
        password: 'your-password',
        // OR
        apiKey: 'your-api-key'
      },
      // Optional configurations
      baseURL: 'https://api.ashbyhq.com', // default
      timeout: 10000, // default: 10 seconds
      headers: {
        // Additional headers if needed
      }
    }),
  ],
})
export class AppModule {}
```

### Using the Services

#### Base Service

```typescript
import { Injectable } from '@nestjs/common';
import { AshbyhqService } from 'ashbyhq-client';

@Injectable()
export class YourService {
  constructor(private readonly ashbyhqService: AshbyhqService) {}

  async someMethod() {
    // Use the service methods
    const result = await this.ashbyhqService.getExample();
  }
}
```

#### Candidate Service

```typescript
import { Injectable } from '@nestjs/common';
import { 
  CandidateService, 
  CreateCandidateInput, 
  UpdateCandidateInput,
  ICandidate,
  FindCandidateInput,
  Pagination
} from 'ashbyhq-client';

@Injectable()
export class YourService {
  constructor(private readonly candidateService: CandidateService) {}

  async createCandidate() {
    const input: CreateCandidateInput = {
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+1234567890',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      githubUrl: 'https://github.com/johndoe',
      website: 'https://johndoe.com',
      location: {
        city: 'San Francisco',
        region: 'CA',
        country: 'US'
      },
      sourceId: 'source_123',
      creditedToUserId: 'user_123'
    };
    const candidate: ICandidate = await this.candidateService.create(input);
    return candidate;
  }

  async listCandidates() {
    const pagination: Pagination = {
      limit: 10,
      cursor: 'next_page_cursor'
    };
    const { candidates, hasMore, nextCursor } = await this.candidateService.list(pagination);
    return { candidates, hasMore, nextCursor };
  }

  async updateCandidate() {
    const input: UpdateCandidateInput = {
      candidateId: 'candidate_123',
      name: 'John Doe Updated',
      email: 'john.updated@example.com',
      socialLinks: [
        { type: 'linkedin', url: 'https://linkedin.com/in/johndoe' }
      ],
      sendNotifications: true
    };
    const candidate = await this.candidateService.update(input);
    return candidate;
  }

  async findCandidate() {
    // Find by ID
    const byId: FindCandidateInput = { id: 'candidate_123' };
    const candidate1 = await this.candidateService.find(byId);

    // Find by external mapping
    const byMapping: FindCandidateInput = { externalMappingId: 'external_123' };
    const candidate2 = await this.candidateService.find(byMapping);
  }

  async searchCandidates() {
    const { candidates, hasMore, nextCursor } = await this.candidateService.search({ 
      email: 'john@example.com',
      name: 'John Doe'
    });
    return { candidates, hasMore, nextCursor };
  }

  async uploadResume(candidateId: string, resume: File) {
    const candidate = await this.candidateService.uploadResume({ candidateId, resume });
    return candidate;
  }
}
```

### Response Types

The package includes comprehensive type definitions for all responses:

```typescript
interface ICandidate {
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

interface ListResponse<T> {
  readonly success: boolean;
  readonly results: T;
  readonly errors?: string[];
  readonly warnings?: string[];
  readonly moreDataAvailable?: boolean;
  readonly nextCursor?: string;
  readonly syncToken?: string;
}
```

### Error Handling

The package includes built-in error handling for common HTTP status codes:

- UnauthorizedError (401)
- BadRequestError (400)
- InternalError (500)
- NotFoundError (404)
- EmailNameError (When searching candidates without email or name)

## License

MIT 