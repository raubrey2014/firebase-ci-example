import * as functions from "firebase-functions";
import { onCall as onCallFunction } from "firebase-functions/lib/providers/https";

export const helloWorld = onCallFunction(() => {
  const message = `Hello from Firebase at ${new Date().toLocaleString()}!`;
  functions.logger.info("Hello logs!", { message });
  functions.logger.info("Test 2!");
  return message;
});
