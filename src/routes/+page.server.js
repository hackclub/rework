// onMount(async () => {
// 	if (!project.githubLink) {
// 		markdown = "<p>No project found.</p>";
// 		return;
// 	}
// 	const rawUrlBase =
// 		project.githubLink.replace("github.com", "raw.githubusercontent.com") +
// 		"/main/";
// 	const response = await fetch(rawUrlBase + "JOURNAL.md");
// 	const text = await response.text();

// 	const content = fm < any > text;
// 	frontmatter = content.attributes;

// 	const fixedBody = content.body.replace(
// 		/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
// 		(_, alt, relPath) => {
// 			const absolute = rawUrlBase + relPath;
// 			return `![${alt}](${absolute})`;
// 		},
// 	);

// 	const html = DOMPurify.sanitize(await marked.parse(fixedBody));
// 	const { html: withIds, headings: hs } = extractHeadings(html);
// 	markdown = withIds;
// 	headings = hs.filter((h) => h.level <= 3);
// });

import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	console.log(params.slug);
	const commitSha = env.VERCEL_GIT_COMMIT_SHA || '';
	const commitUrl = commitSha && env.VERCEL_GIT_REPO_OWNER && env.VERCEL_GIT_REPO_SLUG
		? `https://github.com/${env.VERCEL_GIT_REPO_OWNER}/${env.VERCEL_GIT_REPO_SLUG}/commit/${commitSha}`
		: null;
	return {
		serverMessage: "hello from server load function",
		commitSha,
		commitUrl,
	};
};
