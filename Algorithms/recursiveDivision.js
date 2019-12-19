//Begin with an empty field.
//Bisect the field with a wall, either horizontally or vertically. Add a single passage through the wall.
//Repeat step #2 with the areas on either side of the wall.
//Continue, recursively, until the maze reaches the desired resolution.

export function recurvisDivision(grid)
{

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
