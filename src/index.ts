interface Weather {
    srcImg: string,
    isPlay: boolean,
    pause: boolean,
    srcSound: string,
    srcIcon: string
}

interface WeatherMap {
    [id: string]: Weather
}

const WeatherMap: WeatherMap = {
    'summer': {
        srcImg: '/public/assets/summer-bg.jpg',
        isPlay: false,
        pause: false,
        srcSound: '/public/assets/sounds/summer.mp3',
        srcIcon: '/public/assets/icons/sun.svg'
    },

    'rain': {
        srcImg: '/public/assets/rainy-bg.jpg',
        isPlay: false,
        pause: false,
        srcSound: '/public/assets/sounds/rain.mp3',
        srcIcon: '/public/assets/icons/cloud-rain.svg'
    },

    'winter': {
        srcImg: '/public/assets/winter-bg.jpg',
        isPlay: false,
        pause: false,
        srcSound: '/public/assets/sounds/winter.mp3',
        srcIcon: '/public/assets/icons/cloud-snow.svg'
    }
}

const stopAllSounds = (): void => {
    let tracks = document.querySelectorAll('audio');

    if (tracks) {
        tracks.forEach(item => item.pause())
    }

    Object.keys(WeatherMap).forEach(key => {
        WeatherMap[key].isPlay = false;
    })
}

stopAllSounds();

const soundClick = (weather: string): void => {
    let currentTrack: HTMLAudioElement = <HTMLAudioElement>document.getElementById(weather);
    let background: HTMLElement = <HTMLElement>document.getElementById('main');
    let svgTrack: HTMLElement = <HTMLElement>document.getElementById(weather + 'SVG');

    if (svgTrack && currentTrack) {
        stopAllSounds();

        currentTrack.play();
        WeatherMap[weather].isPlay = true;

        if (WeatherMap[weather].pause) {
            stopAllSounds()

            WeatherMap[weather].isPlay = false;
            svgTrack.style.background = `url(${WeatherMap[weather].srcIcon}) no-repeat center`;
        } else {
            svgTrack.style.background = 'url("/public/assets/icons/pause.svg") no-repeat center';
            WeatherMap[weather].pause = false;
        }

        Object.keys(WeatherMap).forEach(key => {
            let svg: HTMLElement = <HTMLElement>document.getElementById(key + 'SVG');

            WeatherMap[key].pause = (key === weather && WeatherMap[weather].isPlay) && true

            if (weather !== key) {
                svg.style.background = `url(${WeatherMap[key].srcIcon}) no-repeat center`;
            }

        })

    }

    background.style.background = `url(${WeatherMap[weather].srcImg}) no-repeat center`;
    background.style.backgroundSize = "cover";
    background.style.width = '100%';
    background.style.height = '100vh';
}

const changeVolume = (value: number): void => {
    let tracks = document.querySelectorAll('audio');

    if (tracks) {
        tracks.forEach(audio => {
            audio.volume = value / 10
        })
    }
}
