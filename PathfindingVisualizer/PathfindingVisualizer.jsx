import React, { Component } from "react";
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra';
import './PathfindingVisualizer.css';
import { element } from "prop-types";
import { recurvisDivision } from "../Algorithms/recursiveDivision";
import { resolve } from "dns";
import { withStatement, returnStatement } from "@babel/types";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PathfindingVisualizer extends Component
{
    constructor() 
    {
        super();
        this.state = {
          grid: [],
          mouseIsPressed: false,
        };
      }

      componentDidMount() 
      {
        const grid = getInitialGrid();
        this.setState({grid});
      }
    
      handleMouseDown(row, col) 
      {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
      }
    
      handleMouseEnter(row, col) 
      {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }
    
      handleMouseUp() 
      {
        this.setState({mouseIsPressed: false});
      }

      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) 
      {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) 
        {
          if (i === visitedNodesInOrder.length) 
          {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      animateShortestPath(nodesInShortestPathOrder) 
      {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }

      visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }

      resetBoard()
      {
          
        for(let row = 0; row < 20; row++)
        {   
        
            for(let col = 0; col < 50; col++)
            {
                
            }
            
        }
        
      }

      async createMaze()
      { 
        for(let i = 0; i < 20; i++)
         {
              this.addWall(i, 0);
              this.addWall(i, 49);
              await sleep(0.25);
         }
         for(let i = 1; i < 49; i++)
         {
            this.addWall(0, i);
            this.addWall(19, i);
            await sleep(0.25);
         }  
        this.RecursiveDivision(50, 20);

      }

      async RecursiveDivision(row, col)
      {
          if(row < 2 || col < 2)
            return;
            console.log(row, ":", col);
          const ishorizontal = chooseOrientation(row, col);
          console.log(ishorizontal);
          if(ishorizontal === 0)
          {
                console.log("horizontal");
                const wx = Math.floor(Math.random() * (col-2));
                const px = Math.floor(Math.random() * (row-2));
                console.log(wx);
                for(let i = 1; i < row-1; i++)
                {
                    if( i !== px )
                    {
                        this.addWall(wx, i);
                        await sleep(0.25);
                    }
                }
                this.RecursiveDivision(row, Math.floor(col/2));
                //this.RecursiveDivision(row, col);
          }
          else
          {
                console.log("vertical");
                const wy = Math.floor(Math.random() * (row-2));
                const py = Math.floor(Math.random() * (col-2));
                console.log(wy);
                for(let i = 1; i < col-1; i++)
                {
                    if( i !== py )
                    {
                        this.addWall(i, wy);
                        await sleep(0.25);
                    }
                }
                this.RecursiveDivision(Math.floor(row/2), col);
                //this.RecursiveDivision(row, col);
          }
          

      }

      
      addWall(row, col)
      {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid});
      }
      render() 
      {
        const {grid, mouseIsPressed} = this.state;
    
        return (
          <>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <button onClick={() => this.resetBoard()}>
                Reset Board
            </button>
            <button onClick={() => this.createMaze()}>
                Create Maze
            </button>
            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          row={row}></Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        );
      }
}

const getInitialGrid = () => 
{
    const grid = [];
    for(let row = 0; row < 20; row++)
    {
        const currentRow = [];
        for(let col = 0; col < 50; col++)
        {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};  

const createNode = (col, row) => 
{
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      h: 0,
      j: 0,
      g: 0,
    };
  };

const getNewGridWithWallToggled = (grid, row, col) => 
{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const sleep = (milliseconds) =>
{
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const chooseOrientation = (width, height) =>
{
    console.log("width:", width, "height;", height);
    if(width < height)
        return 0;
    else if(height < width)
        return 1;
    else 
        return Math.floor(Math.random() * 2);
}

const checkIfStart = (x, y) =>
{
    return (x === START_NODE_ROW && y === START_NODE_COL);
}

const checkIfFinish = (x, y) =>
{
    return (x === FINISH_NODE_ROW && y === FINISH_NODE_COL);
}
