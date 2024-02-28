import styles from './index.module.css';

function Slider() {

  return (
    <div className={styles['multi-range-slider']}>

      <div className={styles['slider']}>
        <div className={styles['track']}></div>
        <div className={styles['range']}></div>
        <div className={styles['thumb'] + ' ' + styles['left']}></div>
        <div className={styles['thumb'] + ' ' + styles['right']}></div>
        <input className={styles['input'] + ' ' + styles['left']} type="range" id="input-left" min="0" max="100" />
        <input className={styles['input'] + ' ' + styles['right']} type="range" id="input-right" min="0" max="100" />
      </div>
    </div>
  );
}

export default Slider;
