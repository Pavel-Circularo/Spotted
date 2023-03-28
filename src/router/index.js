import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EmailConfirmationView from "@/views/EmailConfirmationView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import UploadCarView from "@/views/UploadCarView.vue";
import GalleryView from "@/views/GalleryView.vue";
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
    path: "/me",
    name: "Me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/components/Shared/Me.vue"),
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
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
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
