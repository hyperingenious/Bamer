import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Menu,
  rem,
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import {
  IconLogout,
  IconChevronDown,
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconShoppingCart,
  IconPackage,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { getProductsData } from "../services/apiProducts";

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

const data = {
  user: {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
};

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();

  useEffect(function () {
    async function jaiHo() {
      await getProductsData('mart');
    }
    jaiHo();
  }, []);

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius={"md"}
      size="xs"
      rightSection={
        <ActionIcon
          size={"xs"}
          radius="md"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search questions"
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default function HeaderTabs() {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <h6>
            <strong>BAMER</strong>
          </h6>

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
                  <Avatar
                    src={data.user.image}
                    alt={data.user.name}
                    radius="xl"
                    size={20}
                  />
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconShoppingCart size="0.9rem" stroke={1.5} />}>
                Cart
              </Menu.Item>
              <Menu.Item icon={<IconPackage size="0.9rem" stroke={1.5} />}>
                My Orders
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<IconLogout size="0.9rem" stroke={1.5} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}