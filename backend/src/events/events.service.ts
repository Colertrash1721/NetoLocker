import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private eventRepository: Repository<Event> ){}

  async findAll() {
  const event = await this.eventRepository
    .createQueryBuilder('event')
    .select('event.eventType', 'eventType')
    .addSelect('COUNT(*)', 'total')
    .groupBy('event.eventType')
    .getRawMany();
    return event;
}


  findOne(id: number) {
    return this.eventRepository.findOne({where: {idEvent: id}});
  }

}
