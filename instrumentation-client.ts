import { initBotId } from "botid/client/core";

// Only form submissions need the invisible browser check.
initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/newsletter", method: "POST" },
  ],
});
