import styles from './StatusMessage.module.css';

const StatusMessage = ({ type, message }) => {
  if (!message) return null;
  
  return (
    <div className={`${styles.statusMessage} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default StatusMessage;