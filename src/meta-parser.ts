import { Parser } from "acorn";

import { MetaParserPlugin } from "./meta-parser-plugin.js";

/**
 * Markdown code fence metadata parser.
 *
 * Uses `acorn` to do the heavy lifting, overriding parsing features that aren't
 * necessary for this project.
 * @public
 */
export const metaParser = Parser.extend(MetaParserPlugin);
