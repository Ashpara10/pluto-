"use server";
import { revalidateDocumentData } from "@/app/(dashboard)/w/[workspace]/document/[id]/actions";
import { eq } from "drizzle-orm";
import { CreateDocumentPayload } from "../types";
import { db } from "./drizzle";
import { documents } from "./schema";

export const getDocumentById = async (id: string) => {
  try {
    const res = await db
      .select()
      .from(documents)
      .where(eq(documents?.id, id))
      .limit(1);

    if (res.length === 0) {
      throw new Error("Document not found");
    }
    return { data: res[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const updateDocument = async ({
  content,
  id,
  title,
  tags,
  markdown,
}: {
  id: string;
  title: string;
  content: string;
  markdown: string;
  tags: string[];
}) => {
  try {
    const document = await db
      .update(documents)
      .set({
        title: title,
        content: content,
        markdown: markdown,
        tags: tags,
      })
      .where(eq(documents.id, id))
      .returning();
    // console.log({ document });

    if (document.length === 0) {
      throw new Error("Failed to save document");
    }
    await revalidateDocumentData("/(dashboard)/w/[workspace]/document/[id]");
    return { data: document, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
export const createDocument = async ({
  user,
  workspaceId,
  collectionId,
}: CreateDocumentPayload) => {
  try {
    const document = await db
      .insert(documents)
      .values({
        title: `Untitled Document`,
        content: "",
        markdown: "",
        authorId: user,
        workspaceId: workspaceId!,
        collectionId: collectionId!,
      })
      .returning();

    if (document.length === 0) {
      throw new Error("Failed to create document");
    }
    return { data: document[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const deleteDocuments = async (ids: string[]) => {
  try {
    ids.map(async (id) => {
      await db.delete(documents).where(eq(documents.id, id));
    });
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
};

const movetoCollection = async ({
  documentsToMove,
  collectionId,
}: {
  documentsToMove: string[];
  collectionId: string;
}) => {
  try {
    documentsToMove?.map(async (doc) => {
      await db
        .update(documents)
        .set({
          collectionId: collectionId,
        })
        .where(eq(documents.id, doc));
    });
    // revalidateDocumentData("/(dashboard)/w/[workspace]");
    // revalidateDocumentData("/(dashboard)/w/[workspace]/collection/[slug]");
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
