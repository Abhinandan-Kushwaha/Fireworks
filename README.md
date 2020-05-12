# Fireworks

A customizable firework like animation that can be used as a component in a react native project.

![Demo GIF of fireworks being rendered](./fireworks.gif)

# Installation

```javascript
npm i react-native-fireworks
```

# Import


```javascript
import Fireworks from 'react-native-fireworks'
```

# Usage

Minimal code to ignite the fireworks 🎇

```javascript
<Fireworks/>
```

The parameters like the speed of the explosions, the density of fireworks and the colors of the fire can be customized.

```javascript
<Fireworks
  speed={3}
  density={8}
  colors={['#ff0','#ff3','#cc0','#ff4500','#ff6347']}
/>
```

# Props
There are 3 props and all the 3 are <b>optional.</b><br/><br/>
<b>1.  speed</b><br/>
It denotes how fast will an individual cracker explode.
It is a number with possible values- 1,2 and 3. 1 is for the slowest and 3 for the fastest. The default value is 2.

<b>2.  density</b><br/>
It denotes the number of crackers exploding simultaneously.
It is a number between 1 and 10. The default value is 5.

<b>3.  colors</b><br/>
The fireworks explode into colorful light crystals. You can set the colors of you choice by passing their hex codes or rgb values (as Strings) in an array.
If you don't pass any colors, luckily you will get light crystals of all possible colors ranging from <b><i>'rgb(0,0,0)'</i></b> to  <b><i>'rgb(255,255,255)'</i></b>.
