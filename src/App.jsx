import CustomRoute from "./CustomRoute";
import { BrowserRouter } from "react-router-dom";
import { useMode } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CustomRoute />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
