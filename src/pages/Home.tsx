import React from 'react';
import Header from '../components/Header/Header';
import Tab from '../components/Tab/Tab';
import Today from '../components/Today/Today';
import TodayInfo from '../components/TodayInfo/TodayInfo';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchCurrentWeather } from '../redux/thunks/fetchCurrentWeather';
import { usePosition } from '../hooks/use-position';
import { setCity } from '../redux/slices/citySlice';
import { fetchNextWeather } from '../redux/thunks/fetchNextWeather';

type THome = {};

const Home: React.FC<THome> = ({}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.currentWeather.item);
  const itemsNext = useAppSelector((state) => state.nextWeather.item);
  const city = useAppSelector((state) => state.citySlice.city);

  const position = usePosition();
  const lat = position.latitude || 0;
  const lon = position.longitude || 0;
  React.useEffect(() => {
    dispatch(fetchCurrentWeather({ lat, lon, city }));
    dispatch(fetchNextWeather({ lat, lon, city }));
  }, [city, item.timezone, lat, lon]);
  React.useEffect(() => {
    dispatch(setCity(item.name));
  }, [lat, lon]);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Today
          temp={item.main.temp}
          city={city || item.name}
          time={item.timezone}
          icon={item.weather[0].icon}
        />
        <TodayInfo
          temp={item.main.temp}
          feelslike={item.main.feels_like}
          clouds={item.weather[0].description}
          wind={item.wind}
          pressure={item.main.pressure}
        />
      </div>
      <Tab list={itemsNext.list} />
    </div>
  );
};

export default Home;
