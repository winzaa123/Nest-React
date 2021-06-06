import { PrimaryGeneratedColumn, Column, Entity, OneToMany,ManyToOne,CreateDateColumn,UpdateDateColumn, Index,PrimaryColumn,Unique, Timestamp } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;



    @Index('email')
    @Column({unique:true})
    email: string;

    @Index('name')
    @Column({nullable:true})
    name: string;

    // @Field({nullable:true})
    @Column({nullable:true})
    password: string;


    roles: string[] = [];



  @OneToMany(type => UserSocial, v => v.user, { lazy: true })
  userSocials: UserSocial[];


}


@Entity()
export class UserSocial  {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Index('providerId')
    @Column()
    providerId: string

    @Index('providerName')
    @Column()
    providerName: string

    @ManyToOne(type => User, v =>  v.id,{lazy:true})
    user: User

    @Column({ type: 'bigint' })
    userId: number;

}
