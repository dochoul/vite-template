import { Link } from 'react-router-dom';
import classes from './PostItem.module.css';
import { PostProps } from '../../types/defines';

export function PostItem({ id, title, content, createdAt }: PostProps) {
  return (
    <Link className={classes.link} to={`./${id}`} key={id}>
      <div className={classes.box}>
        <h5 className={classes.title}>{title}</h5>
        <p className={classes.content}>{content}</p>
        <p className={classes.day}>{createdAt}</p>
      </div>
    </Link>
  );
}
