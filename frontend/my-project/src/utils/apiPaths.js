export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
  },
  USER:{
    GET_PROFILE: "/api/user/user-profile",
  },
  POSTS: {
    CREATE: "/api/posts",
    GET_ALL: "/api/posts",
    GET_USER_POSTS: (userId) => `/api/posts/user/${userId}`,
  }
};
