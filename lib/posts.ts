export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const posts: Post[] = [
  {
    slug: "what-is-a-daily-check-in-app",
    title: "What is a daily check-in app?",
    description:
      "A daily check-in app lets you confirm you are okay once a day. If you go silent, it notifies your emergency contact — without GPS tracking or a medical pendant.",
    date: "2026-09-12",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
