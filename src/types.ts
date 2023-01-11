/**
 * Code block word match.
 *
 * @public
 */
export type WordMatch = {
	regexp: RegExp;
	range?: number[];
};

/**
 * Markdown code block metadata.
 *
 * @public
 */
export type Metadata = {
	/**
	 * The lines to highlight.
	 */
	highlight: number[];

	/**
	 * The initial line number to start from.
	 */
	lineNumbersStart: number;

	/**
	 * Boolean indicating where or not to show line numbers.
	 */
	showLineNumbers: boolean;

	/**
	 * Word match objects.
	 */
	words: WordMatch[];

	/**
	 * The title of the code block.
	 */
	title?: string | undefined;

	/**
	 * The file to use as the source of the code block.
	 */
	file?: string | undefined;

	/**
	 * The language of the code block.
	 */
	lang?: string | undefined;
};
