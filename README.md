<p align="center"><a href="https://dolphin.js.org" target="_blank"><img width="256" height="256" src="https://dolphin.js.org/media/logo.svg"></a></p>
<p align="center"><h1 align="center">Dolphin</h1></p>

<br>

> _If what you're doing is unnecessary difficult, then you maybe doing it wrong._  

<br>

Dolphin is full-svg diagram editor. I made it in two weeks for my ITMO graduation.

It may be not the software engineering masterpiece, but I've done what needed to be done and got an 🅰 mark.
Consider Dolphin as pretty straightforward example of how [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) work: you either edit the text in the editor or move diagram, and by doing that you change the model, which is represented as the text at the text editor. After you make changes, the diagram updates itself.

Creating Dolphin was such an educational experience for me, and I've learned a lot.

## Core concepts and the process
[Functional programming](https://en.wikipedia.org/wiki/Functional_programming) in JavaScript [is maybe an antipattern](https://hackernoon.com/functional-programming-in-javascript-is-an-antipattern-58526819f21e), but _functional style_ is great. Since quick prototyping with completely new tools may produce loads of errors, pure functions may help you a lot on debugging. That's why I decided to make use of them.

Initially I thought this tool as something like typical React+Redux web app and was coding it accordingly. As the academic deadline came closer and closer, and I had absolutely no time to have a rest, so soon I threw designing away and went to raw coding. That was awful mistake that lead to huge overhead and complete loss of sleep. I was adding more and more tools that I had never used before, and very soon I had cool Webpack config, React+Grommet UI, co-op editing with Gun.js and much more, but the code was completely messed up. That wasn't great, so I decided to calm down and rewrite the UI and the data storage (the hardest parts because I couldn't use pure functions), and that latest version is the one you may see now.

I also learned a lot about how SVG works and how to manipulate it.

## Errors made
 - __Trying to use the functional appoach to SVG with SVG.js__  
I just wanted this tool to use pure functions, but this ended up to be impossible because each and every method of SVG.js has direct side effects on DOM. It just wasn't _meant to be_. You can't just make an SVG element and render it when you want it to be rendered, like in React. The element renders instantly when you create it, and that kind of behavior made me to stop coding in functional style. Functional style and SVG.js are incompatible. Since SVG.js is appeared to be object-oriented, it seemed nice to build the components (diagram element, connection) as SVG.js classes. I did it and it was good and easy. It wasn't functional, but it definetely was better than my initial approach.

 - __Styling complex elements with SVG.js__  
I've done terrible mistake using SVG.js styling, and the code was all messed up very quickly. After 500 lines of crappy code (oh my god) when things came to style merging, I realized that I was recreating browser CSS engine and then decided to just attach some classes to the elements and make everything else in CSS. That was like magic.

 - __Redux, Gun.js, Redux again and my own storage then__  
Tools without undo function are awful. That's why I used Redux: I had my undo and redo implemented easily. It was good at the beginning, but then I need the server. Since Logux wasn't released back then, I decided to use Gun.js.  
[_frantically codes all night long_]  
I got the situation when diagram was being loaded to Redux store, and Redux event updated Gun, and Gun event updated Redux, and this wasn't going to stop. That was awful. I was too tired to use Redux the right way, and that situation made me to learn Redux much better after the graduation. But back then, I had to replace Redux with Gun.  
After all that jazz, I decided to move to simplest solution possible, and the final result is what you may see now.

 - __Building UI and diagram editor independently and trying to merge them__  
I need an UI. React UI libraries big picture seems boring now: the UI libraries are just not ready for production yet. Some of them looks bad, some of them behaves bad. Except for one. Grommet looks amazing. The bad things started at the very beginning: [Grommet just doesn't seem to work](https://github.com/grommet/grommet-cli/issues/35). There was very little time left before the deadline, so I decided to dig Grommet on my own. Thanks Internet, it worked.  
I had my UI done very quickly.  
UI is ready, diagram editor is ready, so let's just put it together...  
...  
__Oh no! React doesn't allow side effects, and SVG.js _is_ huge side-effect!__   
...  
After hours of messing around, I managed to put them together. Don't repeat this at home.

 - __Using Gun.js for authentication__  
Pretty much everyone in the network may freely subscribe to your Gun.js instance and listen to your data. Gun.js allows it _by design_. As Gun [issues](https://github.com/amark/gun/issues?q=authentication) mention, it's important to finally build that goddamn authentication wrapper for Gun.js. it may be good idea to create symmetrical [SJCL](https://github.com/bitwiseshiftleft/sjcl) wrapper for Gun.js.

## Lessons learned
 - __Don't break your own tools.__  
There's an _idea_ behind every framework. If something matches the idea, then it will be a pleasure to implement on top of that framework. If it's not, then it does not _meant to be_.

 - __API and data model comes first.__  
Actual implementation doesn't matter as long as the API and data model are not defined and thought out.

 - __Design is not obsolete.__  
If you want to build really good, sustainable software, you need to learn and use UML or other designing tools.

 - __Design patterns are great.__

## Good parts
 - __Print quality is superior.__ I used [Verdana](https://en.wikipedia.org/wiki/Verdana) as main typeface for diagrams, because Verdana is almost the most readable [_safe_ typeface](https://www.w3schools.com/cssref/css_websafe_fonts.asp) for both screen and print. The lines are also look good because it's all SVG and [Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) is very good choice for smooth, curvy lines.
 
 - __It's SVG,__ so you may print really huge diagrams without any quality loss.
 
 - __Full UML “Class” notation support.__ IBM has pretty straightforward [recommendations](https://www.ibm.com/developerworks/rational/library/content/RationalEdge/sep04/bell/index.html) for what features should UML editor support. The actual supported features are mentioned below.
 
 - __Auto-resize and auto alignment.__

 - __Theming in CSS.__ You may see the theme format [here](https://github.com/uyouthe/dolphin/blob/master/src/css/style_sample.css).

## UML support
### Diagram element
 - Type (normal or _&lt;interface&gt;_, but data model allows pretty much every string to be there)
 - Name
 - Attribute
 - Method
 
#### Attribute
 - Scope (`+` public, `-` private, `#` protected, `/` derived, `~` package)
 - Data type
 - Name
 - Value
 
#### Method
 - Scope
 - Returned data type
 - Name
 - Arguments
 
#### Argument
 - Data type
 - Name
 - Default value
 
### Connection
 - Type (Association, Inheritance, Implementation, Dependency, Aggregation, Composition)
 - Name
 - Multiplicity
 - Roles


## Tools used
 - [Redux](http://redux.js.org/)
 - [Gun.js](http://gun.js.org/)
 - [SVG.js](http://svgjs.com/) ([very good community](https://github.com/svgdotjs/svg.js/issues/684)
 - [React](https://facebook.github.io/react/)
 - [Grommet](https://grommet.github.io/)
 - [Webpack](https://webpack.github.io/)
 - [Ace](https://ace.c9.io/)

## Acknowledgements & thanks
 - [@condorcet](https://github.com/condorcet) - graduation supervisor
 - [@ierhyna](https://github.com/ierhyna) and the whole [Russian FreeCodeCamp community](https://vk.com/freecodecamprussia)
 - [@Fuzzyma](https://github.com/Fuzzyma)
 - [@RmiTtro](https://github.com/RmiTtro)
 - [@schatty](https://github.com/schatty)
