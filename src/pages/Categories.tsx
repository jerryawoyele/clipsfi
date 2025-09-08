import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "entertainment", name: "Entertainment", icon: "🎬", color: "bg-pink-500" },
  { id: "knowledge", name: "Knowledge", icon: "🧠", color: "bg-blue-500" },
  { id: "gaming", name: "Gaming", icon: "🎮", color: "bg-purple-500" },
  { id: "lifestyle", name: "Lifestyle", icon: "✨", color: "bg-green-500" },
  { id: "nature", name: "Nature", icon: "🌿", color: "bg-emerald-500" },
];

const mockClipsByCategory = {
  entertainment: [
    {
      id: "ent1",
      title: "Hilarious dog tricks compilation",
      creator: { name: "FunnyPets", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Entertainment"],
      likes: 4567,
      comments: 234,
      isLiked: false,
    },
    {
      id: "ent2",
      title: "Stand-up comedy gold moments",
      creator: { name: "ComedyKing", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Entertainment"],
      likes: 3211,
      comments: 189,
      isLiked: true,
    },
  ],
  knowledge: [
    {
      id: "know1",
      title: "Physics explained in 30 seconds",
      creator: { name: "ScienceGuru", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Knowledge"],
      likes: 2876,
      comments: 145,
      isLiked: false,
    },
    {
      id: "know2",
      title: "History facts that will blow your mind",
      creator: { name: "HistoryBuff", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Knowledge"],
      likes: 1934,
      comments: 87,
      isLiked: true,
    },
  ],
  gaming: [
    {
      id: "game1",
      title: "Epic gaming moments compilation",
      creator: { name: "ProGamer", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Gaming"],
      likes: 5432,
      comments: 367,
      isLiked: false,
    },
    {
      id: "game2",
      title: "Speed run world record attempt",
      creator: { name: "SpeedRunner", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Gaming"],
      likes: 7891,
      comments: 456,
      isLiked: true,
    },
  ],
  lifestyle: [
    {
      id: "life1",
      title: "Morning routine for productivity",
      creator: { name: "LifeHacker", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Lifestyle"],
      likes: 2134,
      comments: 98,
      isLiked: false,
    },
    {
      id: "life2",
      title: "Quick healthy breakfast ideas",
      creator: { name: "HealthyEats", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Lifestyle"],
      likes: 3456,
      comments: 178,
      isLiked: true,
    },
  ],
  nature: [
    {
      id: "nat1",
      title: "Amazing wildlife photography",
      creator: { name: "WildlifePhoto", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Nature"],
      likes: 4123,
      comments: 201,
      isLiked: false,
    },
    {
      id: "nat2",
      title: "Relaxing forest sounds and visuals",
      creator: { name: "NatureSounds", avatar: "/api/placeholder/40/40" },
      thumbnail: "/api/placeholder/300/500",
      categories: ["Nature"],
      likes: 2987,
      comments: 134,
      isLiked: true,
    },
  ],
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("entertainment");
  const [sortBy, setSortBy] = useState<"trending" | "new">("trending");
  const { toast } = useToast();

  const handleLike = (clipId: string) => {
    toast({
      title: "Liked!",
      description: "Clip added to your favorites",
    });
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Categories</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === "trending" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy("trending")}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
            <Button
              variant={sortBy === "new" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy("new")}
              className="gap-2"
            >
              <Clock className="w-4 h-4" />
              New
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="sticky top-[73px] z-30 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
          <TabsList className="w-full justify-start overflow-x-auto bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Category Content */}
        <div className="px-4 py-6">
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Stats */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-card to-muted/50 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground">
                        {mockClipsByCategory[category.id as keyof typeof mockClipsByCategory]?.length || 0} clips
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {sortBy === "trending" ? "Most liked this week" : "Latest uploads"}
                  </Badge>
                </div>

                {/* Clips Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${category.id}-${sortBy}`}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(mockClipsByCategory[category.id as keyof typeof mockClipsByCategory] || []).map((clip, index) => (
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
                  </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {(!mockClipsByCategory[category.id as keyof typeof mockClipsByCategory] || 
                  mockClipsByCategory[category.id as keyof typeof mockClipsByCategory].length === 0) && (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">No clips yet</h3>
                    <p className="text-muted-foreground">Be the first to upload to {category.name}!</p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Categories;