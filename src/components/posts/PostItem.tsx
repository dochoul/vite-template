import { Link } from 'react-router-dom';
import styles from './PostItem.module.css';
import { PostProps } from '../../types/defines';

export function PostItem({ id, title, content, createdAt }: PostProps) {
  return (
    <Link className={styles.link} to={`./${id}`} key={id}>
      <div className={styles.box}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.content}>{content}</p>
        <p className={styles.day}>{createdAt}</p>
      </div>
    </Link>
  );
}
