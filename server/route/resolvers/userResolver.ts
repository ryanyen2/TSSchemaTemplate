import { User } from './../../../schema/user';
import { getModelForClass } from '@typegoose/typegoose';
import { Arg, Int, Mutation, Query, Resolver, Ctx, Authorized, Root, FieldResolver } from "type-graphql";


export const UserModel = getModelForClass(User);

@Resolver(of => User)
export class UserResolver
{
    @Query(_returns => User, { nullable: true })
    async user(@Arg('_id') _id: string)
    {
        return await UserModel.findById(_id);
    }

    // @Authorized(['ADMIN', 'MODERATOR'])
    @Query(() => [User])
    async users()
    {
        return await UserModel.find();
    }

    
    @Mutation(() => User)
    async userCreate()
    {
        const user = new UserModel();
        await user.save();
        return user;
    }

    @Authorized()
    @Mutation(() => User)
    async userUpdate(
        @Arg('_id', { nullable: false }) _id: string,
        @Arg('user', type => User) userFields: User,
        @Ctx() context: any,
    )
    {
        const user = await UserModel.findById(_id);

		if (!user){
			return null;
		}

        const currUser = context.getUser()
        

        for (let key in userFields) {
			if (currUser._id == user._id) {
				user[key] = userFields[key];
			}
        }
        
        await user.save();
        return user;
    }

}
