import { type } from 'os';
import { CvEntity } from 'src/cv/entities/cv.entity';
import { UserRole } from 'src/enum/User.Role';
import { TimestampEntities } from 'src/generic/timestamp.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 2000 })
  password: string;

  @Column({ length: 2000 })
  salt: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    cascade: true,
    nullable: true,
  })
  cvs: CvEntity[];
}
