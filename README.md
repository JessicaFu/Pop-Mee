Pop-Mee
=======

*INVESTIGATIVE PROJECT* A windows 8/8.1 metro application that investigates pen and touch gesture inputs and compares various web graphics libraries and animation paradigms. 

The Pop Mee game simulates different levels and different game styles that generally revolve around popping the bubbles by clicking/touching them. The primary goal of this project 
is to compare and contrast the multitude of ways developers can use current graphics libraries and animation packages, the benefits and downsides found and conclude on how well each 
of them scale with larger inputs. Other efforts include exploring the range of multitouch capabilities available in the MS Trident layout engine, how to simulate a better way to correctly 
identify and approach pen and touch gestures and figuring out how to create responsive and fluid game interfaces with web tools.

Currently, the master branch illustrates the limitations of jquery animations and game objects rendered by html elements as it scales with the number of objects and as resolution changes, 
affecting the rendering of graphics.

Things to look into:
-css animations
-canvas
-2d webgl
-KineticJS (canvas based interactive web graphics library)
-HammerJS (gesture recognizer library)
