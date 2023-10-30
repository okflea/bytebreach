
"use client"
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import clientLoginFormSchema from '@/lib/validations/clientLoginFormSchema'

const AuditorLoginForm = ({ loginGoogle, loginGithub, loginWallet }:
  {
    loginGoogle: () => Promise<void>,
    loginGithub: () => Promise<void>
    loginWallet: () => Promise<void>
  }) => {

  const form = useForm<z.infer<typeof clientLoginFormSchema>>({
    resolver: zodResolver(clientLoginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof clientLoginFormSchema>) {
    toast({
      title: "Successfully logged in",
      duration: 3000,
    })
    //login & redirect
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={loginGoogle}
        className="w-full p-2"
      >
        <Image src="/google-icon-2048x2048.png" alt="google" width={20} height={20} />
        <p className="ml-7">
          Login using your Google Account
        </p>
      </Button>

      <Button
        variant="outline"
        onClick={loginGithub}
        className="w-full p-2"
      >
        <Image src="/github-icon.png" alt="github" width={25} height={25} />
        <p className="ml-7">
          Login using your Github Account
        </p>
      </Button>

      {/* <Button */}
      {/*   variant="outline" */}
      {/*   onClick={loginWallet} */}
      {/*   className="w-full p-2" */}
      {/* > */}
      {/*   <Image src="/github-icon.png" alt="github" width={25} height={25} /> */}
      {/*   <p className="ml-7"> */}
      {/*     Login using your Wallet */}
      {/*   </p> */}
      {/* </Button> */}

      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='w-[400px]'
                    placeholder="Email Address"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-center'>
            <Button
              className='w-1/3'
              type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AuditorLoginForm

