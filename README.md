# cssrename-webpack-plugin
```bash
npm install --save cssrename-webpack-plugin
```

**Recommended to use with `cssrename-loader`**

## Usage example

`webpack.config.js` :

```javascript
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CssRenameWebpackPlugin = require('cssrename-webpack-plugin');
const webpack = require('webpack');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var CssRenameWebpackPluginConfig = new CssRenameWebpackPlugin();

module.exports = {
  entry: {
    app: [
      './app/js/index.js'
    ]
  },

  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      },

      {
        test: /\.less$/,
        loader: "style-loader!css-loader!cssrename-loader!less-loader?config=lessLoaderCustom"
      }
    ]
  },

  plugins: [
    HTMLWebpackPluginConfig,
    CssRenameWebpackPluginConfig
  ]
};
```

`cssrename-loader` - would rename you css classes in your styles

Example:

```css
.bold {
    font-weight: bolder;
}
```
=>
```css
.___bold__ {
    font-weight: bolder;
}
```

**In your js files you should use three underscore before class name and two underscore after.**

Backbone example:

```javascript
var ButtonComponent = require('./Button');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: '___alert-box__',
  template: _.template(
    '<div class="___alert-block__"><div class="___alert-message__"><%= text %></div></div>'
  ),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.button_ = new ButtonComponent({
      title: 'OK',
      cb: this.close.bind(this)
    });
    this.$el.find('.___alert-block__').append(this.button_.render().$el);
    return this;
  },
  close: function(){
    this.button_.close();
    this.remove();
    this.unbind();
    this.model.unbind("change", this.modelChanged);
  }
});
```

React example:

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div  className="___hello__">Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```