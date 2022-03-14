import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {}
