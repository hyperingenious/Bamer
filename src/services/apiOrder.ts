import { supabase } from "../supabase";

export async function placeOrder() {
  const { data, error: userDataError } = await supabase
    .from("User-data")
    .select("user_orders")
    .eq("user_id", 1);

  if (userDataError) throw userDataError;
  const stored_data = data[0].user_orders;

  const { data: submittedData, error } = await supabase
    .from("User-data")
    .update({ user_orders: [...stored_data, { name: "Keshav" }] })
    .eq("user_id", 1)
    .select();

  if (error) throw error;
  console.log(submittedData);
}
