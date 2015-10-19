import {Component} from 'relax-framework';
import React from 'react';
import forEach from 'lodash.foreach';
import cx from 'classnames';
import Font from './font';
import Utils from '../../../../utils';

export default class Fonts extends Component {
  propTypes = {
    fonts: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className={cx('fonts-list', `fonts-list-layout-${this.props.fonts.previewLayout}`)}>
        {this.renderList()}
        {this.renderCover()}
      </div>
    );
  }

  renderList () {
    const list = [];
    let result;

    forEach(this.props.fonts.fonts, (variants, family) => {
      variants.map((variant, ind) => {
        const key = (family + variant).replace(/ /g, '_');
        const font = (
          <div className='list-font' key={key}>
            <Font family={family} fvd={variant} text={this.props.fonts.previewText} />
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
      result = (
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
    } else {
      result = list;
    }

    return result;
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
}
