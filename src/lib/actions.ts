import {
  Collection,
  Document,
  NewUser,
  users,
  Workspace,
} from "@/lib/db/schema";
import { compare, hash } from "bcryptjs";
import { getCookie, setCookie } from "cookies-next";
import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";
import { instance } from "./axios";
import { db } from "./db/drizzle";
import { SortDocumentBy } from "./types";
import { getAvatarByUserInitials } from "./utils";

const key = new TextEncoder().encode("532d15e19a1c159dda7474c6c773ff87");
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

export async function signToken(payload: Workspace) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
  return token;
}

export async function verifyJWTPayload(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export const RegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
  image: z.string().optional(),
});

export const register = async (payload: z.infer<typeof RegisterSchema>) => {
  const { email, image, name, password } = payload;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  // console.log({ existingUser });
  if (existingUser.length > 0) {
    return {
      data: null,
      error: `User with email ${existingUser[0]?.email} already exists`,
    };
  }
  const passwordHash = await hashPassword(password);
  const newUser: NewUser = {
    image: image || getAvatarByUserInitials(name) || null,
    name,
    email,
    passwordHash,
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();
  if (!createdUser) {
    return { data: null, error: "Failed to create user. Please try again." };
  }
  return { data: createdUser, error: null };
};

// Collection actions
export const getAllCollections = async (workspace: string) => {
  const res = await instance.get(`/collection`, {
    params: {
      workspace: workspace,
    },
  });
  // console.log(res?.data);
  if (!res.data) {
    return { data: null, error: "Failed to fetch collections" };
  }
  return { data: res.data.data, error: null } as {
    data: { collection: Collection; documents_count: string }[];
    error: null;
  };
};

type GetCollectionDocumentsResponse = {
  collection: Collection;
  documents: Document[];
}[];

export const getCollectionDocuments = async ({
  slug,
  sortBy,
  workspace,
}: {
  slug: string;
  workspace: string;
  sortBy: SortDocumentBy;
}) => {
  const { data, status } = await instance.get(`/collection/${slug}`, {
    params: {
      workspace: workspace,
      sortBy: sortBy,
    },
  });
  if (status !== 201) {
    return { data: null, error: "Failed to fetch documents" };
  }

  return {
    data: data?.data,
    error: null,
  };
};

// Document actions
export const fetchDocuments = async (
  workspace: string,
  sortBy: SortDocumentBy
) => {
  const res = await instance.get("/document", {
    params: {
      workspace: workspace,
      sortBy: sortBy,
    },
  });
  if (!res?.data) {
    return { data: null, error: "Failed to fetch documents" };
  }

  return { data: res.data?.documents as Document[], error: null };
};
