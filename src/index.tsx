import { createRoot } from 'react-dom/client';
import './utils/setRem';
import './style/base.css';
import './assets/iconfonts/iconfont.css';
import {RouterProvider} from "react-router";
import router from "@/router";

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);
