import Component from 'components/component';
import React from 'react';
import styles from './styles';

export default class DefaultMaintenanceContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      maintenanceMsg: 'Relax, we\'re down for maintenance',
      subtext: 'We\'ll be back shortly'
    };
  }
  render () {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style={styles.body}>
          <div>
            <div style={styles.outer}>
                <div style={styles.middle}>
                  <div style={styles.inner}>
                    <div style={styles.innerDiv}>
                       <img src="/images/admin/logo_big.png" role="presentation" alt="logo_big" />
                    </div>
                    <div style={styles.message}>
                      {this.state.maintenanceMsg}
                    </div>
                    <div style={styles.subtext}>
                      {this.state.subtext}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </body>
      </html>
    );
  }
}
