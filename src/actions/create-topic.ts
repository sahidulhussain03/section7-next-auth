'use server'

import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { z } from "zod";
import { db } from "@/db";
import path from "@/utils/paths";
import { revalidatePath } from "next/cache";



const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes without spaces' }),
    description: z.string().min(10),
});

interface ICreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
}

export const CreateTopic = async (formState: ICreateTopicFormState, formData: FormData)
    : Promise<ICreateTopicFormState> => {

    const session = await auth();

    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    });

    if (!result.success) {
        return {
            errors: result.error?.flatten().fieldErrors
        }
    }

    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must sign in to perform this action."]
            }
        }
    }


    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
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

    revalidatePath('/')

    redirect(path.topicShow(topic.slug));

}
