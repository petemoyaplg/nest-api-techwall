import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enum/User.Role';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AddCvDto, UpdateCvDto } from './dto/cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async addCv(cv: AddCvDto, user: any): Promise<CvEntity> {
    const newCv = this.cvRepository.create(cv);
    newCv.user = user;
    return await this.cvRepository.save(newCv);
  }

  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    const newCv = await this.cvRepository.preload({ id, ...cv });
    if (!newCv) throw new NotFoundException(`l'id ${id} n'existe pas `);
    return await this.cvRepository.save(newCv);
  }

  async findAll(user): Promise<CvEntity[]> {
    if (user.role === UserRole.ADMIN) return await this.cvRepository.find();
    return await this.cvRepository.find({ user });
  }

  async findOne(id: number, user): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne(id);
    if (!cv) throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    if (user.role === UserRole.ADMIN || cv.user.id === user.id) {
      return cv;
    }
    throw new UnauthorizedException(
      "Cette personne n'a pas l'authorisation requise",
    );
  }

  async removeCv(id: number, user): Promise<CvEntity> {
    const cvRemove = await this.cvRepository.findOne(id);
    if (!cvRemove)
      throw new NotFoundException(`le cv d'id ${id} n'existe pas `);
    if (user.role === UserRole.ADMIN || cvRemove.user.id === user.id) {
      return await this.cvRepository.remove(cvRemove);
    }
    throw new UnauthorizedException(
      "Cette personne n'a pas l'authorisation requise",
    );
  }

  async deleteCv(id: number, user): Promise<any> {
    const cvdelete = await this.cvRepository.findOne(id);
    if (!cvdelete)
      throw new NotFoundException(`le cv d'id ${id} n'existe pas `);
    if (user.role === UserRole.ADMIN || cvdelete.user.id === user.id) {
      return await this.cvRepository.delete(id);
    }
    throw new UnauthorizedException(
      "Cette personne n'a pas l'authorisation requise",
    );
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
