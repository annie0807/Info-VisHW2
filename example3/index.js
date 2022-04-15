let data = [1535, 3081, 2494, 9078, 9843, 6856, 234, 529, 6729, 2321]
let data2 = [1535, 3081, 2494, 9078, 9843]
let svg = d3.select('#canvas').append('svg')
    .style('height', '220') //將高度設為200

let rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
        return i * 10 + 10
    })
    //間隔i*10的10，+10的10為右移多少x座標
    .attr("y", 10)
    .attr('height', 20)
    .attr('width', 5)
    .style("fill", "red")
//創造了data個數個長方形，
//x的座標為(10, 20, 30, 40, 50, 60, 70, 80, 90, 100) 
//y的座標為(10)
//這些長方形的高度= 20, 寬度 = 5

let xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 200])

//設定x座標的範圍domain定在data的數量範圍之內
//range則在0-200之內
let yScale = d3.scaleLinear()
    .domain([0, 10000])
    .range([100, 0])
//設定y座標的範圍domain定在0-10000(data的最大最小值內)
//range則設定在100, 0(則data最大最小值會壓縮在100-0之間)
rects.attr("x", (d, i) => xScale(i) + 50)
    .attr("y", (d, i) => yScale(d) + 100)
    //+多少是指距離原點的座標軸是多少
    //y軸的range+他距離圓點的座標位置不能超過畫布的高度
    .attr('height', (d, i) => 100 - yScale(d))
    .attr('width', 15)

let xAxis = d3.axisBottom(xScale)
let yAxis = d3.axisLeft(yScale)
//設定X軸、y軸要在xScale、yScale的範圍內

svg.append('g').attr('class', 'axis')
        .attr('transform', 'translate(50, 100)')
        .call(yAxis)

svg.append('g').attr('class', 'axis')
    .attr('transform', 'translate(50, 200)')
    .call(xAxis)
//把x軸y軸畫上去

rects.data(data2)
    .exit()
    .remove()
//remove data   

let newRects = svg.selectAll("rect").data(data)
        .enter()
        .append('rect')
        .attr("x", (d, i) => xScale(i) + 50)
        .attr("y", (d, i) => yScale(d) + 100)
        .attr('height', (d, i) => 100 - yScale(d))
        .attr('width', 15)
        .style("fill", "blue")
        

newRects.merge(rects)
.style('fill', 'green')
.on('mousedown', function(){
    d3.select(this).style('fill', 'yellow')
})
.on('mouseup', function(){
    d3.select(this).style('fill', 'green')
})

//滑鼠互動的範例
let svg1 = d3.select('#canvas2').append('svg')
            .style('width', '500')
            .style('height', '130')
//1.點下去方塊變色，再按一下變回原色
svg1.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr('width', 100).attr('height', 100)
        .style("fill", "blue")
        .on('click', function(){
            if(d3.select(this).style('fill') == 'red'){
                d3.select(this).style('fill', 'blue')
            }else{
                d3.select(this).style('fill', 'red')
            }
        })
//2.點下去方塊變色，放開變回原色
svg1.append("rect")
        .attr("x", 120)
        .attr("y", 10)
        .attr('width', 100).attr('height', 100)
        .style("fill", "yellow")
        .on('mousedown', function(){
            d3.select(this).style('fill', 'green')
        })
        .on('mouseup', function(){
            d3.select(this).style('fill', 'yellow')
        })


        let svg2 = d3.select('#canvas3').append('svg')
        .style('width', '500')
        .style('height', '130')
//3.滑鼠碰到圖案變色
svg2.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr('width', 100).attr('height', 100)
    .style("fill", "yellow")
    .on('mouseover', function(){
        d3.select(this).style('fill', 'green')
    })
    .on('mouseout', function(){
        d3.select(this).style('fill', 'yellow')
    })


//過場動畫
let svg3 = d3.select('#canvas4').append('svg')
.style('width', '500')
.style('height', '360')
//1. 滑鼠放到該物體，就會變成我們設定的長度
svg3.append("rect")
.attr("x", 10)
.attr("y", 10)
.attr('width', 100).attr('height', 100)
.style("fill", "green")
.on('mouseover', function(){
    d3.select(this).transition().attr('width', 300)
})
.on('mouseout', function(){
    d3.select(this).transition().attr('width', 100)
})

//2. 滑鼠放上去，就會變成我們設定的長度，但會延遲+變色
svg3.append("rect")
.attr("x", 10)
.attr("y", 120)
.attr('width', 100).attr('height', 100)
.style("fill", "blue")
.on('mouseover', function(){
    d3.select(this).transition()
        .duration(2000)
        .attr('width', 400)
        .style('fill', 'red')
})
.on('mouseout', function(){
    d3.select(this).transition()
        .duration(2000)
        .attr('width', 100)
        .style('fill', 'blue')
})
//3. 點一下會變色&變成設定的長度
svg3.append("rect")
.attr("x", 10)
.attr("y", 230)
.attr('width', 100).attr('height', 100)
.style("fill", "blue")
.on('mouseover', function(){
    d3.select(this).transition()
        .delay(1000)
        .duration(100)
        .attr('width', 200)
        .style('fill', 'red')
})
.on('mouseout', function(){
    d3.select(this).transition()
        .duration(100)
        .attr('width', 100)
        .style('fill', 'blue')
})

//互動圖表範例
let svg4 = d3.select('#canvas5').append('svg')
    .style('height', '220') //將高度設為200

let xScale2 = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 200])
let yScale2 = d3.scaleLinear()
    .domain([0, 10000])
    .range([100, 0])    

let rects2 = svg4.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale2(i) + 50)
    .attr("y", (d, i) => yScale2(d) + 100)
    .attr('height', (d, i) => 100 - yScale2(d))
    .attr('width', 15)
    .style("fill", "red")

let xAxis2 = d3.axisBottom(xScale2)
let yAxis2 = d3.axisLeft(yScale2)

let yAxisSvg = svg4.append('g').attr('class', 'axis')
    .attr('transform', 'translate(50, 100)')
    .call(yAxis2)

svg4.append('g').attr('class', 'axis')
    .attr('transform', 'translate(50, 200)')
    .call(xAxis2)

let data3 = new Array(10).fill(0).map(() => ~~(Math.random() * 20000))
d3.select('#console').html(data3.toString())

let yScaleNew = d3.scaleLinear()
    .domain([0, 20000])
    .range([100, 0])

let yAxisNew = d3.axisLeft(yScaleNew)

d3.select('#changeData').on('click', function(){
    data3 = new Array(10).fill(0).map(() => ~~(Math.random() * 20000))
    
    yScaleNew = d3.scaleLinear()
        .domain([0, d3.max(data3)])
        .range([100, 0])
        .nice()
    
    let yAxisNew = d3.axisLeft(yScaleNew)
    
    rects2.data(data3).transition()
        .attr('id', 'bar')
        .attr("x", (d, i) => xScale2(i) + 50)
        .attr("y", (d, i) => yScaleNew(d) + 100)
        .attr('height', (d, i) => 100 - yScaleNew(d))
        .attr('width', 15)
        .style("fill", "blue")
    
    rects2.on('mouseover', function(d, i){
            d3.selectAll('#bar').filter(function(d, j){
                    return !(i == j)
                })
                .transition()
                .style('fill', 'black')
            d3.select(this).transition().style('fill', 'yellow')
        })
        .on('mouseout', function(){
            d3.selectAll('#bar').transition().style('fill', 'blue')
        })

    yAxisSvg.transition().call(yAxisNew)
})
