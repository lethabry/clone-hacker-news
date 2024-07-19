import React from 'react';
import ContentLoader from 'react-content-loader';

const CommentLoader: React.FC = (props) => (
  // @ts-ignore
  <ContentLoader
    speed={2}
    width={1264}
    height={144}
    viewBox="0 0 1264 144"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="44" y="88" rx="0" ry="0" width="1264" height="45" />
    <rect x="43" y="66" rx="0" ry="0" width="100" height="18" />
  </ContentLoader>
);

export default CommentLoader;
