import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="posts" element={<PostsPage />}/>
        <Route path="comments" element={<CommentsPage />}>
          <Route path=":postId" element={<CommentsPage />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&#8216;s nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
