import { PostsState } from '@/pages';
import React from 'react';
import { isError, useQuery } from 'react-query';

type CommentState = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

async function fetchComments(postId: PostsState['id']) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

export default function PostDetail({ post }: { post: PostsState }) {
  const { data, isLoading, isError, error } = useQuery<CommentState[]>(['comments', post.id], () =>
    fetchComments(post.id)
  );
  // useQuery fetching
  // isError, isLoading 결과 설명
  // 쿼리키

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error?.toString()}</p>
      </>
    );
  }

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button type='button'>Delete</button>
      <button type='button'>Update Title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment: any) => (
        <li key={comment.id} className='comments'>
          <span className='comments-span'>{comment.email}</span> : {comment.body}
        </li>
      ))}
    </>
  );
}
