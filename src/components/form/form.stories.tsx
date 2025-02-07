import * as React from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Meta } from "@storybook/react";

import { Button } from "../button";
import { Input } from "../input";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from ".";

const meta = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"]
} satisfies Meta<typeof Form>;
export default meta;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
});

export function FormStory() {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  function formSubmitHandler() {
    console.log("Submitted");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel caption="Required">Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Form>
  );
}

// export const Default = {
//   render: () => <FormStory />,
//   args: {
//     children: <div></div>
//   }
// };
