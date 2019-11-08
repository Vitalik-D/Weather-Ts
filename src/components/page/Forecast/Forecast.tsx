import * as React from "react";
import { Spin, Table } from "antd";
import * as func from "../../global/globalFunc";
import './index.css'

class Forecast extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      position: undefined,
      data: undefined,
      search: this.props.search.search,
      isLoading: false,
      rowKey: 1,
      type: 'forecast'
    };
  }

  public async componentDidMount() {
    const {type} = this.state;
    const data = await func.loadData(this.state, type);
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
    const {position, search, type} = this.state;
    const searchProps = this.props.search;

    if (search !== searchProps.search) {
      const data = await func.loadData(searchProps, type);
      this.setState({
        data,
        isLoading: true,
        search: searchProps.search
      });
    } else if (position !== searchProps.position) {
      const data = await func.loadData(searchProps, type);
      this.setState({
        data,
        isLoading: true,
        position: searchProps.position
      });
    }
  }

  public render() {
    const { data, isLoading } = this.state;
    const columns = [
      {
        title: "Date",
        dataIndex: "dt_txt",
        render: (param: string) => {
          const newDate = new Date(param);
          const month = newDate.getMonth();
          const date = newDate.getDate();
          let hours: number|string = newDate.getHours();
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
            <div  className='table-forecast'>
              <h1>
                Weather today in {data.city.name}, country: {data.city.country}
              </h1>
              <Table

                columns={columns}
                dataSource={data.list}
                rowKey={rowKey => rowKey.dt}
              />
            </div>
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
