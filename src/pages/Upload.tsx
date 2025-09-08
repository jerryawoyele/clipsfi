import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, Video, AlertCircle, CheckCircle, X, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "knowledge", name: "Knowledge", icon: "🧠" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "lifestyle", name: "Lifestyle", icon: "✨" },
  { id: "nature", name: "Nature", icon: "🌿" },
];

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dailyUploads] = useState(3); // Mock: user has used 3/10 uploads today
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile || !title.trim() || selectedCategories.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please provide video, title, and at least one category",
        variant: "destructive",
      });
      return;
    }

    if (dailyUploads >= 10) {
      toast({
        title: "Daily limit reached",
        description: "You can upload up to 10clips per day",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload successful!",
            description: "Your clip has been uploaded and will be reviewed",
          });
          // Reset form
          setUploadedFile(null);
          setPreviewUrl("");
          setTitle("");
          setDescription("");
          setSelectedCategories([]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
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
            <UploadIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Upload Clip</h1>
          </div>
          <Badge variant="secondary" className="bg-muted">
            {dailyUploads}/10 uploads today
          </Badge>
        </div>
      </motion.header>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Daily Limit Info */}
        <motion.div
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Daily Upload Limit</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Everyone can upload up to 10 clips per day. The best clips from each category enter the daily Earn rounds!
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today's uploads</span>
              <span className="font-semibold">{dailyUploads}/10</span>
            </div>
            <Progress value={(dailyUploads / 10) * 100} className="h-2" />
          </div>
        </motion.div>

        {/* Upload Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Video Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video File
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <UploadIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Upload your video</p>
                      <p className="text-sm text-muted-foreground">
                        MP4, max 100MB • Vertical format recommended
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-card">
                  <video
                    src={previewUrl}
                    className="w-full max-h-96 object-cover"
                    controls
                    muted
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-8 h-8"
                    onClick={removeFile}
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="p-3 border-t border-border">
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Title & Description */}
          <Card>
            <CardHeader>
              <CardTitle>Clip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your clip a catchy title..."
                  disabled={isUploading}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {title.length}/100 characters
                </p>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your clip (optional)..."
                  disabled={isUploading}
                  maxLength={500}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {description.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories *</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select 1-5 categories that best describe your clip
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedCategories.includes(category.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor={category.id}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {selectedCategories.length}/5 categories
              </p>
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {isUploading && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white font-semibold py-3 rounded-2xl disabled:opacity-50"
            disabled={
              !uploadedFile ||
              !title.trim() ||
              selectedCategories.length === 0 ||
              isUploading ||
              dailyUploads >= 10
            }
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadIcon className="w-5 h-5" />
                Upload Clip
              </div>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Upload;