class Node {
    constructor(x, y) {
        //x and y coordinate of the chess board
        this.x = x;
        this.y = y;
    }

    getValidMoves() {
        let validMoves = [];
        
        const moves = [[2, 1], [2, -1], [1, 2], [1, -2], 
        [-2, 1], [-2, -1], [-1, 2], [-1, -2]];
        
        for (let [dx, dy] of moves) {
            let newX = this.x + dx;
            let newY = this.y + dy;
            
            //find valid knight moves from current position that remain within the board boundary
            if (newX >= 1 && newX < 9 && newY >= 1 && newY < 9) {
                validMoves.push([newX, newY]);
            }
        }

        return validMoves;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    findShortestPath(start, end) {
        let queue = [start];
        //keep track of visited nodes
        let visited = new Set();
        visited.add(`${start.x},${start.y}`);
        //keep track of each node's predecessor to reconstruct path later
        let parentMap = new Map();

        //BFS loop
        while (queue.length > 0) {
            let current = queue.shift();
            //Found the end coordinates
            if (current.x === end.x && current.y === end.y) {
                return this.constructPath(parentMap, start, end);
            }

            //Visit unvisited nodes
            for (let [newX, newY] of current.getValidMoves()) {
                let move = new Node(newX, newY);
                let moveKey = `${move.x},${move.y}`;
                if (!visited.has(moveKey)) {
                    visited.add(moveKey);
                    queue.push(move);
                    parentMap.set(moveKey, current);
                }
            }
        }

        return null; // No path found
    }

    //Construct path from the end node backwards
    constructPath(parentMap, start, end) {
        let path = [];
        let currentKey = `${end.x},${end.y}`;
        let startKey = `${start.x},${start.y}`;

        while (currentKey !== startKey) {
            let [currentX, currentY] = currentKey.split(',').map(Number);
            path.push(new Node(currentX, currentY));
            currentKey = `${parentMap.get(currentKey).x},${parentMap.get(currentKey).y}`;
        }

        path.push(start);
        path.reverse();
        return path;
    }
}

let graph = new Graph();
let start = new Node(1, 1);
let end = new Node(7, 7);
graph.addNode(start);

let path = graph.findShortestPath(start, end);
console.log(path.map(node => `[${node.x},${node.y}]`)); 
