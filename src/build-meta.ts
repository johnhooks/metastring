import type {
	Program,
	Node,
	ExpressionStatement,
	AssignmentExpression,
	RegExpLiteral,
	Identifier,
} from "estree";

import type { Metadata } from "./types.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function buildMeta({ body }: Program): Metadata {
	const meta: Metadata = { highlight: [], lineNumbersStart: 1, showLineNumbers: false, words: [] };

	for (const node of body) {
		const { expression: expr } = expect<ExpressionStatement>("ExpressionStatement", node);
		if (isRegExpLiteral(expr)) {
			if (expr.value) meta.words.push({ regexp: expr.value });
		} else if (isAssignmentDirective(expr)) {
			if (expr.left.name === "title") {
				meta.title = expr.right.value;
			}
		}
	}

	return meta;
}

function expect<TNode>(type: string, node: Node): TNode {
	if (node.type !== type) {
		throw new SyntaxError(`invalid code metadata at col: ${node.loc?.start}`);
	}
	return node as TNode;
}

function isRegExpLiteral(node: Node): node is RegExpLiteral {
	return node?.type === "Literal" && node["regex"] !== undefined;
}

function isAssignmentExpression(node: Node): node is AssignmentExpression {
	return node?.type === "AssignmentExpression" && node["op"] !== "=";
}

type AssignmentDirective = AssignmentExpression & {
	left: Identifier;
	operator: "=";
	right: {
		value: string;
	};
};

function isAssignmentDirective(node: Node): node is AssignmentDirective {
	if (!isAssignmentExpression(node)) return false;
	if (node.operator !== "=") return false;
	if (node.left.type !== "Identifier") return false;
	if (node.right.type !== "Literal") return false;
	if (typeof node.right.value !== "string") return false;
	return true;
}
