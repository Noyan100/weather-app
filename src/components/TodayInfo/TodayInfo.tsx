import React from 'react';
import styles from './TodayInfo.module.scss';
import temperature from '../../assets/temperature.svg';
import pressureIcon from '../../assets/pressure.svg';
import precipitation from '../../assets/precipitation.svg';
import windIcon from '../../assets/wind.svg';

type TTodayInfo = {
  temp: number;
  feelslike: number;
  clouds: string;
  wind: {
    speed: number;
    deg: number;
  };
  pressure: number;
};

const TodayInfo: React.FC<TTodayInfo> = ({ temp, feelslike, clouds, wind, pressure }) => {
  const windTypes = [
    { name: 'Север', deg: 0 },
    { name: 'Северо-восток', deg: 45 },
    { name: 'Восток', deg: 90 },
    { name: 'Юго-восток', deg: 135 },
    { name: 'Юг', deg: 180 },
    { name: 'Юго-запад', deg: 225 },
    { name: 'Запад', deg: 270 },
    { name: 'Северо-запад', deg: 315 },
  ];
  const setWindName = (windDeg: number) => {
    let currentWind = 0;
    const windDif = windTypes.map((obj) => Math.abs(obj.deg - windDeg));

    windDif.filter((value, index) => {
      if (value === Math.min(...windDif)) currentWind = index;
    });

    return windTypes[currentWind].name;
  };
  const items = [
    {
      title: 'Температура',
      icon: temperature,
      info: `${Math.ceil(temp)}° - ощущается как ${Math.ceil(feelslike)}°`,
    },
    {
      title: 'Давление',
      icon: pressureIcon,
      info: `${Math.ceil((pressure * 3) / 4)} мм ртутного столба`,
    },
    { title: 'Осадки', icon: precipitation, info: clouds },
    {
      title: 'Ветер',
      icon: windIcon,
      info: `${wind.speed} м/с, ${setWindName(wind.deg)}`,
    },
  ];
  return (
    <div className={styles.container}>
      {items.map((obj, index) => (
        <div className={styles.wrapper} key={index}>
          <div className={styles.icon}>
            <img src={obj.icon} alt="" />
          </div>
          <div className={styles.title}>{obj.title}</div>
          <div className={styles.info}>{obj.info}</div>
        </div>
      ))}
    </div>
  );
};

export default TodayInfo;
