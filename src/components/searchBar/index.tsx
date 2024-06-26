import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeatherData } from "../../assets/models";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeatherCity, selectWeatherData } from "../store/weatherSlice";
import WeatherDescCard from "../weatherDescCard";

const SearchBar = () => {
    const [cityName, setCityName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const selectedData: WeatherData = useSelector(
        (state: RootState) => state.weather.selectedData
    );
    const updateSelectedData = (weatherData: WeatherData) => {
        dispatch(selectWeatherData(weatherData));
    };

    const handleInputChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setCityName(event.target.value);
    };

    const handleInputKeyPress = async (event: { key: string }) => {
        if (event.key === "Enter") {
            const fetchedData = await dispatch(fetchWeatherCity(cityName));
            updateSelectedData(fetchedData.payload);
        }
    };

    useEffect(() => {
        if (selectedData) {
            updateSelectedData(selectedData);
        }
    }, [selectedData]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search Location"
                className="input input-bordered input-warning w-full max-w-xs mt-8 mb-3"
                value={cityName}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
            />

            {selectedData && (
                <div>
                    <WeatherDescCard
                        weatherData={selectedData}
                    ></WeatherDescCard>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
