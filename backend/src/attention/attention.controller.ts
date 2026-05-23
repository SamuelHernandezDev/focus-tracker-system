//backend\src\attention\attention.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('attention')
export class AttentionController {
  @Get('health')
  health() {
    return {
      ok: true,
      module: 'attention',
    };
  }
}
