import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { NewUser, users } from "./schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user[0]) throw new Error("User not found");

    return { data: user[0], error: null };
  } catch (error: any) {
    return { data: null, error: (error as Error).message };
  }
};
export const updateUser = async (email: string, payload: NewUser) => {
  try {
    const user = await db
      .update(users)
      .set(payload)
      .where(eq(users.email, email))
      .returning();

    if (!user[0]) throw new Error("User not found");

    return { data: user[0], error: null };
  } catch (error: any) {
    return { data: null, error: (error as Error).message };
  }
};

// const loginWithProvider = async (email:string) => {
//   const user = await getUserByEmail(email);
//   if (!user.data) {

//     return { data: null, error: "User not found" };
//   }
//   return { data: user.data, error: null };

// }
