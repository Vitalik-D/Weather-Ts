import React from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import * as func from "../global/globalFunc";

class App extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: undefined,
      search: this.props.search.search,
      isLoading: false,
      position: undefined
    };
  }

  public async componentDidMount() {
    const state = this.state;
    const data = await func.loadData(state);
    this.setState({
      data,
      isLoading: true
    });
  }

  public async componentDidUpdate(
    prevProps: Readonly<object>,
    prevState: Readonly<object>,
    snapshot?: object
  ) {
    if (this.state.search !== this.props.search.search) {
      const data = await func.loadData(this.props.search);
      this.setState({
        data,
        isLoading: true,
        search: this.props.search.search
      });
    } else if (this.state.position !== this.props.search.position) {
      const data = await func.loadData(this.props.search);
      this.setState({
        data,
        isLoading: true,
        position: this.props.search.position
      });
    }
  }

  public render() {
    const { data, isLoading } = this.state;
    return (
      <div className="App">
        <div className="one-day">
          {isLoading ? (
            data.message ? (
              <p>{data.message}</p>
            ) : (
              <div className="weather-day">
                <h1>
                  Weather today in {data.name}, country: {data.sys.country}
                </h1>
                <table>
                  <thead>
                    <tr className="no-tr">
                      <td>
                        <p>{data.weather[0].main}</p>
                      </td>
                      <td>
                        <img
                          src={`//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                          alt={data.weather[0].icon}
                        />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="no-tr">
                      <td>
                        <p>Temp</p>
                      </td>
                      <td>
                        <p>{func.kInC(data.main.temp)} °C</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Temp max</p>
                      </td>
                      <td>
                        <p>{func.kInC(data.main.temp_max)} °C</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Temp min</p>
                      </td>
                      <td>
                        <p>{func.kInC(data.main.temp_min)} °C</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Weather</p>
                      </td>
                      <td>
                        <p>{data.weather[0].description}</p>
                      </td>
                    </tr >
                    <tr className="no-tr">
                      <td>
                        <p>Clouds</p>
                      </td>
                      <td>
                        <p>{data.clouds.all}%</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Sunrise</p>
                      </td>
                      <td>
                        <p>{func.changeHour(data.sys.sunrise)}</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Sunset</p>
                      </td>
                      <td>
                        <p>{func.changeHour(data.sys.sunset)}</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Humidity</p>
                      </td>
                      <td>
                        <p>{data.main.humidity}%</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Pressure</p>
                      </td>
                      <td>
                        <p>{data.main.pressure}hpa</p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Geo coords</p>
                      </td>
                      <td>
                        <p>
                          [{data.coord.lat}, {data.coord.lon}]
                        </p>
                      </td>
                    </tr>
                    <tr className="no-tr">
                      <td>
                        <p>Wind speed</p>
                      </td>
                      <td>
                        <p>{data.wind.speed}m/s</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div>
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
