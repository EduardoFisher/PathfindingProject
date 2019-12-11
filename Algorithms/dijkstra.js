export function dijkstra(grid, startNode, finishNode)
{
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitednNodes = getAllNodes(grid);
    while(!!unvisitednNodes.length)
    {
        sortNodesByDistance(unvisitednNodes);
        const closestNode = unvisitednNodes.shift();
        //Don't do anything if we hit a wall.
        if(closestNode.isWall) continue;
        //End condition if the node's distance is Infinity and we are stuck.
        //we stop and return.
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        //Mark the node as visited and push in the visitedNodesInOrder array.
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        //End condition if the cloestest node is the finished node then we stop.
        //Because we are done with the search.
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }

}

function sortNodesByDistance(unvisitednNodes)
{
    unvisitednNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid)
{
    const nodes = [];
    for(const row of grid)
    {
        for(const node of row)
        {
            nodes.push(node);
        }
    }
    return nodes;
}

function updateUnvisitedNeighbors(node, grid)
{
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) 
{
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  // Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) 
{
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }