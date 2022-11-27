import React from 'react';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

const Favorite = (props) => {
  const { toggleFavorite } = props;
  return (
    <div onClick={toggleFavorite} >
      Like
    </div>
  );
};

export default Favorite;
