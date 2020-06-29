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

### Day 42：Building a tree visualization of world countries - part 1
截至目前为止，已经学了基础的散点图、长条图、地图、基础交互，这次的任务要着手处理阶层数据。视频分成六个部分：

- constructing a node-link tree visualization
- adding text labels to the nodes
- using the margin convention
- tweaking label alignment and size
- padding and zooming
- using a custom font

### Day 43：Building a tree visualization of world countries - part 2
任何项目第一步皆是先读取数据。d3.hierarchy 用来处理已经阶层化的数据，若数据还没有阶层化，则需要使用d3.stratify进行处理。目前使用的数据已经阶层化，所以使用d3.hierarchy。

```
json('data.json')
	.then(data => {
	console.log(data);
});
```
- constructing a node-link tree visualization

参照d3的文档，初步绘制图形。linkPathGenerator用来绘制link（x、y的设置比较让人困惑，目前也不知道如何解释）。

```
json('data.json')
	.then(data => {
  const root = hierarchy(data);
  const links = treeLayout(root).links();
  const linkPathGenerator = linkHorizontal()
  	.x(d => d.y)
  	.y(d => d.x)
  
  svg.selectAll('path').data(links)
  	.enter().append('path')
  	.attr('d', linkPathGenerator)
});
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/43.png)

### Day 44：Building a tree visualization of world countries - part 3

昨天的图表会有那样的问题是因为继承了path的原始设定，此时只需要去css调整一下即可：

```
path {
	fill:none;
  stroke:black;
}
```
- adding text labels to the nodes
需留意root.descendants这个处理数据的方法：

```
  svg.selectAll('text').data(root.descendants())
  	.enter().append('text')
 		.attr('x', d => d.y)
  	.attr('y', d => d.x)
  	.text(d => d.data.data.id)
```
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/44.png)

### Day 45：Building a tree visualization of world countries - part 4
今天的任务是调整标签的位置与尺寸。

调整文字的位置：
```
  	.attr('dy', '0.32em')
```

新增文字的阴影效果，让文字易读：
```
text {
	text-shadow:
    -1px -1px 3px white,
    -1px  1px 3px white,
     1px -1px 3px white,
     1px  1px 3px white,
}
```
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/45.png)

### Day 46：Building a tree visualization of world countries - part 5
因为文字超过页面视图，所以需要调整 margin，并使用 g 来设置边界：

```
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const treeLayout = tree().size([innerHeight, innerWidth]);

const g = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(${margin.left},${margin.top})');
```

使用 anchor 加上逻辑判断，来设置部分文字标签的摆放位置：

```
.attr('text-anchor', d => d.children ? 'middle' : 'start')
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/46.png)

### Day 47：Building a tree visualization of world countries - part 6
加入以下的代码，即可对可视化进行缩放：

```
svg.call(zoom().on('zoom', () => {
	g.attr('transform', event.transform);
}))
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/47.png)

### Day 48：Choropleth map - part 1

这次的主题是绘制区域热力图，使用的代码基于在原先的地图作品上，并做了些调整。在 JS 中，先使用 fill 来测试是否能够控制颜色，若无法控制，则需要检查 CSS 是否对 fill 的颜色有设置，因为 CSS 的优先级高于 JS。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/48.png)

### Day 49：Choropleth map - part 2
目前的代码量较多且都放在同一个文件里面，可以透过创建 moduel 的方式来减少部分代码。

```
import {loadAndProcessData} from 'loadAndProcessData'

loadAndProcessData().then(countries => {
});

```

然后创建 loadAndProcessData.js 用来在别的文件读取这段代码。

```
import { feature } from 'topojson';
import { tsv, json } from 'd3';

export const loadAndProcessData = () => 
  Promise
		.all([
      tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
      json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ])
	.then(([tsvData, topoJSONdata]) => {
    const rowById = tsvData.reduce((accumulator, d) => {
      accumulator[d.iso_n3] = d;
      return accumulator;
    }, {});

    const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[d.id])
    });
    
    return countries;
  });
  ```


### Day 50：Scatter plot w/ menus - part 1
昨天的图表因为有代码导致图画不出来，也找不到bug，所以就先跳过去。这次的任务是创建带有下拉框的散点图，下拉框可以筛选数据。

首先是以散点图的代码为基础，创建了dropdownMenu.js：

```
export const dropdownMenu = (selection, props) => {
	const {
    options
  } = props;
};
```

然后在 index.js 调用刚才创建的代码块：

```
import { dropdownMenu } from './dropdownMenu'
```

### Day 51：Scatter plot w/ menus - part 2

调用 dropdownMenu 后，先做一个简单版本的 menu 来测试：

```
dropdownMenu(select('body'), {
	options: ['1', '2', '3']
})
```

然后在 dropdownMenu.js 的文件里面安插如下的代码：

```
export const dropdownMenu = (selection, props) => {
	const {
    options
  } = props;
  
  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select);
  
  const option = select.selectAll('option').data(options);
  option.enter().append('option').merge(option)
  	.attr('value', d => d)
  	.text(d => d);
};
```

此时，menu 已经被创建出来了，但被掩盖在 svg 之下，需要继续调整。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/51.png)

## 项目4：Fullstack Data Visualization with D3
这是一本电子书，作者为 Amelia Wattenberger，书本有比较多关于高阶可视化的教学。前一个课程到最后有比较多跟图表不相干的教学，代码难度也较大，故跳过那个课程。

### Day 52：Making your first chart - part 1
新的课程在代码的逻辑使用上也跟之前的课程有所不同。在这个课程中，调用代码的方式如下：

```
async function drawLineChart() {
  // write your code here

}

drawLineChart()
```

第一个课程是在html去调用，这一块之后完成100天的打卡后要回来汇总思考。

首先一样是读取数据：

```
async function drawLineChart() {
  const dataset = await d3.json("./../../my_weather_data.json");
  console.log(dataset);
}

drawLineChart()
```

### Day 53：Making your first chart - part 2
以 accesor （存取器）的方式来读取数据：

```
  const yAccessor = d => d.temperatureMax;

  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccesor = d => dateParser(d.date);
```

作者提到，用这种方式比较少见，但是自己的经验总结出来的，有如下的优点：

1. 容易修改：图表的数据或是设计样式要修改时，使用 accesor 改起来比较方便
2. 便于记录：可以快速回忆是使用了数据的哪个字段
3. 易于思考：使用这种方式可以帮助我们去思考要用数据的哪个字段

### Day 54：Making your first chart - part 3

在绘制图表时，可以将图表分成两个区域：wrapper以及bounds。Bounds为纯粹的图表本身，而wrapper是图表之外的元素——如坐标轴——的绘制区域。

margin跟bounds的设置如下：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/54.png)

Creating our scales 的部分不赘述。

### Day 55：Making your first chart - part 3
在绘制坐标轴时，较为冗余的方法是：

```
  	const yAxisGenerator = d3.axisLeft()
  		.scale(yScale)

  	const yAxis = bounds.append("g")
  	yAxisGenerator(yAxis)
```

可以使用 .call 来连接代码：

```
  	const yAxis = bounds.append("g")
  		.call(yAxisGenerator)
```

在绘制x坐标轴时，坐标轴的位置会被置顶，此时使用如下的代码去调整坐标轴的位置：

```
  	const xAxis = bounds.append("g")
  		.call(xAxisGenerator)
  		.style("transform", `translateY(${
  			dimensions.boundedHeight
  			}px`)
```
finished–
![](https://github.com/Noelfish6/learn-d3/blob/master/pics/55.png)

### Day 56：Making a Scatterplot - part 1

绘制图表的7个步骤：

1. 读取数据
2. 创建图表维度
3. 绘制canvas（chart area & bounds element）
4. 创建scale
5. 绘制数据
6. 绘制细节
7. 设置交互

为了让图表可以自适应页面大小（匹配最小的），这里使用 d3.min 方法。d3.min 相较于原生的 Math.min 有如下的优点：

1. d3.min 忽略 nulls/undefined。Math.min 会把它们计算为0。
2. d3.min 忽略无法被转换成数值的 value。Math.min 会返回 NaN。
3. d3.min 在我们需要使用 accessor 时，不用额外新增数组。
4. d3.min 对空数值会返回 undefined。 Math.min 则返回 Infinity。
5. d3.min 返回的数值是自然排序，方便处理 strings。Math.min 按照数值大小排序。

### Day 57：Making a Scatterplot - part 2

粗略绘制散点的代码：

```
  dataset.forEach(d => {
  	bounds
  	.append("circle")
  	.attr("cx", xScale(xAccessor(d)))
  	.attr("cy", yScale(yAccessor(d)))
  	.attr("r", 5)
  })
```

会有如下的问题：
1. 代码嵌套，比较难阅读
2. 跑代码两次，就会绘制两组散点。需要更新数据。

比较好的处理方式：

```
  const dots = bounds.selectAll("circle")
  	.data(dataset)
  	.append("circle")
  	.attr("cx", d => xScale(xAccessor(d)))
  	.attr("cy", d => yScale(yAccessor(d)))
  	.attr("r", 5)
  	.attr("fill", "cornflowerblue")
```

### Day 58：Making a Scatterplot - part 3

绘制剩余细节。坐标轴的绘制，x、y轴的思路差不多：

```
  const xAxisGenerator = d3.axisBottom().scale(xScale)

  const xAxis = bounds.append("g")
  	.call(xAxisGenerator)
  	.style("transform", `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis.append("text")
  	.attr("x", dimensions.boundedWidth / 2)
  	.attr("y", dimensions.boundedHeight / 2)
  	.attr("fill", "black")
  	.style("font-size", "1.4em")
  	.html("Dew point (&deg;F)")

  const yAxisGenerator = d3.axisLeft()
  	.scale(yScale)
  	.ticks(4)

  const yAxis = bounds.append("g")
  	.call(yAxisGenerator)

  const yAxisLabel = yAxis.append("text")
  	.attr("x", -dimensions.boundedHeight / 2)
  	.attr("y", -dimensions.margin.left + 10)
  	.attr("fill", "black")
  	.style("font-size", "1.4em")
  	.text("Relative humidity")
  	.style("transform", "rotate(-90deg)")
  	.style("text-anchor", "middle")
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/58.png)

### Day 59：Making a Scatterplot - part 4

在原有的图表基础上添加颜色 scale。首先是创建颜色的 accessor 与 颜色 scale：

```
const colorAccessor = d => d.cloudCover

  const colorScale = d3.scaleLinear()
  	.domain(d3.extent(dataset, colorAccessor))
  	.range(["skyblue", "darkslategrey"])
```

然后在点的代码上稍微修改一下，把原本写死的颜色置换成 colorScale：

```
  const dots = bounds.selectAll("circle")
  	.data(dataset)
  	.enter().append("circle")
  	.attr("cx", d => xScale(xAccessor(d)))
  	.attr("cy", d => yScale(yAccessor(d)))
  	.attr("r", 4)
  	.attr("fill", d => colorScale(colorAccessor(d)))
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/59.png)

### Day 60：Making a Bar Chart - part 1
一样分成七个步骤：

1. 获取数据
2. 制造维度
3. 绘制canvas
4. 制造scale
5. 绘制数据
6. 绘制其余细节
7. 设置交互

```
async function drawBars() {
  

  const dataset = await d3.json("./../../my_weather_data.json")
  //console.log(dataset)
  const metricAccessor = d => d.humidity
  
}
drawBars()
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/60.png)

### Day 61：Making a Bar Chart - part 2

设置 wrapper 与 bounds，用来承载图表的绘制空间：

```
const width = 600

  let dimensions = {
  	width: width,
  	height: width * 0.6,
  	margin: {
  		top: 30,
  		right: 10,
  		bottom: 50,
  		left: 50,
  	},
  }

  dimensions.boundedWidth = dimensions.width
  	- dimensions.margin.left
  	- dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
  	- dimensions.margin.top
  	- dimensions.margin.bottom
```

### Day 62：Making a Bar Chart - part 3
绘制 canvas。尝试自己写了一遍，发现还是会写错，对代码的思路还没完全熟悉。设置 wrapper 会用到 attr，而设置 bounds 会用到 style。为什么会有这个区别？

```

  const wrapper = d3.select("#wrapper")
  	.append("svg")
  	.attr("width", dimensions.width)
  	.attr("height", dimensions.height)

  const bounds = wrapper.append("g")
  	.style("transform", `translate(${
  		dimensions.margin.left
  	}px, ${
  		dimensions.margin.top
  	}px)`)
```

### Day 63：Making a Bar Chart - part 4

创建 x 轴的 sacle：

```
  const xScale = d3.scaleLinear()
  	.domain(d3.extent(dataset, metricAccessor))
  	.range([0, dimensions.boundedWidth])
  	.nice()
```

接下来应该是创建 y 轴的 scale，但作者指出，要创建 scale 之前，需要对数据有所理解，所以先展示不创建 scale。

### Day 64：Making a Bar Chart - part 5

制作 historgram 的分箱：

```
  const binsGenerator = d3.histogram()
  	.domain(xScale.domain())
  	.value(metricAccessor)
  	.thresholds(12)

  const bins = binsGenerator(dataset)
  
```

首先定义 x 轴的 scale，然后再使用 d3.hostogram 去绘制图表，一样是 domain 到 range 的映射，但这里没有使用 range 而是 value，需要特别注意。

### Day 65：Making a Bar Chart - part 6

今天的任务是设置 y 轴的 scale。设置方式跟之前一样，不赘述。

```
  const yAccessor = d => d.length

  const yScale = d3.scaleLinear()
  	.domain([0, d3.max(bins, yAccessor)])
  	.range([dimensions.boundedHeight, 0])
  	.nice()
```

### Day 66：Making a Bar Chart - part 7
使用 <rect> 来绘制长条图，这会需要用到四个变量： x、y、width， 与 height。另外， 每一个 bar 的宽度需要从 x0、x1的差分来决定。

```
  const binsGroup = bounds.append("g")

  const binGroups = binsGroup.selectAll("g")
  	.data(bins)
  	.enter().append("g")

  const barPadding = 1

  const barRects = binGroups.append("rect")
  	.attr("x", d => xScale(d.x0) + barPadding / 2)
  	.attr("y", d => yScale(yAccessor(d))
  	.attr("width", d => d3.max([
  		0,
  		xScale(d.x1) - xScale(d.x0) - barPadding
  		]))
  	.attr("height", d => dimensions.boundedHeight
  		- yScale(yAccessor(d))
  		)
  	.attr("fill", "cornflowerblue")
```

### Day 67：Making a Bar Chart - part 8

为图表增添坐标轴的标签，最主要的问题是找到文字锚点的位置，需要透过简单的计算可以找到：

```
  	const barText = binGroups.filter(yAccessor)
  		.append("text")
  		.attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
  		.attr("y", d => yScale(yAccessor(d)) - 5)
  		.text(yAccessor)
  		.style("text-nchor", "middle")
  		.attr("fill", "darkgrey")
  		.style("font-size", "12px")
  		.style("font-family", "sans-serif")
```

### Day 68：Making a Bar chart - part 9

额外的绘制：增添平均线。利用 d3.mean 来计算平均数的位置：

```
 const meanLine = bounds.append("line")
 	.attr("x1", xScale(mean))
 	.attr("x2", xScale(mean))
 	.attr("y1", -15)
 	.attr("y2", dimensions.boundedHeight)
 	.attr("stroke", "maroon")
 	.attr("stroke-dasharray", "2px 4px")
```

x1 与 x2 会影响到线的绘制，若没有设置 x2，则绘制出来的效果是从 0 到 平均数位置的斜线。

另外，对这条线加上标签：

```
 const meanLabel = bounds.append("text")
 	.attr("x", xScale(mean))
 	.attr("y", -20)
 	.text("mean")
 	.attr("fill", "maroon")
 	.style("font-size", "12px")
 	.style("text-anchor", "middle")
```

特别注意需要设置 text-anchor，否则标签的位置不会居中。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/68.png)

绘制 x 轴：

```
 const xAxisGenerator = d3.axisBottom()
 	.scale(xScale)

 const xAxis = bounds.append("g")
 	.call(xAxisGenerator)
 	.style("transform", `translateY(${dimensions.boundedHeight}px)`)

 const xAxisLabel = xAxis.append("text")
 	.attr("x", dimensions.boundedWidth / 2)
 	.attr("y", dimensions.margin.bottom - 10)
 	.attr("fill", "black")
 	.style("font-size", "1.4em")
 	.text("humidity")
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/68-2.png)

### Day 69：Making a Bar chart - part 10
根据之前的基础，绘制分页形式的图表。先将之前绘制图表的代码包在 drawHistogram 里面，然后在代码最下面调用这个函数（否则会画不出来）：

```
async function drawBars() {
	const dataset
	const metricAccessor
	// 略
	const drawHistogram = metric => {
	// 略
	}
	const metrics // 用于绘制每一个分页的图表标题
	metrics.forEach(drawHistogram)
}
drawBars()
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/69.png)

### Day 70：Making a Bar chart - part 11
今天的任务是给图表增加易读性。

```
  wrapper.attr("role", "figure")
    .attr("tabindex", "0")
    .append("title")
    .text("Histogram looking at the distribution of humidity in 2016")
```

把之前删除的 bindGroup 加回来：

```
  const binsGroup = bounds.append("g")
    .attr("tabindex", "0")
    .attr("role", "list")
    .attr("aria-label", "histogram bars")
```

这一段代码让每一个柱条可以点击：

```
  const binGroups = binsGroup.selectAll("g")
    .data(bins)
    .enter().append("g")
    .attr("tabindex", "0")
    .attr("role", "listitem")
    .attr("aria-label", d => `There were ${
      yAccessor(d)
    } days between ${
      d.x0.toString().slice(0, 4)
    } and ${
      d.x1.toString().slice(0, 4)
    } humidity levels.`)
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/70.png)

### Day 71：Animations and Transitions - part 1

几种绘制动画的方法：

* SVG <animate>，浏览器不支援，只能定义静态的动画
* CSS transition，此书用到的图表基本上都可以用CSS实现动画
* d3.transition

先以CSS为例，在之前的 histogram 基础上加入 transition：

```
.bin rect {
    fill: cornflowerblue;
    transition: height 1s ease-out,
                    y  1s ease-out;
}
``` 

此种动画较为符合用户心智，长条图的更新涉及到高度的变化。

### Day 72：Animations and Transitions - part 2

对标签进行设置，在 y 轴方向上加入动画，让整体的动画过度更为自然：

```
    const barText = binGroups.select("text")
        .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr("y", 0)
        .style("transform", d => `translateY(${
          yScale(yAccessor(d)) - 5
        }px)`)
        .text(d => yAccessor(d) || "")
```

另外，在平均数的线也可以继续动画设置：

```
    const meanLine = bounds.selectAll(".mean")
        .attr("y1", -20)
        .attr("y2", dimensions.boundedHeight)
        .style("transform", `translateX(${xScale(mean)}px)`)
```

并在 CSS 加上 transition: transform 1s ease-out 即可。

### Day 73：Animations and Transitions - part 3

开始讲解 d3.transition。在以下的需求使用 d3.transition 而不是 css：

1. 当需要将多个动画依序进行
2. 当在动画结束后要做某个动作
3. 当某个 property 的动画CSS不支持
4. 当要同时与动画增加或删除元素
5. 当要中断动画
6. 当要自定义动画

### Day 74：Animations and Transitions - part 4

使用 d3.transition，并 console 结果：

```
    const barRects = binGroups.select("rect")
      .transition()
        .attr("x", d => xScale(d.x0) + barPadding)
        .attr("y", d => yScale(yAccessor(d)))
        .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
        .attr("width", d => d3.max([
          0,
          xScale(d.x1) - xScale(d.x0) - barPadding
        ]))

    console.log(barRects)
```

比较奇怪的是，console出来的结果没有 transition，需要再去查明原因。

### Day 75：Animations and Transitions - part 5

使用 style 来对图表的颜色进行设置，这样可以避免被 CSS 给覆盖；设置颜色用来观察 d3.transition 的特性：

```
   const barRects = binGroups.select("rect")
      .transition().duration(1200).ease(d3.easeBounceOut)
        .attr("x", d => xScale(d.x0) + barPadding)
        .attr("y", d => yScale(yAccessor(d)))
        .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
        .attr("width", d => d3.max([
          0,
          xScale(d.x1) - xScale(d.x0) - barPadding
        ]))
      .transition()
        .style('fill', 'cornflowerblue')
        
```

另外，对 text 设置 transition 以及 duration， 也可以看到 d3.transition 是如何对这些元素进行动画处理。

### Day 76：Animations and Transitions - part 6

这一部份学得比较困惑，关于使用 exit 对动画进行更新后的处理，后续再找时间回来复习。

```
const oldBinGroups = binGroups.exit()oldBinGroups.selectAll("rect").style("fill", "red").transition(exitTransition).attr("y", dimensions.boundedHeight).attr("height", 0)

oldBinGroups.selectAll("text").transition(exitTransition).attr("y", dimensions.boundedHeight)

oldBinGroups.transition(exitTransition).remove()

```

### Day 77：Animations and Transitions - part 7

对折线图进行动画设置。

```
    const xAxis = bounds.select(".x-axis")
      .transition().duration(1000)
      .call(xAxisGenerator)
      
	const line = bounds.select(".line")
        .transition().duration(1000)
        .attr("d", lineGenerator(dataset))
```

### Day 78：Animations and Transitions - part 8

设置x轴的动画效果：

```
const xAxis = bounds.select(".x-axis").transition().duration(1000).call(xAxisGenerator)
```

设置折线的动画效果：

```
const line = bounds.select(".line").transition().duration(1000).attr("d", lineGenerator(dataset))
```

### Day 79：Animations and Transitions - part 9
对折线图进行动画设置的最后一个部分，但仍有未解的bug，线消失了：

```
bounds.append("rect")
      .attr("class", "freezing")
  const clip = bounds.append("g")
      .attr("clip-patn", "url(#bounds-clip-path)")
  clip.append("path")
      .attr("class", "line")
  bounds.append("path")
      .attr("class", "line")
  bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
  bounds.append("g")
      .attr("class", "y-axis")
  bounds.append("defs")
      .append("clipPath")
      .attr("id", "bounds-clip-path")
      .append("rect")
      .attr("width", dimensions.boundedWidth)
      .attr("height", dimensions.boundedHeight)
  bounds.append("rect")
      .attr("class", "freezing")
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/79.png)

### Day 80：Interactions - part 1
原生的事件监听器 addEventListener() 可以监控使用者的鼠标、键盘、滑动、触控、缩放等事件。

```
function onClick(event) {
	// do something
}
addEventListener("click", onClick)
```

### Day 81：Interactions - part 2

D3 的 .on() 方法可以生成事件监听器，以下面的代码为例：

```
async function createEvent() {
	const recColors = [...]
	const rects = d3.select(...)...
	
	rects.on("mouseenter", function(datum, index, nodes) {
	console.log({datum, index, nodes})
	}
} 
```

在 async function 里面，定义了方块颜色与方块，给方块绑定 .on() 的方法，从 console.log 的结果可以看到，.on() 可以接受3种参数：数据、索引、被选择到的节点。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/81.png)

### Day 82：Interactions - part 3

想要改变当前方块的颜色，得先创建一个selection。比较简单的方法：

```
  rects.on("mouseenter", function(datum, index, nodes){
    console.log(this)
  })
```

使用 this 可以选择到该物件。

```
  rects.on("mouseenter", function(datum, index, nodes){
    d3.select(this).style("fill", datum)
  })
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/82.png)

### Day 83：Interactions - part 4

修改代码让方块在鼠标移出后恢复原本的颜色。

```
  rects.on("mouseenter", function(datum, index, nodes){
    d3.select(this).style("fill", datum)
  })
  .on("mouseout", function(){
    d3.select(this).style("fill", "lightgrey")
  })
```

### Day 84：Interactions - part 5

销毁事件监听器，可以避免内存泄露等问题。借由使用带有 null 的 .on() 就可以销毁事件监听器：

```
  // destroy our events after 3 seconds
  setTimeout(() => {
    rects
    .dispatch("mouseout")
    .on("mousemove", null)
    .on("mouseout", null)
  }, 3000)
```

### Day 85：Interactions - part 6
以 bar chart 为例子，在图表上叠加鼠标交互。先用 css 来增加这个交互：

```
.bin rect:hover {fill: purple;}
```

针对 tooltip，需要使用JS来设置，简要代码如下：

```
binGroups.select("rect")
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  function onMouseEnter(datum) {

  }

  function onMouseLeave(datum) {

  }
```

### Day 86：Interactions - part 7

对tooltip的样式进行设置：

```
.tooltip {
    /*opacity: 0;*/
    position: absolute;
    top: -12px;
    left: 0;
    padding: 0.6em 1em;
    background: #fff;
    text-align: center;
    border: 1px solid #ddd;
    z-index: 10;
    transition: all 0.2s ease-out;
    pointer-events: none;
}
```

### Day 87：Interactions - part 8
让tooltip可以跟着鼠标的hover去更新数据，但目前的位置还是固定的。

```
  binGroups.select("rect")
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip")

  function onMouseEnter(datum) {
    tooltip.select("#count")
      .text(yAccessor(datum))
  }
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/87.png)

### Day 88：Interactions - part 9

让tooltip同时展示range与count这两个数据字段。目前展示的数据过于精确（小数点后的数值全部展示出来），此时可以用 d3.format 来解决这个问题。

```
    tooltip.select("#range")
        .text([
          formatHumidity(datum.x0),
          formatHumidity(datum.x1)
        ].join(" - "))
```

### Day 89：Interactions - part 10
改变tooltip的位置，在每次鼠标hover的时候需要出现在该柱图上。

```
    const x = xScale(datum.x0)
      + (xScale(datum.x1) - xScale(datum.x0)) / 2
      + dimensions.margin.left

    const y = yScale(yAccessor(datum))
      + dimensions.margin.top

    tooltip.style("transform", `translate(`
      + `${x}px,`
      + `${y}px`
      + `)`)
```

但在展示上仍需要继续调整。

### Day 90：Interactions - part 11
基于tooltip自己的高度与宽度来调整其位置，所以需要使用transform: translate()。原本就是使用这个方法，但还需要借助 css 的 calc 方法：

```
    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc( -100% + ${y}px)`
      + `)`)
```

可以前后对比一下两个方式的差异。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/90.png)

### Day 91：Interactions - part 12
这次要针对散点图进行tooltip弹出的设置，一样是使用 selectAll 选择需要有交互的元素，即 circle，然后加上鼠标滑动的function，再分别定义这些function：

```
  bounds.selectAll("circle")
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip")

  function onMouseEnter(datum, index) {

  }

  function onMouseLeave() {
    
  }
```

### Day 92：Interactions - part 13
要在 tooltip 上展示两个数值：x 轴的 dew point，以及 y 轴的 humidity。先设置 onMouseEnter()的内容：

```
  function onMouseEnter(datum, index) {
    const formatHumidity = d3.format(".2f")
    tooltip.select("#humidity")
      .text(formatHumidity(yAccessor(datum)))

    const formatDewPoint = d3.format(".2f")
    tooltip.select("#dew-point")
      .text(formatDewPoint(xAccessor(datum)))

  }
```

### Day 93：Interactions - part 14
再额外添加时间的展示，但目前数据是以srting来展示时间字段，对理解上不是特别友好，故需要继续特别处理。

先使用 d3.timeParse 来转换string成时间字段，再使用 d3.timeFormat 来处理展示的样式，最后嵌入tooltip里面：

```
    const dateParser = d3.timeParse("%Y-%m-%d")
    const formatDate = d3.timeFormat("%B %A %-d, %Y")
    
    console.log(dateParser(datum.date))
    // Tue Oct 02 2018 00:00:00 GMT+0800
    console.log(formatDate(dateParser(datum.date)))
    // October Tuesday 2, 2018
    
    tooltip.select("#date")
      .text(formatDate(dateParser(datum.date)))
```

然后继续再同样的function里面设置tooltip的样式：

```
    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc( -100% + ${y}px)`
      + `)`)
```

最后在 onMouseLeave 里面设置tooltip在鼠标移开后消失：

```
  function onMouseLeave() {
    tooltip.style("opacity", 0)
  }
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/93.png)

### Day 94：Interactions - part 15
目前在hover散点图时，需要在每一个点的正上方才能弹出tooltip，这在交互上不太友好。此时可以借助 Voronoi 算法来改进这个问题。借用 delaunay 方法，嵌入在绘制数据的代码模块：

```
  const drawDots = (dataset) => {

    const delaunay = d3.Delaunay.from(
      dataset,
      d => xScale(xAccessor(d)),
      d => yScale(yAccessor(d))
    )

    const voronoi = delaunay.voronoi()

    bounds.selectAll(".voronoi")
      .data(dataset)
      .enter().append("path")
      .attr("class", "voronoi")
      .attr("d", (d,i) => voronoi.renderCell(i))
      .attr("stroke", "salmon")
  }
  drawDots(dataset)
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/94.png)

### Day 95：Interactions - part 16
昨天绘制的voronoi图有点问题，因为没有设置宽高，导致绘制出来的图形不完整，分别对xman与ymax进行设置即可解决这个问题：

```
    const voronoi = delaunay.voronoi()
    voronoi.xmax = dimensions.boundedWidth
    voronoi.ymax = dimensions.boundedHeight
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/95.png)

### Day 96：Interactions - part 17

在鼠标hover散点时，要改变散点的颜色，所以使用如下的代码：

```
const dayDot = bounds.append("circle")
      .filter(d => d == datum)
      .style("fill", "maroon")
```

但会有个问题，这个效果显示的散点会被遮挡，鼠标交互是无法改变散点的排序。需要重新写别的代码来解决这个问题。

### Day 97：Interactions - part 18
要解决这个问题，可以重新绘制散点：

```

  function onMouseEnter(datum, index) {
    const dayDot = bounds.append("circle")
      .attr("class", "tooltipDot")
      .attr("cx", xScale(xAccessor(datum)))
      .attr("cy", yScale(yAccessor(datum)))
      .attr("r", 7)
      .style("fill", "maroon")
      .style("point-event", "none")
}

function onMouseLeave() {
    d3.selectAll(".tooltipDot").remove()
  }
```

使用这段代码可以解决原本遇到的问题，但我遇到不知名的bug，无法进行此交互。

### Day 98：Interactions - part 19
今天换最后一个可视化图表示例来进行交互绘制：折线图。先设置交互：

```
  const listeningRect = bounds.append("rect")
    .attr("class", "listening-rect")
    .attr("width", dimensions.boundedWidth)
    .attr("height", dimensions.boundedHeight)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave)
```

此时 listeningRect 会让图表区域变成黑色：

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/98.png)

### Day 99：Interactions - part 20

针对方块是黑色的问题，对CSS进行调整即可：

```
.listening-rect {
    fill:transparent;
}
```

接着，设置交互的相关function，跟前面的例子一样：

```
  const tooltip = d3.select("#tooltip")

  function onMouseMove(){

  }

  function onMouseLeave(){
    
  }
```

这里需要思考当鼠标hover的时候，我们如何知道具体的位置？前面的例子使用了datum、index、nodes在此显然不适用。使用 this 方法也只能返回rect元素。

### Day 100：Interactions - part 21
要显示tooltip，需要需要知道hover在哪一个日期，转换x的位置数据到日期。要将range映射到domain，可以使用 invert（）方法。

```
  function onMouseMove(){
    const mousePosition = d3.mouse(this)
    console.log(mousePosition)

    const hoverDate = xScale.invert(mousePosition[0])
  }
```

这样就可以知道是hover在哪一个日期上，接下来需要去知道最靠近的数据点是哪一个。

### Day 101：Interactions - part 22
使用 d3.scan 可以帮助找到一个变量是否匹配到筛选过的清单。

d3.scan 包含了两个参数：1.array；2. comparator function （可选）

分成下面三个步骤：1.使用 Math.abs() 来转换距离为绝对距离；2.获取最靠近hover的date的index；3.获取index的数据点

```

  function onMouseMove(){

    // use Math.abs() to convert that distance to an absolute distance
    const getDistanceFromHoveredDate = d => Math.abs(
      xAccessor(d) - hoveredDate)

    // get the index of the closest data point to our hovered date
    const closestIndex = d3.scan(dataset, (a,b) => (
      getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
    )) 

    // grab the data point at that index
    const closestDataPoint = dataset[closestIndex]

    console.table(closestDataPoint)

  }
```

### Day 102：Interactions - part 23

对tooltip进行数据与样式的设置：

```
function onMouseMove(){
    // grab the data point at that index
    const closestDataPoint = dataset[closestIndex]

    console.table(closestDataPoint)

    const closestXValue = xAccessor(closestDataPoint)
    const closestYValue = yAccessor(closestDataPoint)

    const formatDate = d3.timeFormat("%B %A %-d, %Y")
    tooltip.select("#date")
      .text(formatDate(closestXValue))

    const x = xScale(closestXValue) + dimensions.margin.left
    const y = yScale(closestYValue) + dimensions.margin.top

    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc ( -100% + ${y}px)`
      +  `)`)

    tooltip.style("opacity", 1)
}

  function onMouseLeave(){
    tooltip.style("opacity", 0)
    
  }
  
```

但目前遇到一个bug，tooltip不会跟随鼠标移动，还需要去找出具体的问题。

### Day 103：Interactions - part 24
本章节最后一个教程。目前hover在折线图上时，无法得知目前hover的位置，此教程将会在折线图上加入一个圆点，来辅助图表理解。

```
  const tooltipCircle = bounds.append("circle")
    .attr("r", 4)
    .attr("stroke", "#af9358")
    .attr("fill", "white")
    .attr("stroke-width", 2)
    .style("opacity", 0)
    
    function onMouseMove(){
       tooltipCircle
      .attr("cx", xScale(closestXValue))
      .attr("cy", yScale(closestYValue))
      .style("opacity", 1)
    }
    
    function onMouseLeave(){
    tooltipCircle.style("opacity", 0)
  }
  
```

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/103.png)

### Day 104：Making a map - part 1
绘制choropleth map，并使用 d3-geo模块。为了绘制地图，需要下载shapefile并且转换成GeoJSON，这个转换需要使用gdal。下载gdal的时间比较久，约数十分钟。下载好后，在终端使用下面的代码来进行转换：

```
ogr2ogr -f GeoJSON ./world-geojson2.json ./ne_50m_admin_0_countries.shp
```

### Day 105：Making a map - part 2
读取世界地图的json档案，并用console.log来观看数据的维度有哪一些：

```
const countryShapes = await d3.json("./../world-geojson.json")
console.log(countryShapes)
```

有四个维度：crs、features、name、type。针对features继续深入，可以看到我们感兴趣的数据，例如经纬度、国家信息。

接下来，要创建accessor function，用来获取国家ID（进而获取人口成长数据集的指标）。另外，在hover国家时也希望展示国家的名称。

```
  const countryNameAccessor = d => d.properties["NAME"]
  const countryIdAccessor = d => d.properties["ADM0_A3_IS"]
```

### Day 106：Making a map - part 3
读取国家人口数据，因为数据包含在这个可视化用不到的维度，所以定义一个metric来只使用这个我们感兴趣的维度：

```
  const dataset = await d3.csv("./../data_bank_data.csv")
  const metric = "Population growth (annual %)"
```

为了以一种比较简便的方式来关联国家id与数值，所以制造一个object来完成这个目的，并对数据进行处理：

```
  let metricDataByCountry = {}
  
    dataset.forEach(d => {
  	if(d["Series Name"] != metric) return
  		metricDataByCountry[d["Country Code"]] = +d["2017 [YR2017]"] || 0
  })
```

遍历一遍所有的数据维度，若Series Name等于metric，则对metricDataByCountry新增一个数值。

![](https://github.com/Noelfish6/learn-d3/blob/master/pics/106.png)

### Day 107：Making a map - part 4
今天的任务是制造图表的维度。

```
  let dimensions = {
  	width: window.innerWidth * 0.9,
  	margin:{
  		top:10,
  		right:10,
  		bottom:10,
  		left:10,
  	},
  }
  dimensions.boundedWidth = dimensions.width
  	- dimensions.margin.left
  	- dimensions.margin.right
```

### Day 108：Making a map - part 5
关于映射方式。要绘制平面地图，一定会需要用到映射，从3D向2D投射的方式有好几种，最常见的是墨卡托投影，此投影方式能够较好地呈现国家形状，但在维度较高的地图则会有过度放大面积的问题。

### Day 109：Making a map - part 6
完成图表维度的制作。使用 .fitWidth() 方法，可以根据GeoJSON的数值来更新projection的大小。

```
  const sphere = ({type:"Sphere"})
  const projection = d3.geoEqualEarth()
  	.fitWidth(dimensions.boundedWidth, sphere)

  const pathGenerator = d3.geoPath(projection)
  const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)

  dimensions.boundedHeight = y1
  dimensions.height = dimensions.boundedHeight
  	+ dimensions.margin.top
  	+ dimensions.margin.bottom
```
