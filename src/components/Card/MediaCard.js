import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
// import Link from "@material-ui/core/Link";

export const MediaCard = ({title, body, image, buttonText}) => {
  return (
    <Card sx={{ maxWidth: 345, width: 200 }}>
      <CardActionArea component={RouterLink} to="/">
        <CardMedia
          component="img"
          width="150"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
