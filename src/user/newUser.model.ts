import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class NewUserInput {
  @Field({ nullable: false })
  firstName: string

  @Field({ nullable: false })
  lastName: string

  @Field(() => Int)
  age: number
}