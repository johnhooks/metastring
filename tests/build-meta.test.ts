import { buildAst } from "../src/build-ast.js";
import { buildMeta } from "../src/build-meta.js";

describe("build Metadata object", () => {
	describe("title", () => {
		it("create a title", () => {
			const meta = buildMeta(buildAst(`title="hello metadata"`));
			expect(meta).toEqual({
				highlight: [],
				lineNumbersStart: 1,
				showLineNumbers: false,
				title: "hello metadata",
				words: [],
			});
		});
	});

	describe("word matches", () => {
		it("create a title", () => {
			const meta = buildMeta(buildAst(`/matchers?/`));
			expect(meta).toEqual({
				highlight: [],
				lineNumbersStart: 1,
				showLineNumbers: false,
				words: [
					{
						regexp: /matchers?/,
					},
				],
			});
		});
	});

	describe("range", () => {
		it("create a range", () => {
			const meta = buildMeta(buildAst(`1,4..7`));
			expect(meta).toEqual({
				highlight: [1, 4, 5, 6],
				lineNumbersStart: 1,
				showLineNumbers: false,
				words: [],
			});
		});
	});
});
