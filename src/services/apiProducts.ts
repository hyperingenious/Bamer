import { supabase } from "../supabase";

export async function getProductsData(query: string) {
  const { data: Products, error } = await supabase
    .from("Products")
    .select("*")
    .ilike("description", `%${query}%`);

  if (error) throw error;

  return Products;
}

export async function getProduct(query: string) {
  const { data: Product, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", query);
  if (error) throw error;
  return Product;
}
