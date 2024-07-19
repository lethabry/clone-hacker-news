import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NewsList from './NewsList.js';
import Sorting from './Sorting.js';
import Comments from './Comments.js';
import { getStories, getStory } from '../utils/api.js';
import { ISort, IStory } from '../utils/iterfaces.js';
import {
  QUANTITYNEWS,
  QUANTITYSECONDS,
  SORTINGLIST,
  VALUESCROLL,
} from '../utils/constants.js';

let currentPage = 1;

/**
 * @TODO Добавить компонент избранного
 */

function App() {
  const [storiesId, setStoriesId] = useState<string[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isNeedData, setIsNeedData] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [sortingSettings, setSortingSettings] = useState<ISort[]>(SORTINGLIST);

  const [selectingComments, setSelectedComments] = useState<number[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const renderStories = async () => {
    setIsLoading(true);
    try {
      const activeSort = sortingSettings.filter((el) => el.isActive);
      const storiesIdx = await getStories(activeSort[0].urlRequest);
      setStoriesId(storiesIdx);
      const fifteenStories = storiesIdx.slice(0, QUANTITYNEWS);

      const storiesData = fifteenStories.map(async (storyId: string) => {
        const story = await getStory(storyId);
        return story;
      });

      const allStories = await Promise.all(storiesData);
      setStories(allStories);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSorting = (name: string) => {
    setSortingSettings((prev) =>
      prev.map((el) => ({
        ...el,
        isActive: el.name === name,
      })),
    );
    setStories([]);
    renderStories();
    navigate('/news', { replace: true });
    setSeconds(0);
  };

  const getComments = (comments: number[]) => setSelectedComments(comments);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + QUANTITYSECONDS);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === QUANTITYSECONDS) {
      setSeconds(0);
      if (location.pathname === '/news') {
        setStories([]);
        renderStories();
      }
    }
  }, [seconds]);

  useEffect(() => {
    renderStories();
  }, []);

  useEffect(() => {
    if (location.pathname === '/news') {
      try {
        const renderNewStories = async () => {
          if (isNeedData) {
            currentPage += 1;
            const nextStoryPartIdxs = storiesId.slice(
              (currentPage - 1) * QUANTITYNEWS,
              currentPage * QUANTITYNEWS,
            );

            const newStories = nextStoryPartIdxs.map(
              async (storyId: string) => {
                const story = await getStory(storyId);
                return story;
              },
            );

            const newStoriesData = await Promise.all(newStories);
            setStories((prev) => [...prev, ...newStoriesData]);
            setIsNeedData(false);
          }
        };

        renderNewStories();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isNeedData]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop +
          document.documentElement.clientHeight) <
      VALUESCROLL
    ) {
      setIsNeedData(true);
    }
  };

  return (
    <main>
      <Sorting sortingList={sortingSettings} onSortClick={handleSorting} />
      <Routes>
        <Route
          path="news"
          element={
            <NewsList
              stories={stories}
              onStoryClick={getComments}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="comments/:id"
          element={<Comments comments={selectingComments} />}
        />
      </Routes>
    </main>
  );
}

export default App;
