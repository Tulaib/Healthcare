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
import CustomFormField from "../CustomFormField";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      {" "}
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
            name="username"
            label="Full name"
            placeholder="Jhon Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default PatientForm;
