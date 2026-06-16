export type ActivityKey = "kitesurfing" | "windsurfing" | "wingfoil";

export interface Activity {
  key: ActivityKey;
  slug: string;
  image: string;
  imageAlt: string;
  color: string;
  accent: string;
  icon: string;
}

export const ACTIVITIES: Activity[] = [
  {
    key: "kitesurfing",
    slug: "kitesurfing",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    imageAlt: "Kitesurfing on the Red Sea in Sharm El Sheikh",
    color: "from-aqua-900 to-navy-900",
    accent: "aqua",
    icon: "🪁",
  },
  {
    key: "windsurfing",
    slug: "windsurfing",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Windsurfing in Sharm El Sheikh Egypt",
    color: "from-navy-800 to-aqua-900",
    accent: "sun",
    icon: "🏄",
  },
  {
    key: "wingfoil",
    slug: "wingfoil",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Wingfoil on the Red Sea",
    color: "from-aqua-800 to-navy-950",
    accent: "aqua",
    icon: "🪂",
  },
];

export const GALLERY_IMAGES = [
  {
    key: "kite1",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=900&q=80",
    width: 900,
    height: 600,
  },
  {
    key: "wind1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    width: 900,
    height: 1200,
  },
  {
    key: "spot1",
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
    width: 900,
    height: 600,
  },
  {
    key: "kite2",
    src: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900&q=80",
    width: 900,
    height: 1100,
  },
  {
    key: "spot2",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    width: 900,
    height: 600,
  },
  {
    key: "wind2",
    src: "https://images.unsplash.com/photo-1514819101780-6a5a3e3e3a72?w=900&q=80",
    width: 900,
    height: 1050,
  },
  {
    key: "wing1",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80",
    width: 900,
    height: 600,
  },
  {
    key: "wing2",
    src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900&q=80",
    width: 900,
    height: 1000,
  },
  {
    key: "spot3",
    src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=900&q=80",
    width: 900,
    height: 600,
  },
];
