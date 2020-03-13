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

![]()

![]()


### Day 6：设置数据到颜色的映射（domain&range）

今天是项目1的最后一次打卡，解决了从数据到颜色的映射，并将数据绘制出来。今天主要有两个变量：**avgData**、**linearScaleForData**。

**avgData** 用来处理 data，data 的格式为 year 与 avg，但只需要保留 avg 即可，故使用 map function 来解决这个问题。

**linearScaleForData** 用来处理数据到颜色范围的映射，使用的scale是scaleLinear，并用d3.min与d3.max来找出数据的极大极小值，然后再用range去映射到colors。

![]()

在最后 stripes 的样式设置，style的填充方式是先使用 Math.round 将 **linearScaleForData(d.avg)** 从 floating numbers 变成 integer，然后再放入colors[]里，就完成了数据到可视化的映射过程。

![]()

成果：

![]()


困惑：

1. avgData与d.avg有何不同？avgData是array，d.avg是啥？
2. the data which is going to be put in the scale must be integer, why?
3. colors[data] will generate the data visualization, colors(data) won't, why?


