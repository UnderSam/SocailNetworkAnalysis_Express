module.exports = function getCheckness(req,res){
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
        direct_graph[edge[toCol]][edge[fromCol]]=1;
    })
    const result = checkCloseness(floyd_warshall(direct_graph,datalen,MaxDistance));
    res.status(200).json({data:result});
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
function checkCloseness(all_pairs_distance){
    /*
    Calculate for checkness
    Map must be all-pairs shortest graph
    */
    var result = {};
    for(var i=0;i<all_pairs_distance.length;i++){
        let sum_of_link = 0;
        for(var j=0;j<all_pairs_distance.length;j++){
            sum_of_link+=all_pairs_distance[i][j];
        }
        result[i] = Number((1/sum_of_link).toFixed(3)) ;
    }
    return result;
}