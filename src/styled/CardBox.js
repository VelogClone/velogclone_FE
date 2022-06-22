import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import { CardProfile, Profile, CardAnimation } from './CardBoxCss';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RecipeReviewCard({ postImage, postTitle, postContent, postDate, userImage, commentCount, nickname }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardAnimation>
      <Card sx={{ maxWidth: 600 }} >
        <CardMedia
          component="img"
          height="160"
          image={postImage}
          alt="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" fontWeight="bolder" textAlign="left" component="div">
            {postTitle}
          </Typography>
          <Typography variant="body2" textAlign="left" height="60px" resize="none" color="text.secondary">
            {postContent}
          </Typography>
          <div style={{ fontSize: "13px", marginTop: "3rem", marginBottom: "-2rem", textAlign: "left" }}>
            {postDate}{" / "}{commentCount}개의 댓글
          </div>
          <Divider sx={{ height: 30, m: 0.5 }} orientation="horizen" />
          <IconButton aria-label="add to favorites" sx={{ p: '10px' }} style={{ float: "right" }}>
            <FavoriteIcon sx={{ fontSize: 15 }} /><div style={{ fontSize: "12px", marginLeft: "5px" }}>{"좋아요"}</div>
          </IconButton>
        </CardContent>
        {/* <CardHeader style={{ marginTop: "-2rem" }}
        avatar={
          <Avatar style={{ height: "30px", width: "30px" }} aria-label="recipe">
            {userImage}
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={nickname}
      /> */}
        <CardProfile>
          <div style={{ position: "relative", marginLeft: "5%" }}>
            <Profile>
              <img src={userImage} />
            </Profile>
            <div style={{ position: "absolute", top: "6px", left: "35px", width: "20vw",fontSize: "clamp(0.8rem, 1vw, 1rem)", textAlign:"left", fontWeight: "bolder" }}>{nickname}</div>

          </div>
        </CardProfile>
      </Card>
    </CardAnimation>
  );
}
