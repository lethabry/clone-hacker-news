import NewsItem from './NewsItem.js';
import { IStory } from '../utils/iterfaces.js';
import CommentLoader from './CommentLoader.js';

type TNewsList = {
  stories: IStory[];
  onStoryClick: (story: number[]) => void;
  isLoading: boolean;
};

export default function NewsList({
  stories,
  onStoryClick,
  isLoading,
}: TNewsList) {
  return (
    <ul className="news" aria-label="Список новостей">
      {isLoading
        ? [...new Array(6)].map((_, i) => <CommentLoader key={i} />)
        : stories.map((story: IStory) => (
            <NewsItem key={story.id} story={story} onClick={onStoryClick} />
          ))}
    </ul>
  );
}
