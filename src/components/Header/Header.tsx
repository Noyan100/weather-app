import React from 'react';
import Select from 'react-select';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import switchIcon from '../../assets/switch.svg';
import { useTheme } from '../../hooks/use-theme';
import { setCity } from '../../redux/slices/citySlice';
import { useAppDispatch } from '../../hooks/redux-hooks';

type THeader = {};

const options = [
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  { value: 'Москва', label: 'Москва' },
  { value: 'Екатеринбург', label: 'Екатеринбург' },
  { value: 'Амстердам', label: 'Амстердам' },
  { value: 'Минусинск', label: 'Минусинск' },
  { value: 'Нью-Йорк', label: 'Нью-Йорк' },
  { value: 'Абакан', label: 'Абакан' },
  { value: 'Красноярск', label: 'Красноярск' },
  { value: 'Новосибирск', label: 'Новосибирск' },
];

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    fontSize: '16px',
    fontWeight: '500',
    color: '#000',
    backgroundColor: 'var(--selectbg)',
    padding: '1px 5px 2px',
    border: 'none',
    borderRadius: '10px',
    width: '194px',
    display: 'flex',
  }),
  input: (styles: any) => ({
    ...styles,
    color: 'var(--textcolor)',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'var(--textcolor)',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: 'var(--textcolor)',
  }),
  menu: (styles: any) => ({
    ...styles,
    color: 'var(--textcolor)',
    backgroundColor: 'var(--componentbg)',
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: 'var(--textcolor)',
    backgroundColor: state.isFocused ? 'var(--selectoptionbg2)' : 'var(--selectoptionbg1)',
  }),
};

type TOption = {
  value: string;
  label: string;
};

const Header: React.FC<THeader> = ({}) => {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const handleThemeClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };
  const onChangeSelect = (option: TOption | null) => {
    dispatch(setCity(option.value));
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoImg}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.logoText}>React weather</div>
      </div>
      <div className={styles.choose}>
        <div className={styles.chooseTheme} onClick={handleThemeClick}>
          <img src={switchIcon} alt="" />
        </div>
        <Select onChange={onChangeSelect} options={options} styles={customStyles} />
      </div>
    </div>
  );
};

export default Header;
