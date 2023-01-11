// import { simple } from "acorn-walk";
// import type { Program } from "estree";

import type { Metadata } from "./types.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function metaBuilder(_estree: any /* Program */): Metadata {
	const meta: Metadata = { highlight: [], lineNumbersStart: 1, showLineNumbers: false, words: [] };

	return meta;
}
