import React from "react";
import Weather from "./components/page/Weather";
import { Input, Button, Tabs, Modal } from "antd";
import "antd/dist/antd.css";
import Forecast from "./components/page/Forecast";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: "Lviv",
      position: undefined,
      isLoading: false,
      visible: false
    };
  }

  public showModal = () => {
    this.setState({
      visible: true
    });
  };
  public handleOk = () => {
    this.getLocation();
    this.setState({
      visible: false
    });
  };
  private handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  public getLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(async (position: any) => {
        let state = await position.coords;
        this.setState({
          position: state
        });
      });
    } else {
      return null;
    }
  };

  public render() {
    const { Search } = Input;
    const { TabPane } = Tabs;

    return (
      <div className="App">
          <div className="nav">
              <Search
                  placeholder="search your city"
                  onSearch={value => {
                      this.setState({
                          search: value,
                          isLoading: false,
                          position: undefined
                      });
                  }}
                  enterButton
              />
              <Button type="primary" icon="compass" onClick={this.showModal} />
          </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="One day" key="1">
            <Weather search={this.state} />
          </TabPane>
          <TabPane tab="Five day" key="2">
            <Forecast search={this.state} />
          </TabPane>
        </Tabs>
        <Modal
          title="Your coordinates"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            If you want to give us access to your location to determine the
            weather in your location.
          </p>
          <p>Then click OK</p>
          <p>If not, click Cancel</p>
          <p>
            You can use the search to find out the weather in a particular city
          </p>
        </Modal>
      </div>
    );
  }
}

export default App;
