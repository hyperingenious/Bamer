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

  return loginData;
}

// create userData row
async function createUserDataRow(uuid: string) {
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
      if (session) createUserDataRow(session.user.id);
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

// get session
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session;
  } else {
    return null;
  }
}

// get user object
export async function getUser() {
  const session = await getSession();
  if (!session) throw new Error("Not logged in");

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  return data?.user;
}

//LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return null;
}
