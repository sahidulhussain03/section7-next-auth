'use server'
import type { Post } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import path from "path";
import paths from "@/utils/paths";
import { redirect } from "next/navigation";


const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

interface ICreatePostFormState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    }
}

export const CreatePost = async (
    slug: string,
    formState: ICreatePostFormState,
    formData: FormData)
    : Promise<ICreatePostFormState> => {

    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    });

    if (!result.success) {
        return {
            errors: result.error?.flatten().fieldErrors
        }
    }
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must sign in to perform this action."]
            }
        }
    }

    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if (!topic) {
        return {
            errors: {
                _form: ["Cannot find the topic."]
            }
        }
    }


    let post: Post;

    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: "asdf",
                topicId: topic.id
            }
        });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}
