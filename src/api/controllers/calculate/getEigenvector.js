var nj = require('networkjs');
const Graph = nj.datastructures.Graph;
const { eigenvector_centrality } = nj.algorithms.centrality

module.exports = function getEigenvector(req,res){
    let data = req.body.input;
    let fromCol = req.body.from;
    let toCol = req.body.to;
    let G = new Graph();
    data.forEach(element=>G.add_edge(element[fromCol],element[toCol]));
    const result = eigenvector_centrality(G);
    res.status(200).json({data:result});
}