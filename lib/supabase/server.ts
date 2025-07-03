// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // The `getAll` method is expected to return an array of all cookies.
        // Each cookie in the array should be an object with `name` and `value` properties.
        async getAll() {
          // `cookieStore.getAll()` returns an array of { name, value, ...otherProps }
          // We need to map it to the format Supabase expects: { name, value }
          return (await cookieStore).getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        // The `setAll` method is expected to receive an array of cookies to set.
        // Each cookie in the array is an object with `name`, `value`, and `options`.
        // The `options` parameter (the second argument to setAll) will contain
        // the global cookie options defined in the main createServerClient options.
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options: CookieOptions;
          }>
        ) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) => {
              // The `cookieStore.set` method in Next.js `cookies`
              // can take an object with name, value, and options.
              return (await cookieStore).set(name, value, options);
            });
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // console.error("Error setting cookies in Server Component:", error); // Optional: for debugging
          }
        },
        // `get`, `set`, and `remove` are no longer needed here if `getAll` and `setAll` are provided.
        // However, if you still see issues or if Supabase internally falls back,
        // you might need to provide simple implementations or ensure your @supabase/ssr version
        // fully supports the new API without fallbacks.
        // For now, let's assume the deprecation message means ONLY getAll/setAll are needed.

        // If Supabase *still* tries to call get/set/remove, it means the specific version of
        // @supabase/ssr you're using might have a mixed mode or the deprecation is a forward-looking warning
        // for an API that isn't fully switched over in all internal paths yet.
        // However, the deprecation message strongly suggests replacing them.

        // For safety, and to match the types more closely if there's ambiguity in how `setAll` options are handled:
        // The `CookieMethods` type for `setAll` is:
        // `setAll?: (cookies: Array<{ name: string; value: string }>, options?: CookieOptions) => Promise<void> | void;`
        // This means Supabase passes an array of {name, value} and then global options.
        // So, the `setAll` implementation should ideally be:
        // async setAll(
        //   minimalCookies: Array<{ name: string; value: string }>,
        //   globalOptionsFromSupabaseCall: CookieOptions // These are derived from `cookieOptions` below
        // ) {
        //   try {
        //     minimalCookies.forEach(({ name, value }) => {
        //       cookieStore.set({ name, value, ...globalOptionsFromSupabaseCall });
        //     });
        //   } catch (error) {
        //     // ...
        //   }
        // },
        //
        // Given your original structure for `set` and `remove` used per-cookie options,
        // and the `cookiesToSet` type in your snippet implies per-cookie options are passed,
        // let's stick to the initial `setAll` that processes options from the array elements.
        // If TypeScript errors persist with the below, it means the signature of `setAll`
        // in the `CookieMethods` type in your `@supabase/ssr` version is the
        // `(cookiesArray, globalOptions)` variant.
      },
      // You might still want to define global cookie options here.
      // These options would be passed as the second argument to `setAll`
      // if its signature is `(cookies: Cookie[], options?: CookieOptions)`.
      // If `setAll` processes options from `cookiesToSet[i].options`, then
      // this top-level `cookieOptions` might be ignored or used as a default
      // if a specific cookie in `cookiesToSet` doesn't have its own options.
      // For clarity, let's assume the per-cookie options take precedence if available.
      // cookieOptions: {
      //   path: '/',
      //   sameSite: 'Lax',
      //   secure: process.env.NODE_ENV === 'production',
      //   // Add other default options if needed
      // },
    }
  );
}
