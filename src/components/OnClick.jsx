import { useState } from 'react';
import { BsHandThumbsUpFill } from 'react-icons/bs';

const OnClick = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleOnClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div onClick={handleOnClick}>
      <BsHandThumbsUpFill color={isLiked ? 'green' : 'white'} />
    </div>
  );
};

export default OnClick;