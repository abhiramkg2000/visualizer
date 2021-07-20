var array=document.getElementById("array-elements");
var btn1=document.getElementById("btn");
var btn2=document.getElementById("clr");
var btn3=document.getElementById("start");
var container=document.getElementById("contain");
let squares=[];
let timeout=1000;
btn1.onclick=function display(){
    var j=0;
    var i=0;
    swap=0;
    var temp=array.value;
    const result=temp.split(" ");
    for(i=0;i<result.length;i++)
    {
        var array_item=document.createElement("div");
        array_item.setAttribute("id",i+1);
        array_item.innerHTML=result[i];
        array_item.classList.add("box");
        /*array_item.classList.add("paragraph-head");
        array_item.appendChild(document.createTextNode((i+1)+" Pass Value: "));*/
        container.append(array_item);
        squares.push(array_item);
    }
}
btn3.onclick=function bubble_sort(){
    setTimeout(()=>{
        for(i=0;i<squares.length-1;i++)
        {
            for(j=0;j<squares.length-i-1;j++)
            {   
            //setTimeout(()=>{
                if(parseInt(squares[j].innerHTML)>parseInt(squares[j+1].innerHTML))
                {
                    if(j>0){
                        squares[j-1].classList.remove("active")
                        squares[j].classList.remove("active")
                    }
                    /*squares[j].classList.add("active")
                    squares[j+1].classList.add("active")*/
                    squares[j].classList.add("active")
                    squares[j+1].classList.add("active")
                    //setTimeout(()=>{
                        swap=squares[j].innerHTML;
                        squares[j].innerHTML=squares[j+1].innerHTML;
                        squares[j+1].innerHTML=swap;
                    //},1000)
                    /*setTimeout(()=>{
                    squares[j].classList.remove("active")
                    squares[j+1].classList.remove("active")
                    },1000)*/
                    /*if(j===squares.length){
                        setTimeout(()=>{
                            squares[j].classList.remove("active")
                            squares[j+1].classList.remove("active")
                        },2000)
                    }*/
                    
                }
                
            }
            if(j>=0){
                setTimeout(()=>{
                    squares[j].classList.remove("active")
                    squares[j+1].classList.remove("active")
                },1000)
            }
        }
        array.value="";
    },2000)
    timeout+=2000;
}
btn2.onclick=function reset(){
    while(container.firstChild)
    {
        container.removeChild(container.firstChild);
    }
    while(squares.length){
        squares.pop();
    }
    
}
/*var array_item=document.createElement("p");
array_item.classList.add("paragraph");
array_item.appendChild(document.createTextNode("i= "+i+" j= "+j+" array is: "+result));
container.appendChild(array_item);*/
