import { useState } from "react";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SettingsModal = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themeOptions = [
    {
      value: "system",
      label: "System",
      description: "Use your device's theme",
      icon: Monitor,
    },
    {
      value: "light",
      label: "Light",
      description: "Light theme",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark theme",
      icon: Moon,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your ClipsFi experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Appearance</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value)}
              className="space-y-3"
            >
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={option.value} 
                      id={option.value}
                      className="border-2"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 flex items-center gap-3 cursor-pointer py-2"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;