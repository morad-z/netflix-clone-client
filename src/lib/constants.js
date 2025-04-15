// API Base URLs
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const API_BASE_URL = process.env.REACT_APP_API_URL;

// Image sizes
export const TMDB_BACKDROP_SIZES = {
  SMALL: "w300",
  MEDIUM: "w780",
  LARGE: "w1280",
  ORIGINAL: "original",
};

export const TMDB_POSTER_SIZES = {
  TINY: "w92",
  XSMALL: "w154",
  SMALL: "w185",
  MEDIUM: "w342",
  LARGE: "w500",
  XLARGE: "w780",
  ORIGINAL: "original",
};

// Content types
export const CONTENT_TYPES = {
  MOVIE: "movie",
  TV: "tv",
};

// Rating system
export const MAX_RATING = 5;

// Fallback images
export const FALLBACK_POSTER =
  "https://via.placeholder.com/300x450?text=No+Poster";
export const FALLBACK_BACKDROP =
  "https://via.placeholder.com/1280x720?text=No+Backdrop";
export const FALLBACK_AVATAR = "https://api.dicebear.com/7.x/bottts/svg";

// Avatar options
export const AVATAR_COLORS = ["#E50914", "#F97316", "#22C55E", "#3B82F6"];

// Avatar images using DiceBear API
export const AVATAR_IMAGES = [
  `${FALLBACK_AVATAR}?seed=1&backgroundColor=e50914`,
  `${FALLBACK_AVATAR}?seed=2&backgroundColor=f97316`,
  `${FALLBACK_AVATAR}?seed=3&backgroundColor=22c55e`,
  `${FALLBACK_AVATAR}?seed=4&backgroundColor=3b82f6`,
  `${FALLBACK_AVATAR}?seed=5&backgroundColor=8b5cf6`,
];

// Genre IDs for quick reference (from TMDb)
export const GENRE_IDS = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

// Routes
export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  PROFILE: "/profile",
  MOVIES: "/movies",
  TV_SHOWS: "/tvshows",
  NEW_POPULAR: "/new-popular",
  MY_LIST: "/my-list",
  SEARCH: "/search",
  REVIEW: "/review",
  ADMIN: "/admin",
  ADMIN_CONTENT: "/admin/add-content",
};

// Footer links
export const FOOTER_LINKS = [
  { title: "Audio Description", href: "#" },
  { title: "Help Center", href: "#" },
  { title: "Gift Cards", href: "#" },
  { title: "Media Center", href: "#" },
  { title: "Investor Relations", href: "#" },
  { title: "Jobs", href: "#" },
  { title: "Terms of Use", href: "#" },
  { title: "Privacy", href: "#" },
  { title: "Legal Notices", href: "#" },
  { title: "Cookie Preferences", href: "#" },
  { title: "Corporate Information", href: "#" },
  { title: "Contact Us", href: "#" },
];

// Social media links
export const SOCIAL_LINKS = [
  { name: "Facebook", icon: "facebook", href: "#" },
  { name: "Instagram", icon: "instagram", href: "#" },
  { name: "Twitter", icon: "twitter", href: "#" },
  { name: "YouTube", icon: "youtube", href: "#" },
];
