import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Result, User } from '@prisma/client';
import { UnitOfWork } from 'repositories';
import { CreateResultDto, GetResultDto, UpdateResultDto } from 'dtos';

@Injectable()
export class ResultService {
  constructor(
    private readonly uow: UnitOfWork,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll() {
    const user = this.request.user as User;
    if (!user) return [];

    const isAdmin = await this.uow.roleRepository.isAdmin(user);

    let models: Result[];
    if (isAdmin) {
      models = await this.uow.resultRepository.getAll();
    } else {
      models = await this.uow.resultRepository.getAll(user.id);
    }
    const dtos = models.map((model) => new GetResultDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.resultRepository.getById(id);
    const dto = new GetResultDto(model);

    return dto;
  }

  async findLatest() {
    const user = this.request.user as User;
    if (!user) return null;

    const isAdmin = await this.uow.roleRepository.isAdmin(user);

    let model: Result;
    if (isAdmin) {
      model = await this.uow.resultRepository.getLatest();
    } else {
      model = await this.uow.resultRepository.getLatest(user.id);
    }
    const dto = new GetResultDto(model);

    return dto;
  }

  async findByUserId(userId: string) {
    const models = await this.uow.resultRepository.getByUserId(userId);
    const dtos = models.map((model) => new GetResultDto(model));

    return dtos;
  }

  async findLatestByUserId(userId: string) {
    const model = await this.uow.resultRepository.getLatestByUserId(userId);
    return new GetResultDto(model);
  }

  async create(createResultDto: CreateResultDto) {
    await this.uow.resultRepository.add(createResultDto);
  }

  async update(id: string, updateResultDto: UpdateResultDto) {
    await this.uow.resultRepository.update(id, {
      date: updateResultDto.date,
      weight: updateResultDto.weight,
      bodyFatPercent: updateResultDto.bodyFatPercent,
    });
  }

  async remove(id: string) {
    await this.uow.resultRepository.delete(id);
  }
}
