import { validateFavoriteInput } from "@/lib/validations/favoriteValidation";
import {
  findAllFavorites,
  insertFavorite,
  deleteFavorite,
} from "@/lib/repositories/favoriteRepository";

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, error: validation.error, status: 400 };
  }

  const data = await insertFavorite(body.user_id);
  return { success: true, data, status: 201 };
}

export async function removeFavorite(userId) {
  if (!userId) {
    return { success: false, error: "user_id wajib diisi", status: 400 };
  }

  await deleteFavorite(userId);
  return { success: true, data: { ok: true }, status: 200 };
}

