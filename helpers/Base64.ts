import { decode } from "https://deno.land/std/encoding/base64.ts";

export default function Base64() {
  return Object.freeze({
    toString,
  });
  function toString(b64: string): string {
    return new TextDecoder().decode(decode(b64));
  }
}
