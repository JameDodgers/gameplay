import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

import * as AuthSession from 'expo-auth-session'

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

import { discordApi } from '../services/api'

interface User {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${discordApi.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        discordApi.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const { data: userData } = await discordApi.get('/users/@me');

        const firstName = userData.username.split(' ')[0];

        userData.avatar = `${CDN_IMAGE}/avatars/${userData.id}/${userData.avatar}.png`

        setUser({
          ...userData,
          firstName,
          token: params.access_token
        })

        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch (error) {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth
}