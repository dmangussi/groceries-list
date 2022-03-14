import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'list' })
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  description: string;
}
