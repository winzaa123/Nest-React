import { PrimaryGeneratedColumn, Column, Entity, OneToMany,ManyToOne,CreateDateColumn,UpdateDateColumn, Index,PrimaryColumn,Unique, Timestamp } from "typeorm";

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


@Entity()
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    id?: number;



    @Index('email')
    @Column({unique:true})
    @ApiProperty({ example: "abcca@bar.com", description: 'Email' })
    email: string;

    @Index('name')
    @Column({nullable:true})
    @ApiProperty({ example: "foobar", description: 'Name' })
    name?: string;

    // @Field({nullable:true})
    @Column({nullable:true,select:false})
    @ApiPropertyOptional({   description: 'secret' })
    password: string;

    @ApiPropertyOptional({  example:["addUser"], description: 'user permission slug' })
    roles?: string[] = [];



  @OneToMany(type => UserSocial, v => v.user, { lazy: true })
  userSocials?: UserSocial[];


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
