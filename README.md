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

