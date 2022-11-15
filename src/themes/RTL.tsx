import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import i18n from "../i18n";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin as any],
});

const RTL = (props: any) =>
  i18n.language === "he" ? (
    <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
  ) : (
    props.children
  );

export default RTL;
