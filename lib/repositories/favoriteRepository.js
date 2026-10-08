import { createClient } from "@/lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*, app_users(*)");

  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .insert({ user_id: userId })
    .select("*, app_users(*)")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavorite(userId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return true;
}