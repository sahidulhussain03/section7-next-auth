"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

interface IPostCreateFormProps {
  slug: string;
}

const PostCreateForm = ({ slug }: IPostCreateFormProps) => {
  const [formState, action] = useFormState(
    actions.CreatePost.bind(null, slug),
    { errors: {} }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary"> Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-200 rounded">
                {formState.errors._form?.join(", ")}{" "}
              </div>
            ) : null}

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
