import { Link } from 'react-router-dom';
import classes from './PostItem.module.css';
import { PostProps } from '../../types/defines';

export function PostItem({ id, title, content, createdAt }: PostProps) {
  return (
    <Link to={`./${id}`} key={id}>
      <div className={classes.box}>
        <div className={classes.body}>
          <h5 className={classes.title}>{title}</h5>
          <p className="card-text">{content}</p>
          <p>{createdAt}</p>
        </div>
      </div>
    </Link>
  );
}
