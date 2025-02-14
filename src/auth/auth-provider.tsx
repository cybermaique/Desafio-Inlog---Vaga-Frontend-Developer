import { useEffect, useState } from "react";

import { initKeycloak } from "./keycloak";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = async (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  useEffect(() => {
    initKeycloak(handleAuthentication);
  }, []);

  return isAuthenticated ? children : null;
};

export default AuthProvider;
