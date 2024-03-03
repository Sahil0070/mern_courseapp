import React from 'react';
import styles from './Alert.module.css';

export default function Alert(props) {
  const alertClass = props.type === 'success' ? styles.successAlert : styles.errorAlert;

  return (
    <div role="alert" className={`${styles.my_alert} ${alertClass}`}>
      <div className={styles.my_alert_body}>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
