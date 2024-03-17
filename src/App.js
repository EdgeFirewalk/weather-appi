import './styles/App.scss';
import { useEffect, useState } from 'react';
import WeatherWidget from './components/WeatherWidget';

function App() {
    const [backgroundColor, setBackgroundColor] = useState(
        'linear-gradient(0deg, rgba(59,57,83,1) 0%, rgba(1,31,53,1) 100%)'
    );
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit' })
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString([], { hour: '2-digit' })
            );
        });

        if (currentTime >= 5 && currentTime < 13) {
            setBackgroundColor(
                'linear-gradient(0deg, rgba(242,186,166,1) 0%, rgba(151,199,226,1) 100%)'
            );
        } else if (currentTime >= 13 && currentTime < 18) {
            setBackgroundColor(
                'linear-gradient(0deg, rgba(143,187,215,1) 0%, rgba(72,132,173,1) 100%)'
            );
        } else if (currentTime >= 18 && currentTime < 22) {
            setBackgroundColor(
                'linear-gradient(0deg, rgba(191,101,93,1) 0%, rgba(111,111,140,1) 100%)'
            );
        } else if (currentTime < 5 || currentTime >= 22) {
            setBackgroundColor(
                'linear-gradient(0deg, rgba(59,57,83,1) 0%, rgba(1,31,53,1) 100%)'
            );
        }

        return () => {
            clearInterval(timer);
        };
    }, [currentTime]);

    return (
        <div className="App" style={{ background: backgroundColor }}>
            <WeatherWidget />
        </div>
    );
}

export default App;
