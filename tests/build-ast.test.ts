import { buildAst as build } from "../src/build-ast.js";

describe("build Metadata AST", () => {
	describe("snapshots", () => {
		it("should parse a directive without arguments", () => {
			const ast = build("lineNumbers");
			expect(ast).toMatchSnapshot();
		});

		it("should parse a directive with arguments", () => {
			const ast = build("highlight(2..4,7)");
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp", () => {
			const ast = build("/hello/");
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp before another expression", () => {
			const ast = build("/hello/ lineNumbers");
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp after another expression", () => {
			const ast = build("lineNumbers /hello/");
			expect(ast).toMatchSnapshot();
		});

		it("should parse an assignment expression", () => {
			const ast = build('title="Why everyone should learn Markdown"');
			expect(ast).toMatchSnapshot();
		});
	});
});
