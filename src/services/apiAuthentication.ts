import { supabase } from "../supabase";

type registerCredentials = {
  email: string;
  password: string;
};

export async function userLogin({ email, password }: registerCredentials) {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    console.error(loginError);
    throw loginError;
  }
  console.log(loginData);

  return loginData;
}
export async function userSignUp({ email, password }: registerCredentials) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    console.error(signUpError);
    throw signUpError;
  }
  console.log(signUpData);

  return signUpData;
}
