import { Camera, Image, Video } from "lucide-react";

export default function Create() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-24 h-24 border-2 border-instagram-border rounded-full flex items-center justify-center mx-auto mb-6">
          <Camera className="h-12 w-12 text-instagram-gray" />
        </div>
        <h2 className="text-xl font-light text-instagram-text mb-4">Create New Post</h2>
        <p className="text-sm text-instagram-gray mb-8 max-w-sm">
          Share photos and videos with your friends and followers.
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-instagram-blue text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2">
            <Image className="h-5 w-5" />
            <span>Select from gallery</span>
          </button>
          <button className="w-full border border-instagram-border text-instagram-text py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Record video</span>
          </button>
        </div>
        
        <p className="text-xs text-instagram-gray mt-6">
          This is a placeholder page. Continue prompting to add full upload functionality.
        </p>
      </div>
    </div>
  );
}
