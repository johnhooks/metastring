import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			metastring: fileURLToPath(new URL("../src/index.ts", import.meta.url).href),
		},
	},
});
