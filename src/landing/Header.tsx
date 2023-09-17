import {
  createStyles,
  Container,
  UnstyledButton,
  Group,
  Menu,
  rem,
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Title,
  Text,
} from "@mantine/core";
import {
  IconLogout,
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconShoppingCart,
  IconPackage,
  IconUser,
  IconUserPlus,
  IconUserCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication, logoutUser } from "../redux/authenticationSlice";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem(120),
  },

  mainSection: {
    paddingBottom: theme.spacing.xs,
    maxWidth: "70rem !important",
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].value !== "") navigate(`product/${e.target[0].value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        style={{ maxWidth: "32rem" }}
        icon={<IconSearch size="0.5rem" stroke={1.5} />}
        radius={"md"}
        size="xs"
        rightSection={
          <ActionIcon size={"xs"} radius="xs" color={theme.primaryColor}>
            {theme.dir === "ltr" ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        placeholder="Search Products"
        rightSectionWidth={42}
        {...props}
      />
    </form>
  );
}

export default function HeaderTabs() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const { authenticated, user } = useSelector((store) => store.authentication);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!authenticated) dispatch(checkAuthentication());
    },
    [dispatch]
  );

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart" noWrap>
          <Title size={"h6"}>
            <strong>BAMER</strong>
          </Title>

          <SearchBar />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton>
                <Group spacing={7}>
                  {!authenticated ? (
                    <>
                      <IconUser />
                      <Text weight={"normal"}>Sign in</Text>
                    </>
                  ) : (
                    <>
                      <IconUserCircle />
                      <Text weight={"li"}>
                        {user?.email.slice(0, user.email.indexOf("@"))}
                      </Text>
                    </>
                  )}
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {!authenticated ? (
                <Menu.Item
                  onClick={() => navigate("register")}
                  icon={<IconUserPlus size="0.9rem" stroke={1.5} />}
                >
                  Don't have Account? <strong>SignUp</strong>
                </Menu.Item>
              ) : (
                <>
                  {" "}
                  <Menu.Item
                  onClick={()=>navigate('/cart')}
                    icon={<IconShoppingCart size="0.9rem" stroke={1.5} />}
                  >
                    Cart
                  </Menu.Item>
                  <Menu.Item icon={<IconPackage size="0.9rem" stroke={1.5} />}>
                    My Orders
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => dispatch(logoutUser())}
                    color="red"
                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  >
                    Logout
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
