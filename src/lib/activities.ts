export type ActivityKey = "kitesurfing" | "windsurfing" | "wingfoil";

export interface Activity {
  key: ActivityKey;
  slug: string;
  images: string[];   // [0] = main/base, [1-3] = thumbnails
  icon: string;
}

export const ACTIVITIES: Activity[] = [
  {
    key: "kitesurfing",
    slug: "kitesurfing",
    images: [
      "/activities/kitesurfing/0.jpg",
      "/activities/kitesurfing/1.jpg",
      "/activities/kitesurfing/2.jpg",
      "/activities/kitesurfing/3.jpg",
    ],
    icon: "🪁",
  },
  {
    key: "windsurfing",
    slug: "windsurfing",
    images: [
      "/activities/windsurfing/0.jpg",
      "/activities/windsurfing/1.jpg",
      "/activities/windsurfing/2.jpg",
      "/activities/windsurfing/3.jpg",
    ],
    icon: "🏄",
  },
  {
    key: "wingfoil",
    slug: "wingfoil",
    images: [
      "/activities/wingfoil/0.jpg",
      "/activities/wingfoil/1.jpg",
      "/activities/wingfoil/2.jpg",
      "/activities/wingfoil/3.jpg",
    ],
    icon: "🪂",
  },
];

// Local gallery images 1–13
export const GALLERY_IMAGES = Array.from({ length: 13 }, (_, i) => ({
  key: `photo-${i + 1}`,
  src: `/gallery/${i + 1}.jpg`,
  width: 900,
  height: i % 3 === 1 ? 1100 : 600,   // alternate portrait/landscape
}));
