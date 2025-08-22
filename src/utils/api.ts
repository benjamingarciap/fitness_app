// API utility for connecting frontend to backend
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(data: Record<string, any>): Promise<any> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data: Record<string, any>): Promise<any> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getFeed(): Promise<any> {
  const res = await fetch(`${API_URL}/posts/feed`);
  return res.json();
}

export async function createPost(data: Record<string, any>, token?: string): Promise<any> {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function reactToPost(postId: string, emoji: string, token?: string): Promise<any> {
  const res = await fetch(`${API_URL}/posts/${postId}/reaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ emoji }),
  });
  return res.json();
}

export async function getProfile(userId: string): Promise<any> {
  const res = await fetch(`${API_URL}/profile/${userId}`);
  return res.json();
}
