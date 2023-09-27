import { Anchor, Container, Title } from "@mantine/core";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, userLogin, userSignUp } from "../services/apiAuthentication";

export default function Register() {
  const [registerMethod, setRegisterMethod] = useState(true); // true: login method | false: signup method
  const navigate = useNavigate();

  useEffect(
    function () {
      async function checkLoggedIn() {
        try {
          const response = await getUser();
          if (response !== null) navigate("/");
        } catch (error) {
          return null;
        }
      }
      checkLoggedIn();
    },
    [navigate]
  );

  return (
    <Container size={"lg"}>
      <Title>{registerMethod ? "Welcome Back!" : "Be a member"}</Title>
      <p>
        {registerMethod ? "Do not have an account yet?" : "Already a member? "}
        <Anchor onClick={() => setRegisterMethod((method) => !method)}>
          {registerMethod ? " create account" : " login"}
        </Anchor>
      </p>

      <Form method="POST">
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <input
          type="hidden"
          name="registerMethod"
          value={registerMethod ? "login" : "signUp"}
        />
        <button>{registerMethod ? "Login" : "Create Account"}</button>
      </Form>
    </Container>
  );
  // return (
  //   <Container size={420} my={40}>
  //     <Title
  //       align="center"
  //       sx={(theme) => ({
  //         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  //         fontWeight: 900,
  //       })}
  //     >
  //       {registerMethod ? "Welcome back!" : "Create Account"}
  //     </Title>
  //     <Text color="dimmed" size="sm" align="center" mt={5}>
  //       {registerMethod ? "Do not have an account yet? " : "Already a member? "}
  //       <Anchor
  //         size="sm"
  //         component="button"
  //         onClick={() => setRegisterMethod(!registerMethod)}
  //       >
  //         {registerMethod ? "Create Account" : "Login"}
  //       </Anchor>
  //     </Text>

  //     <Paper withBorder shadow="md" p={30} mt={30} radius="md">
  //       <Form method="POST">
  //         <TextInput label="Email" placeholder="you@example.com" required />
  //         <PasswordInput
  //           label="Password"
  //           placeholder="Your password"
  //           required
  //           mt="md"
  //         />
  //         {registerMethod && (
  //           <Group position="apart" mt="lg">
  //             <Checkbox label="Remember me" />
  //             <Anchor component="button" size="sm">
  //               Forgot password?
  //             </Anchor>
  //           </Group>
  //         )}
  //         <Button fullWidth mt="xl">
  //           {registerMethod ? "Sign in" : "Sign up"}
  //           {/* <Loader color="indigo" size={'sm'}/> */}
  //         </Button>
  //       </Form>
  //     </Paper>
  //   </Container>
  // );
}

export async function action({ request }: { request: any }): Promise<null> {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (data.registerMethod === "login") {
      await userLogin({
        email: data.email,
        password: data.password,
      });

      window.location.href = "http://localhost:5173";
    }

    if (data.registerMethod === "signUp") {
      await userSignUp({ email: data.email, password: data.password });
    }

    return null;
  } catch (e) {
    console.error(e, "heyError this side");
    return null;
  }
}
