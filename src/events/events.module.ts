import { Module } from '@nestjs/common';
import { EventsController } from './controllers';
import { EventsService } from './services';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
