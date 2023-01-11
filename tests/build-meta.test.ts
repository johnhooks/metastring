import { buildAst } from "../src/build-ast.js";
import { buildMeta } from "../src/build-meta.js";

describe("build Metadata object", () => {
	describe("title", () => {
		it("create a title", () => {
			const meta = buildMeta(buildAst(`title="hello metadata"`));
			expect(meta).toMatchSnapshot();
		});
	});

	describe("word matches", () => {
		it("create a title", () => {
			const meta = buildMeta(buildAst(`/matchers?/`));
			expect(meta).toMatchSnapshot();
		});
	});
});
