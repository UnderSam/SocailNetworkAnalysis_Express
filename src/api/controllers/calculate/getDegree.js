module.exports = function getDegree(req,res){
    let data = req.body.input;
    let fromCol = req.body.from;
    let toCol = req.body.to;
    let MaxDistance = 1000;
    const name_set = new Set();
    data.forEach(element => {
        name_set.add(element[fromCol])
        name_set.add(element[toCol])
    });
    const datalen = name_set.size;
    var direct_graph = new Array(datalen); // direct_graph
    // Loop to create 2D array using 1D array 
    for (var i = 0; i < datalen; i++) { 
        direct_graph[i] = new Array(datalen); 
    }
    // initialize
    for (var i = 0; i < datalen; i++) { 
        for (var j = 0; j < datalen; j++) { 
            direct_graph[i][j] = MaxDistance;
            if (i==j){
                direct_graph[i][j] = 0;
            } 
        } 
    } 
    data.forEach(edge=>{
        direct_graph[edge[fromCol]][edge[toCol]]=1;
    })
    // algo start
    const result = degree(direct_graph,MaxDistance);
    
    res.status(200).json({data:result});
}

function degree(direct_graph,MaxDistance){
    var result = {};
    for(var i=0; i <direct_graph.length;i++){result[i]={};}
    for(var i=0; i <direct_graph.length;i++){
        var outter = 0;
        for(var j=0;j <direct_graph[i].length;j++){
            if(direct_graph[i][j]!==MaxDistance){
                outter = outter + direct_graph[i][j];;
            }
        }
        result[i]['outter'] = Number((outter/(direct_graph.length-1)).toFixed(2)) ;
    }
    for(var i=0; i <direct_graph.length;i++){
        var inner = 0;
        direct_graph.forEach(element=>{
            if (element[i]!==MaxDistance){
                inner = inner+element[i];
            }
        });
        result[i]['inner'] = Number((inner/(direct_graph.length-1)).toFixed(2)) ;
    }
    return result;
}