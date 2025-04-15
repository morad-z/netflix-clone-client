import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContentBanner from "@/components/content/content-banner";
import ContentRow from "@/components/content/content-row";
import ContentModal from "@/components/content/content-modal";
import { getRandomItem } from "@/lib/utils";
import {
  getRecommendationsForProfile,
  getHighestRatedContent,
} from "@/lib/ai-recommendations";
import { CONTENT_TYPES, GENRE_IDS } from "@/lib/constants";

export default function MoviesPage() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get active profile
  const { data: activeProfile } = useQuery({
    queryKey: ["/api/profiles/active"],
  });

  // Fetch all movies
  const { data: moviesData } = useQuery({
    queryKey: ["/api/content/movies"],
    enabled: !!activeProfile,
  });

  // Fetch personalized recommendations for movies
  const { data: recommendedMovies } = useQuery({
    queryKey: ["/api/content/recommendations/movies", activeProfile?.id],
    enabled: !!activeProfile?.id,
    queryFn: async () => {
      const allRecs = await getRecommendationsForProfile(activeProfile?.id, 20);
      // Filter to only include movies
      return allRecs.filter(
        (item) => item.media_type === "movie" || !item.media_type
      );
    },
  });

  // Fetch new releases
  const { data: newMovies } = useQuery({
    queryKey: ["/api/content/newest/movies"],
    enabled: !!activeProfile,
    queryFn: async () => {
      const response = await fetch("/api/content/movies?sort=newest", {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Failed to fetch new movies");
      return await response.json();
    },
  });

  // Fetch highest rated movies
  const { data: topRatedMovies } = useQuery({
    queryKey: ["/api/content/movies/top-rated"],
    enabled: !!activeProfile,
    queryFn: async () => {
      const allRated = await getHighestRatedContent(20);
      // Filter to only include movies
      return allRated.filter(
        (item) => item.media_type === "movie" || !item.media_type
      );
    },
  });

  // Fetch action movies
  const { data: actionMovies } = useQuery({
    queryKey: ["/api/content/search", { genre: GENRE_IDS.ACTION }],
    enabled: !!activeProfile,
    queryFn: async () => {
      const response = await fetch("/api/content/search?genre=" + GENRE_IDS.ACTION, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Failed to fetch action movies");
      return await response.json();
    },
  });

  // Fetch comedy movies
  const { data: comedyMovies } = useQuery({
    queryKey: ["/api/content/search", { genre: GENRE_IDS.COMEDY }],
    enabled: !!activeProfile,
    queryFn: async () => {
      const response = await fetch("/api/content/search?genre=" + GENRE_IDS.COMEDY, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Failed to fetch comedy movies");
      return await response.json();
    },
  });

  // Fetch sci-fi movies
  const { data: scifiMovies } = useQuery({
    queryKey: ["/api/content/search", { genre: GENRE_IDS.SCIENCE_FICTION }],
    enabled: !!activeProfile,
    queryFn: async () => {
      const response = await fetch("/api/content/search?genre=" + GENRE_IDS.SCIENCE_FICTION, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Failed to fetch sci-fi movies");
      return await response.json();
    },
  });

  // Fetch romance movies
  const { data: romanceMovies } = useQuery({
    queryKey: ["/api/content/search", { genre: GENRE_IDS.ROMANCE }],
    enabled: !!activeProfile,
    queryFn: async () => {
      const response = await fetch("/api/content/search?genre=" + GENRE_IDS.ROMANCE, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Failed to fetch romance movies");
      return await response.json();
    },
  });

  // Get featured movie for banner
  const featuredMovie =
    moviesData?.length > 0 ? getRandomItem(moviesData.slice(0, 5)) : null;

  // Handle content item click
  const handleContentClick = (content) => {
    setSelectedContent({
      ...content,
      media_type: "movie",
    });
    setIsModalOpen(true);
  };

  // Handle more info button click on banner
  const handleBannerInfoClick = () => {
    if (featuredMovie) {
      setSelectedContent({
        ...featuredMovie,
        media_type: "movie",
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Add padding top to account for fixed header */}
        {/* Featured movie banner */}
        {featuredMovie && (
          <ContentBanner
            content={featuredMovie}
            onInfoClick={handleBannerInfoClick}
          />
        )}
        {/* Content rows */}
        <div className="p-8">
          {recommendedMovies?.length > 0 && (
            <ContentRow
              title="Recommended for You"
              items={recommendedMovies}
              onItemClick={handleContentClick}
            />
          )}

          {newMovies?.length > 0 && (
            <ContentRow
              title="New Releases"
              items={newMovies}
              onItemClick={handleContentClick}
            />
          )}

          {topRatedMovies?.length > 0 && (
            <ContentRow
              title="Top Rated Movies"
              items={topRatedMovies}
              onItemClick={handleContentClick}
            />
          )}

          {actionMovies?.length > 0 && (
            <ContentRow
              title="Action Movies"
              items={actionMovies}
              onItemClick={handleContentClick}
            />
          )}

          {comedyMovies?.length > 0 && (
            <ContentRow
              title="Comedies"
              items={comedyMovies}
              onItemClick={handleContentClick}
            />
          )}

          {scifiMovies?.length > 0 && (
            <ContentRow
              title="Sci-Fi & Fantasy"
              items={scifiMovies}
              onItemClick={handleContentClick}
            />
          )}

          {romanceMovies?.length > 0 && (
            <ContentRow
              title="Romance"
              items={romanceMovies}
              onItemClick={handleContentClick}
            />
          )}
        </div>
        <Footer />
      </div>

      {/* Content details modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentId={selectedContent?.contentId}
        tmdbId={selectedContent?.id}
        type="movie"
        activeProfileId={activeProfile?.id}
      />
    </div>
  );
}
