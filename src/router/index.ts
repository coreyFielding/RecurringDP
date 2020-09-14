import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

Vue.use(Router);

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.tsx`);
}

const routes: RouteConfig[] = [];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: lazyLoad("root"),
    },
  ],
});

export default router;
