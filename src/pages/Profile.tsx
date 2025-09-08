import { useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Video, Trophy, Target, Settings, Share, Copy, Heart, MessageCircle, Calendar, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SettingsModal from "@/components/SettingsModal";

const mockUserData = {
  name: "CreativeMaker",
  username: "@creativemaker",
  avatar: "/api/placeholder/120/120",
  bio: "Creating amazing content daily! 🚀\nFollow for gaming, lifestyle, and entertainment clips.",
  stats: {
    totalClips: 156,
    totalLikes: 45623,
    totalEarned: 12.5,
    following: 234,
    followers: 1892,
  },
  joinedDate: "March 2024",
};

const mockUserClips = [
  {
    id: "user1",
    title: "My latest gaming montage",
    creator: { name: "CreativeMaker", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Gaming"],
    likes: 1234,
    comments: 89,
    isLiked: false,
  },
  {
    id: "user2",
    title: "Morning routine for success",
    creator: { name: "CreativeMaker", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Lifestyle"],
    likes: 892,
    comments: 67,
    isLiked: true,
  },
  {
    id: "user3",
    title: "Nature photography tips",
    creator: { name: "CreativeMaker", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Nature", "Knowledge"],
    likes: 567,
    comments: 34,
    isLiked: false,
  },
];

const mockEarnedClips = [
  {
    id: "earned1",
    title: "Epic gaming moment that went viral",
    creator: { name: "CreativeMaker", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Gaming"],
    likes: 5432,
    comments: 367,
    isLiked: true,
    earnedAmount: 2.3,
    round: 45,
    position: 2,
  },
  {
    id: "earned2",
    title: "Lifestyle hack that everyone loved",
    creator: { name: "CreativeMaker", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Lifestyle"],
    likes: 3421,
    comments: 234,
    isLiked: true,
    earnedAmount: 1.8,
    round: 43,
    position: 4,
  },
];

const mockPredictions = [
  {
    id: "pred1",
    category: "Entertainment",
    round: 46,
    clipTitle: "Hilarious cat compilation",
    stakeAmount: 0.5,
    status: "active",
    icon: "🎬",
  },
  {
    id: "pred2",
    category: "Gaming",
    round: 46,
    clipTitle: "Amazing speedrun attempt",
    stakeAmount: 1.2,
    status: "active",
    icon: "🎮",
  },
  {
    id: "pred3",
    category: "Nature",
    round: 45,
    clipTitle: "Beautiful forest timelapse",
    stakeAmount: 0.8,
    status: "won",
    reward: 2.1,
    icon: "🌿",
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("clips");
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

  const copyProfile = () => {
    navigator.clipboard.writeText(`https://clipsfi.app/profile/${mockUserData.username}`);
    toast({
      title: "Profile link copied!",
      description: "Share your profile with others",
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
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={copyProfile}>
              <Share className="w-5 h-5" />
            </Button>
            <SettingsModal />
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-6">
        {/* Profile Info */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-card to-muted/50 border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {mockUserData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold mb-1">{mockUserData.name}</h2>
                  <p className="text-muted-foreground mb-3">{mockUserData.username}</p>
                  <p className="text-sm mb-4 whitespace-pre-line">{mockUserData.bio}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{mockUserData.stats.totalClips}</div>
                      <div className="text-xs text-muted-foreground">Clips</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary">{mockUserData.stats.totalLikes.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-success">{mockUserData.stats.totalEarned} SOL</div>
                      <div className="text-xs text-muted-foreground">Earned</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{mockUserData.stats.following}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{mockUserData.stats.followers.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {mockUserData.joinedDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="clips" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Video className="w-4 h-4 mr-2" />
              My Clips
            </TabsTrigger>
            <TabsTrigger value="earned" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Trophy className="w-4 h-4 mr-2" />
              Earned
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="w-4 h-4 mr-2" />
              Predictions
            </TabsTrigger>
          </TabsList>

          {/* My Clips Tab */}
          <TabsContent value="clips" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mockUserClips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockUserClips.map((clip, index) => (
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
              ) : (
                <div className="text-center py-12">
                  <Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No clips yet</h3>
                  <p className="text-muted-foreground">Start creating and upload your first clip!</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Earned Tab */}
          <TabsContent value="earned" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mockEarnedClips.length > 0 ? (
                <div className="space-y-6">
                  {mockEarnedClips.map((clip, index) => (
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
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="w-full sm:w-48 aspect-[9/16] sm:aspect-square">
                              <img
                                src={clip.thumbnail}
                                alt={clip.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold mb-2">{clip.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <span>Round {clip.round}</span>
                                    <span>•</span>
                                    <span>Position #{clip.position}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {clip.likes.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MessageCircle className="w-4 h-4" />
                                      {clip.comments}
                                    </div>
                                  </div>
                                </div>
                                <Badge className="bg-success text-success-foreground font-semibold">
                                  <Coins className="w-3 h-3 mr-1" />
                                  +{clip.earnedAmount} SOL
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {clip.categories.map((category) => (
                                  <Badge key={category} variant="secondary">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No earnings yet</h3>
                  <p className="text-muted-foreground">Create amazing clips to enter the daily rounds and earn rewards!</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mockPredictions.length > 0 ? (
                <div className="space-y-4">
                  {mockPredictions.map((prediction, index) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg">
                                {prediction.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{prediction.clipTitle}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {prediction.category} Round {prediction.round}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-sm font-semibold">
                                <Coins className="w-4 h-4" />
                                {prediction.stakeAmount} SOL
                              </div>
                              {prediction.status === "active" ? (
                                <Badge variant="outline" className="text-xs mt-1">
                                  Active
                                </Badge>
                              ) : prediction.status === "won" ? (
                                <Badge className="bg-success text-success-foreground text-xs mt-1">
                                  Won +{prediction.reward} SOL
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs mt-1">
                                  Lost
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No predictions yet</h3>
                  <p className="text-muted-foreground">Visit the Earn section to start predicting winning clips!</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;