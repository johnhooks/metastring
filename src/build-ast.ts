import { Parser } from "acorn";
import { BaseNode, Program } from "estree";

import { MetaParserPlugin } from "./meta-parser-plugin.js";

/**
 * Build AST from Markdown code fence metadata.
 *
 * Uses `acorn` to do the heavy lifting, overriding parsing features that aren't
 * necessary for this project.
 * @public
 */
export function buildAst(input: string) {
	const metaParser = Parser.extend(MetaParserPlugin);
	const ast = metaParser.parse(input, { ecmaVersion: 2020 });
	return ast as BaseNode as Program;
}
