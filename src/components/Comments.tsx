import { useState, useEffect } from 'react';
import { getCommentFetch } from '../utils/api.js';
import Comment from './Comment.js';
import { IComment } from '../utils/iterfaces.js';
import CommentLoader from './CommentLoader.js';

type TComments = {
  comments: number[];
};

const getCommentData = async (commentId: number) => {
  const comment: IComment = await getCommentFetch(commentId);
  if (comment.kids) {
    const kidsComments = comment.kids.map(async (kidId: number) => {
      const kidComment = await getCommentData(kidId);
      return kidComment;
    });
    comment.children = await Promise.all(kidsComments);
  }
  return comment;
};

export default function Comments({ comments }: TComments) {
  const [commentsData, setCommentsData] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const commentsData = comments.map(async (commentId) =>
        getCommentData(commentId),
      );
      const result = await Promise.all(commentsData);
      return result;
    };

    const data = getData();
    data
      .then((list: IComment[]) => {
        setCommentsData(list);
      })
      .finally(() => setIsLoading(false));
  }, [comments]);

  return (
    <section className="comments">
      <ul aria-label="Комментарии">
        {isLoading
          ? [...new Array(6)].map((_, i) => <CommentLoader key={i} />)
          : commentsData.map((comment: IComment) => {
              return <Comment comment={comment} key={comment.id} />;
            })}
      </ul>
    </section>
  );
}
