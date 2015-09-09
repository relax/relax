import {Component} from 'relax-framework';
import React from 'react';
import forEach from 'lodash.foreach';
import Font from './font';
import Utils from '../../../../utils';

export default class Fonts extends Component {
  changePreviewText (event) {
    this.props.onPreviewTextChange(event.target.value);
  }
  changePreviewLayout (to, event) {
    event.preventDefault();
    this.props.onPreviewLayoutChange(to);
  }

  renderList () {
    var list = [];
    forEach(this.props.data.fonts, (variants, family) => {
      variants.map((variant, ind) => {
        var key = (family+variant).replace(/ /g, '_');
        var font = (
          <div className='list-font' key={key}>
            <Font family={family} fvd={variant} text={this.props.data.previewText} />
            <div className='list-font-footer'>
              <p className='list-font-family'>{Utils.filterFontFamily(family)}</p>
              <p className='list-font-variation'>{Utils.filterFVD(variant)}</p>
            </div>
          </div>
        );

        list.push(font);
      }, this);
    });

    if (list.length === 0) {
      return (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No fonts added yet!</p>
            <p>Click on 'add fonts' button above to add new</p>
          </div>
        </div>
      );
    }

    return list;
  }

  renderCover () {
    if (this.props.loading) {
      return (
        <div className='tons-list-cover'>
          <p>Loading your fonts</p>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <div className={'fonts-list fonts-list-layout-'+this.props.data.previewLayout}>
          {this.renderList()}
          {this.renderCover()}
        </div>
      </div>
    );
  }
}

Fonts.propTypes = {
  data: React.PropTypes.object.isRequired,
  onPreviewTextChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired
};
