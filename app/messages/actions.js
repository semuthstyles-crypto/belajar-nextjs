"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteMessageAction(formData) {
  const supabase = await createClient();
  const id = formData.get("id");

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/messages");
}