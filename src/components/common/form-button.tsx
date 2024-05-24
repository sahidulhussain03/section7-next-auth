"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface IFormButtonProps {
  children: React.ReactNode;
}

const FormButton = ({ children }: IFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
};

export default FormButton;
