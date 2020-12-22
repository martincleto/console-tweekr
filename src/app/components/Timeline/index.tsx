import React from 'react';
import { Link } from 'react-router-dom';

import './styles.less';

type Message = {
  authorId: number;
  authorName: string;
  content: string;
  datetime: string;
}

type TimelineProps = {
  messages: Message[];
};

const Timeline: React.FC<TimelineProps> = ({ messages }) => {
  return (
    <div className="timeline">
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <article className="post">
              <header className="post-header">
                <Link className="post-author" to={`/wall/${message.authorId}`}>{message.authorName}</Link>
                <span className="post-datetime">{message.datetime}</span>
              </header>
              <div className="post-content">{message.content}</div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};  

export default Timeline;
