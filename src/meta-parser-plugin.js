/* eslint-disable @typescript-eslint/ban-ts-comment */

import { tokTypes as tt, TokenType, tokContexts } from "acorn";

const dotDot = new TokenType("..", { beforeExpr: true, binop: 11 });

/**
 * @todo create RangeExpression node type.
 * @todo simplify parsing of assignment to only the `=` symbol
 * @todo add `...` back in for inclusive range
 */
/**
 * Extend the `acorn` parser to read a double dot token
 */
export function MetaParserPlugin(BaseParser) {
	return class extends BaseParser {
		get context() {
			return [tokContexts.b_stat];
		}

		set context(value) {
			// nope
		}

		get exprAllowed() {
			return true;
		}

		set exprAllowed(value) {
			// acorn keep track of a context stack that determines whether or not a RegExp
			// is allowed. Though because math equations are not part of the metadata
			// "language", `exprAllow` is allows true.
		}

		/**
		 * Parse a double dot range token.
		 *
		 * The metadata parser doesn't need floating point numbers or ellipses, so raise
		 * an error if something matching those tokens is found.
		 * @this {Parser}
		 */
		readToken_dot() {
			const next = this.input.charCodeAt(this.pos + 1);

			// 46 = dot '.'
			if (next === 46) {
				const next2 = this.input.charCodeAt(this.pos + 2);
				if (next2 === 46) return this.finishOp(tt.ellipsis, 3);
				else {
					return this.finishOp(dotDot, 2);
				}
			} else {
				this.raise(this.pos, `Unexpected character '${codePointToString(next)}'`);
			}
		}

		/**
		 * Read number as an integer.
		 *
		 * Super striped down version of acorn's `readInt` and `readNumber`
		 */
		readNumber() {
			const radix = 10;
			let total = 0;

			while (this.pos < this.input.length) {
				const code = this.input.charCodeAt(this.pos);
				let val;

				if (code >= 48 && code <= 57) val = code - 48; // 0-9
				else val = Infinity;
				if (val >= radix) break;

				total = total * radix + val;
				++this.pos;
			}
			for (let i = 0; i < Infinity; ++i, ++this.pos) {
				const code = this.input.charCodeAt(this.pos);
				let val;
				if (code >= 48 && code <= 57) val = code - 48; // 0-9
				else val = Infinity;
				if (val >= radix) break;
				total = total * radix + val;
			}
			this.finishToken(tt.num, total);
		}

		parseStatement() {
			return this.parseExpressionStatement(this.startNode(), this.parseExpression());
		}

		parseExpressionStatement(node, expr) {
			node.expression = expr;
			// Don't raise an error if a semicolon isn't found.
			this.eat(tt.semi);
			return this.finishNode(node, "ExpressionStatement");
		}
	};
}

/**
 * Copied from acorn because it isn't exported.
 * [link to original source](https://github.com/acornjs/acorn/blob/07b52f6a661fcffd63d384a49d42c462fcafd8d5/acorn/src/util.js#L15-L20)
 *
 * @param {number} code
 * @returns {String}
 */
function codePointToString(code) {
	// UTF-16 Decoding
	if (code <= 0xffff) return String.fromCharCode(code);
	code -= 0x10000;
	return String.fromCharCode((code >> 10) + 0xd800, (code & 1023) + 0xdc00);
}
