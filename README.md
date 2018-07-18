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
### props

| name        | type       | required                                        | desc                                       |
|:------------|:-----------|:------------------------------------------------|:-------------------------------------------|
| data        | `array`    | `true`                                          | list data                                  |
| style       | `object`   | `false` <br>default: `{width:400, height: 300}` | style override                             |
| itemKey     | `string`   | `true`                                          | key for each list item, like `id`          |
| onScrollTop | `function` | `false`                                         | triggered when srcollbar scroll to the top |
| onScrollEnd | `function` | `false`                                         | triggered when scrollbar scroll to the end |
| renderItem  | `function` | `true`                                          | used to render each item in list           |
## others

`yarn start` to see the demo
