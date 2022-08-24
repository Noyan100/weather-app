import React from 'react';
import { HomeSvgSelector } from '../../pages/HomeSvgSelector';
import styles from './Today.module.scss';

type TToday = {
  temp: number;
  city: string;
  time: number;
  icon: string;
};

const Today: React.FC<TToday> = ({ temp, city, time, icon }) => {
  const [date, setDate] = React.useState(new Date());
  const getDate = (timezone: number) => {
    const dt = new Date();
    dt.setHours(dt.getUTCHours() + timezone / 3600);
    return dt;
  };

  const MINUTE_MS = 5000;
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDate(time));
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [time]);

  React.useEffect(() => {
    setDate(getDate(time));
  }, [time]);

  return (
    <div className={styles.container}>
      <div className={styles.blockOne}>
        <div className={styles.textBlock}>
          <span className={styles.temperature}>{Math.ceil(temp)}°</span>
          <span className={styles.today}>Сегодня</span>
        </div>
        <div className={styles.img}>
          <HomeSvgSelector id={icon} />
        </div>
      </div>
      <div className={styles.blockTwo}>
        <span className={styles.time}>
          Время:{' '}
          {`${date.toLocaleTimeString().split(':')[0]}:${date.toLocaleTimeString().split(':')[1]}`}
        </span>
        <span className={styles.location}>Город: {city}</span>
      </div>
    </div>
  );
};

export default Today;
