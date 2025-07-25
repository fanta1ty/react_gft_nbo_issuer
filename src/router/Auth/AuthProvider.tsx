import {
  useEffect,
  useMemo,
  useState,
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useQueryParam } from "use-query-params";
import { Box, CircularProgress } from "@mui/material";
import useGetUserByEmail, { UserType } from "@/api/useGetUserByEmail";

export type AuthContextType = Partial<UserType> & {
  login: (username: string, password: string, staySignedIn: boolean) => void;
  logout: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

const AUTH_TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isInitialAuthChecked, setIsInitialAuthChecked] = useState(false);
  const navigate = useNavigate();
  const [from] = useQueryParam("from");
  const storedAuthToken = localStorage.getItem(AUTH_TOKEN_KEY);

  const {
    data,
    isError,
    isLoading,
    isSuccess,
    mutate: getUserByEmail,
    reset,
    error,
  } = useGetUserByEmail({
    onSuccess(_, variables) {
      const { authToken, staySignedIn } = variables;
      axios.defaults.headers.common["Authorization"] = "Basic " + authToken;
      if (staySignedIn || storedAuthToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
      }
      if (from) {
        navigate(from);
      }
    },
    onSettled: () => setIsInitialAuthChecked(true),
  });

  useEffect(() => {
    if (storedAuthToken) {
      let email = "";

      try {
        email = atob(storedAuthToken)?.split(":")?.[0];
      } catch {
        console.error("Incorrect authToken");
        setIsInitialAuthChecked(true);
      }

      if (email) {
        getUserByEmail({ email, authToken: storedAuthToken });
      }
    } else {
      setIsInitialAuthChecked(true);
    }
  }, [getUserByEmail, storedAuthToken]);

  const login = useCallback(
    (email: string, password: string, staySignedIn: boolean) => {
      const authToken = btoa(`${email}:${password}`);
      getUserByEmail({ email, authToken, staySignedIn });
    },
    [getUserByEmail],
  );

  const logout = useCallback(() => {
    reset();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, [reset]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      isLoading,
      isSuccess,
      isError,
      errorMessage: error?.response?.data,
      ...data,
    }),
    [login, logout, isLoading, isSuccess, data, isError, error],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading || !isInitialAuthChecked ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
