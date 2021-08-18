import { type } from 'os';
import { TimestampEntities } from 'src/generic/timestamp.entities';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cv')
export class CvEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column({ length: 50 })
  job: string;

  @Column({ length: 50 })
  path: string;

  @Column({ length: 3000 })
  url: string;

  @ManyToOne((type) => UserEntity, (user) => user.cvs, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  user: UserEntity;
}
