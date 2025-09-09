import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface VideoModalProps {
  trigger: React.ReactNode;
  className?: string;
}

export const VideoModal = ({ trigger, className }: VideoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Analytics events
  const trackOpenVideo = () => {
    // Analytics: open_video_modal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'open_video_modal', {
        event_category: 'video',
        event_label: 'how_it_works'
      });
    }
  };

  const trackCloseVideo = () => {
    // Analytics: close_video_modal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'close_video_modal', {
        event_category: 'video',
        event_label: 'how_it_works'
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      trackOpenVideo();
    } else {
      trackCloseVideo();
      // Stop video by resetting src
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src;
        iframeRef.current.src = '';
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = currentSrc;
          }
        }, 100);
      }
      
      // Return focus to trigger button
      setTimeout(() => {
        const triggerElement = triggerRef.current || document.querySelector('[data-video-modal-trigger]');
        if (triggerElement && 'focus' in triggerElement) {
          (triggerElement as HTMLElement).focus();
        }
      }, 100);
    }
    setIsOpen(open);
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div 
          ref={triggerRef as any}
          data-video-modal-trigger
          className={className}
        >
          {trigger}
        </div>
      </DialogTrigger>
      <DialogContent 
        className={cn(
          "max-w-4xl w-full bg-ink-black border-brushed-gold/20 p-0 overflow-hidden",
          "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
        )}
        onPointerDownOutside={() => handleOpenChange(false)}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-porcelain-white">
            Cómo funciona The Box Club
          </DialogTitle>
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brushed-gold focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-porcelain-white" />
            <span className="sr-only">Cerrar</span>
          </button>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          {/* 16:9 responsive video container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/ID_DEL_VIDEO?rel=0"
              title="Cómo funciona The Box Club"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};