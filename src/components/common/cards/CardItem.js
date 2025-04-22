import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
// import { NoSsr } from '@mui/base/NoSsr';
import NoSsr from 'react-no-ssr';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

let photo = require('../../images/Ornella.jpeg');

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    minWidth: 200,
    minHeight: 360,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
}));

export const CardItem = React.memo(function GalaxyCard(props2) {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const styles = useStyles();
  return (
    <div>
      <NoSsr>
        <GoogleFontLoader
          fonts={[
            { font: 'Spartan', weights: [300] },
            { font: 'Montserrat', weights: [200, 400, 700] },
          ]}
        />
      </NoSsr>
      <Card className={styles.card}>
        <CardMedia
          classes={mediaStyles}
          image={
            photo
          }
        />
        <Box py={3} px={2} className={styles.content}>
          <Info useStyles={useGalaxyInfoStyles}>
            <InfoSubtitle style={{ color: 'black' }}>{props2.subtitle}</InfoSubtitle>
            <InfoTitle style={{ color: 'black' }}>{props2.title}</InfoTitle>
            <InfoCaption style={{ color: 'black' }}>{props2.caption}</InfoCaption>
          </Info>
        </Box>
      </Card>
    </div>
  );
});
export default CardItem;