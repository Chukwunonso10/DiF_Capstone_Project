/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/api/postService.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/api/postService.ts
import type {
  Post,
  Comment,
  CreatePostData,
  UpdatePostData,
  CreateCommentData,
  PostResponse,
  PostsResponse,
  CommentResponse,
} from "../../types/postTypes";

const API_BASE_URL = "https://dif-capstone-project-backend.onrender.com";

export class PostService {
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: object | FormData,
    isMultipart: boolean = false
  ): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = isMultipart
      ? {}
      : { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body:
        body instanceof FormData
          ? body
          : body
          ? JSON.stringify(body)
          : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  async createPost(postData: CreatePostData | FormData): Promise<PostResponse> {
    try {
      const isMultipart = postData instanceof FormData;
      const response = await this.makeRequest<PostResponse>(
        "/api/posts/add",
        "POST",
        postData,
        isMultipart
      );
      console.log("Create Post Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Create Post Error:", error); // Debug log
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getAllPosts(): Promise<PostsResponse> {
    try {
      const response = await this.makeRequest<PostsResponse>("/api/posts/all");
      console.log("Get All Posts Response:", response); // Debug log
      return response;
    } catch (error) {
      console.error("Get All Posts Error:", error); // Debug log
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch posts",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getPostById(postId: string): Promise<PostResponse> {
    try {
      const response = await this.makeRequest<PostResponse>(
        `/api/posts/me/${postId}`
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async updatePost(
    postId: string,
    postData: UpdatePostData
  ): Promise<PostResponse> {
    try {
      const response = await this.makeRequest<PostResponse>(
        `/api/posts/${postId}`,
        "PUT",
        postData
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async deletePost(postId: string): Promise<PostResponse> {
    try {
      const response = await this.makeRequest<PostResponse>(
        `/api/posts/${postId}`,
        "DELETE"
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async toggleLikePost(postId: string): Promise<PostResponse> {
    try {
      const response = await this.makeRequest<PostResponse>(
        `/api/posts/${postId}/like`,
        "PATCH"
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to toggle like",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async createComment(
    commentData: CreateCommentData
  ): Promise<CommentResponse> {
    try {
      const response = await this.makeRequest<CommentResponse>(
        "/api/comments",
        "POST",
        commentData
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create comment",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const postService = new PostService();
