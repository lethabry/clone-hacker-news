import { Link } from 'react-router-dom';
import { IStory } from '../utils/iterfaces.js';

type TNewsItem = {
  story: IStory;
  onClick: (story: number[]) => void;
};

export default function NewsItem({ story, onClick }: TNewsItem) {
  return (
    <li className="news-item">
      <h3 className="news-item__title">
        {' '}
        <a
          href={story.url}
          className="news-item__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.title}
        </a>
      </h3>
      <div className="news-item__info">
        <p>
          {story.score} points by {story.by}
          {story.kids?.length ? (
            <>
              <span> | </span>
              <Link
                to={`/comments/${story.id}`}
                className="news-item__link"
                onClick={() => onClick(story.kids)}
              >
                {story.kids.length} comments
              </Link>{' '}
            </>
          ) : (
            ''
          )}
        </p>
      </div>
    </li>
  );
}
