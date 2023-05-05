function dragcontext(){
	var dragging=false
	//var selecteditems=[]
	var context={}
	var draggroup={}
	draggroup.all=null
	draggroup.none=[]
	context.selecteditems=[]
	var swapitem=null
	var swapi=null
	var swapcontainer=null
	var dragstarti=null
	var dragstartcontainer=null

	
/*
	function ondragoverdefault(ev,dragitems,targetobj,target){
		ev.preventDefault();//allows drop
		ev.stopPropagation()
		ev.target.style.cursor = 'pointer'; 
		ev.dataTransfer.dropEffect = "move";
	}
*/
	
	

	
	function draggroupmatch(draggroups1,draggroups2){
		//console.log(draggroups1)
		//console.log(draggroups2)
		if (draggroups1==null||draggroups2==null){
			//console.log(null)
			return true
		}
		for (let i = 0 ; i < draggroups1.length;i++){
			var group1=draggroups1[i]
			for (let j = 0 ; j < draggroups2.length;j++){
				var group2=draggroups2[j]
				if (group1==group2){
					//console.log(group1)
					//console.log(group2)
					return true
				}
			}
		}
		//console.log("false")
		return false
	}
	
	function dropallowed (container){
		var group1=container.draggroup
		allowdrop=true
		for (let j = 0 ; j < context.selecteditems.length;j++){
			let draggeditem=context.selecteditems[j]
			var group2=draggeditem.draggable.draggroup
			var match=draggroupmatch(group1,group2)
			//console.log(match)
			
			//console.log("match")
			//console.log(match)
			if (match==false){
				return false
			}
		}
		return true
	}
	
	function swapback(){
		//console.log(swapitem)
		//console.log(swapcontainer)
		//console.log(swapi)
		if (swapitem){
			//console.log(swapitem)
			//console.log(" insert " +swapitem.text + " from " +swapitem.draggable.container.div.id+" into "+swapcontainer.div.id)
			swapcontainer.insert(swapitem,swapi)
			
		}
	}
	function isinsamecontainer(items){
		let mini=items[0].draggable.i
		if (items.length>1){//all selected items must be from same container to swap
			for (let j = 1 ; j < items.length;j++){
				let draggeditem=items[j]
				let dicontainer2=draggeditem.draggable.container
				if  (dicontainer1 !=  dicontainer2){
					return -1
				}
				if (items[i].draggable.i<mini){
					mini=items[i].draggable.i
				}
				
			}
		}
		return mini
	}
	context.ascontainer=function(containerobj,div,draggroup){
		if (containerobj==null){
			containerobj={}
		}
		if (containerobj.container==null){
			containerobj.container={}
		}
		var container=containerobj.container
		container.obj=containerobj
		container.list=[]
		//container.div
		container.draggroup=draggroup
		//console.log(div)
		//console.log(div==null)
		//console.log(container.div)
		//console.log(container.div==null)
		if (div==null && container.div==null){
			container.div=document.createElement('div')
		}else{
			container.div=div
		}
		container.sort=function(comparator){
			//(a, b) => (a.text > b.text) ? 1 : -1

			for (let i=0; i < container.list.length;i++){
				item=container.list[i]
				item.draggable.i=i
				//console.log(item)
				container.div.appendChild(item.draggable.div)
			}
			
			
		}
		container.swap=function(draggable1,draggable2){
			//console.log(draggable1.draggable.i)
			//console.log(draggable2.draggable.i)
			containerobj.container.list[draggable1.draggable.i]=draggable2
			containerobj.container.list[draggable2.draggable.i]=draggable1
			var tempi=draggable1.draggable.i
			draggable1.draggable.i=draggable2.draggable.i
			draggable2.draggable.i=tempi
			//console.log(container.list)
			if (draggable2.draggable.i==container.list.length-1){
				//console.log("a")
				containerobj.container.div.appendChild(draggable2.dragablediv)
			}else{
				//console.log("b")
				//console.log(draggable2)
				//console.log(container.list)
				after=container.list[draggable2.draggable.i+1]
				console.log(after)
				container.div.insertBefore(draggable2.draggable.div,after.draggable.div)
			}
			if (draggable1.draggable.i==container.list.length-1){
				//console.log("c")
				container.div.appendChild(draggable1.draggable.div)
			}else{
				//console.log("d")
				var after=container.list[draggable1.draggable.i+1]
				//console.log(draggable1)
				//console.log(after)
				container.div.insertBefore(draggable1.draggable.div,after.draggable.div)
			}
			//console.log(container)	
		}
		container.insertmany=function(dragitems,index){
			for (let i=0;i<dragitems.length;i++){
				let dragitem = dragitems[i]
				container.insert(dragitem,index+i)
			}
		}
		container.insert=function(draggableobj,index){
			var draggable=draggableobj.draggable
			//console.log("insert")
			//console.log(draggableobj)
			//console.log(draggable)
			//console.log(index)
			//console.log(index==null)
			//console.log(container.list)
			if (index==-1|| index==null){
				index=container.list.length
			}
			//console.log(draggable.i)
			if (draggable.i==index && container==draggableobj.draggable.container){
				return
			}
			//console.log(index)
			if (index==container.list.length){
				draggable.remove()
				container.list.splice(container.list.length,0,draggableobj)
				//console.log(container)
				container.div.appendChild(draggable.div)
				//console.log(container.div)
			}else{
				
				//console.log(draggable)
				//console.log(container)
				after=container.list[index]
				//console.log(after)
				draggable.remove()
				container.list.splice(after.draggable.i,0,draggableobj)
		
				//console.log(index)
				//console.log(container.list.length)
				container.div.insertBefore(draggable.div,after.draggable.div)
			}
			
			//console.log(index)
			
			
			draggable.container=container

			//console.log(container.list)
			//console.log(container.div)
			//console.log(draggable.div)
			for (let i=0;i<container.list.length;i++){
				//console.log(container.list)
				//console.log(i)
				//console.log(container.list[i])
				container.list[i].draggable.i=i
			}
			//console.log(container.list)
			
		}
		container.removecell=function(draggable){
			//console.log(draggable)
			if (draggable.container!=container){
				throw("connot remove draggable from container")
			}
			//console.log(draggable.i)
			//console.log(container.list[0])
			//console.log(container.list[1])
			container.list.splice(draggable.i,1)
			for (let i=draggable.i;i<container.list.length;i++){
				//console.log(container.list)
				//console.log(i)
				//console.log(container.list[i])
				container.list[i].draggable.i=i
			}
			//console.log(container.list[0])
			//console.log(container.list)
			draggable.i=null
			draggable.container=null
			draggable.div.remove()
			return draggable
		}
		
		//console.log(containerobj)
		/*
		containerobj.container.ondragover=ondragoverdefault
		container.div.ondragover=function (ev) {
			container.ondragover(ev,context.selecteditems,containerobj,containerobj.container)
		}
		*/
		container.ondragenterswap=function (ev,selecteditems,container){
			//console.log("containerdragenterswap")
			ev.preventDefault();
			ev.stopPropagation();

			if (!dropallowed(container)){
				ev.dataTransfer.dropEffect = "not-allowed";
				container.div.classList.add("nondraggable-cursor");
				container.div.classList.remove("draggable-cursor");
				container.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
					return false;
			}else{
				ev.dataTransfer.dropEffect = "move";
				container.div.classList.add("draggable-cursor");
				container.div.classList.remove("nondraggable-cursor");
				container.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
			}
			let mini=isinsamecontainer(selecteditems)
			if (mini==-1){
				return false
			}
			let dicontainer1=selecteditems[0].draggable.container
			if (dicontainer1!=container){
				swapback()
				if (container.list.length>0){
					swapitem=container.list[container.list.length-1]
					swapi=container.list.length-1
					swapcontainer=container
					if (swapitem){
						//console.log(" insert " +swapitem.text + " from "+swapitem.draggable.container.div.id + " into "+dragstartcontainer.div.id)
						dragstartcontainer.insert(swapitem,dragstarti)
					}
					
				}
				//console.log("insert " +selecteditems[0].text + " from "+selecteditems[0].draggable.container.div.id +" into "+container.div.id)
				container.insertmany(selecteditems,container.list.length)
			}
			return false
		}
		
		container.ondropdefault=function(ev) {
			//console.log("container drop")
			/*
			ev.preventDefault();
			ev.stopPropagation();
			//draggable.container.list.length
			for (let j = 0 ; j < context.selecteditems.length;j++){
				var item=context.selecteditems[j]
				container.insert(item,container.list.length)
			}
			//console.log(draggable.container)
			//context.selecteditems=[]
			
			if (container.ondrop){
				//container.ondrop(ev)
			}
			*/
		}
		container.ondrop=container.ondropdefault
		container.div.ondrop=function(ev){
			container.ondrop(ev)
		}
		container.ondragenterdefault=function(ev,selecteditems,container){
			//console.log("containerenter")
			ev.preventDefault();
			ev.stopPropagation();
			//container.ondrop(ev)
			//console.log(container)
			//let i = 
			if (!dropallowed(container)){
				container.div.classList.add("nondraggable-cursor");
				container.div.classList.remove("draggable-cursor");
				ev.dataTransfer.dropEffect = "not-allowed";
				container.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
				return false;
			}else{
				ev.dataTransfer.dropEffect = "move";
				container.div.classList.add("draggable-cursor");
				container.div.classList.remove("nondraggable-cursor");
				container.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
			}
			container.insertmany(context.selecteditems,container.list.length)

		}
		container.ondragenter=container.ondragenterdefault//ondragenterswap
		container.div.ondragenter=function(ev){
			//console.log("containerenter")
			container.ondragenter(ev,context.selecteditems,container)

		}
		return containerobj
		
	}


	context.asdraggable=function (draggableobj,div,draggroup){
		if (draggableobj==null){
			var draggableobj={}
		}
		if (draggableobj.draggable==null){
			draggableobj.draggable={}
		}
		var draggable=draggableobj.draggable
		//draggable.item=draggableobj
		if (div==null && draggable.div==null){
			draggable.div=document.createElement('div')
		}else{
			draggable.div=div
		}
		draggable.container=null
		draggable.i=null//index in container
		
		draggable.draggroup=draggroup
		/*
		if(draggable.hasOwnProperty("draggable.div")==false){
			draggable.div==document.createElement('div')
		}
		*/
		draggable.remove=function() {
			if (draggable.container!=null){
				draggable.container.removecell(draggable)
			}
		}
		draggable.div.draggable="true"
		draggable.div.style.cursor="pointer"
		//draggeditem
		
		draggable.div.ondragstart=function(ev) {
			//console.log("ondragstart")
			ev.stopPropagation();
			dragging=true
			if (context.selecteditems.length==0){
				context.selecteditems.push(draggableobj)
			}

			
			for (let j = 0 ; j < context.selecteditems.length;j++){
				draggeditem=context.selecteditems[j]
			//	console.log(draggeditem)
				draggeditem.draggable.div.style.opacity = '0.4';
			//	console.log("drag")
				if (draggeditem.dragstart){//dragstart hook
					draggeditem.dragstart(ev)
				}
			}
			
			dragstarti=isinsamecontainer(context.selecteditems)
				
			if (dragstarti!=-1){
				dragstartcontainer=draggable.container
			}
			//console.log(context.selecteditems)
		}
		draggable.div.ondragend =function(ev) {
			//console.log("drag end")
			swapitem=null
			//console.log(context.selecteditems)
			dragging=false
			for (let j = 0 ; j < context.selecteditems.length;j++){
				draggeditem=context.selecteditems[j]
				draggeditem.draggable.div.style.opacity = '1';
				//console.log("drag")
				if (draggeditem.dragend){ //dragend hook
					draggeditem.dragend(ev)
				}
			}
			context.selecteditems=[]
			
		}
		draggable.ondragenterdefault =function(ev) {
			//console.log("drag enter")
			ev.preventDefault();
			ev.stopPropagation();
			//console.log(context.selecteditems)
			let container=draggable.container
			//console.log(container)
			//let i =

			if (!dropallowed(container)){
				draggable.div.classList.add("nondraggable-cursor");
				draggable.div.classList.remove("draggable-cursor");
				ev.dataTransfer.dropEffect = "not-allowed";
				draggable.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
				return false;
				
			}else{
				ev.dataTransfer.dropEffect = "move";
				draggable.div.classList.add("draggable-cursor");
				draggable.div.classList.remove("nondraggable-cursor");
				draggable.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
			}
			container.insertmany(context.selecteditems,draggable.i)
		}
		
		draggable.ondropdefault=function(ev) {
			//console.log("drag drop")
			ev.preventDefault();
			ev.stopPropagation();
		}
		draggable.ondrop=draggable.ondropdefault
		draggable.div.ondrop=function(ev){
			draggable.ondrop(ev)
		}
		
		/*
		draggable.ondragover=ondragoverdefault
		draggable.div.ondragover=function(ev) {
			//console.log(draggable)
			draggable.ondragover(ev,context.selecteditems,draggableobj,draggableobj.draggable)
		}
		*/
		draggable.ondragenterswap=function (ev,dragitems,targetobj){
			//console.log("dragenterswap")
			ev.preventDefault();
			ev.stopPropagation();

			if (!dropallowed(targetobj.draggable.container)){
			
				//console.log("drop not allowed")
				draggable.div.classList.add("nondraggable-cursor");
				draggable.div.classList.remove("draggable-cursor");
				ev.dataTransfer.dropEffect = "not-allowed";
				draggable.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
					return false;
			}else{
				ev.dataTransfer.dropEffect = "move";
				draggable.div.classList.add("draggable-cursor");
				draggable.div.classList.remove("nondraggable-cursor");
				draggable.div.style.cursor="pointer"
				ev.target.style.cursor = 'pointer'; 
			}
			
			//console.log(dragitems[0])
			
			
			//console.log(dicontainer1)
			let mini=isinsamecontainer(context.selecteditems)
			if (mini==-1){
				console.log("not same container")
				return false
			}
			let dragtargetcontainer=targetobj.draggable.container
			let dicontainer1=dragitems[0].draggable.container
			//console.log(targetobj)
			//return false
			//console.log(targetoldcontainer)
			
			if (dicontainer1!=draggable.container){
				
				//console.log("swapback")
				//console.log(dicontainer1)
				//console.log(draggable.container)
				swapback()
				swapitem=targetobj
				swapi=targetobj.draggable.i
				swapcontainer=targetobj.draggable.container
				
				//console.log(" insert " +dragitems[0].text + " from "+dragitems[0].draggable.container.div.id +" into "+dragtargetcontainer.div.id)
				dragtargetcontainer.insertmany(dragitems,targetobj.draggable.i)
				if (dragstartcontainer!=dragtargetcontainer){
					//console.log(" insert " +targetobj.text + " from" +targetobj.draggable.container.div.id +" into "+dragstartcontainer.div.id)
					dragstartcontainer.insert(targetobj,dragstarti)
				
				
				}
				
			}
			

			return false
		}
	
		draggable.ondragenter=draggable.ondragenterdefault//ondragenterswap//ondragenterdefault//
		draggable.div.ondragenter=function(ev) {
			//console.log(draggable)
			draggable.ondragenter(ev,context.selecteditems,draggableobj)
		}
		draggable.div.onmousemove=function(ev) {
			ev.target.style.cursor = 'pointer'; 
		}
	}

//context.ondragenterswapdefault=ondragenterswapdefault
return context
}