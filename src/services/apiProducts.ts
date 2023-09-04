import { supabase } from "../supabase";

export async function getProductsData(query: string) {
  const { data: Products, error } = await supabase
    .from("Products")
    .select("*")
    .ilike("category", `%${query}%`);

    console.log(error)

  if (error) throw Error(`Something went wrong ${error}`);

  console.log(Products);
}
