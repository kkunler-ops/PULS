export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const posts: Post[] = [
  {
    slug: "how-to-check-on-someone-who-lives-alone",
    title: "How to check on someone who lives alone (without calling every day)",
    description:
      "A daily phone call is a weak safety system. Agree on one okay-signal, automate it, and write down what happens if the signal does not arrive.",
    date: "2026-09-13",
  },
  {
    slug: "medical-alert-without-a-wearable",
    title: "Medical alert without a wearable: how a daily check-in works",
    description:
      "You do not need a pendant to notice silence. A daily check-in on the phone you already have can alert someone if you go quiet — with a caveat about what it cannot do.",
    date: "2026-09-13",
  },
  {
    slug: "life-alert-vs-daily-check-in",
    title: "Life Alert vs a daily check-in: what you actually need",
    description:
      "Life Alert is a monitored medical alert button. A daily check-in is not that. Here is how to tell which job you are buying — and when a simpler, free check-in is enough.",
    date: "2026-09-13",
  },
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
