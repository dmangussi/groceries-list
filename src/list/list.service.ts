import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto) {
    const count = await this.countByDescription(createListDto.description);
    if (count > 0) {
      throw new HttpException('List already exists', HttpStatus.BAD_REQUEST);
    }

    return this.listRepository.save(createListDto);
  }

  findAll() {
    return this.listRepository.find();
  }

  findOne(id: string) {
    return this.listRepository.findOne(id);
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const count = await this.countByDescription(updateListDto.description);
    if (count > 0) {
      throw new HttpException('List already exists', HttpStatus.BAD_REQUEST);
    }

    return this.listRepository.update(id, updateListDto);
  }

  remove(id: string) {
    return this.listRepository.delete(id);
  }

  private async countByDescription(description: string) {
    return await this.listRepository
      .count({
        description: description,
      })
      .then((result) => result);
  }
}
