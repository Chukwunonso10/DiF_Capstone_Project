export interface Post {
  _id: string;
  userId: string;
  content?: string;
  media: string; // Assuming backend returns a URL after file upload
  tags?: string[];
  likes: string[];
  savedBy: string[];
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    fullName: string;
    userName: string;
    profilePicture?: string;
  };
}

export interface Comment {
  _id: string;
  postId: string;
  content: string;
  user: {
    _id: string;
    fullName: string;
    userName: string;
    profilePicture?: string;
  };
  parentCommentId?: string;
  createdAt: string;
}

export interface CreatePostData {
  content?: string;
  media: File | string; // Support both file and URL for flexibility
  tags?: string[];
}

export interface UpdatePostData {
  content?: string;
  tags?: string[];
}

export interface CreateCommentData {
  postId: string;
  content: string;
  parentCommentId?: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  post?: Post;
  error?: string;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  posts?: Post[];
  error?: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
  comment?: Comment;
  error?: string;
}
