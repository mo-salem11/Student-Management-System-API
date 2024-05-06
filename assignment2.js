const http=require('http');
const fs=require('fs');
const { send } = require('process');

let students=JSON.parse(fs.readFileSync('./students.json'));
let courses=JSON.parse(fs.readFileSync('./courses.json'));
let deparments=JSON.parse(fs.readFileSync('./department.json'));

const server=http.createServer((req,res)=>{
    const {url,method}=req;
    res.setHeader('content-type','application/json');
    const sendResponse=(code,msg)=>{
        res.statusCode=code;
      return  res.end(JSON.stringify(msg));
    }
    //1-get all students
    if(url=='/students'&&method=='GET'){
      sendResponse(200,students);
  }
//2- add student
  else if(url=='/students'&&method=='POST'){
    
    req.on('data',(chunk)=>{
        let student=JSON.parse(chunk);
        student.id=students.length+1;
        if(students.some(stud=>stud.email==student.email))
          return sendResponse(404,{message:'Email is exists'});
        students.push(student);
        fs.writeFileSync('students.json',JSON.stringify(students));
        sendResponse(200,{message:'success'})
    })
  
  }
  //3- get all students related to deparment id
  else if(url.startsWith('/students/')&&method=='GET'){
    let urlId=Number(url.split('/')[2]);
     let studentsDed=students.filter((student)=>student.departmentId==urlId);
     if(studentsDed.length<=0){
    return sendResponse(404,{message:'Not Found'});
    }
    let Courses=courses.filter((course)=>course.departmentId==urlId);
    let extractedCourses=Courses.map((prop)=>{
        return {
            id:prop.id,
            name:prop.name
        }
    });
    studentsDed.forEach(student => {
      student.department=deparments[student.departmentId-1]; 
      student.courses=extractedCourses;
      });
      
    sendResponse(200,studentsDed);
  
  }
  //4- update student
  else if(url.startsWith('/students/')&&method=='PUT'){
    let urlId=Number(url.split('/')[2]);
    let index=students.findIndex((student)=>student.id==urlId);
    if(index==-1){
       sendResponse(404,{message:'Not Found'});
    }
    req.on('data',(chunk)=>{
          let student=JSON.parse(chunk);
         students[index].name=student.name;
         students[index].email=student.email;
         students[index].password=student.password;
         students[index].departmentId=student.departmentId;
         fs.writeFileSync('students.json',JSON.stringify(students));
          sendResponse(201,{message:"updated",urlId,index});
    })
  }
  //5- Delete Student
  else if(url.startsWith('/students/')&&method=='DELETE'){
    let urlId=Number(url.split('/')[2]);
    let index=students.findIndex((student)=>student.id==urlId);
    if(index==-1){
        sendResponse(404,{message:"index not found"})
    }
        students.splice(index,1);
        fs.writeFileSync('students.json',JSON.stringify(students));
       sendResponse(200,{message:"deleted"});
    
  }
  //6- Search for a student by ID
  else if(url.startsWith('/student/')&&method=='GET'){
    let urlId=Number(url.split('/')[2]);
    let index=students.findIndex((student)=>student.id==urlId);
    if(index==-1){
      sendResponse(404,{message:"index not found"})
   }
   sendResponse(200,students[index]);
  }
  //Courses APIS//
  //1 Get all courses
  else if(url=='/courses'&&method=='GET'){
    sendResponse(200,courses);
  }
  //2 add course
  else if(url=='/courses'&&method=='POST'){
     req.on('data',(chunk)=>{
      let course=JSON.parse(chunk);
      course.id=courses.length+1;
      courses.push(course);
        fs.writeFileSync('courses.json',JSON.stringify(courses));
        sendResponse(200,{message:'success'})
     })
  }
  //3 Update course
  else if(url.startsWith('/courses/')&&method=='PUT'){
    let urlId=Number(url.split('/')[2]);
    let index=courses.findIndex((course)=>course.id==urlId);
    if(index==-1){
      sendResponse(404,{message:"index not found"})
    }
    req.on('data',(chunk)=>{
      let course=JSON.parse(chunk);
      courses[index].name=course.name;
      courses[index].content=course.content;
      courses[index].departmentId=course.departmentId;
      fs.writeFileSync('courses.json',JSON.stringify(courses));
      sendResponse(201,{message:"updated",urlId,index});
    })
  }
  //4 delete course
  else if(url.startsWith('/courses/')&&method=='DELETE'){
    let urlId=Number(url.split('/')[2]);
    let index=courses.findIndex((course)=>course.id==urlId);
    if(index==-1){
        sendResponse(404,{message:"index not found"})
    }
        courses.splice(index,1);
        fs.writeFileSync('courses.json',JSON.stringify(courses));
       sendResponse(200,{message:"deleted"});
    
  }
   //5- Search for a couse by ID
   else if(url.startsWith('/course/')&&method=='GET'){
    let urlId=Number(url.split('/')[2]);
    let index=courses.findIndex((course)=>course.id==urlId);
    if(index==-1){
      sendResponse(404,{message:"index not found"})
   }
   sendResponse(200,courses[index]);
  }
  //Department APIS//
  //1- Get all departments
  else if(url=='/departments'&&method=='GET'){
    sendResponse(200,deparments);
  }
  //2 add departments
  else if(url=='/departments'&&method=='POST'){
    req.on('data',(chunk)=>{
     let deparment=JSON.parse(chunk);
     deparment.id=deparments.length+1;
     deparments.push(deparment);
       fs.writeFileSync('department.json',JSON.stringify(deparments));
       sendResponse(200,{message:'success'})
    }) 
 }
 //3 Update Departments
 else if(url.startsWith('/departments/')&&method=='PUT'){
  let urlId=Number(url.split('/')[2]);
  let index=deparments.findIndex((deparment)=>deparment.id==urlId);
  if(index==-1){
    sendResponse(404,{message:"index not found"})
  }
  req.on('data',(chunk)=>{
    let deparment=JSON.parse(chunk);
    deparments[index].name=deparment.name;
    fs.writeFileSync('department.json',JSON.stringify(deparments));
    sendResponse(201,{message:"updated",urlId,index});
  })
}
 //4 delete Departments
 else if(url.startsWith('/departments/')&&method=='DELETE'){
  let urlId=Number(url.split('/')[2]);
  let index=deparments.findIndex((deparment)=>deparment.id==urlId);
  if(index==-1){
      sendResponse(404,{message:"index not found"})
  }
      deparments.splice(index,1);
      fs.writeFileSync('department.json',JSON.stringify(deparments));
     sendResponse(200,{message:"deleted"}); 
}
  //5- Search for a department by ID
  else if(url.startsWith('/department/')&&method=='GET'){
    let urlId=Number(url.split('/')[2]);
    let index=deparments.findIndex((deparment)=>deparment.id==urlId);
    if(index==-1){
      sendResponse(404,{message:"index not found"})
   }
   sendResponse(200,deparments[index]);
  }
  else{
    sendResponse(404,{message:'Not Found'})
  }
});

server.listen(4000,()=>{
   console.log('server is running...');
})



