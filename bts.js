import { prettyPrint } from "./prettyprint.js";
import { mergeSort, sortedUniqueArr } from "./mergesort.js";
import { insertNode } from "./insertbts.js";
class Node {
    constructor(d){
        this.data = d,
        this.left = null,
        this.right = null
    }
};

function sortedArraytoBts(array,start,end){
    if(start > end){
        return null;
    }
    const mid = parseInt((start + end)/2)
    const node = new Node(array[mid])
    node.left = sortedArraytoBts(array,start,mid-1)
    node.right = sortedArraytoBts(array,mid+1,end)
    
    return node;
};
function findNOde(root, node){
    if (root === null || root.data === node) {
        return root;
    }
    if(node < root.data){
        return findNOde(root.left, node)
    }else if (node > root.data){
        return findNOde(root.right, node);
    }
    return node;
}
function inorder(root, cb){
    if(cb == null){
        throw new Error ("callback required")
    }
    if(root == null) return
    postOrder(root.left, cb);
    cb(root.data);
    postOrder(root.right, cb);
} 
function levelOder(root,cb){
    if(cb == null){
        throw new Error ("callback required")
    }
    if(root === null){
        return
    }

    const queue = [];
    queue.push(root)

    while(queue.length > 0){
        const visit = queue.shift();
        cb(visit.data)
    
        if(visit.left !== null ){
            queue.push(visit.left);
        }
        if(visit.right !== null){
            queue.push(visit.right);
        }
        
    }

}
function postOrder(root, cb){
    if(cb == null){
        throw new Error ("callback required")
    }
    if(root == null) return
    postOrder(root.left, cb);
    postOrder(root.right, cb);
    cb(root.data);
} 
function preOrder(root, cb){
    if(cb == null){
        throw new Error ("callback required")
    }
    if(root == null) return
    
    cb(root.data)
    preOrder(root.left, cb)
    preOrder(root.right, cb)

}
function btsHeight(root){
    if(root == null){
        return -1
    }
    let leftHeight = btsHeight(root.left);
    let rightHeigt = btsHeight(root.right);

    if(leftHeight > rightHeigt){
        return leftHeight +1;
    }else{
        return rightHeigt +1;
    }
}
function depth(root, node){
    if(root == null){
        return null;
    }

    let queue = [];
    let depth = 0;

    queue.push(root);

    while(queue.length > 0){
        let levelSize = queue.length; 

        for(let i = 0; i < levelSize; i++){
            const visit = queue.shift();

            if(visit.data == node){
                return depth;
            }

            if(visit.left !== null){
                queue.push(visit.left);
            }
            if(visit.right !== null){
                queue.push(visit.right);
            }
        }

        depth++; 
    }

    return -1; 
}

function isbalanced(root){
    const leftHeight = btsHeight(root.left)
    const rightHeigt = btsHeight(root.right)
    const diff = Math.abs(leftHeight - rightHeigt)
    console.log(diff)

    if(diff < 1){
        return "bts is balanced"
    }else{
        return "bts is not balanced"
    }
}

function rebalance(root){
    if(isbalanced(root) === "bts is balanced"){
        return root;
    }
    let nodeArray = [];
    levelOder(root, (node) => nodeArray.push(node))
    const sortedArray = mergeSort(nodeArray);
    const newBts = sortedArraytoBts(sortedArray,0,sortedArray.length-1)
    return newBts;
};
let root =  new Node(30);
root = insertNode(root, 50);
root = insertNode(root, 30);
root = insertNode(root, 20);
root = insertNode(root, 40);
root = insertNode(root, 70);
root = insertNode(root, 60);
root = insertNode(root, 80);
prettyPrint(root)
// let root = null;
// const n = sortedUniqueArr.length;
// root = sortedArraytoBts(sortedUniqueArr,0,n-1);
// prettyPrint(root); 
// // findNOde(root, 8);
// const node4 = findNOde(root, 5)
// // prettyPrint(node4);
// // postOrder(root, (node) => console.log(node));
// // console.log(btsHeight(root));
// console.log(depth(root,324));
console.log(isbalanced(root));
const balancedBts = rebalance(root);
prettyPrint(balancedBts);

export {
    Node,
    sortedArraytoBts,
    isbalanced,
    rebalance,
    levelOder,
    postOrder,
    preOrder
}



