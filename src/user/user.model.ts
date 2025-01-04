import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'users' })
export class User {
  @Field(type => ID)
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => Int)
  age: number

  @Field()
  createDate: Date
}