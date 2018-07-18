import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, message } from 'antd';
import Mock from 'mockjs';
import IMReverseList from '../src/IMReverseList';
import './style.less';
const { Header, Sider, Content } = Layout;

const msgGenerator = (length) => {
  const key = `array|${length}`;
  return Mock.mock({
    [key]: [
      {
        "id": '@id',
        "msg": '@sentence(1,10)'
      }
    ]
  }).array
}

class Demo extends Component {
  state = {
    list: msgGenerator(20),
    log: ''
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { list, log } = this.state;
    return (
      <Layout style={{height: '100%'}}>
          <Content className='container'>
            <div className='message-area'>
              <IMReverseList
                data={list}
                style={{height: '100%'}}
                itemKey='id'
                onScrollTop={this.handleScrollTop}
                onScrollEnd={this.handleScrollEnd}
                renderItem={(item) => <div>{item.msg}</div>}
              />
            </div>
            <div className='control-area'>
              <Button type="primary" onClick={()=>{this.hanldeAddMessage('one')}}>Push a Message</Button>
              <Button type="primary" onClick={()=>{this.hanldeAddMessage('some')}}>Push Some Messages</Button>
              <div className='log-area'>
                {log}
              </div>
            </div>
          </Content>
      </Layout>
    );
  }

  hanldeAddMessage = (type = 'one') => {
    const { list } = this.state;
    switch (type) {
      case 'one':
        list.push(msgGenerator(1))
        this.setState({
          list
        })
        break;
      case 'some':
        this.setState({
          list: list.concat(msgGenerator(10))
        })
        break;
      default:
    }

  }

  handleScrollTop = () => {
    this.setState((prevState) => {
      return {
        list: msgGenerator(10).concat(this.state.list),
        log: 'trigger: scroll top'
      }
    })
  }

  handleScrollEnd = () => {
    this.setState({
      log: 'trigger: scroll end'
    })
  }
}

export default Demo;
