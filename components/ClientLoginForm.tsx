"use client"
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
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

const ClientLoginForm = ({ login }: { login: () => Promise<void> }) => {
  const form = useForm<z.infer<typeof clientLoginFormSchema>>({
    resolver: zodResolver(clientLoginFormSchema),
    defaultValues: {
      email: "",
    },
  })
  return (
    <>
      <Button
        variant="outline"
        onClick={login}
        className="w-[90%] p-2"
      >
        <Image src="/google-icon-2048x2048.png" alt="google" width={20} height={20} />
        <p className="ml-5">
          Login using your Google Account
        </p>
      </Button>
      <Separator />
    </>
  )
}

export default ClientLoginForm

