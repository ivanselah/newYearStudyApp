import { PostsState } from '@/pages';
import React from 'react';
import { useQuery, useMutation } from 'react-query';

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

async function deletePost(postId: PostsState['id']) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export default function PostDetail({ post }: { post: PostsState }) {
  const { data, isLoading, isError, error } = useQuery<CommentState[]>(['comments', post.id], () =>
    fetchComments(post.id)
  );
  // useQuery fetching
  // isError, isLoading 결과 설명
  // 쿼리키

  const deleteMutation = useMutation((postId: number) => deletePost(postId));

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

  const onDeleteClick = (postId: number) => {
    deleteMutation.mutate(postId);
  };

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button type='button' onClick={() => onDeleteClick(post.id)}>
        Delete
      </button>
      <div style={{ padding: 10, fontSize: '20px', fontWeight: 'bold' }}>
        {deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting the post</p>}
        {deleteMutation.isLoading && <p style={{ color: 'purple' }}>Deleting the post</p>}
        {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Success deleteing the post</p>}
      </div>
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
