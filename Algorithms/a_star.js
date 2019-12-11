export function AstarMain(grid, startNode, finishNode)
{
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length)
    {

    }
}

//f(n) = g(n) + h(n)
// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function Astar(startNode, finishNode, h)
{
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
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