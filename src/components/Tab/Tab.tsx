import React from 'react';
import styles from './Tab.module.scss';
import Item from './Item/Item';

import { TWeather } from '../../redux/thunks/fetchNextWeather';

const Tab: React.FC<TWeather> = ({ list }) => {
  const days = () => {
    const daysList = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
    let number = -1;
    return [...new Array(11)].map(() => {
      number >= 6 ? (number = 0) : number++;
      return daysList[number];
    });
  };
  const setDay = (index: number) => {
    const n = new Date().getDay();
    if (index / 8 === 1) return 'Сегодня';
    if (index / 8 === 2) return 'Завтра';
    return days()[index / 8 + n - 1];
  };
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {list.map((obj, index) =>
          (index + 1) % 8 === 0 ? (
            <Item key={index} list={list.slice(index - 7, index + 1)} day={setDay(index + 1)} />
          ) : (
            ''
          ),
        )}
      </div>
    </div>
  );
};

export default Tab;
