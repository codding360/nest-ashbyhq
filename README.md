# Ashby HQ Client for NestJS

A NestJS module for interacting with the Ashby HQ API.

## Installation

```bash
npm install @your-org/ashbyhq-client
```

## Usage

### Module Configuration

You can configure the module in two ways:

1. Using `forRoot`:

```typescript
import { Module } from '@nestjs/common';
import { AshbyhqModule } from '@your-org/ashbyhq-client';

@Module({
  imports: [
    AshbyhqModule.forRoot({
      auth: {
        apiKey: 'your_api_key_here'
      },
      baseURL: 'https://api.ashbyhq.com', // optional
      timeout: 5000 // optional
    })
  ]
})
export class AppModule {}
```

2. Using `forRootAsync` (recommended for dynamic configuration):

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AshbyhqModule } from '@your-org/ashbyhq-client';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AshbyhqModule.forRootAsync({
      auth: {
        apiKey: process.env.ASHBY_API_KEY
      },
      baseURL: process.env.ASHBY_API_URL, // optional
      timeout: 5000 // optional
    })
  ]
})
export class AppModule {}
```

### Using the Services

Once configured, you can inject and use the services in your application:

```typescript
import { Injectable } from '@nestjs/common';
import { CandidateService } from '@your-org/ashbyhq-client';

@Injectable()
export class YourService {
  constructor(private readonly candidateService: CandidateService) {}

  async createCandidate() {
    const candidate = await this.candidateService.create({
      name: 'John Doe',
      email: 'john@example.com'
    });
    return candidate;
  }
}
```

## Available Services

### CandidateService

The `CandidateService` provides methods for managing candidates:

- `create(input: CreateCandidateInput)`: Create a new candidate
- `list(pagination?: Pagination)`: List candidates
- `search(input: GetCandidateInput)`: Search candidates
- `find(id: string, idType?: 'internal' | 'external')`: Find a candidate by ID
- `update(id: string, input: UpdateCandidateInput)`: Update a candidate
- `uploadResume(candidateId: string, formData: FormData)`: Upload a resume for a candidate

## Environment Variables

When using `forRootAsync`, you can configure these environment variables:

```env
ASHBY_API_KEY=your_api_key_here
ASHBY_API_URL=https://api.ashbyhq.com
```

## Error Handling

The client includes built-in error handling for common API responses:

- `UnauthorizedError`: 401 authentication errors
- `BadRequestError`: 400 validation errors
- `NotFoundError`: 404 resource not found
- `InternalError`: 500 server errors

Example error handling:

```typescript
try {
  const candidate = await candidateService.find('non_existent_id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Candidate not found');
  }
}
```

## Types

The package includes TypeScript definitions for all API responses and inputs. Key types include:

- `ICandidate`: Candidate interface
- `CreateCandidateInput`: Input for creating candidates
- `UpdateCandidateInput`: Input for updating candidates
- `Response<T>`: Generic API response
- `ListResponse<T>`: Paginated list response

### Base Service

```typescript
import { Injectable } from '@nestjs/common';
import { AshbyhqService } from '@your-org/ashbyhq-client';

@Injectable()
export class YourService {
  constructor(private readonly ashbyhqService: AshbyhqService) {}

  async someMethod() {
    // Use the service methods
    const result = await this.ashbyhqService.getExample();
  }
}
```

### Candidate Service

```typescript
import { Injectable } from '@nestjs/common';
import { 
  CandidateService, 
  CreateCandidateInput, 
  UpdateCandidateInput,
  ICandidate,
  FindCandidateInput,
  Pagination
} from '@your-org/ashbyhq-client';

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

## License

MIT 