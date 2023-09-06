import { supabase } from "../supabase";

export async function getProductsData(query: string) {
  const { data: Products, error } = await supabase
    .from("Products")
    .select("*")
    .ilike("category", `%${query}%`);

  if (error) throw error;

  return Products;
}
