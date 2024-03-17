import '../styles/WeatherWidget.scss';
import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
    const dateInfo = new Date();
    const dayNames = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    const dayOfWeek = dayNames[dateInfo.getDay()];
    const dayOfMonth = dateInfo.getDate();
    const monthNames = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Остябрь',
        'Ноябрь',
        'Декабрь'
    ];
    const month = monthNames[dateInfo.getMonth()];
    const currentTime = dateInfo.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const [weatherConditions, setWeatherConditions] = useState({
        WeatherIcon: 1,
        WeatherText: '',
        Temperature: {
            Metric: {
                Value: 0
            }
        },
        HasPrecipitation: false,
        PrecipitationType: 0
    });
    const [error, setError] = useState('');

    useEffect(() => {	
        fetch(
            'http://dataservice.accuweather.com/currentconditions/v1/294463?apikey=%20%09KANPq6J8AWU1iaWP4iJEb32tQ7MVmpOX&language=ru-ru&details=false'
        )
            .then((response) => response.json())
            .then((res) => setWeatherConditions(res[0]))
            .catch((err) => setError(err.toString()));
		
		setError('');
    }, [weatherConditions]);

    return (
        <div className="weather-widget">
            <div className="weather-widget__location-block">
                Омск, {dayOfWeek}, {month} {dayOfMonth}, {currentTime}
            </div>
            <div className="weather-widget__weather-block">
                <div className="weather-widget__img-text">
                    <img
                        className="weather-widget__img"
                        src={`https://apidev.accuweather.com//developers/Media/Default/WeatherIcons/${weatherConditions.WeatherIcon < 10 ? '0' + weatherConditions.WeatherIcon : weatherConditions.WeatherIcon}-s.png`}
                        alt={weatherConditions.WeatherText}
                    />
                    <div className="weather-widget__text">
                        {weatherConditions.WeatherText}
                    </div>
                </div>
                <div className="weather-widget__weather-info">
                    <p className="weather-widget__temperature">
                        {weatherConditions.Temperature.Metric.Value}°С
                    </p>
                    <p className="weather-widget__precipitation">
                        Осадки:
                        {!weatherConditions.HasPrecipitation
                            ? ' Нет'
                            : ' ' + weatherConditions.PrecipitationType}
                    </p>
                </div>
            </div>
            <p className="weather-widget__error">{error}</p>
        </div>
    );
};

export default WeatherWidget;
