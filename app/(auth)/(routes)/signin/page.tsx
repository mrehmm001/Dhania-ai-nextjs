"use client";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AmplifyProvider from "@/components/amplify-provider";

const signUpSchema = z.object({
  username: z.string().min(6, "Username is required"),
  password: z.string().min(8, "Password is required"),
});

type LoginFields = z.infer<typeof signUpSchema>;

export default function Page() {
  const { register, handleSubmit, trigger } = useForm<LoginFields>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async ({ username, password }: LoginFields) => {
    const isValid = await trigger();
    if (isValid) {
      try {
        const user = await Auth.signIn(username, password);
        console.log(user);
        user && router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <AmplifyProvider privateRoute={false}>
      <div
        className="container mx-auto h-screen flex justify-center items-center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <form className="flex flex-col gap-2 border border-black p-8 rounded-lg ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Button className="bg-blue-950">Submit</Button>
          </div>
        </form>
      </div>
    </AmplifyProvider>
  );
}