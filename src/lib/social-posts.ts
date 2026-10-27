/**
 * Posts featured in the "On the feed" section, as static 9:16 thumbnails that
 * link out to the post. This is the reliable option: Instagram and TikTok
 * rate-limit their profile embeds ("Too many requests"), a thumbnail can't be.
 *
 * While this list is empty the section falls back to the live profile embeds.
 *
 * To add one: save a 9:16 image (1080×1920 is ideal; a screenshot or the
 * video's cover frame works) in `public/images/social/`, then add an entry.
 */

export type SocialPost = {
  platform: "instagram" | "tiktok";
  /** Link to the post / reel / video itself. */
  href: string;
  /** Path under /public, e.g. "/images/social/zumba-night.jpg". */
  image: string;
  /** Describe what's in the picture, for screen readers. */
  alt: string;
  /** Show a play badge — set for reels and videos. */
  video?: boolean;
};

export const socialPosts: SocialPost[] = [
  // {
  //   platform: "instagram",
  //   href: "https://www.instagram.com/reel/XXXXXXXXXXX/",
  //   image: "/images/social/floor-tour.jpg",
  //   alt: "Walk-through of the LOG weight floor",
  //   video: true,
  // },
];
