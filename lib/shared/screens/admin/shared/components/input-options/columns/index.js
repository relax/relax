import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';

import ColumnsManager from './columns-manager';

@connect(
  (state) => ({
    selectedElement: state.pageBuilder.selectedElement
  })
)
export default class ColumnsManagerContainer extends Component {
  static columnOptions = [
    {
      label: 'Width',
      type: 'Select',
      id: 'width',
      props: {
        labels: ['Block', 'Column auto', 'Column custom'],
        values: ['block', 'auto', 'custom']
      },
      unlocks: {
        custom: [
          {
            label: 'Width (%)',
            type: 'Percentage',
            id: 'widthPerc'
          }
        ]
      }
    }
  ];

  static columnOptionsSingleRow = [
    {
      label: 'Width',
      type: 'Select',
      id: 'width',
      props: {
        labels: ['Column auto', 'Column custom'],
        values: ['auto', 'custom']
      },
      unlocks: {
        custom: [
          {
            label: 'Width (%)',
            type: 'Percentage',
            id: 'widthPerc'
          }
        ]
      }
    }
  ];

  static breakOptions = [
    {
      label: 'To next line',
      type: 'Boolean',
      id: 'break',
      default: false
    }
  ];

  render () {
    return (
      <ColumnsManager
        {...this.props}
        columnOptions={ColumnsManagerContainer.columnOptions}
        columnOptionsSingleRow={ColumnsManagerContainer.columnOptionsSingleRow}
        breakOptions={ColumnsManagerContainer.breakOptions}
      />
    );
  }
}
