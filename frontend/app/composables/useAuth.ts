/**
 * Login / Register modal + logged-in state — ports js/auth.js.
 * State is shared app-wide via Nuxt useState so it persists across routes.
 */
export type AuthMode = 'login' | 'register' | null;

export function useAuth() {
  const loggedIn = useState<boolean>('auth:loggedIn', () => false);
  const mode = useState<AuthMode>('auth:mode', () => null);

  const open = (m: Exclude<AuthMode, null>) => {
    mode.value = m;
  };
  const close = () => {
    mode.value = null;
  };
  const submit = () => {
    loggedIn.value = true;
    close();
  };
  const logout = () => {
    loggedIn.value = false;
  };

  return { loggedIn, mode, open, close, submit, logout };
}
