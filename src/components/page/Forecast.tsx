import * as React from "react";
import { Spin, Table } from "antd";
import "antd/dist/antd.css";
import * as func from "../global/globalFunc";

class Forecast extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      position: undefined,
      data: undefined,
      search: this.props.search.search,
      isLoading: false,
      rowKey: 1
    };
  }

  public async componentDidMount() {
    const data = await func.loadDataForecast(this.state);
    this.setState({
      data,
      isLoading: true
    });
  }

  public async componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (this.state.search !== this.props.search.search) {
      const data = await func.loadDataForecast(this.props.search);
      this.setState({
        data,
        isLoading: true,
        search: this.props.search.search
      });
    } else if (this.state.position !== this.props.search.position) {
      const data = await func.loadDataForecast(this.props.search);
      this.setState({
        data,
        isLoading: true,
        position: this.props.search.position
      });
    }
  }

  public render() {
    const { data, isLoading } = this.state;
    const columns = [
      {
        title: "Date",
        dataIndex: "dt_txt",
        render: (param: any) => {
          const newDate = new Date(param);
          const month = newDate.getMonth();
          const date = newDate.getDate();
          let hours: any = newDate.getHours();
          if (hours.toString().length < 2) {
            hours = 0 + hours.toString();
          }
          return {
            children: `Month: ${month}, Day: ${date}, Hour: ${hours}`
          };
        }
      },
      {
        title: "",
        dataIndex: "weather[0].icon",
        render: (param: number | string) => {
          let temp = `//openweathermap.org/img/wn/${param}@2x.png`;

          return <img src={temp} alt={temp} />;
        }
      },
      {
        title: "Temp",
        dataIndex: "main.temp",
        render: (param: number) => {
          let temp = func.kInC(param);
          return {
            children: `${temp} °C`
          };
        }
      },
      {
        title: "Pressure",
        dataIndex: "main.pressure",
        render: (param: number) => {
          return {
            children: `${param} hpa`
          };
        }
      },
      {
        title: "Humidity",
        dataIndex: "main.humidity",
        render: (param: number) => {
          return {
            children: `${param}%`
          };
        }
      },
      {
        title: "Weather",
        dataIndex: "weather[0].main"
      },
      {
        title: "Clouds",
        dataIndex: "clouds.all",
        render: (param: number) => {
          return {
            children: `${param}%`
          };
        }
      },
      {
        title: "Wind",
        dataIndex: "wind.speed",
        render: (param: number) => {
          return {
            children: `${param} m/s`
          };
        }
      },
      {
        title: "Rain",
        dataIndex: "rain.3h",
        render: (param: number | string) => {
          if (param === undefined) {
            param = "none";
          } else {
            param = `${param} mm`;
          }
          return {
            children: `${param}`
          };
        }
      },
      {
        title: "Snow",
        dataIndex: "snow.3h",
        render: (param: number | string) => {
          if (param === undefined) {
            param = "none";
          } else {
            param = `${param} mm`;
          }
          return {
            children: `${param}`
          };
        }
      }
    ];
    return (
      <div className="App">
        <div className="one-day">
          {isLoading ? (
            <>
              <h1>
                Weather today in {data.city.name}, country: {data.city.country}
              </h1>
              <Table
                columns={columns}
                dataSource={data.list}
                rowKey={rowKey => rowKey.dt}
              />
            </>
          ) : (
            <div>
              {" "}
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Forecast;
