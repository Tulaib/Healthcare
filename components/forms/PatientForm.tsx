"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import 'react-phone-number-input/style.css'

const PatientForm = () => {
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };
      console.log("userData", userData);
      const user: any = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
      console.log("form", user);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  }

  const [isLoading, setisLoading] = useState(false);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <section className="mb-12  spcae-y-4">
            <h1 className="header">Hi there</h1>
            <p className=" text-dark-700">Schedule your first appointment.</p>
          </section>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full name"
            placeholder="Jhon Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="Jhon@gmail.com"
            // iconSrc="/assets/icons/email.svg"
            // iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="+92 307 2991222"
            // iconSrc="/assets/icons/phone.svg"
            // iconAlt="email"
          />
          {/* <Button type="submit">Submit</Button> */}
          <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};
export default PatientForm;
