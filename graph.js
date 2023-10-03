class Node {
  constructor(value, adj = new Set()) {
    this.value = value;
    this.adj = adj;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }
  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adj.add(v2);
    v2.adj.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adj.delete(v2);
    v2.adj.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adj.has(vertex)) {
        node.adj.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let seen = new Set();
    let res = [];

    function traverse(vertex) {
      if (!vertex) return null;

      seen.add(vertex);
      res.push(vertex.value);

      vertex.adj.forEach(neighbor => {
        if(!seen.has(neighbor)){
          return traverse(neighbor);
        }
      })
    }
    traverse(start);
    return res;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let res = [];
    let seen = new Set()
    let currVertex;

    seen.add(start);

    while(queue.length){
      currVertex = queue.shift();
      res.push(currVertex.value)

      currVertex.adj.forEach(neighbor => {
        if(!seen.has(neighbor)){
          seen.add(neighbor)
          queue.push(neighbor)
        }
      })
    }

    return res;
  }
}

module.exports = { Graph, Node };
