import React from 'react';
import Button from '@mui/material/Button';

type PropType = {
  selected: boolean;
  index: number;
  slide: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, slide, onClick } = props;

  return (
    <div className={'embla-thumbs__slide'.concat(selected ? ' embla-thumbs__slide--selected' : '')}>
      <Button
        sx={{ p: 0 }}
        onClick={onClick}
        type='button'
        className='embla-thumbs__slide'
        variant='text'
        color='primary'
      >
        <img width={50} height={50} src={slide} alt={index.toString()} />
      </Button>
    </div>
  );
};
