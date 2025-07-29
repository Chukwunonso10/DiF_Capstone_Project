import Stories from "../../components/Stories";
import Post from "../../components/Post";

const posts = [
  {
    id: 1,
    username: "joshua_l",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=800&fit=crop",
    caption: "Just got back from Japan and it was amazing! I can't wait to share more photos!",
    likes: 44658,
    timeAgo: "6 hours ago",
    location: "Tokyo, Japan"
  },
  {
    id: 2,
    username: "martini_rond",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
    caption: "Beautiful sunset at the mountain top 🌅",
    likes: 12420,
    timeAgo: "8 hours ago",
    location: "Swiss Alps"
  },
  {
    id: 3,
    username: "craig_love",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
    caption: "Coffee and coding session ☕️💻",
    likes: 8934,
    timeAgo: "12 hours ago"
  },
  {
    id: 4,
    username: "kennessey",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e69e?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
    caption: "Nature always finds a way to surprise me 🌲",
    likes: 15678,
    timeAgo: "1 day ago",
    location: "Yosemite National Park"
  }
];

export default function Home() {
  return (
    <div className="max-w-md mx-auto lg:max-w-lg">
      {/* Stories */}
      <div className="lg:mb-6">
        <Stories />
      </div>

      {/* Posts Feed */}
      <div className="space-y-0 lg:space-y-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
