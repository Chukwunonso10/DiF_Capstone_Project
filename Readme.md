# API Documentation - Posts & Comments

- **Posts:** `http://localhost:5000/api/posts`
- **Comments:** `http://localhost:5000/api/comments`

## Authentication
Protected routes require a Bearer token:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

---

# POST ROUTES

## 1. Create Post
**POST** `/api/posts`

**Authentication:** Required

**Request Body:**
\`\`\`json
{
  "content": "string (optional)",
  "media": "string (required)",
  "tags": ["string"] (optional)
}
\`\`\`

**Success Response (201):**
\`\`\`json
{
  "success": true,
  "message": "New post successfully created",
  "post": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "content": "Beautiful sunset!",
    "media": "https://example.com/sunset.jpg",
    "tags": ["sunset", "nature"],
    "likes": [],
    "savedBy": [],
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
\`\`\`

**Error Responses:**
- `400`: Media field is required
- `401`: Unauthorized (invalid/missing token)
- `500`: Internal server error

---

## 2. Get All Posts
**GET** `/api/posts`

**Authentication:** Not required

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "posts": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "userId": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "fullName": "John Doe",
        "userName": "johndoe",
        "profilePicture": "https://example.com/profile.jpg"
      },
      "content": "Beautiful sunset!",
      "media": "https://example.com/sunset.jpg",
      "tags": ["sunset", "nature"],
      "likes": ["64f8a1b2c3d4e5f6a7b8c9d2"],
      "savedBy": [],
      "createdAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
\`\`\`

**No Posts Response (200):**
\`\`\`json
{
  "message": "No available posts",
  "posts": []
}
\`\`\`

---

## 3. Get Single Post
**GET** `/api/posts/:id`

**Authentication:** Not required

**URL Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "post": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "userId": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "fullName": "John Doe",
      "userName": "johndoe",
      "profilePicture": "https://example.com/profile.jpg"
    },
    "content": "Beautiful sunset!",
    "media": "https://example.com/sunset.jpg",
    "tags": ["sunset", "nature"],
    "likes": ["64f8a1b2c3d4e5f6a7b8c9d2"],
    "savedBy": [],
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
}
\`\`\`

**Error Responses:**
- `404`: Post not found
- `500`: Internal server error

---

## 4. Update Post
**PUT** `/api/posts/:id`

**Authentication:** Required (Only post owner)

**URL Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Request Body:**
\`\`\`json
{
  "content": "Updated content",
  "tags": ["updated", "tags"]
}
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "userId": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "fullName": "John Doe",
      "userName": "johndoe",
      "profilePicture": "https://example.com/profile.jpg"
    },
    "content": "Updated content",
    "tags": ["updated", "tags"],
    "updatedAt": "2023-09-06T11:30:00.000Z"
  }
}
\`\`\`

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `403`: You can only update your own posts
- `404`: Post not found
- `500`: Update failed / Internal server error

---

## 5. Delete Post
**DELETE** `/api/posts/:id`

**Authentication:** Required (Only post owner)

**URL Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Successfully deleted"
}
\`\`\`

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `403`: You can only delete your own posts
- `404`: Post not found
- `500`: Unable to delete post / Internal server error

---

## 6. Toggle Like Post
**PATCH** `/api/posts/:id/like`

**Authentication:** Required

**URL Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Post liked",
  "isLiked": true,
  "likesCount": 5
}
\`\`\`

**Unlike Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Post unliked",
  "isLiked": false,
  "likesCount": 4
}
\`\`\`

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `404`: Post not found
- `500`: Internal server error

---

## 7. Toggle Save Post
**PATCH** `/api/posts/:id/save`

**Authentication:** Required

**URL Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Post saved",
  "isSaved": true
}
\`\`\`

**Unsave Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Post unsaved",
  "isSaved": false
}
\`\`\`

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `404`: Post not found
- `500`: Internal server error

---

# COMMENT ROUTES

## 1. Create Comment
**POST** `/api/comments`

**Authentication:** Required

**Request Body (Top-level comment):**
\`\`\`json
{
  "postId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "content": "Great post!"
}
\`\`\`

**Request Body (Reply to comment):**
\`\`\`json
{
  "postId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "content": "I agree!",
  "parentCommentId": "64f8a1b2c3d4e5f6a7b8c9d1"
}
\`\`\`

**Success Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Comment created successfully",
  "comment": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "content": "Great post!",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "fullName": "Jane Smith",
      "userName": "janesmith",
      "profilePicture": "https://example.com/jane.jpg"
    },
    "post": "64f8a1b2c3d4e5f6a7b8c9d0",
    "parentComment": null,
    "createdAt": "2023-09-06T12:00:00.000Z"
  }
}
\`\`\`

**Error Responses:**
- `400`: Post ID and content are required / Parent comment not found
- `401`: Unauthorized (invalid/missing token)
- `404`: Post not found
- `500`: Internal server error

---

## 2. Get Comments by Post
**GET** `/api/comments/post/:postId`

**Authentication:** Not required

**URL Parameters:**
- `postId`: Post ID (MongoDB ObjectId)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Comments per page (default: 20)

**Example Request:**
\`\`\`
GET /api/comments/post/64f8a1b2c3d4e5f6a7b8c9d0?page=1&limit=10
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "comments": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "content": "Great post!",
      "user": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
        "fullName": "Jane Smith",
        "userName": "janesmith",
        "profilePicture": "https://example.com/jane.jpg"
      },
      "post": "64f8a1b2c3d4e5f6a7b8c9d0",
      "createdAt": "2023-09-06T12:00:00.000Z",
      "replies": [
        {
          "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
          "content": "I agree!",
          "user": {
            "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
            "fullName": "Bob Wilson",
            "userName": "bobwilson",
            "profilePicture": "https://example.com/bob.jpg"
          },
          "parentComment": "64f8a1b2c3d4e5f6a7b8c9d2",
          "createdAt": "2023-09-06T12:15:00.000Z"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
\`\`\`

**Error Responses:**
- `404`: Post not found
- `500`: Internal server error

---

## 3. Get Single Comment
**GET** `/api/comments/:commentId`

**Authentication:** Not required

**URL Parameters:**
- `commentId`: Comment ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "comment": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "content": "Great post!",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "fullName": "Jane Smith",
      "userName": "janesmith",
      "profilePicture": "https://example.com/jane.jpg"
    },
    "post": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "media": "https://example.com/sunset.jpg",
      "content": "Beautiful sunset!"
    },
    "parentComment": null,
    "createdAt": "2023-09-06T12:00:00.000Z",
    "replies": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
        "content": "I agree!",
        "user": {
          "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
          "fullName": "Bob Wilson",
          "userName": "bobwilson",
          "profilePicture": "https://example.com/bob.jpg"
        },
        "createdAt": "2023-09-06T12:15:00.000Z"
      }
    ]
  }
}
\`\`\`

**Error Responses:**
- `404`: Comment not found
- `500`: Internal server error

---

## 4. Update Comment
**PUT** `/api/comments/:commentId`

**Authentication:** Required (Only comment owner)

**URL Parameters:**
- `commentId`: Comment ID (MongoDB ObjectId)

**Request Body:**
\`\`\`json
{
  "content": "Updated comment content"
}
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Comment updated successfully",
  "comment": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "content": "Updated comment content",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "fullName": "Jane Smith",
      "userName": "janesmith",
      "profilePicture": "https://example.com/jane.jpg"
    },
    "parentComment": null,
    "updatedAt": "2023-09-06T13:00:00.000Z"
  }
}
\`\`\`

**Error Responses:**
- `400`: Comment content is required
- `401`: Unauthorized (invalid/missing token)
- `403`: You can only update your own comments
- `404`: Comment not found
- `500`: Internal server error

---

## 5. Delete Comment
**DELETE** `/api/comments/:commentId`

**Authentication:** Required (Only comment owner)

**URL Parameters:**
- `commentId`: Comment ID (MongoDB ObjectId)

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Comment and its replies successfully deleted"
}
\`\`\`

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `403`: You can only delete your own comments
- `404`: Comment not found
- `500`: Unable to delete comment / Internal server error

---

# ERROR RESPONSES

## Common Error Codes
- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - No permission for this action
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error

## Example Error Response
\`\`\`json
{
  "message": "Post not found"
}
\`\`\`

---

# DATA MODELS

## Post Object
\`\`\`json
{
  "_id": "MongoDB ObjectId",
  "userId": "MongoDB ObjectId (ref: User)",
  "content": "string (optional)",
  "media": "string (required)",
  "likes": ["MongoDB ObjectId (ref: User)"],
  "savedBy": ["MongoDB ObjectId (ref: User)"],
  "tags": ["string"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
\`\`\`

## Comment Object
\`\`\`json
{
  "_id": "MongoDB ObjectId",
  "content": "string (required)",
  "user": "MongoDB ObjectId (ref: User)",
  "post": "MongoDB ObjectId (ref: Post)",
  "parentComment": "MongoDB ObjectId (ref: Comment) | null",
  "createdAt": "Date",
  "updatedAt": "Date"
}
\`\`\`

## User Object (in populated responses)
\`\`\`json
{
  "_id": "MongoDB ObjectId",
  "fullName": "string",
  "userName": "string",
  "profilePicture": "string"
}
\`\`\`

---

