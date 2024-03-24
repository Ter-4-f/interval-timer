import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

class ProgressBar extends React.Component {
    render() {
        const { percentage } = this.props;

        return (
            <div style={{ width: '100%', height: '5vh', backgroundColor: 'lightgray', position: 'relative' }}>
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}></div>
            </div>
        );
    }
}
    
export default ProgressBar;
