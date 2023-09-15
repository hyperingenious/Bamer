import { supabase } from "../supabase";

type registerCredentials = {
  email: string;
  password: string;
};

/**
 * function for user login
 * @param param0 {email, password}
 * @returns Login JSON{} | error
 */
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

// create userData row
async function createUserDataRow(uuid) {
  const { error } = await supabase
    .from("Userdata")
    .insert([{ id: uuid }])
    .select();

  if (error) throw error;
  return null;
}

// signup function
export async function userSignUp({ email, password }: registerCredentials) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      createUserDataRow(session?.user.id);
    }
  });

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error(signUpError);
    throw signUpError;
  }

  return null;
}

// get user object
export async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  if (!session) throw new Error("Not logged in");

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  console.log(data.user);

  return data?.user;
}

//LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return null;
}
