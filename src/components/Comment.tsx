import { IComment } from '../utils/iterfaces.js';

const parser = new DOMParser();

type TComment = {
  comment: IComment;
};

export default function Comment({ comment }: TComment) {
  const string = parser.parseFromString(comment.text, 'text/html');

  const nestedComments = (comment.children || []).map((comment, index) => {
    return (
      <ul key={index}>
        <Comment key={comment.id} comment={comment} />
      </ul>
    );
  });
  return (
    <li className="comment">
      {comment?.deleted ? (
        ''
      ) : (
        <>
          <p className="comment__author">{comment.by}</p>
          <p className="comment__text">{string.documentElement.innerText}</p>
          {nestedComments}
        </>
      )}
    </li>
  );
}
