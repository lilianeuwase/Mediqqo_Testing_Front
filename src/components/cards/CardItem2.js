import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardItem2(props3) {
  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardMedia
        component="img"
        height="140"
        image={props3.image}
        alt={props3.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props3.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props3.text}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={props3.src} target="_blank" rel="noreferrer">
          <Button size="small">Learn More</Button>
        </a>
      </CardActions>
    </Card>
  );
}
