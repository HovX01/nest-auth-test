import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  bio?: string;

  // @JoinColumn()
  // @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  // user: User;
}
