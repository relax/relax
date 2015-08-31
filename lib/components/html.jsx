import React from 'react';

export default class Html extends React.Component {
  renderTag (tag) {
    tag.props = tag.props || {};
    if(tag.content){
      tag.props.dangerouslySetInnerHTML = {__html: tag.content};
    }
    return (
      <tag.tag {...tag.props} />
    );
  }

  renderHeader () {
    if(this.props.props && this.props.props._locals && this.props.props._locals.header){
      return this.props.props._locals.header.map(this.renderTag, this);
    }
  }

  renderFooter () {
    if(this.props.props && this.props.props._locals && this.props.props._locals.footer){
      return this.props.props._locals.footer.map(this.renderTag, this);
    }
  }

  render () {
    return (
      <html>
        <head>
          {this.renderHeader()}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div id='view' dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.props)}} />
          {this.renderFooter()}
        </body>
      </html>
    );
  }
}
