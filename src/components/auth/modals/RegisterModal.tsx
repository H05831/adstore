"use client";

import { registerUser } from "@/actions/register";
import Button from "@/components/Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import ActionLabel from "../ActionLabel";
import AuthModal from "./AuthModal";

const RegisterModal = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isPending, startTransition] = useTransition();

  const toggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const googleAuth = () => {
    signIn("google");
  };

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      const data = await registerUser(values);

      reset();

      data?.error && toast.error(data.error);
      data.success && toast.success(data.success);
    });
  };

  const bodyContent = (
    <>
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
          {errors.email && (
            <p className="text-red-600 text-xs sm:text-sm -mt-2 sm:-mt-4">
              {errors.email.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full max-w-xs h-12 border-2 border-gray-300 rounded-lg px-3 sm:px-4 outline-none text-sm sm:text-base"
          />
          {errors.username && (
            <p className="text-red-600 text-xs sm:text-sm -mt-2 sm:-mt-4">
              {errors.username.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full max-w-xs h-12 border-2 border-gray-300 rounded-lg px-3 sm:px-4 outline-none text-sm sm:text-base"
          />
          {errors.password && (
            <p className="text-red-600 text-xs sm:text-sm -mt-2 sm:-mt-4">
              {errors.password.message}
            </p>
          )}
          <Button
            type="submit"
            label="CREATE ACCOUNT"
            large
            disabled={isPending}
          />
        </form>
        <div className="text-center text-neutral-500 text-xs sm:text-sm -my-2 sm:-my-3">
          or
        </div>
        <Button
          label="Sign up with Google"
          outline
          icon={FcGoogle}
          onClick={googleAuth}
        />
      </div>
      <ActionLabel
        label="Already have an account?"
        secondaryLabel="Sign in"
        onClick={toggleModal}
      />
    </>
  );

  return (
    <AuthModal
      body={bodyContent}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    />
  );
};

export default RegisterModal;
