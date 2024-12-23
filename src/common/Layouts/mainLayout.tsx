import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from "../../../public/kokomattoLogo.svg";
import MainRoutes from "../../Routes/mainRoutes";
import { Package } from "lucide-react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "category",
    title: "Categories",
    icon: <Package />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "none",
        },
      },
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: "12px",
        px: "17px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F9F3",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <MainRoutes />
    </Box>
  );
}

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <p>Language</p>
      <p>User</p>
      <p>Options</p>
    </Stack>
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img src={logo} alt="KOKOMATTO" />
    </Stack>
  );
}

export default function DashboardLayoutSlots() {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
