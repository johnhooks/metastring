import { buildAst } from "./build-ast.js";
import { buildMeta } from "./build-meta.js";

/**
 * Parse Markdown code fence metadata.
 *
 * @public
 */
export function parseMeta(input: string) {
	const ast = buildAst(input);
	const metadata = buildMeta(ast);
	return metadata;
}
