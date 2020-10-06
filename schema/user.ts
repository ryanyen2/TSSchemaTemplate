import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
// import { BaseClass, NField } from './baseClass';


// function ObjectAndType(){
//     @ObjectType()
//     class User;
//     @InputType()
//     class User;
// }

// @InputType("UserInput")
@ObjectType()
export class User 
// extends BaseClass
{
	@Field() @prop() name: string;
	@Field() @prop() age: number;
	@prop() hashedPassword: string;
	@prop() salt: string;

}