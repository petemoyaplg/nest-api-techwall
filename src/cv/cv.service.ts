import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto, UpdateCvDto } from './dto/cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }

  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    const newCv = await this.cvRepository.preload({ id, ...cv });
    if (!newCv) throw new NotFoundException(`l'id ${id} n'existe pas `);
    return await this.cvRepository.save(newCv);
  }

  async findAll(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async findOne(id: number): Promise<CvEntity> {
    return await this.cvRepository.findOne(id);
  }

  async removeCv(id: number): Promise<CvEntity> {
    const cvRemove = await this.cvRepository.findOne(id);
    if (!cvRemove)
      throw new NotFoundException(`la personne d'id ${id} n'existe pas `);
    return await this.cvRepository.remove(cvRemove);
  }

  async deleteCv(id: number): Promise<any> {
    const cvelete = await this.cvRepository.findOne(id);
    if (!cvelete)
      throw new NotFoundException(`la personne d'id ${id} n'existe pas `);
    return await this.cvRepository.delete(id);
  }

  async softRemoveCv(id: number): Promise<void> {
    const cvRemove = await this.cvRepository.findOne(id);
    if (!cvRemove)
      throw new NotFoundException(`la personne d'id ${id} n'existe pas `);
    await this.cvRepository.softRemove(cvRemove);
  }

  async cvNumberByAge(ageMin = 0, ageMax: number) {
    const qb = this.cvRepository.createQueryBuilder('cv');
    qb.select('cv.age, count(cv.id) as nombre_de_cv')
      .where('cv.age > :ageMin and cv.age < :ageMax')
      .setParameters({ ageMin, ageMax })
      .groupBy('cv.age');
    console.log(qb.getSql());

    return await qb.getRawMany();
  }
}
