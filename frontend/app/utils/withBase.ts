/**
 * 把站內絕對路徑補上 app baseURL 前綴,讓網站能部署在子路徑下
 * (如 GitHub Pages 的 /cms_system_v2/)。
 * baseURL 由 useRuntimeConfig().app.baseURL 取得(執行期值,預設 '/';
 * 可用 NUXT_APP_BASE_URL 環境變數在 build/prerender 時覆寫)。
 * 注意:不能用 import.meta.env.BASE_URL — Nuxt 的 baseURL 走執行期,
 * 不會反映到 Vite 的 build 期常數。
 *
 * NuxtLink/Nuxt 資產會自動吃 baseURL,不用經過這裡;
 * 這支只處理寫死的 <img src>、原生 <a href>、fetch、iframe src。
 */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  const base = useRuntimeConfig().app.baseURL || '/';
  return base.replace(/\/$/, '') + path;
}
