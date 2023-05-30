import { userEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class productEntity
{

    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @ManyToOne(()=>userEntity,(user)=>user.product)
  user:userEntity

}