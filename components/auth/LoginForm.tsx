"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CardWrapper } from "./CardWrapper";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isPending = false;
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const { email, password } = values;
      await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess(context) {
            console.log("Sign up success", context);
          },
          onError: (ctx) => {
            console.log("Sign up error", ctx);
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      headerDescription="Enter your details to login"
      backButtonHref="/register"
      semiButtonLabel="Sign up"
      type="in"
    >
      <div className="rounded-lg w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleLogin)}
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password*</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPending}
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute  right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      <p className="mt-1 mb-3 text-regular font-[500] text-[13px]">
                        Must be at least 8 characters.
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full shadow-md"
            >
              {/* {isPending && <SvgLoading />} */}
              <p className="mt-[0.2rem]"> Sign In</p>
            </Button>
            {/* {isError && <FormError message={error.message} />}
            {isSuccess && <FormSuccess message={data.message} />} */}
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;
