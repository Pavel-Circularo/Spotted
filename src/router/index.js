import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EmailConfirmationView from "@/views/EmailConfirmationView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import UploadCarView from "@/views/UploadCarView.vue";
import GalleryView from "@/views/GalleryView.vue";
import RecognizeCarView from "@/views/RecognizeCarView.vue";
import useAuthUser from "@/composables/UseAuthUser.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/email-confirmation",
    name: "EmailConfirmation",
    component: EmailConfirmationView,
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPasswordView,
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPasswordView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/components/Shared/Profile.vue"),
  },
  {
    path: "/upload-car",
    name: "UploadCar",
    meta: {
      requiresAuth: true,
    },
    component: UploadCarView,
  },
  {
    path: "/gallery",
    name: "Gallery",
    meta: {
      requiresAuth: true,
    },
    component: GalleryView,
  },
  {
    path: "/recognize-car",
    name: "RecognizeCar",
    meta: {
      requiresAuth: true,
    },
    component: RecognizeCarView,
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      alert("Logged out");
      return { name: "Login" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
});

export default router;
