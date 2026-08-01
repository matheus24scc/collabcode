import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to CollabCode API';
  }

  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'CollabCode Backend',
    };
  }
}