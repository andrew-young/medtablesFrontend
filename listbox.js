var DragDropManager={}
function getdragdropmanager(listbox,id){
	if (id === undefined){
		id=1;
	}
	if (DragDropManager[id]=== undefined){
		DragDropManager[id]={'id':id,'listboxes':[],'startlistbox':null,'currentlistbox':null,'itemdiv':null,'item':null,'startindex':null,'currentindex':null}
	}
	DragDropManager[id]['listboxes'].push(listbox)
	return DragDropManager[id]
}


function setondrop(div){
	//console.log('setdrop')
	div.ondrop=function (ev) {
		var itemheight=div.itemheight
		//console.log('drop')
		/*
			console.log('drop')
		console.log(ev)
			console.log(ev.offsetX)
		console.log(ev.offsetY)
		console.log(itemheight)
		console.log(ev.target)
		*/
		var data = ev.dataTransfer.getData("object");
		/*
		console.log(data)
		console.log(data.id)
		console.log(data.style)
		*/
		var classname=ev.target.className
		//console.log(classname)
		if (classname=='listbox'){
			var index=Math.round(ev.offsetY/itemheight)
		}
		else if (classname=='listboxitem'){
			//console.log(ev.target.offsetHeight)
			//var index=Math.round(ev.target.offsetHeight/itemheight)
		}
		console.log(index)

		ev.preventDefault();
		ev.stopPropagation();
		//
		//ev.target.appendChild(document.getElementById(data));
	}
}
function setitemondrop(div,itemheight,itemdata,listbox){
		//console.log('setitemdrop')
	div.ondrop=function (ev) {
		//console.log('itemdrop')
		//console.log('index')
		//console.log(ev)
		//ev.preventDefault();
	}
}
function setitemondragstart(div){
	div.ondragstart= function (ev) {
		console.log('drag item start')
		var listbox=div.listbox
		var itemdata=div.itemdata
		var ddm=listbox.dragdropmanager
		ddm.itemdiv=div
		ddm.startlistbox=listbox
		ddm.currentlistbox=listbox
		ddm.item=itemdata
		ddm.pagey=ev.pageY
		ddm.pagex=ev.pageX
		ddm.start=1;
		//console.log(ddm.pagex)
		for (var i=0;i<listbox.children.length;i++){
			if (listbox.children[i]===div){
				ddm.startindex=i;
				ddm.currentindex=i;
				break;
			}
		}
		//console.log(ddm.startindex)

		//console.log(' current index '+ddm.currentindex)
			//.log(ddm.currentlistbox)		
	}
}

function switchlistbox(ddm,newlistbox){
	var newindex=newlistbox.childNodes.length;
	//console.log(newlistbox.childNodes)
	//console.log(ddm)
	var removeditem=ddm.currentlistbox.deleteitem(ddm.currentindex)
	var itemdiv=removeditem['itemdiv']
	var item=removeditem['item']
	//console.log(source)
	newlistbox.source.splice(newindex,0,removeditem['item'])
	newlistbox.appendChild(itemdiv)
	if (newindex== newlistbox.childNodes.length){
		newlistbox.appendChild(itemdiv)
	}else{
		newlistbox.insertBefore(itemdiv, newlistbox.childNodes[newindex]);
	}
	itemdiv.listbox=newlistbox
	//console.log(newlistbox)
	

	//console.log('recreate item event listener')
	//setitemondragstart(itemdiv,item,newlistbox)
	//setitemondragenter(itemdiv,item,newlistbox)
	
	ddm.currentlistbox=newlistbox
	ddm.currentindex=newindex
	//console.log('listbox changed')
	//console.log(ddm.currentindex)
	//console.log(ddm.currentlistbox.id)		
}
function moveitem(sourceindex,sourcelistbox,targetindex,targetlistbox,itemdiv){//todo add function to dragdropmanager and out of global scope
	var ddm=sourcelistbox.dragdropmanager
	var removeditem=sourcelistbox.deleteitem(ddm.currentindex)
	targetlistbox.source.splice(targetindex,0,removeditem['item'])
	if (targetindex==targetlistbox.childNodes.length){
		targetlistbox.appendChild(removeditem['itemdiv'])	
	}else{
		targetlistbox.insertBefore(removeditem['itemdiv'], targetlistbox.childNodes[targetindex]);
	}
	itemdiv.listbox=targetlistbox
	ddm.currentindex=targetindex
	ddm.currentlistbox=targetlistbox	
	//console.log(ddm.currentlistbox)
}
function setondragleave(listbox){
		//console.log('set drag item enter')
	listbox.ondragleave= function (ev) {
		console.log('drag leave')
		var ddm=listbox.dragdropmanager
		//console.log(listbox)
		//console.log(ddm)
		//console.log(ddm.currentindex+' ' +ddm.startindex )
		 var rect = listbox.getBoundingClientRect();
		//console.log(ev)
               
		//console.log(ev.screenX+' '+ev.screenY+' '+ev.pageX+' '+ev.pageY)
	   if (ev.screenX==0&&ev.screenY==0&&ev.pageX==0&&ev.pageY==0){
		   //console.log('drop')
	   }
	   // Check the mouseEvent coordinates are outside of the rectangle
	   // Check the mouseEvent coordinates are outside of the rectangle
	   else if(ev.x >= rect.left + rect.width || ev.x < rect.left
	   || ev.y > rect.top + rect.height || ev.y < rect.top) {
		   //console.log(ev.x+' '+rect.left+' '+rect.width)
		   //console.log(ev.y+' '+rect.top+' '+rect.height)
			moveitem(ddm.currentindex, ddm.currentlistbox,ddm.startindex,ddm.startlistbox,ddm.itemdiv)
		}else{
			//console.log('still inside')
			ev.dataTransfer.dropEffect = 'copy';
			//console.log(ev.x+' '+rect.left+' '+rect.width)
		}
		ev.stopPropagation()
		ev.preventDefault()
	}
}
function setitemondragenter(div){
	//console.log('set drag item enter ' +div.itemdata)
	div.ondragenter= function (ev) {
		var listbox=div.listbox
		var itemdata=div.itemdata
		ev.dataTransfer.dropEffect = 'copy';
		ev.preventDefault();
		ev.stopPropagation()
		//console.log('drag item enter ' +itemdata)

		var ddm=listbox.dragdropmanager
		var target=ev.target
		if (listbox!=ddm.currentlistbox){
			console.log('itemdragenter switch listbox')
			//console.log(ddm.currentlistbox)
			switchlistbox(ddm,listbox)
		}

		var px=null;
		var py=ev.pageY
		if (ddm.pagex!=null){
			px=ddm.pagex
			py=ddm.pagey
			ddm.pagex=null
			ddm.pagey=null
			//console.log('start pagex '+px+' '+py+' '+ev.pageX+' '+ev.pageY)
		}else{
			var px=ev.pageX
			var py=ev.pageY
		}
		//console.log(px+' '+py)
		

		var itemx=target.offsetLeft
		var itemy=target.offsetTop
		var itemw=target.offsetWidth
		var itemh=target.offsetHeight

		if (px<itemx||px>itemx+itemw||py<itemy-2||py>itemy+itemh){
			console.log('not over box')
			return
		}
		
		if (ddm.currentlistbox.childNodes[ddm.currentindex]===div){//mouse is over current target
		//console.log('return')
			return
		}
		if (ddm.currentindex===undefined){//this drop target is not accepting the object.  ddm atttributes not set
			//console.log('return 2')
			return
		}
		var targetsource=listbox.source
		var startsource=ddm.currentlistbox.source
		var item=ddm.item
		var newindex=null

		for (var i=0;i<listbox.children.length;i+=1){
			if (listbox.children[i]===div){
				newindex=i;
				break;
			}
		}

		if (listbox==ddm.currentlistbox && newindex==ddm.currentindex){
				console.log('return 3')
			return
		}
		var removeditem=listbox.deleteitem(ddm.currentindex)
		listbox.source.splice(newindex,0,removeditem['item'])
		if (newindex== listbox.childNodes.length){
			listbox.appendChild(removeditem['itemdiv'])	
		}else{
			listbox.insertBefore(removeditem['itemdiv'], listbox.childNodes[newindex]);
		}
	
		ddm.currentindex=newindex
		ddm.currentlistbox=listbox	
	}
}
function setondragenter(listbox){
	//console.log('set listbox drag enter')
	listbox.ondragenter= function (ev) {
		//console.log('listbox drag enter')
		var ddm=listbox.dragdropmanager
		if (ddm.currentlistbox===listbox){
			console.log('same lsitbox')
		}else{
			switchlistbox(ddm,listbox)
		}
	}
}



function createlistbox2(parameters){
	if (parameters===undefined){
		parameters={}
	}
	var div=document.createElement('ul');
	var height='25px'
	var width='200px'
	var itemheight=25
	var source=[]
	var itemstyle='listboxitem'
	div.dragdropmanager=getdragdropmanager(div)
	//div.labelmember=undefined
	/////////////////////////////////////////////////////////////
	div.createitemdiv=function(item){
			//console.log(item)
			var itemdiv=document.createElement('li');
			//var itemdata='adsf '+i
			if (this.labelmember===undefined){
				itemdiv.innerText=item			
			}else{
				itemdiv.innerText=item[this.labelmember]
			}
			
			//itemdiv.id=i
			itemdiv.listbox=this
			itemdiv.itemdata=item
			itemdiv.draggable="true"
			itemdiv.className=itemstyle
			//itemdiv.classList.add("child-elements")
			itemdiv.style.width=(width-2)+'px'
			itemdiv.style.height=(itemheight-2)+'px'
			//setitemondrop(itemdiv,itemheight,item,this)
			//console.log('create item event listener')
			setitemondragstart(itemdiv)
			setitemondragenter(itemdiv)
			return itemdiv
	}
	//////////////////////////////////////////////////////////////////////
	div.setsource=function(data){
		//console.log('setsource')
		var range = document.createRange();//delete all children
		range.selectNodeContents(this);
		range.deleteContents();

		//to do - remove event listeners from deleted children
		
		//console.log('setsource')
		//console.log(data)
		this.source=data;
		//console.log('length')
		//console.log(source.length)
		for (var i=0;i<this.source.length;i++){
			var item=this.source[i]
			//console.log('create item '+item)
			var itemdiv=this.createitemdiv(item)
			itemdiv.id='itemdiv '+ i
			div.appendChild(itemdiv)
		}
	}
////////////////////////////////////////////////////////////////////
	if (parameters['source']!=undefined){
		//console.log('set source 1')
		div.setsource(parameters['source'])
		//console.log('set source 1 end')
	}else{
		div.source=[]
	}
	
	
	//setondragstart(div)
	//setondragover(div)
	setondrop(div)
	setondragenter(div)
	setondragleave(div)
	div.style='inline-block'
	div.id='asdf '
	div.className='listbox'
	var tempdiv=document.createElement('div');
	tempdiv.className=itemstyle
	var itemborderwidth=tempdiv.style.borderWidth
	//console.log(tempdiv.style)
	//console.log(itemborderwidth)
	
	div.style.width=width
	var tempdiv = $('<div class="listboxitem" style="display: none;"></div>').appendTo('body');
	//var listboxtyle=tempdiv.style
	div.style.height=div.source.length*(itemheight+20)+10
	//console.log(1+itemheight+div.style.marginTop+div.style.marginBottom)
	//console.log(1+itemheight+div.style.marginTop+div.style.marginBottom)
	//console.log(listboxtyle)
	//console.log(listboxtyle.marginBottom)
	//console.log(tempdiv.css('marginBottom'))
	tempdiv.remove();
	var minheight=25
	//console.log(div.style.height.replace('px', ''))
	//console.log(minheight)
	//console.log(div.style.height.replace('px', '')<minheight)
	if (div.style.height.replace('px', '')<minheight){
		div.style.height=minheight;
		//console.log(div.style.height)
	}
	//console.log(div.style.height)
	//console.log(div)
	
	
	
	
	
	//////////////////////////////////////////////////////////
	div.deleteitem=function(index){
		//console.log(index)
		
		var b=this.childNodes[index]
		
		//console.log(b)
		//console.log(this)
		var itemdiv=this.removeChild(this.childNodes[index])
		var item=this.source.splice(index,1)
		var a=this.childNodes
		//console.log(a)
		/*
		if (this.childNodes.length==2*index){
			this.removeChild(this.childNodes[2*index-1])
		}else{
			this.removeChild(this.childNodes[2*index])
		}
		*/
		return {'itemdiv':itemdiv,'item':item[0]};
	}
	div.additem=function(index,item){
		var itemdiv=this.createitemdiv(item)
		this.insertBefore(item, list.childNodes[index]);
		this.source.splice(index,0,item)
	}
	
	///////////////////////////////////////////////////////////
	return div
}
	/*

	*/