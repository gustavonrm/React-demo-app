export interface PostProps {
    [x: string]: any;
    body: string, 
    id: number, 
    title: string, 
    userId: number
  }

  export interface CommentProps {
    [x: string]: any;
    body: string, 
    email: string,
    id: number, 
    name: string, 
    postId: number
  }