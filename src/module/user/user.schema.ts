import { ObjectType, Field } from '@nestjs/graphql';
 import { Document, Schema as MongooSchema, Types } from 'mongoose';
 import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from '../book/book.schema';

 @ObjectType()
 @Schema()
 export class User extends Document {
   // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
   // In other words, that decorator isn't necessary for Rest APIs

   @Field(() => String)
   _id: MongooSchema.Types.ObjectId;

   // Add user properties
   @Field(() => String)
   @Prop()
   name: string;

   @Field(() => String)
   @Prop({ unique: true })
   email: string;

   @Field(() => String)
   @Prop()
   password: string;

   @Field(() => String)
   @Prop()
   address: string;


   @Field(() => [Book]) // Specify the relationship to the Book model
  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Book' }] }) // Define a field to store an array of Book IDs
  books: Types.ObjectId[];
   // TODO: ADD RELATIONSHIP TO THE BOOK MODEL
 }

 export type UserDocument = User & Document;
 export const UserSchema = SchemaFactory.createForClass(User);