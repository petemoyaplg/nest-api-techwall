import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginCredentialDto, UserSubscribeDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({ ...userData });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    return { id: user.id, email: user.email, password: user.password };
  }

  async login(credentials: LoginCredentialDto) {
    const { username, password } = credentials;
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username OR user.password = :password')
      .setParameters({ username, password })
      .getOne();

    if (!user) {
      throw new NotFoundException("L'email ou le password est incorecte");
    }
    const hashedPassword = await bcrypt.hash(password, (await user).salt);

    if (hashedPassword === (await user).password) {
      const payload = {
        id: (await user).id,
        email: (await user).email,
        password: (await user).password,
        role: (await user).role,
      };
      const jwt = await this.jwtService.sign(payload);
      return { acces_token: jwt };
    } else {
      throw new NotFoundException("L'email ou le password est incorecte");
    }
  }
}
