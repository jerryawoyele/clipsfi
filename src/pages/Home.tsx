import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for clips
const mockClips = [
  {
    id: "1",
    title: "Amazing gaming montage with incredible plays!",
    creator: { name: "GamerPro", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Gaming"],
    likes: 1234,
    comments: 89,
    isLiked: false,
  },
  {
    id: "2", 
    title: "Beautiful sunset timelapse in the mountains",
    creator: { name: "NatureLover", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Nature"],
    likes: 2156,
    comments: 234,
    isLiked: true,
  },
  {
    id: "3",
    title: "How to cook the perfect pasta - Quick tutorial",
    creator: { name: "ChefMaster", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500", 
    categories: ["Lifestyle", "Knowledge"],
    likes: 892,
    comments: 67,
    isLiked: false,
  },
  {
    id: "4",
    title: "Hilarious cat compilation that will make you laugh",
    creator: { name: "FunnyVids", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Entertainment"],
    likes: 3421,
    comments: 456,
    isLiked: true,
  },
  {
    id: "5",
    title: "Learn JavaScript in 60 seconds - Quick tip",
    creator: { name: "CodeMaster", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Knowledge"],
    likes: 1876,
    comments: 123,
    isLiked: false,
  },
];

const Home = () => {
  const [clips, setClips] = useState(mockClips);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const handleLike = (clipId: string) => {
    setClips((prev) =>
      prev.map((clip) =>
        clip.id === clipId
          ? {
              ...clip,
              isLiked: !clip.isLiked,
              likes: clip.isLiked ? clip.likes - 1 : clip.likes + 1,
            }
          : clip
      )
    );
  };

  const handleComment = (clipId: string) => {
    toast({
      title: "Comments",
      description: "Comment feature coming soon!",
    });
  };

  const handleShare = (clipId: string) => {
    navigator.clipboard.writeText(`https://clipsfi.app/clip/${clipId}`);
    toast({
      title: "Link copied!",
      description: "Clip link copied to clipboard",
    });
  };

  const loadMoreClips = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setClips((prev) => [...prev, ...mockClips.map(clip => ({
        ...clip,
        id: `${clip.id}-${page}`,
      }))]);
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleDesktopScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreClips();
      }
    };

    const handleMobileScroll = () => {
      const container = mobileContainerRef.current;
      if (container) {
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 1000
        ) {
          loadMoreClips();
        }
      }
    };

    // Desktop scroll listener
    window.addEventListener("scroll", handleDesktopScroll);
    
    // Mobile scroll listener
    const mobileContainer = mobileContainerRef.current;
    if (mobileContainer) {
      mobileContainer.addEventListener("scroll", handleMobileScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleDesktopScroll);
      if (mobileContainer) {
        mobileContainer.removeEventListener("scroll", handleMobileScroll);
      }
    };
  }, [isLoading, page]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ClipsFi
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setClips(mockClips);
                setPage(1);
                toast({
                  title: "Feed refreshed!",
                  description: "Showing latest clips",
                });
              }}
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Feed - Snap Scroll */}
      <div className="block md:hidden pt-20 pb-24">
        <div 
          ref={mobileContainerRef}
          className="h-[calc(100vh-5rem-6rem)] overflow-y-auto snap-y snap-mandatory"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {clips.map((clip, index) => (
            <motion.div
              key={clip.id}
              className="h-full w-full snap-start snap-always px-4 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <VideoCard
                {...clip}
                onLike={() => handleLike(clip.id)}
                onComment={() => handleComment(clip.id)}
                onShare={() => handleShare(clip.id)}
                className="w-full max-w-sm mx-auto h-[80vh] max-h-[600px]"
              />
            </motion.div>
          ))}
          
          {/* Mobile Loading indicator */}
          {isLoading && (
            <motion.div
              className="h-full w-full snap-start flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Loading more clips...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Desktop Feed - Grid Layout */}
      <div className="hidden md:block pt-20 pb-24">
        <div className="px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {clips.map((clip, index) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <VideoCard
                  {...clip}
                  onLike={() => handleLike(clip.id)}
                  onComment={() => handleComment(clip.id)}
                  onShare={() => handleShare(clip.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop Loading indicator */}
          {isLoading && (
            <motion.div
              className="flex justify-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Loading more clips...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;