"use client";

import { signIn } from "next-auth/react";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import AuthModal from "./AuthModal";

import { loginUser } from "@/actions/login";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { loginSchema } from "@/schemas";
import { toast } from "sonner";
import Button from "../../Button";
import ActionLabel from "../ActionLabel";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>();

  const toggleModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const GoogleAuth = () => {
    signIn("google");
  };

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const data = await loginUser(values);

      reset();

      data?.error && toast.error(data.error);
      data.success && toast.success(data.success);
    });
  };

  const bodyContent = (
    <div>
      <div className="flex flex-col gap-4 sm:gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full max-w-xs h-12 border-2 border-gray-300 rounded-lg px-3 sm:px-4 outline-none text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full max-w-xs h-12 border-2 border-gray-300 rounded-lg px-3 sm:px-4 outline-none text-sm sm:text-base"
          />
          <Button type="submit" disabled={isPending} label="LOGIN" large />
        </form>
        <div className="text-center text-neutral-500 text-xs sm:text-sm -my-2 sm:-my-3">
          or
        </div>
        <Button
          label="Login with Google"
          outline
          icon={FcGoogle}
          onClick={GoogleAuth}
        />
      </div>
      <ActionLabel
        label="Don't have an account?"
        secondaryLabel="Sign up"
        onClick={toggleModal}
      />
    </div>
  );

  return (
    <AuthModal
      body={bodyContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    />
  );
};

export default LoginModal;
