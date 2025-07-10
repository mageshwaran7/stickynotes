const containerElement=document.getElementById("container");
const btnAdd=document.getElementsByClassName("btn-add")[0];

function getAppStorage(){
    return JSON.parse(localStorage.getItem("magesh") || "[]");
}

getAppStorage().forEach(element => {
   const textElement=createTextElement(element.id,element.content) 
   containerElement.insertBefore(textElement,btnAdd);
});
 
function createTextElement(id,content){
const textElement=document.createElement('textarea');
textElement.classList.add('sticky');
textElement.value=content;
textElement.placeholder='enter your notes';

//update sticky note listerner----------------------------------------------------
textElement.addEventListener("change",()=>{
    updateNote(id,textElement.value)
})

//delete sticky note listerner---------------------------------------------------
textElement.addEventListener("dblclick",()=>{
    const check=confirm("are you sure to delete ?");
    if(check){
        deleteNotes(id,textElement);
    }
});

return textElement;

}

//add new sticky note----------------------------------------------------------------------------------------------------------
function addSticky(){
    const notes=getAppStorage();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:""
    }
//creating dummy element -------------------------------------------------------------------------------------------------------------
    const textElement=createTextElement(noteObject.id,noteObject.content);
    containerElement.insertBefore(textElement,btnAdd);
    notes.push(noteObject); //storing last element in application
    saveNotes(notes);
}
//button click---------------------------------------------------------------------------------------------------------------
btnAdd.addEventListener('click',()=>addSticky());

//saving dummy elements in application
function saveNotes(notes){
    localStorage.setItem("magesh",JSON.stringify(notes));
}

//update sticky note----------------------------------------------------------------------------------------------------------------
function updateNote(id,content){
    const notes=getAppStorage();
    const updateElement=notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNotes(notes);
}


//delete sticky note---------------------------------------------------------------------------------------------------------------
function deleteNotes(id,textElement){
    const notes=getAppStorage().filter((note)=>note.id!==id);
    saveNotes(notes);
    containerElement.removeChild(textElement);
}

