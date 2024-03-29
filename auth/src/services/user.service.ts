import { User } from "../db/models";
import { UserNotFound } from "../exceptions";

/**
 * Fetch user from database.
 * @param {string} id - User id.
 */
export const getUserById = async (id: string) => {
  const user: any = await User.findOne({ where: { id } });
  if (!user) throw new UserNotFound("User not found.");
  return {
    id: user.id,
    name: user.phone,
  };
};
