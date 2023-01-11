import { metaParser } from "../src/meta-parser.js";

describe("metaParserPlugin", () => {
	describe("snapshots", () => {
		it("should parse a directive without arguments", () => {
			const ast = metaParser.parse("lineNumbers", { ecmaVersion: 2020 });
			expect(ast).toMatchSnapshot();
		});

		it("should parse a directive with arguments", () => {
			const ast = metaParser.parse("highlight(2..4,7)", { ecmaVersion: 2020 });
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp", () => {
			const ast = metaParser.parse("/hello/", { ecmaVersion: 2020 });
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp before another expression", () => {
			const ast = metaParser.parse("/hello/ lineNumbers", { ecmaVersion: 2020 });
			expect(ast).toMatchSnapshot();
		});

		it("should parse a RegExp after another expression", () => {
			const ast = metaParser.parse("lineNumbers /hello/", { ecmaVersion: 2020 });
			expect(ast).toMatchSnapshot();
		});

		it("should parse an assignment expression", () => {
			const ast = metaParser.parse('title="Why everyone should learn Markdown"', {
				ecmaVersion: 2020,
			});
			expect(ast).toMatchSnapshot();
		});
	});
});
