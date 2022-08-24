import React from 'react';

export const usePosition = () => {
  const [position, setPosition] = React.useState({});
  const [error, setError] = React.useState(null);

  const onChange = (pos: any) => {
    setPosition(pos.coords);
  };

  const onError = (error: any) => {
    setError(error.message);
  };

  React.useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    // Подписываемся на изменение геопозиции браузера.
    const watcher = geo.watchPosition(onChange, onError);

    // В случае, если компонент будет удаляться с экрана
    // производим отписку от слежки, чтобы не засорять память.
    return () => geo.clearWatch(watcher);
  }, []);

  return error || position;
};
