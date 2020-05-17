import React from 'react';
import { Dimensions } from 'react-native';
import Fireworks from './Fireworks';

const { height, width } = Dimensions.get('window');

export default class App extends React.PureComponent {
    render() {
        return <Fireworks
            speed={2}
            density={8}
            colors={['#ff0', '#ff3', '#cc0', '#ff4500', '#ff6347']}
            iterations={15}
            height={height}
            width={width}
            zIndex={1}
            circular={false}
        />
    }
}