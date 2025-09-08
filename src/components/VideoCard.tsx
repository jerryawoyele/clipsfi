import { useState } from "react";
import { Heart, MessageCircle, Share, Play, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface VideoCardProps {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar?: string;
  };
  thumbnail: string;
  categories: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  showEngagement?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onStake?: () => void;
  className?: string;
}

const VideoCard = ({
  id,
  title,
  creator,
  thumbnail,
  categories,
  likes,
  comments,
  isLiked = false,
  showEngagement = true,
  onLike,
  onComment,
  onShare,
  onStake,
  className = "",
}: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showStakeButton, setShowStakeButton] = useState(false);

  const handleDoubleClick = () => {
    onLike?.();
  };

  const handleVideoClick = () => {
    if (!showEngagement) {
      setShowStakeButton(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-card shadow-video cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onDoubleClick={handleDoubleClick}
      onClick={handleVideoClick}
    >
      {/* Video Thumbnail/Player */}
      <div className="relative w-full h-full bg-gradient-to-br from-muted to-accent">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-video-overlay" />
        
        {/* Play Button */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Mute Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/50"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </Button>

        {/* Categories */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {/* Creator Info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10 border-2 border-white/30">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {creator.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{creator.name}</p>
            </div>
          </div>

          {/* Title */}
          <p className="text-sm font-medium mb-3 line-clamp-2">{title}</p>

          {/* Engagement Actions */}
          {showEngagement && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2 h-auto gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike?.();
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-xs">{likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2 h-auto gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onComment?.();
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs">{comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.();
                  }}
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stake Button (Earn Section) */}
        {!showEngagement && showStakeButton && (
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="w-full bg-gradient-primary text-white font-semibold py-3 rounded-full shadow-glow"
              onClick={(e) => {
                e.stopPropagation();
                onStake?.();
              }}
            >
              Stake SOL on this clip
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;