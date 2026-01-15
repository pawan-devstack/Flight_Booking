import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

const AUTH_USER_KEY = "auth_user";
const AUTH_USERS_KEY = "auth_users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user on refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const saveAllUsers = (users) => {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  };

  const signup = ({ name, email, password }) => {
    const users = getAllUsers();
    const existing = users.find((u) => u.email === email);
    if (existing) throw new Error("User with this email already exists");

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveAllUsers(users);

    const publicUser = { id: newUser.id, name, email };
    setUser(publicUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    return publicUser;
  };

  const login = ({ email, password }) => {
    const users = getAllUsers();
    const existing = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!existing) throw new Error("Invalid email or password");

    const publicUser = {
      id: existing.id,
      name: existing.name,
      email: existing.email
    };

    setUser(publicUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    return publicUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      signup,
      login,
      logout
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
