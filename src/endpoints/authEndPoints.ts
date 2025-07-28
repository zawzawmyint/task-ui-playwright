import axios from "axios";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token: string;
};

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const userData = {
      email: credentials.email,
      password: credentials.password,
    };

    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    const response = await axios.post(url, userData);

    return {
      success: true,
      token: response.data.data.token,
    };
  } catch (error: unknown) {
    // Handle the error appropriately
    if (axios.isAxiosError(error)) {
      // This is an Axios error, you can access error.response, error.request, etc.
      throw new Error(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    } else {
      // This is some other kind of error
      throw new Error("An unexpected error occurred during login");
    }
  }
}
