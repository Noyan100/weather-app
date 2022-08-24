import React from 'react';
import { HomeSvgSelector } from '../../../pages/HomeSvgSelector';
import styles from './Item.module.scss';

type TItem = {
  list: {
    main: { temp: number };
    weather: [{ description: string; icon: string }];
    dt_txt: string;
  }[];
  day: string;
};

const Item: React.FC<TItem> = ({ list, day }) => {
  const monthList = [
    'янв',
    'фев',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сен',
    'окт',
    'нояб',
    'дек',
  ];
  const date =
    list[0].dt_txt.split('-')[2].split(' ')[0] +
    ' ' +
    monthList[Number(list[0].dt_txt.split('-')[1]) - 1];
  return (
    <div className={styles.item}>
      <div className={styles.day}>{day}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.icon}>
        <HomeSvgSelector id={list[2].weather[0].icon} />
      </div>
      <div className={styles.temperatureDay}>{Math.ceil(list[0].main.temp)}°</div>
      <div className={styles.temperatureNight}>{Math.ceil(list[7].main.temp)}°</div>
      <div className={styles.info}>{list[2].weather[0].description}</div>
    </div>
  );
};

export default Item;
