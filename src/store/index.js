import { createStore } from "vuex";
import { authModule } from "./authModule";
import { whatsAppModule } from "./whatsAppModule";

export default createStore({
  modules: {
    auth: authModule,
    whats: whatsAppModule
  }
})