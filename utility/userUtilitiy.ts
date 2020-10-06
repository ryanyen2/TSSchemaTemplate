import type { User } from './../schema/user/user';

export default function maleProbability(user: Partial<User>): number{
	if (!user.age) {
		return 0;
	}
	if (user.age > 20)
	{
		return 1
	} else
	{
		return 0;
	}
}