import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import * as AuthSession from 'expo-auth-session'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLLECTION_USER } from '../configs/storage'

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
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
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

      if (type === 'success' && !params.error) {
        discordApi.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const { data } = await discordApi.get('/users/@me');

        const firstName = data.username.split(' ')[0];

        data.avatar = `${CDN_IMAGE}/avatars/${data.id}/${data.avatar}.png`

        const userData = {
          ...data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData))

        setUser(userData)
      }

    } catch (error) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(COLLECTION_USER);

      setUser({} as User);
    } catch (error) {
      console.log(error)
    }
  }

  async function loadStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USER)

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      discordApi.defaults.headers.authorization = `Bearer ${userLogged.token}`

      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadStorageData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut
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