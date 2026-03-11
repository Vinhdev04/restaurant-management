import React from 'react';
import styles from './SkeletonItem.module.scss';

const SkeletonItem = () => {
  return (
    <div className={styles.skeletonItem}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

export default SkeletonItem;
