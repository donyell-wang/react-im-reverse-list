A Reverse List for Building IM

This lib is a react reverse list with some default behaviours which are needed in a Instant-Message circumstance. With this lib you can quickly build some IM-like component.
Including behaviours like:
1. when adding an item the list will scroll to the end
2. callback when scroll to the Top or Bottom
3. when adding a bunch of items at the top, the scrollbar will stop in a proper position

## usage
```javascript
<IMReverseList
  data={data}
  style={{height: '100%'}}
  itemKey='id'
  onScrollTop={this.handleScrollTop}
  onScrollEnd={this.handleScrollEnd}
  renderItem={(item) => <div>{item.msg}</div>}
/>
```
