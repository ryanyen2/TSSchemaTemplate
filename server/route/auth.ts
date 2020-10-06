import type { User } from './../../schema/user/user';


// Trying to resolve the type for this auth checker is very sophisticated, I suggest you find me.

const registered_user: User[] = [];

export function registerNewUser(newUser: User) {
	registered_user.push(newUser);
}

export const authChecker = (
	{ root, args, context, info },
	roles,
) =>
{

	
	return true;
	// if (context.isUnauthenticated())
	// {
	// 	return false;
	// }

	// const currUser = <AuthType>context.getUser();
	// // console.log(currUser.type)
	// return roles
	// 	.map(
	// 		(role) =>
	// 		{
	// 			return currUser.type >= AuthLevel[role];
	// 		}
	// 	)
	// 	.reduce(
	// 		(x, y) => x || y,  // if any role is compatible it means he is compatible
	// 		false
	// 	);
};