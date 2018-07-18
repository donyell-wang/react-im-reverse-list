import React, { Component } from 'react'; ;
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';

const isSameKeys = (arraySource, arrayTarget, keyName) => {
  let result = true;
  if(arraySource.length !== arrayTarget.length){
    return false;
  }
  for (let i = 0, len = arraySource.length; i < len; i++){
    if(arraySource[i][keyName] !== undefined && arraySource[i][keyName] !== arrayTarget[i][keyName]){
      result = false;
      break;
    }
  }
  return result;
}

class IMMessageList extends Component {
  constructor (props) {
    super(props);
    const { data = [], itemKey} = props;
    this.state={
      keyScrollTo: data.length > 0 ? data[data.length - 1][itemKey] : null
    }

    this.$listRef = null;
    this.$itemRef = null;

    this.lastDataKeys = data.map(item=> item[itemKey]);
    this.lastHeadKey = null;
    this.lastEndKey = null;

    this.listRefHanlder = this.listRefHanlder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data = [], itemKey} = nextProps;

    if(data.length > 0){
      const headIdx = findIndex(data, { [itemKey]: this.lastHeadKey});
      const endIdx = findIndex(data, { [itemKey]: this.lastEndKey});

      if(this.lastHeadKey !== null && this.lastEndKey !== null){
        if(headIdx > 0 && endIdx === data.length - 1){
          //load upward
          this.setState({
            keyScrollTo: data[headIdx][itemKey]
          })
        }else if( headIdx === 0 && endIdx < data.length - 1){
          //load downward
          this.setState({
            keyScrollTo: data[endIdx + 1][itemKey]
          })
        }else if ( headIdx > 0 && endIdx < data.length - 1){
          // load bothside
          this.setState({
            keyScrollTo: data[endIdx + 1][itemKey]
          })
        }
      }

      this.lastHeadKey = data[0][itemKey];
      this.lastEndKey = data[data.length - 1][itemKey];
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { data = [], itemKey} = nextProps;
    if (isSameKeys(this.lastDataKeys, data, itemKey)) {
      return false;
    } else {
      this.lastDataKeys = data.map(item=>item[itemKey]);
      return true;
    }
  }

  componentDidMount () {
    this.$itemRef && this.$itemRef.scrollIntoView();
  }

  componentDidUpdate (prevProps, prevState) {
    this.$itemRef && this.$itemRef.scrollIntoView();
  }

  render () {
    const { keyScrollTo } = this.state;
    const { data,renderItem, itemKey, style } = this.props;
    const styleCombine = Object.assign({}, style, {overflowY: 'auto'})
    return (
      <ul className='im-message-list' ref={this.listRefHanlder}  style={styleCombine}>
        {
          data.map((item, index) => (
            <li
              key={item[itemKey]}
              ref={element => {
                if (item[itemKey] + '' === keyScrollTo + '') {
                  this.$itemRef = element;
                }
              }}
            >
              {renderItem(item)}
            </li>
          ))
        }
      </ul>
    );
  }

  listRefHanlder (element) {
    const {
      onScrollTop,
      onScrollEnd
    } = this.props;

    if (element && this.$listRef !== element) {
      this.$listRef = element;
      this.$listRef.addEventListener('scroll', () => {
        const {
          scrollTop,
          scrollHeight,
          offsetHeight
        } = this.$listRef;
        if (scrollTop === 0) {
          onScrollTop && onScrollTop();
          // console.log('load upward');
        } else if ((scrollTop + offsetHeight) === scrollHeight) {
          onScrollEnd && onScrollEnd();
          // console.log('load downward');
        }
      });
    }
  }
}

IMMessageList.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
  itemKey: PropTypes.string.isRequired,

  onScrollTop: PropTypes.func,
  onScrollEnd: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
};

IMMessageList.defaultProps = {
  data: [],
  style: {
    width: 400,
    height: 300
  },
  onScrollTop: null,
  onScrollEnd: null
};

export default IMMessageList;
