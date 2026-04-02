import type { MarkdownAstroData, RemarkPlugin } from "@astrojs/markdown-remark";
import { execSync } from "child_process";

export const remarkModifiedTime: RemarkPlugin = () => {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    (file.data.astro as MarkdownAstroData).frontmatter.lastModified =
      result.toString();
  };
};
