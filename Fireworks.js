import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';

let skyHeight;
let skyWidth;
let skyZindex;
let explosionIterations;
let count = 0;

export default class Fireworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [20, 240],
      y: [40, 300],
    };
    this.animatedOpacity = new Animated.Value(1);
    this.animatedTop = new Animated.Value(0);
  }

  componentWillMount = () => {
    const { height, width, zIndex, iterations } = this.props;
    if (height && typeof height === 'number') {
      skyHeight = height;
    } else {
      skyHeight = Dimensions.get('window').height;
    }
    if (width && typeof width === 'number') {
      skyWidth = width;
    } else {
      skyWidth = Dimensions.get('window').width;
    }
    if (zIndex && typeof zIndex === 'number') {
      skyZindex = zIndex;
    } else {
      skyZindex = 10;
    }
    if (iterations && typeof iterations === 'number') {
      explosionIterations = iterations;
    } else {
      explosionIterations = 'infinite';
    }
    this.setExplosionSpots();
  };

  setExplosionSpots = (shouldUpdateCounts) => {
    let { density } = this.props;
    if (density && typeof density === 'number' && density > 0) {
      if (density > 10) {
        density = 10;
      }
    } else {
      density = 5;
    }
    let x = [],
      y = [],
      i;
    for (i = 0; i < density; i++) {
      x[i] = this.getRandom(skyWidth);
      y[i] = this.getRandom(skyHeight);
    }
    this.setState({ x, y }, () => {
      if (explosionIterations && typeof explosionIterations === 'number') {
        if (shouldUpdateCounts) {
          count++;
        }
        if (count < explosionIterations) {
          this.animateOpacity();
          this.animateTop();
        }
      } else {
        this.animateOpacity();
        this.animateTop();
      }
    });
  };

  animateOpacity() {
    const { speed } = this.props;
    this.animatedOpacity.setValue(1);
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: speed === 1 ? 900 : speed === 3 ? 500 : 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() =>
      setTimeout(() => {
        this.setExplosionSpots(true);
      }),
    );
  }

  animateTop() {
    const { speed } = this.props;
    this.animatedTop.setValue(0);
    Animated.timing(this.animatedTop, {
      toValue: 1,
      duration: speed === 1 ? 900 : speed === 3 ? 500 : 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  getRandom = (n) => {
    return Math.round(Math.random() * n);
  };

  exploasionBox = () => {
    const { colors } = this.props;
    let balls = [],
      randomTops = [],
      randomLefts = [],
      randomColors = [];
    for (let i = 0; i < 30; i++) {
      balls.push('');
      randomTops[i] = this.animatedTop.interpolate({
        inputRange: [0, 1],
        outputRange: [100, this.getRandom(200)],
      });
      randomLefts[i] = this.animatedTop.interpolate({
        inputRange: [0, 1],
        outputRange: [100, this.getRandom(200)],
      });
      if (colors && colors.length > 0) {
        let l = colors.length - 1;
        let n = Math.round(Math.random() * l);
        randomColors[i] = colors[n];
      } else {
        randomColors[i] =
          'rgb(' +
          this.getRandom(255) +
          ',' +
          this.getRandom(255) +
          ',' +
          this.getRandom(255) +
          ')';
      }
    }
    let myOpacity = this.animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const { color } = this.props;
    return (
      <View style={styles.explosionBoundary}>
        {balls.map((ball, index) => {
          return (
            <Animated.View
              style={[
                styles.ball,
                {
                  top: randomTops[index],
                  left: randomLefts[index],
                  opacity: myOpacity,
                  backgroundColor: color || randomColors[index],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };
  render() {
    const { x, y } = this.state;
    return (
      <View style={styles.container}>
        {x.map((xItem, index) => {
          return (
            <View
              style={{
                top: y[index],
                left: x[index],
              }}>
              {this.exploasionBox()}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: skyZindex,
    width: skyWidth,
    height: skyHeight,
  },
  explosionBoundary: {
    position: 'absolute',
    height: 300,
    width: 300,
    zIndex: skyZindex,
  },
  ball: {
    position: 'absolute',
    height: 7,
    width: 7,
    borderRadius: 3,
  },
});
