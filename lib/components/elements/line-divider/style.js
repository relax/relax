import React from 'react';
import {Types} from '../../../types';
import Colors from '../../../colors';

export default {
  type: 'lineDivider',
  options: [
    {
      label: 'Line Height',
      type: Types.Pixels,
      id: 'size'
    },
    {
      label: 'Style',
      type: Types.String,
      id: 'style'
    },
    {
      label: 'Color',
      type: Types.Color,
      id: 'color'
    },
    {
      label: 'Max Width',
      type: Types.Select,
      id: 'width',
      props: {
        labels: ['Full width', 'Strict'],
        values: ['full', 'strict']
      },
      unlocks: {
        strict: [
          {
            label: 'Max Width',
            type: Types.Pixels,
            id: 'maxWidth'
          },
          {
            label: 'Align',
            type: Types.Select,
            id: 'align',
            props: {
              labels: ['Left', 'Center', 'Right'],
              values: ['left', 'center', 'right']
            }
          }
        ]
      }
    }
  ],
  defaults: {
    size: 1,
    style: 'solid',
    color: {
      value: '#000000',
      opacity: 100
    },
    width: 'full',
    maxWidth: 100,
    align: 'center'
  },
  rules: (props) => {
    let rules = {
      line: {},
      holder: {}
    };

    rules.line.borderBottom = props.size+'px '+props.style+' '+Colors.getColorString(props.color);
    rules.holder.height = props.size;

    if (props.width === 'strict') {
      rules.line.display = 'inline-block';
      rules.line.width = props.maxWidth;
      rules.line.maxWidth = '100%';
      rules.line.verticalAlign = 'top';
      rules.holder.textAlign = props.align;
    }

    return rules;
  },
  getIdentifierLabel: (props) => {
    var str = '';

    str += props.size+'px';
    str += ' | ';
    str += props.width;

    return str;
  },
  preview: (classesMap) => {
    var holderStyle = {
      height: 50,
      position: 'relative'
    };
    var style = {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    };

    return (
      <div style={holderStyle}>
        <div style={style} className={classesMap.holder}>
          <div className={classesMap.line}></div>
        </div>
      </div>
    );
  }
};
