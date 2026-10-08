const fs=require("fs")
const { json } = require("stream/consumers")
const command=process.argv[2]
const content=process.argv[3]
const status=process.argv[3]
const task_id=process.argv[3]
const newdescription=process.argv[4]


const read=fs.readFileSync("task.json","utf8");
const data=JSON.parse(read);
if(command==="add"){
    if(!description){
        console.log("Task description is required!");
        return;
    }
    const id=data.length+1;
    const now=new Date()
    const tasks={
        id:id,
        content:content,
        description:newdescription,
        status:"todo",
        createdAt:now,
        updatedAt:now
    };
    data.push(tasks);
    const jsontext=JSON.stringify(data);
    fs.writeFileSync("task.json",jsontext);
    console.log("task added successfully");
};
if(command==="list"){
    for(const datas of data){

        if(!status){
            console.log(datas);
        }
        if(datas.status===status){
            console.log(datas);
        }
    }
}
if(command==="find"){
    const task1=data.find(function(task){
        return task.id===Number(task_id);
    })
    console.log(task1)
}
if(command==="delete"){
    const index=data.findIndex(function(task){
        return task.id===Number(task_id)
    })
if(index===-1){
     console.log("Task not found");
     return
    }
    data.splice(index,2);
    const jsontext = JSON.stringify(data);
    fs.writeFileSync("task.json", jsontext);
    console.log("tasked delete succeesfully");
};

if(command==="update"){
    const find=data.find(function(task){
        return task.id===Number(task_id)
    })
    find.description=newdescription;
    find.updatedAt=new data();
    const jsontext = JSON.stringify(data);
    fs.writeFileSync("task.json", jsontext);
}

if (command === "In-progress") {

    const task = data.find(function(task) {
        return task.id === Number(task_id);
    });

    if (!task) {
        console.log("Task not found");
        return;
    }

    task.status = "In-progress";
    task.updatedAt = new Date();

    const jsontext = JSON.stringify(data);
    fs.writeFileSync("task.json", jsontext);

    console.log("Task marked as done");
}

if (command === "mark-done") {

    const task = data.find(function(task) {
        return task.id === Number(task_id);
    });

    if (!task) {
        console.log("Task not found");
        return;
    }

    task.status = "done";
    task.updatedAt = new Date();

    const jsontext = JSON.stringify(data);
    fs.writeFileSync("task.json", jsontext);

    console.log("Task marked as done");
}



