import React, { useCallback, useEffect, useMemo, useRef ,useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Button, Drawer } from 'antd';

import { Post } from '@entities/Post';
import { User } from '@entities/User';
import { RootState } from '@slices/rootReducer';
import { setDrawerCollapsed } from '@slices/app';
import { fetchUser, fetchFollowingUsers } from '@slices/users';
import { addPost, fetchPosts } from '@slices/posts';
import { IRouteParams } from '../../../app/App'
import Page from '../Page';
import FollowingList from '@components/FollowingList';
import MessageForm from '@components/MessageForm';
import Timeline from '@components/Timeline';
import SearchUsers from '@components/SearchUsers';

import './styles.less';

type WallProps = {
  addPost: any;
  drawerCollapsed: boolean;
  fetchPosts: any;
  fetchUser: any;
  fetchFollowingUsers: any;
  setDrawerCollapsed: ActionCreatorWithPayload<boolean>;
  location: any;
  posts: Post[];
  user: User;
};

type Message = {
  authorId: number;
  authorName: string;
  content: string;
  datetime: string;
};

const LOGGED_USER_ID = 0; // to fake a logged user (login not implemented)

const Wall: React.FC<WallProps> = ({
  addPost,
  drawerCollapsed,
  fetchPosts,
  fetchUser,
  fetchFollowingUsers,
  location,
  posts,
  setDrawerCollapsed,
  user,
}) => {
  const { userId } = useParams<IRouteParams>();
  const persisted = !!localStorage.getItem('persist:root');
  const [userLoaded, setUserLoaded] = useState(persisted);
  const [followingUsersLoaded, setFollowingUsersLoaded] = useState(persisted);
  const [postsLoaded, setPostsLoadedLoaded] = useState(persisted);
  const [messagesUpdated, setMessagesUpdated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const getMessages = useCallback((posts: Post[], followingUsers) => posts.map(post => {
    const { authorId, content, timestamp } = post;
    const authorName = followingUsers.find((followingUser: User) => followingUser.id === post.authorId).name;

    return {
      authorId, 
      authorName,
      content,
      datetime: new Date(timestamp).toLocaleString(),
    }
  }), []);

  const renderMessageTimeline = () => <Timeline messages={messages} />;
  const MessagesTimeline = useMemo(() => renderMessageTimeline, [messages, renderMessageTimeline]);

  const scrollToBottom = (element: HTMLDivElement | null) => {
    if (element) {
      console.log()
      element.scrollTop = element.scrollHeight;
    }
  };

  const postMessage = (values: { content: string }) => {
    const { content } = values;
    const body = {
      authorId: user.id,
      content,
      timestamp: new Date().toISOString(),
    };

    setDrawerCollapsed(true);
    addPost(body).then(() => {
      setMessagesUpdated(true);
    });
  };

  useEffect(() => {
    if (!userLoaded) {
      fetchUser(LOGGED_USER_ID).then(() => {
        setUserLoaded(true);
      });
    }

    if (userLoaded && !followingUsersLoaded && !postsLoaded) {
      fetchPosts(user.following).then(() => {
        setPostsLoadedLoaded(true);
      })
      fetchFollowingUsers(user.following).then(() => {
        setFollowingUsersLoaded(true);
      });
    }

    if (followingUsersLoaded && postsLoaded) {
      const currentPosts = userId ? posts.filter(post => post.authorId === parseInt(userId, 10)) : posts;
      const currentUsers = [...user.following, user];

      setMessages(getMessages(currentPosts, currentUsers));
      if (messagesUpdated) {
        setTimeout(() => scrollToBottom(contentRef.current), 250);
        setMessagesUpdated(false);
      }
    }
  }, [
    followingUsersLoaded,
    location,
    messagesUpdated,
    userLoaded,
    postsLoaded,
  ]);

  return (
    <Page
      className="page page-wall"
      sidebar={
        <>
          <FollowingList users={user.following} />
          <SearchUsers />
        </>
      }
      content={
        <div
          ref={contentRef}
          className="wall-content"
        >
          <MessagesTimeline/>
          {!userId &&
            <div className="wall-drawer">
              <Button
                type="primary"
                className="action-button"
                onClick={() => setDrawerCollapsed(false)}>
                  Write a message
              </Button>
              <Drawer
                title="Write a message"
                placement="bottom"
                closable={false}
                onClose={() => setDrawerCollapsed(true)}
                visible={!drawerCollapsed}
                key="bottom"
              >
                <MessageForm onSubmit={postMessage} />
              </Drawer>
            </div>
          }
        </div>
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  drawerCollapsed: state.app.drawerCollapsed,
  posts: state.post.posts,
  user: {
    id: state.user.id,
    name: state.user.name,
    following: state.user.following,
  },
});

const mapActionsToProps = {
  addPost,
  fetchPosts,
  fetchUser,
  fetchFollowingUsers,
  setDrawerCollapsed,
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Wall));
