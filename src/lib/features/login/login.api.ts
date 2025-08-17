import { baseApi } from "@/lib/store/api/api";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string | null;
    createdAt: string;
  };
  token: string;
}

export const loginApiWithEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (args) => ({
        url: "/login",
        method: "POST",
        body: { ...args },
      }),
    }),
  }),
});

export const { useUserLoginMutation } = loginApiWithEndpoints;
