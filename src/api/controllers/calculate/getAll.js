var nj = require('networkjs');
const Graph = nj.datastructures.Graph;
const { betweenness_centrality,
    eigenvector_centrality } = nj.algorithms.centrality

module.exports = function getAll(req,res){
    let data = req.body.input;
    let fromCol = req.body.from;
    let toCol = req.body.to;
    let MaxDistance = 1000;
    let G = new Graph();
    const name_set = new Set();
    data.forEach(element => {
        name_set.add(element[fromCol])
        name_set.add(element[toCol])
    });
    const datalen = name_set.size;
    var direct_graph = new Array(datalen); // direct_graph
    var fully_connect_graph = new Array(datalen);
    // Loop to create 2D array using 1D array 
    for (var i = 0; i < datalen; i++) { 
        direct_graph[i] = new Array(datalen); 
        fully_connect_graph[i] = new Array(datalen);
    }
    // initialize
    for (var i = 0; i < datalen; i++) { 
        for (var j = 0; j < datalen; j++) { 
            direct_graph[i][j] = MaxDistance;
            fully_connect_graph[i][j] = MaxDistance;
            if (i==j){
                direct_graph[i][j] = 0;
                fully_connect_graph[i][j] = MaxDistance;
            } 
        } 
    } 
    data.forEach(edge=>{
        direct_graph[edge[fromCol]][edge[toCol]]=1;
        fully_connect_graph[edge[fromCol]][edge[toCol]]=1;
        fully_connect_graph[edge[toCol]][edge[fromCol]]=1;
        G.add_edge(edge[fromCol],edge[toCol]);
    })
    let result = {};
    for(var i=0;i<datalen;i++){result[i]={}};
    result = degree(direct_graph,MaxDistance,result);
    result = checkCloseness(floyd_warshall(fully_connect_graph,datalen,MaxDistance),result);
    result = betweenness(G,result,datalen);
    result = eigenvector(G,result,datalen);
    res.status(200).json({data:result});

}
function degree(direct_graph,MaxDistance,prevResult){
    for(var i=0; i <direct_graph.length;i++){
        var outter = 0;
        for(var j=0;j <direct_graph[i].length;j++){
            if(direct_graph[i][j]!==MaxDistance){
                outter = outter + direct_graph[i][j];;
            }
        }
        prevResult[i]['outter'] = Number((outter/(direct_graph.length-1)).toFixed(2)) ;
    }
    for(var i=0; i <direct_graph.length;i++){
        var inner = 0;
        direct_graph.forEach(element=>{
            if (element[i]!==MaxDistance){
                inner = inner+element[i];
            }
        });
        prevResult[i]['inner'] = Number((inner/(direct_graph.length-1)).toFixed(2)) ;
    }
    return prevResult;
}

function floyd_warshall(graph,vertex_num,MaxDistance){
    /*
    Calculate for all-pairs shortest path
    */
    var Distance = new Array(vertex_num); 
    var Predecessor = new Array(vertex_num); 
    // initialize distance and predecessor 
    for (var i = 0; i < vertex_num; i++) { 
        Distance[i] = new Array(vertex_num);
        Predecessor[i] = new Array(vertex_num); 
    }

    for (var i = 0; i < vertex_num; i++) {
        Distance[i] = resize(Distance[i]);
        Predecessor[i] = resize(Predecessor[i], -1);
        for (var j = 0; j < vertex_num; j++) {
            Distance[i][j] = graph[i][j];
            if (Distance[i][j] != 0 && Distance[i][j] != MaxDistance) {
                Predecessor[i][j] = i;
            }
        }
    }
    // start Floyd_warshall_algo
    for (var k = 0; k < vertex_num; k++) {
        for (var i = 0; i < vertex_num; i++) {
            for (var j = 0; j < vertex_num; j++) {
                if ((Distance[i][j] > Distance[i][k]+Distance[k][j]) 
                     && (Distance[i][k] != MaxDistance)) {
                    Distance[i][j] = Distance[i][k]+Distance[k][j];
                    Predecessor[i][j] = Predecessor[k][j];
                }
            }
        }
    }
    return Distance;
}
//OK
function resize(arr,defaultValue = 0){
    /*
    Custom function for resize array
    */
    for(var i=0;i<arr.length;i++){
        arr[i] = defaultValue;
    }
    return arr;
}
function checkCloseness(all_pairs_distance,prevResult){
    /*
    Calculate for checkness
    Map must be all-pairs shortest graph
    */
    for(var i=0;i<all_pairs_distance.length;i++){
        let sum_of_link = 0;
        for(var j=0;j<all_pairs_distance.length;j++){
            sum_of_link+=all_pairs_distance[i][j];
        }
        prevResult[i]['checkCloseness'] = Number((1/sum_of_link).toFixed(3)) ;
    }
    return prevResult;
}
function betweenness(graph,prevResult,datalen){
    const result = betweenness_centrality(graph);
    for(var i=0;i<datalen;i++){
        prevResult[i]['betweenness'] = result[i];
    }
    return prevResult
}
function eigenvector(graph,prevResult,datalen){
    const result = eigenvector_centrality(graph);
    for(var i=0;i<datalen;i++){
        prevResult[i]['eigenvector'] = result[i];
    }
    return prevResult
}