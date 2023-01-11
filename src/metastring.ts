import { BaseNode, Program } from "estree";

import { metaBuilder } from "./meta-builder.js";
import { metaParser } from "./meta-parser.js";

export function metastring(input: string) {
	const estree = metaParser.parse(input, { ecmaVersion: "latest" }) as BaseNode as Program;
	const metadata = metaBuilder(estree);
	return metadata;
}
