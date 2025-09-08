import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Timer, Coins, TrendingUp, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pool {
  id: string;
  category: string;
  round: number;
  icon: string;
  color: string;
  timeLeft: string;
  totalStakes: number;
  participants: number;
  status: "active" | "ended";
}

const mockPools: Pool[] = [
  {
    id: "ent_round46",
    category: "Entertainment",
    round: 46,
    icon: "🎬",
    color: "bg-pink-500",
    timeLeft: "14h 32m",
    totalStakes: 125.5,
    participants: 89,
    status: "active",
  },
  {
    id: "game_round46",
    category: "Gaming", 
    round: 46,
    icon: "🎮",
    color: "bg-purple-500",
    timeLeft: "14h 32m",
    totalStakes: 234.2,
    participants: 156,
    status: "active",
  },
  {
    id: "know_round46",
    category: "Knowledge",
    round: 46,
    icon: "🧠",
    color: "bg-blue-500",
    timeLeft: "14h 32m",
    totalStakes: 87.3,
    participants: 67,
    status: "active",
  },
  {
    id: "life_round46",
    category: "Lifestyle",
    round: 46,
    icon: "✨",
    color: "bg-green-500",
    timeLeft: "14h 32m",
    totalStakes: 156.8,
    participants: 103,
    status: "active",
  },
  {
    id: "nat_round46",
    category: "Nature",
    round: 46,
    icon: "🌿",
    color: "bg-emerald-500",
    timeLeft: "14h 32m",
    totalStakes: 99.7,
    participants: 74,
    status: "active",
  },
];

const mockTopClips = [
  {
    id: "top1",
    title: "Amazing content here",
    creator: { name: "Creator1", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Entertainment"],
    likes: 0, // Hidden in earn section
    comments: 0, // Hidden in earn section
  },
  {
    id: "top2", 
    title: "Great video content",
    creator: { name: "Creator2", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Entertainment"],
    likes: 0,
    comments: 0,
  },
  {
    id: "top3",
    title: "Awesome clip right here",
    creator: { name: "Creator3", avatar: "/api/placeholder/40/40" },
    thumbnail: "/api/placeholder/300/500",
    categories: ["Entertainment"],
    likes: 0,
    comments: 0,
  },
  // Add more mock clips...
];

const Earn = () => {
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStake = (clipId: string) => {
    setSelectedClip(clipId);
  };

  const confirmStake = () => {
    if (!stakeAmount || !selectedClip) return;
    
    toast({
      title: "Stake placed!",
      description: `Staked ${stakeAmount} SOL on clip ${selectedClip}`,
    });
    
    setStakeAmount("");
    setSelectedClip(null);
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
            <Trophy className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Earn Section</h1>
          </div>
          <Badge variant="secondary" className="bg-gradient-primary text-white border-0">
            Round 46
          </Badge>
        </div>
      </motion.header>

      {selectedPool ? (
        /* Pool Details View */
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pool Header */}
            <Card className="mb-6 bg-gradient-to-r from-card to-muted/50 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedPool(null)}
                      className="px-2"
                    >
                      ←
                    </Button>
                    <div className={`w-12 h-12 rounded-2xl ${selectedPool.color} flex items-center justify-center text-2xl`}>
                      {selectedPool.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedPool.category} Round {selectedPool.round}</CardTitle>
                      <p className="text-muted-foreground">Top 10 clips competing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-destructive font-semibold">
                      <Timer className="w-4 h-4" />
                      {selectedPool.timeLeft}
                    </div>
                    <p className="text-sm text-muted-foreground">until round ends</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-primary font-semibold">
                      <Coins className="w-4 h-4" />
                      {selectedPool.totalStakes} SOL
                    </div>
                    <p className="text-sm text-muted-foreground">Total Stakes</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-secondary font-semibold">
                      <Users className="w-4 h-4" />
                      {selectedPool.participants}
                    </div>
                    <p className="text-sm text-muted-foreground">Predictors</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-success font-semibold">
                      <Trophy className="w-4 h-4" />
                      Top 5
                    </div>
                    <p className="text-sm text-muted-foreground">Will Earn</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top 10 Clips */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top 10 Clips
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {mockTopClips.slice(0, 10).map((clip, index) => (
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
                    <div className="relative">
                      <Badge 
                        className="absolute -top-2 -left-2 z-10 bg-gradient-primary text-white border-0"
                        variant="secondary"
                      >
                        #{index + 1}
                      </Badge>
                      <VideoCard
                        {...clip}
                        showEngagement={false}
                        onStake={() => handleStake(clip.id)}
                        className="aspect-[9/16]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Pools Overview */
        <div className="px-4 py-6">
          {/* Info Banner */}
          <motion.div
            className="mb-6 p-4 rounded-2xl bg-gradient-primary text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2">How it works</h2>
            <p className="text-sm opacity-90">
              Every 24h, top 10 liked clips per category enter the Earn Section. 
              Predict which 5 will be minted and earn rewards! 
              🚨 Engagement metrics are hidden here.
            </p>
          </motion.div>

          {/* Active Pools */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Active Pools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPools.filter(pool => pool.status === "active").map((pool, index) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-elegant transition-all duration-300 border-border hover:border-primary/50"
                    onClick={() => setSelectedPool(pool)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${pool.color} flex items-center justify-center text-lg`}>
                            {pool.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{pool.category}</CardTitle>
                            <p className="text-sm text-muted-foreground">Round {pool.round}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          {pool.timeLeft}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Stakes</span>
                          <span className="font-semibold">{pool.totalStakes} SOL</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Predictors</span>
                          <span className="font-semibold">{pool.participants}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stake Dialog */}
      <Dialog open={!!selectedClip} onOpenChange={() => setSelectedClip(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stake SOL on Clip #{selectedClip}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stake-amount">Amount (SOL)</Label>
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.1"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                step="0.1"
                min="0.1"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>• Minimum stake: 0.1 SOL</p>
              <p>• You predict this clip will be in top 5 minted</p>
              <p>• Winners share the rewards pool</p>
            </div>
            <Button 
              onClick={confirmStake}
              className="w-full bg-gradient-primary text-white font-semibold"
              disabled={!stakeAmount || parseFloat(stakeAmount) < 0.1}
            >
              Confirm Stake
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Earn;