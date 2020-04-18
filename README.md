# learn-d3

学习笔记，同步记录于羽雀
https://www.yuque.com/u34723/kdqsue/wrbzgy

## 目标
借由数个范例的模仿，学习D3与JS的知识点，逐渐掌握数据处理、常规可视化图表、交互、动效、定制可视化图表的能力。

## 执行策略
1. 前期先零散学习，每学完一个例子后再汇整梳理。
2. 案例与课本交替学习。

## 范例1：

![0](https://github.com/Noelfish6/learn-d3/blob/master/pics/0.png)

课程来源：https://www.udemy.com/course/how-to-visualize-data-with-d3/learn/lecture/17527824#overview

图片中的可视化，将1850年到2017年的温度数据给可视化出来，蓝色代表在平均温度之下，红色代表在平均温度之上，全球暖化显而易见，此可视化造成许多讨论。此作品的作者为气象科学家 Ed Hawkins。
作品链接：https://showyourstripes.info/。

### Day 1：读取数据
绘制可视化之前，需要先读取数据，然后再对数据进行处理。用D3读取数据并加以处理、再可视化，这个流程使用了回调函数（callback function）。在主要的函数里面嵌套了其他的函数。例如上图，主要的函数是processData，回调函数是then的graph函数，processData是对数据的处理，graph函数是对处理好的数据绘制出来。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/1.png)

**learning resources**
How arrow functions work in JavaScript
https://www.youtube.com/watch?v=dlnVLfwqBBQ

### Day 2：数据处理
昨天完成了对的数据初步读取，今天需要截取出要呈现在可视化上的数据：每一年的平均温度与该年年份。原始数据不必要的东西较多，这时候可以定义变量，然后限定条件，并返回在限定条件下的数据，例如此范例，定义了year与avg两个变量，并对avg的数据限定为“J-D”这个当年分的平均气温：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/2.png)

### Day 3：制作容器
今天制作一个绘图容器给可视化容身之处。先选定id为land的div，并且设置了数个小长条（每一个小长条用来绘制当年的气温数据）的长与宽。然后使用d3自带的链接方法，制造一个用来绘制可视化的svg，先是贴在land上，然后再设置长与宽。这个过程，就完成了可视化容器的制作。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/3.png)

### Day 4：在容器内添加rect，且设置属性
今天的任务是在容器（svg）内添加绑定数据的rect（用来绘制气温颜色的方块）。首先是选择所有尚未创建的rect，然后指定数据（因为在graph里面，数据为data），然后使用enter方法将rect与data关联起来。此时已经创建好绑定数据的rect，这个过程类似loop方法（将每一条数据依序与每一个方块绑定）。然后继续设置这些方块的长宽与位置。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/4-1.png)

已经生成了所有的rect，等待更多的可视化设置：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/4-2.png)

### Day 5：设置方块的位置
昨天的方块堆叠在一起，是因为对所有的方块设置的固定的x参数；今天使用function来根据数据的index依序设置每一个方块的位置，另外为了保持代码简介，使用了arrow function。

这个设置方块位置的代码目前对我而言有个困惑，为什么D3会知道（d，i）的d是data且i是index，是因为自动继承了graph funciton的设置？

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/5-1.png)

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/5-2.png)


### Day 6：设置数据到颜色的映射（domain&range）

今天是项目1的最后一次打卡，解决了从数据到颜色的映射，并将数据绘制出来。今天主要有两个变量：**avgData**、**linearScaleForData**。

**avgData** 用来处理 data，data 的格式为 year 与 avg，但只需要保留 avg 即可，故使用 map function 来解决这个问题。

**linearScaleForData** 用来处理数据到颜色范围的映射，使用的scale是scaleLinear，并用d3.min与d3.max来找出数据的极大极小值，然后再用range去映射到colors。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/6-1.png)

在最后 stripes 的样式设置，style的填充方式是先使用 Math.round 将 **linearScaleForData(d.avg)** 从 floating numbers 变成 integer，然后再放入colors[]里，就完成了数据到可视化的映射过程。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/6-2.png)

成果：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/6-3.png)


困惑：

1. avgData与d.avg有何不同？avgData是array，d.avg是啥？
2. the data which is going to be put in the scale must be integer, why?
3. colors[data] will generate the data visualization, colors(data) won't, why?

### Day 7：复习
梳理这个项目的简要代码逻辑：在 html 嵌入 readData function，并在 js 里展开 readData 的架构。readData 由两个 callback 组成：processData 与 graph。processData 用来转换数据格式，从string 到 array，且筛选出要绘制的数据。graph 用来创建与设置可视化的元素。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/7.jpeg)

## 项目 2：D3.js In Action —— Ch2. Information visualization data flow

### Day 8: 2.1 Working with data - 2.1.1 loading data
1. ```d3.csv```跟```d3.json```使用相同的格式来读取数据：先定义数据档案的路径，再定义回调函数。
```d3.csv("cities.csv", (error,data) => {console.log(error,data)});```
```d3.csv("cities.csv", d => console.log(d));```

2. ```d3.xhr```包括了```d3.csv```、```d3.json```、```d3.json```等等，适合用于数据为动态更新的api（异步读取数据），若数据为静止不变的，例如地图，可以之间在script里面引用，或是用import（Node）、require（ES2015）。*备注：在对文件进行请求时，XHR代表当前页面执行时的网络请求（ajax请求），JS代表当前页面加载的JS文件。*

因为D3已经改版到V5，上述的异步回调方法稍旧，需改为使用promises:
```d3.csv("file.csv").then(function(data){console.log(data);});```

### Day 9：Promises 学习
来源1：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

来源2：https://es6.ruanyifeng.com/#docs/promise

因为 D3.js V5 在数据处理上改用 promises，故今天的任务是大致了解 promises 的概念。

原始的 callback 函数：

```function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
  console.error("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);


使用 promises 简化后：

createAudioFileAsync(audioSettings).then(successCallback, failureCallback);

或是更简洁表示：

const promise = createAudioFileAsync(audioSettings); 
promise.then(successCallback, failureCallback);

```
	
### Day 10：2.1 Working with data - 2.1.2 Formatting data - categorical data

这个章节主要讨论数据的 scale 处理，以 categorical data 为例：

```
var sampleArray = [423,124,66,424,58,10,900,44,1];
var qScale = d3.scaleQuantile().domain(sampleArray).range([0,1,2]);

```
从原始数据 sampleArray 到 [0, 1, 2] 如何映射呢？首先使用```scaleQuantile```并将数据```domain```（d即data）结合，最后告诉代码要映射的范围```range```（r即result）。

例子： ``` qScale(1211) ```为2。

### Day 11：2.1 Working with data - 2.1.2 Formatting data - nesting & extent

继续昨天的 scale 主题，探讨对关系型数据进行分类（nest）与计算数据的极大极小值（extent）。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/11-1.png)

```nest```的```key```指定数据字段，用于分类。例如```key(d => d.user)```即以```user```的数据字段来分类数据。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/11-2.png)

疑问：不懂```el => +el.population``` + 含义，类似for loop？

### Day 12：2.2 Data-binding - 2.2.1. Selections and binding

练习D3的选择器（selection）与数据绑定（binding），使用书本的代码时遇到了未知的问题，目前还不知道如何解决。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/12-1.png)

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/12-2.png)


### Day 13：Debugging

昨天的已解决，改成promises即可：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/12-3.png)

### Day 14：2.3. Data presentation style, attributes, and content

目前遇到的问题是，console没有报错，但图没有显示，还不知道问题在哪里。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/14.png)


## 项目3：D3 course 2018 by Curran

鉴于项目二的书籍使用较旧版本的D3，在代码转换上稍微麻烦，改用另外一个线上免费课程。

### Day 15：Basic JS - Program Sturcture
简要复习 while loop 与 for loop。
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/15.png)


### Day 16：Basic JS - Defining a function

```
const square = function(x) { return x*x };
```
等同于
```
function square(x){return x*x;}
```
等同于
```
square = (x) => x*x;
```
使用 arrow function 时，若有多个 statement，需要使用{}。

### Day 17：Basic JS - Recursion
Recursion：对自我进行调用的函数。

```
function power(base, exponent) {

if (exponent == 0){return 1;}
else {return base * power(base, exponent -1)}

}

```

另外一个例子：

```
const factorial = n =>
n === 0
  ? 1
  : n * factorial(n - 1);
```

### Day 18：Data structures - object and array
Object 由 {} 组成，array 由 [] 组成。Object 可以被包含在 array 里面，例如：

```
[{name: 'Accord'}, {name: 'Fiat'}]
```

若要在 array 里面添加新的 object，可以使用 push 方法：

```
cars.push({
make: 'Nissan',
model: 'Leaf',
year: 2012,
price: 1800
});
```

若想要打印 cars 里面所有的 price，可以使用 for loop：

```
for(let i = 0; i < cars.length; i++){
const car = cars[i];
console.log(cars.price);
}

```

疑问：为啥 () 里面的 i 是用 let，但 {} 里面的 car 是用 const？

另外，也可以使用 forEach 来打印 cars 里面所有的 price：

```
const printCarPrice = car => {
	console.log(car.price);

}; // undefined

cars.forEach(printCarPrice); // 打印所有的 price

```

### Day 19：Asynchronous programming
以下面的代码来解释何谓异步编程：

```
setTimeout(() => console.log("Tick"), 1000);
```
setTimeout 可以指定后面代码的执行时间，例如 console.log 打印 “Tick” 的时间是 1 秒。

上述的方法是 callback，新版 JS 已改用 promises：

```
let myPromose = new Promise((resolve, reject) => {
	setTimeout(() => resolve(), 2000);
});

myPromise.then(() => {
console.log('Promise resolved');
});
```
另外一个例子：

```
let waitSeconds = numSeconds => new Promise(resolve => {
	const message = `${numSeconds} seconds have passed!`;
	setTimeout(() => resolve(message), numSeconds * 1000);
})
```

```
waitSeconds(2)
	.then(message => console.log(message));

// 2 seconds have passed!
```

### Day 20：快速读取 D3
今天的内容较为简单，在html里面测试是否成功读取d3文件，在html里面使用如下的代码：

```
<!doctype html>
<html>
<head>
<title>Warming Stripes</title>
<meta charset="utf-8">
<script type="text/javascript" src="./d3.js"></script>
<script>
console.log(d3);
</script>
</head>
<body>
	<div id="land"></div>
</body>
</html>
```

之前在调用d3时一直忽略这个简单的方法。

### Day 21：Draw a circle - part 1
今天的教程主要是使用 webpack 来执行 d3 代码，但犹豫教程是在线上的代码环境执行，不用安装 webpack，但我在本地环境下需要使用 webpack，目前卡在不知道如何在本地部署 webpack。不过目前在 bundle.js 写代码还是可以顺利执行。
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/21-1.png)
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/21-2.png)

### Day 22：Draw a circle - part 2
继续昨天的示例，用 d3 来绘制一个笑脸，这里的代码使用到之前比较不熟悉的方法，需要多去了解。
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/22-1.png)
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/22-2.png)

### Day 23：Draw a circle - part 3
基于前两天的基础，完成了笑脸的绘制。
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/23-1.png)
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/23-2.png)

### Day 24：Making a bar chart - part 1
今天主要的任务是清洗数据。从联合国网站上下载人口数据，并只保留2020年的数据与各国名称，其余多余的内容删除，并转换成csv格式。
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/24-1.png)
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/24-2.png)

### Day 25：Making a bar chart - part 2
读取数据是今天的任务。另外，因为本地端运行代码需要 webpack，所以今天开始改用作者的线上工具来运行代码（已经整合了webpack），不然在学习过程中会一直遇到问题。之后有时间再去部署本地的 webpack。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/25.png)

### Day 26：Making a bar chart - part 3
目前读取到的数据格式为 string，但我们需要它为 number 格式。解决的方法是使用 forEach 对所有的数据进行处理，代码如下：

```
csv("population.csv").then(data => {
  data.forEach(d => {
  	d.population = +d.population;
  });
	console.log(data);
});

```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/26.png)

### Day 27：Making a bar chart - part 4
这几天的大任务是为每一个数据生成方块，今天的小任务是先把方块画出来。需要使用 D3 的 data join 方法。

先生成一个 render 函数，并在里面指定方块的数据与绘制效果：

```
const render = data => {
	// make one rectangle for each row
  
  	// D3 Data Join
	svg.selectAll("rect").data(data) 
  	.enter().append("rect")
  	.attr("width",300)
  	.attr("height",300)
};
```

在数据执行函数（？）里面调用 render 函数，以完成方块的绘制：

```
csv("population.csv").then(data => {
  data.forEach(d => {
  	d.population = +d.population * 1000;
  });
	render(data);
});
```

方块绘制出来后有个问题，目前都叠在一起：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/27.png)

### Day 28：Making a bar chart - part 5
要解决叠在一起的问题，会需要用到以下三个 d3 的方法：scaleLinear, max, scaleBand。scaleLinear 用来处理 x 的位置（绑定 d.population），scaleBand 用来处理 y 的位置（绑定 d.country）。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/28.png)

另外，因为要让 bar chart 横着放，所以在 svg 的绘制上，需要指定 y 的 attr。

```
.attr("y", d => yScale(d.country))
```

### Day 29：Making a bar chart - part 6
使用 margin convention，来调整可视化的排版。先创立 margin、innerWidth、innerHeight的变量：

```
  const margin = {top:10, right:20, bottom: 20, left: 20};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
```

然后在之前的代码基础上，修改width、height至新的变量innerWidth、innerHeight：

```
  const xScale = scaleLinear()
  	.domain([0, max(data, d => d.population)])
  	.range([0, innerWidth]);
  
  const yScale = scaleBand()
  	.domain(data.map(d => d.country))
  	.range([0, innerHeight]);
  
  const g = svg.append("g")
  	.attr("transform", `translate(${margin.left},${margin.top})`);
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/29.png)


### Day 30：Making a bar chart - part 7
最后一步是添加坐标轴。先设置 y 轴的坐标轴：

```
const yAxis = axisLeft(yScale);
```

然后用下面的代码即可在 y 轴绘制出坐标轴，function（selection）是在 D3 很常用的方法：

```
// 两者择一
yAxis(g.append("g"));
g.append("g").call(yAxis);
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/30.png)

### Day 31：Customizing axes of a bar chart
处理坐标轴的数据格式，例如2000000，可以利用 d3 的 format 将这个数据改成 2M。

```
  const xAxis = axisBottom(xScale)
  	.tickFormat(format(".3s"));
  	
  g.append("g").call(xAxis)
  .attr("transform", `translate(${0},${innerHeight})`);
```

但实际操作时报错，目前不知道问题在哪里。

### Day 32：Making a scatter plot - part 1

scalePoint 用于 scatter plot；scaleBand 用于 bar chart。散点图的属性设置，跟长条图不一样的地方，是cx、cy、r，长条图用的是y、width、height。

```
import {
  scalePoint
} from 'd3';

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', 20);
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/32.png)

### Day 33：Making a scatter plot - part 2
调整可视化的细节。若觉得 x 轴跟散点图太靠近，可以增加 padding 的数值：

```
  const yScale = scalePoint()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(1);
```

因为 China 跟 India 的散点太远，阅读不便，所以在视觉上增加横轴线条：

```
  const yAxis = axisLeft(yScale)
  	.tickSize(-innerWidth);
  
  g.append('g')
    .call(yAxis)
    .selectAll('.domain')
      .remove();
      
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
  	.nice(); // 用于快速调整轴线细节

```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/33.png)

### Day 34：Making a scatter plot - part 3
使用新的数据集-mpg。首先是载入数据：

```
csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data => {
  data.forEach(d => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
  });
  render(data);
});
```

然后根据数据类型调整部分代码：

```
  const xValue = d => d.cylinders;
  const yValue = d => d.mpg;
  
    const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
  	.nice();
  
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);
```

需注意，extent 是需要使用（）包围，而不是[]。另外，yScale不需要使用 padding （为什么？），否则会报错。

### Day 35：Making an area plot - part 1
面积图用到的是时间序列数据，对时序数据的处理，可以用 JS 原生的 Date() 方法：

```
d.timestamp = new Date(d.timestamp);
```

结果就是：Sat Mar 21 2015 05:00:00 GMT+0800。顺利读取正确的数据格式。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/35.png)

### Day 36：Making an area plot - part 2
因为更换了数据类型，若继续使用原来的设置，会有如下的结果产生：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/36-1.png)

修改后的结果：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/36-2.png)

详细比较：

x轴的scale。原来：scaleLinear，修改：scaleTime，如此可以调整 x 轴的显示格式。

y轴的range。原来：[0, innerHeight]，修改：[innerHeight, 0]，如此可以把数据的顺序置换。因为extent(data, yValue)到range的映射，数据最小值是y轴的最低部，所以映射到innerHeight。

面积图。原来：

```
 g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);
```


更新：

```
  const lineGenerator = line()
  	.x(d => xScale(xValue(d))) // not .x(xValue)
  	.y(d => yScale(yValue(d))) // not .y(yValue)
  	.curve(curveBasis);
  
  g.append('path')
  	.attr('class', 'line-path')
  	.attr('d', lineGenerator(data))
```

1、不需要用到 data(data)，这个是data join，但面积图只有一条线，所以不需要这个功能。
2、在给x与y赋值的时候，需要注意将数据映射到scale——xScale(xValue(d)))；不能直接将数据给x与y——.x(xValue)。
3、.curve(curveBasis)用来让线看起来较为圆滑，可以同时使用css的stroke-linejoin:round;功能。

### Day 37：Making an area plot - part 3
从折线图到面积图，代码API的使用上有所不同。面积图会需要制定x0、x1或y0、y1。若面积图跟坐标轴没有对齐，可以试着将xScale的.nice()给删除。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/37.png)


### Day 38：General update patterns - part 1
学习四个数据更新方法：Enter、Exit、Update、Merge，并涵盖了四个主题：Animated Transition、Object constancy、Nested element、Singular elements。

基础设置：

```
import { select, range } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const makeFruit = type => ({ type });

const fruits = range(5)
	.map(() => makeFruit('apple'));

svg.selectAll('circle').data(fruits)
	.enter().append('circle')
		.attr('cx', (d, i) => i * 100)
		.attr('cy', height/2)
		.attr('fill', 'red')
		.attr('r', 50);
```

### Day 39：General update patterns - part 2

对昨天的代码进行解释。下面的代码创建了data join:

```
.selectAll().data()
```

使用.selectAll()，可以让d3知道有哪些物件要跟数据绑定，但此时物件为空。在使用.data()时，可以让d3知道有哪些数据要跟物件绑定。此时使用.enter().append()可以完成这个绑定。

```
// Eat an apple. .pop() removes a data point
fruits.pop();

svg.selectAll('circle').data(fruits)
	.exit().remove();
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/39.png)

### Day 40：Let's make a map with D3.js

成果：
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/40-1.png)
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/40-2.png)

首先下载geojson的数据，并在import里面输入json。因为数据的内容有些不需要，可以创建变量来保留会用到的部分：

```
json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
	.then(data => {
  const countries = feature(data, data.objects.countries);
 }
```

完成数据的导入后，继续在import里面输入geopath与各类的projecttion。geopath用来绘制图形（这段代码嵌入json里面）：

```
  svg.selectAll('path')
  .data(countries.features)
    .enter().append('path')
  	.attr('class', 'country')
  	.attr('d', pathGenerator);
```

projection 有数种选择，例如geoMercator()、geoOrthographic()、geoNaturalEarth1()。

目前遇到一个问题：无法将网页的background颜色与地图底图的颜色区分，教程可以区分，但我实际做区分不了。比对代码并没有发现不同处。

### Day 41：Cheap Tricks for Interaction

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/41.png)

两个目标：在 CSS 使用 hover 效果、创建提示框。

在 CSS 使用 hover 效果，较为简单：

```
.country:hover {
 	fill:lightgrey;
}
```

创建提示框（较为复杂，不懂的地方较多）：

```
Promise.all([
	tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
  json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
]).then(([tsvData, topoJSONdata]) => {
  const countryName = {};
  tsvData.forEach(d =>{
  countryName[d.iso_n3] = d.name;
  })
  
	const countries = feature(topoJSONdata, topoJSONdata.objects.countries);
  
  svg.selectAll('path')
  .data(countries.features)
    .enter().append('path')
  	.attr('class', 'country')
  	.attr('d', pathGenerator)
  	.append('title')
  	.text(d => countryName[d.id]);
});

```

