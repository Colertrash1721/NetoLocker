import { HttpException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import axios from 'axios';

@Injectable()
export class EventsService {
  private readonly traccarApiUrl = process.env.My_Ip;
  private readonly traccarApiToken = process.env.My_Token;
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(deviceId: number) {
    // Define el rango de tiempo para la consulta
    const date = new Date();
    const from = new Date(date.getTime() - 15* 60 * 1000)
    const to = date.toISOString();
    const fromDate = from.toISOString();
    console.log(to);
    console.log(from);
    console.log(deviceId);
    
    
    const headers = {
      Authorization: `Bearer ${this.traccarApiToken}`,
      'Content-Type': 'application/json',
    };
    //Realiza la solicitud a los dispositivos desde la API de Traccar
    const urlDevices = `${this.traccarApiUrl}/devices`;
    const responseDevices = await axios.get(urlDevices, { headers });
    const devices = responseDevices.data;
    const device = devices.find((device) => device.id === deviceId);
    if (!device) {
      throw new HttpException(
        {
          status: 404,
          error: 'Device not found',
        },
        404,
      );
    }
    const deviceName = device.name;
    console.log(deviceName);
    
    // Realiza la solicitud a los eventos desde la API de Traccar
    const url = `${this.traccarApiUrl}/reports/events?deviceId=${deviceId}&from=${fromDate}&to=${to}`;
    console.log(url);
    const response = await axios.get(url, { headers });
    const events = response.data;

    if (!events || events.length === 0) {
      throw new HttpException(
        {
          status: 404,
          error: 'No events found',
        },
        404,
      );
    }

    console.log(events);
    // valida si el evento existe y sino guarda los eventos en la base de datos
    for(const event of events){
      const existinEvent = this.eventsRepository.findOne({
        where: {
          idEvent: event.id
        }
      })
      const newEvent = this.eventsRepository.create({ 
        idEvent: event.id,
        deviceName: deviceName,
        eventType: event.type,
        eventDate: event.eventTime,
      });
      await this.eventsRepository.save(newEvent);
    }
  }

  async findAll() {
    return await this.eventsRepository.find();
  }

  async findOne(id: number) {
    try {
      const events = await this.eventsRepository.findOne({
        where: { idEvent: id },
      });
      if (!events) {
        throw new Error('Event not found');
      }

      return events;

    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'Event not found',
        },
        404,
      );
    }
  }
}
