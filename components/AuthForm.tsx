"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { custom, z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { SignIn, SignUp } from "@/lib/actions/auth.action";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const customFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  // Definition or Schema.
  const formSchema = customFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //  submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await SignUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          // password,
        });
        console.log(result);
        if (!result.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("User created successfully");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCreadentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCreadentials);
        const idToken = await userCreadentials.user.getIdToken();
        if (!idToken) {
          toast.error("sign in failed");
          return;
        }
        await SignIn({ email, idToken });

        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error Occured:${error}`);
    }
  }
  const isSignin = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[570px] ">
      <div className="flex flex-col card justify-center  px-5 py-3 gap-1">
        <div className="flex justify-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={32} />
          <h3>PrepWise</h3>
        </div>
        <p className="text-center">Connect to Virtual AI Interview Platform</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" mt-2 w-full space-y-5"
          >
            {!isSignin && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter you name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter you email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter you Password"
              type="password"
            />

            <Button type="submit" className="w-full rounded-4xl font-bold mt-1">
              {isSignin ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center mt-2">
          {isSignin ? "Dont Have an Account?" : "Have an account already?"}
          <Link href={isSignin ? "/sign-up" : "/sign-in"} className="font-bold">
            {isSignin ? " Sign up" : " Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
