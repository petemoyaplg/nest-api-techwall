import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntities {
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updateAte: string;

  @DeleteDateColumn()
  deleteAte: Date;
}
