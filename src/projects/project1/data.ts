// Nodde finition type
export type Node ={
    name:string,
    isFolder:boolean,
    children?:Node[]
}


export const FolderStructure = {
    name:'root',
    isFolder:true,
    children:[
        {
            name:'src',
            isFolder:true,
            children:[
                {
                    name:'components',
                    isFolder:true,
                    children:[
                        {name:'Navbar.js',isFolder:false},
                        {name:'Footer.js',isFolder:false}
                    ]
                },
                {
                    name:'pages',
                    isFolder:true,
                    children:[
                        {name:'Home.js',isFolder:false}
                    ]
                },
                {
                    name:'App.js',
                    isFolder:false
                }
            ]
        },
        {
            name:'public',
            isFolder:true,
            children:[
                {name:'index.html',isFolder:false}
            ]
        }
    ]

}