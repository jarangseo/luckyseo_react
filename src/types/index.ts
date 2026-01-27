// Product types
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// Post types
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// User types
export interface UserData {
  createdAt: Date;
  displayName: string;
  email: string;
}

// Category types
export interface Category {
  id: number;
  title: string;
  imageUrl: string;
}
