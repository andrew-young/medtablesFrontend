var dcontext= dragcontext()	

function maketablesection (answercontainerdiv,questioninput){
	answercontainerdiv.id="answercontainerdiv"
	var tablequestiondiv
	var grid
	var donebutton
	var tablequestion=questionpage.tablequestion
	var gridwrapperdiv
	questionpage.headerrow=[]
	questionpage.headercol=[]
	//console.log(questionpage)
	//console.log(tablequestion)
	//console.log(questionpage.oldid)
	//console.log(questionpage.question.qid)
	//console.log(questioninput)
	
	donefunc=function(event){
		console.log(tablequestion)
		console.log(grid)
		console.log(questionpage.grid)//↓↑
		//questionpage.tablequestion=tablequestion
		console.log(questionpage.tablequestion.rows.length)
		tablequestion.answers=[]
		for (let i=0; i<grid.container.list.length;i++){
			cell=grid.container.list[i]
			if (cell.container!=undefined){
				//console.log(cell)
				for (let j=0; j<cell.container.list.length;j++){
					answercell=cell.container.list[j]
					//console.log(cell)
					obj={}
					obj.rid=cell.getrow()-1
					obj.cid=cell.getcol()-1
					obj.text=answercell.text
					//console.log(obj)
					tablequestion.answers.push(obj)
				}
			}
		}
		tablequestion.rows=[]
		//console.log(questionpage.tablequestion.rows.length)
		//console.log(grid.nrow)
		//console.log(grid)
		for (let i=1; i<grid.nrow-1;i++){
			tablequestion.rows[i-1]={}
			tablequestion.rows[i-1].i=null
			tablequestion.rows[i-1].text=grid.getcell(i,0).text
			//console.log(grid.getcell(i,0))
		}
		//console.log(questionpage.tablequestion.rows.length)
		//console.log(tablequestion.rows)
		//console.log(questionpage.tablequestion.rows)
		//console.log(grid.nrow)
		tablequestion.cols=[]
		//console.log(grid.ncol)
		for (let i=1; i<grid.ncol-1;i++){
			tablequestion.cols[i-1]={}
			tablequestion.cols[i-1].i=null
			tablequestion.cols[i-1].text=grid.getcell(0,i).text
		}
		//console.log(tablequestion.cols)
		//console.log(questionpage.tablequestion)
		questionpage.tablequestion.question.text=questioninput.value;
		uploadtablequestion(questionpage.tablequestion);
	}
	/*
	if (questionpage.question.qid==undefined){
		questionpage.question.qid=-1
	}*/
	if (questionpage.question.qid==-1){
		console.log("new question1")
		tablequestion={}
		tablequestion.question={}
		tablequestion.question.qid=-1
		tablequestion.question.userid=userid
		tablequestion.question.question="Question?"
		tablequestion.rows=[{text:"row1"},{text:"row2"}]
		tablequestion.cols=[{text:"col1"},{text:"col2"}]
		tablequestion.randomcol=true
		tablequestion.randomrow=true
		tablequestion.dragcol=true
		tablequestion.dragrow=true
		tablequestion.swap=false
		tablequestion.answers=[{cid:0,rid:0,text:"1"},{cid:1,rid:0,text:"b"},{cid:1,rid:1,text:"asd"},{cid:1,rid:1,text:"2"}]
		questionpage.tablequestion=tablequestion
		//console.log(tablequestion)
	}
	if (questionpage.tablequestiondiv  && questionpage.oldid!=questionpage.question.qid){
		questionpage.tablequestiondiv.remove()
	}

	console.log(tablequestion)
	if (questionpage.tablequestiondiv==null){
		console.log("create tablesection")
		//console.log(tablequestion)
		var tablequestiondiv=document.createElement('div')
		questionpage.tablequestiondiv=tablequestiondiv
		
		var loadingdiv=document.createElement('div')
		loadingdiv.innerText="LOADING"
		
		var randomcoldiv=document.createElement('input')
		randomcoldiv.type="checkbox"
		randomcoldiv.id="randomcol"
		
		var randomcollabel=document.createElement('label')
		randomcollabel.innerText="Random Column"
		randomcollabel.for=randomcoldiv.id
		randomcollabel.appendChild(randomcoldiv)
		randomcollabel.style.borderStyle="solid"
		
		tablequestiondiv.appendChild(randomcollabel)	
		randomcoldiv.onclick=function(){
			tablequestion.randomcolorder=randomcoldiv.checked
			console.log(tablequestion.randomcolorder)
			questionchange()
		}
		questionpage.randomcoldiv=randomcoldiv
		
		var randomrowdiv=document.createElement('input')
		randomrowdiv.type="checkbox"
		randomrowdiv.id="randomrow"
		randomrowdiv.onlick=function(){
			tablequestion.randomroworder=randomrowdiv.checked
			questionchange()
		}
		var randomrowlabel=document.createElement('label')
		randomrowlabel.innerText="Random Row"
		randomrowlabel.for=randomcoldiv.id
		randomrowlabel.appendChild(randomrowdiv)	
		tablequestiondiv.appendChild(randomrowlabel)	
		randomrowdiv.onclick=function(){
			tablequestion.randomrow=randomrowdiv.checked
			questionchange()
		}
		questionpage.randomrowdiv=randomrowdiv
		
		var dragrowdiv=document.createElement('input')
		dragrowdiv.type="checkbox"
		dragrowdiv.id="dragrow"
		var dragrowlabel=document.createElement('label')
		dragrowlabel.innerText="Row Draggable"
		dragrowlabel.for=dragrowdiv.id
		dragrowlabel.appendChild(dragrowdiv)	
		tablequestiondiv.appendChild(dragrowlabel)	
		dragrowdiv.onclick=function(){
			tablequestion.dragrow=dragrowdiv.checked
			questionchange()
		}
		questionpage.dragrowdiv=dragrowdiv
		
		var dragcoldiv=document.createElement('input')
		dragcoldiv.type="checkbox"
		dragcoldiv.id="dragcol"
		
		var dragcollabel=document.createElement('label')
		dragcollabel.innerText="Column Draggable"
		dragcollabel.for=dragcoldiv.id
		dragcollabel.appendChild(dragcoldiv)	
		tablequestiondiv.appendChild(dragcollabel)
		dragcoldiv.onclick=function(){
			tablequestion.dragcol=dragcoldiv.checked
			questionchange()
		}
		questionpage.dragcoldiv=dragcoldiv
		
		var swapdiv=document.createElement('input')
		swapdiv.type="checkbox"
		swapdiv.id="swap"
		
		
		var swaplabel=document.createElement('label')
		swaplabel.innerText="Swap Answers"
		swaplabel.for=swapdiv.id
		swaplabel.appendChild(swapdiv)	
		swaplabel.style.borderStyle="solid"
		tablequestiondiv.appendChild(swaplabel)
		swapdiv.onclick=function(){
			tablequestion.swap=swapdiv.checked
			questionchange()
		}
		questionpage.swapdiv=swapdiv

		gridwrapperdiv=document.createElement('div')
		tablequestiondiv.appendChild(gridwrapperdiv)
		
		donebutton=document.createElement('button')
		donebutton.onclick=donefunc
		donebutton.innerText="Done"
		questionpage.donebutton=donebutton
		tablequestiondiv.appendChild(donebutton)
		
		questionpage.tablequestiondiv=tablequestiondiv
		questionpage.loadingdiv=loadingdiv
		questionpage.gridwrapperdiv=gridwrapperdiv
	}else{
		questionpage.donebutton.onclick=donefunc
	}
	tablequestiondiv=questionpage.tablequestiondiv



	//console.log(questionpage.oldid)
	//console.log(questionpage.question.qid)
	if (questionpage.oldid!=questionpage.question.qid){
		console.log("different question")
		answercontainerdiv.appendChild(questionpage.loadingdiv)
		answercontainerdiv.appendChild(questionpage.tablequestiondiv)
		//console.log()
		/*
		if (questionpage.question.qid!=-1){
			gettablequestion(questionpage.question.qid)//starts newgrid()
			
		}else{
			newgrid(tablequestion)
		}
		*/
		newgrid(tablequestion)
	}else {
		
		//console.log("same question")
		newgrid(tablequestion)
		//questionpage.tablequestiondiv.remove()
		//console.log(answercontainerdiv)
		//console.log(questionpage.loadingdiv)
	}



	
	questionchange=function(){
		//console.log("changed")
		changed=true
		questionpage.donebutton.innerText="*Done*"
	}
	

	function uploadtablequestion(tablequestion){
		//console.log("uploadtable tablequestion")
		//console.log(tablequestion)
		tablequestion.userid=userid//if editing someone elses question make a copy thats yours
		if (tablequestion.answers.length <1){
			alert('not enough answers'+tablequestion.answers.length)
			return
		}
		//console.log(tablequestion.answers.length)
		console.log(JSON.stringify(tablequestion))
		var uri=api+'uploadtablequestion'
		//console.log(tablequestion)
		$.ajax({
			url: uri,
			type: "Post",
			timeout: 3000,
			'data': JSON.stringify(tablequestion),
			contentType: 'application/json; charset=utf-8',
			success: function (data) {console.log(tablequestion);
				//questionpage.question.temp=''//fix  file name change
				//console.log(data)
				questionpage.donebutton.innerText="Done"
				changed=false
				console.log(questionpage)
				questionpage.question.qid=data
				questionpage.tablequestion=tablequestion
				questionpage.oldid=data
				$.cookie('qid',data)
				//getmydata(createQuestion)
			},
			error: function (xhr,status,error) { 
			var err = JSON.parse(xhr.responseText);
			console.log(err);
			alert(err.ExceptionMessage) }
			,dataType: 'json'
		});
			//questionpage.question.qid=null
		//createQuestion()
	}
	
		

	//console.log(tablequestion)
	
	
	//question.tablegrid=tablegrid
	

		
	//console.log(tablegrid)
	
	
	function createtable(){
		var cellgrid=[[]]
		var nrow=tablequestion.rows.length
		var ncol=tablequestion.cols.length
		//console.log(tablequestion)
		//console.log(nrow)
		//console.log(ncol)
		var table={}
		var draggroupcol={}
		var draggrouprow={}
		var draggroupcell={}
		var changed=false

		if (nrow==0){
			nrow=1	
			tablequestion.rows.push({text:"row missing"})
		}
		if (ncol==0){
			ncol=1
			tablequestion.col.push({text:"col missing"})
		}
		grid=creategrid(nrow+2,ncol+2)
		questionpage.grid=grid
		//console.log("created grid")
		//console.log(grid)
		
		
		function newanswercell(cell,answers){
			var innercontainerdiv=document.createElement('div')
			//innercontainerdiv.id="innercelldiv_"+rowi+"_"+coli
			
			cell.draggable.div.appendChild(innercontainerdiv)
			dcontext.ascontainer(cell,innercontainerdiv,[draggroupcell])
			
			cell.draggable.draggroup=[draggroupcell]
			cell.draggable.div.draggable=false
			cell.draggable.div.style.cursor=""

			for (let aid = 0; aid < answers.length;aid++){
				answerdata=answers[aid]
				//console.log("answer")
				//consoEEle.log(answertext)
				//console.log(answers.length)
				//console.log(answerdata)
				answer=newanswer(answerdata)
				cell.container.insert(answer,-1)
			}
			var answerbuttondiv=document.createElement('button')
			answerbuttondiv.id="answerbuttondiv_"//+cell.ri+"_"+cell.ci
			answerbuttondiv.innerHTML="add answer"
			cell.draggable.div.appendChild(answerbuttondiv)
			answerbuttondiv.onclick = function(){
				//console.log(cell)
				answer=newanswer({text:"answer"})
				cell.container.insert(answer,-1)
				questionchange()
				//console.log(answer)
			}
			cell.draggable.ondrop=function(ev){
				//console.log("ondrop")
				//console.log(cell)
				//console.log(dcontext.selecteditems)
				for (let j = 0 ; j < dcontext.selecteditems.length;j++){
					item=dcontext.selecteditems[j]
					cell.container.insert(item,cell.container.list.length)
					//ev.preventDefault()
					ev.stopPropagation()
				}
				questionchange()
				
			}
			//cell.setcontainerdiv(answerlistdiv)
			//cell.draggable.div.appendChild(celldiv)
			//console.log(cell)
			//console.log(celldiv)
			return cell
		}
		
		function newanswer(answer2){
			var answer={}
			answer.text=answer2.text
			
			var answerdiv=document.createElement('div')
			answerdiv.id="answerdiv_"//+aid
			answerdiv.style.border="solid 1px"
			answerdiv.style.cursor="move"
			answerdiv.draggable="true"
			dcontext.asdraggable(answer,answerdiv,[draggroupcell])
			answer.draggable.ondrop=function(ev){
				answer.draggable.ondropdefault(ev)
				questionchange()
			}
			
			var answertextdiv=document.createElement('span')
			answertextdiv.id="answertextdiv_"//+aid
			answertextdiv.innerHTML=answer.text
			answertextdiv.contentEditable="true"
			answertextdiv.classList.add("createquestionanswerlabel")
			answertextdiv.oninput=function(){
				answer.text=answertextdiv.innerText
				questionchange()
			}
			answerdiv.appendChild(answertextdiv)
			var answerspacerdiv=document.createElement('span')
				answerspacerdiv.innerHTML="  "
				answerdiv.appendChild(answerspacerdiv)
			var answerdeletediv=document.createElement('button')
			answerdeletediv.id="answerdeletediv_"//+aid
			answerdeletediv.innerHTML="X"
			answerdiv.appendChild(answerdeletediv)
			answerdeletediv.onclick = function(){
				answer.draggable.remove()
				questionchange()
			}
			
			
			return answer
		}
		
		function initanswerstogrid(grid,answerstable){
			console.log("initanserstogrid")
			//console.log(nrow)
			//console.log(ncol)
			//console.log(answerstable)
			for(let rowi = 1; rowi < grid.nrow-1; rowi++)  {
				//console.log("fhdj")
				for (let coli =1; coli<grid.ncol-1 ; coli++){
					//console.log("fhj")
					cell=grid.getcell(rowi,coli)
					
					var an = answerstable[rowi-1][coli-1].length
					var answers=answerstable[rowi-1][coli-1]
							
					
					
					newanswercell(cell,answers)
					//dropansweroncell(cell)
					//console.log(cell)
					//cell.containerdiv.appendChild(cell.inner.answersdiv)
					//console.log(celldiv)
				}
			}
		}
		
		function initanswerstogrid2(grid,answers){
			//console.log(nrow)
			//console.log(ncol)
			//console.log(grid)
			//console.log(answers)
			answerstable=[]
			for(let rowi = 0; rowi < grid.nrow-2; rowi++)  {
				answerstable[rowi]=[]
				for(let coli = 0; coli < grid.ncol-2; coli++)  {
					answerstable[rowi][coli]=[]
				}
			}
			//console.log(answerstable)
			for(let i=0;i< answers.length; i++){
				answer=answers[i]
				//console.log(answer)
				rowi=answer.rid
				coli=answer.cid
				if (rowi>=answerstable.length){
					rowi=0
				}
				if (coli>=answerstable[rowi].length){
					coli=0
				}	
				answerstable[rowi][coli].push(answer)
			}
			//console.log(answerstable)
			initanswerstogrid(grid,answerstable)
		}
		
		//dropanswers=droppableanswersfunc()
		function newcolheader(cell,headertext,grid){
			//cell.inner={}
			cell.text=headertext
			let coli=cell.getcol()
			//console.log(questionpage)
			questionpage.headercol[coli-1]={}
			
			var coldiv=document.createElement('div')
				//coldiv.id="col_"+coli
				//coldiv.style.cursor="move"
				//coldiv.draggable="true"
			cell.draggable.div.appendChild(coldiv)
			var coltextdiv=document.createElement('span')
				coltextdiv.innerHTML=headertext//"col "+grid.getcol(cell)
				//coltextdiv.id="coltext_"+coli
				coltextdiv.style.cursor="text"
				coltextdiv.nodrag=true
				coltextdiv.contentEditable="true"
				coltextdiv.oninput=function(){
					console.log(coltextdiv.innerText)
					cell.text=coltextdiv.innerText
					questionchange()
				}
				coldiv.appendChild(coltextdiv)
				questionpage.headercol[coli-1].textdiv=coltextdiv
				
			var coldeletediv=document.createElement('button')
				coldeletediv.innerHTML="X"
				coldeletediv.id="coldelete_"//+coli
				coldiv.appendChild(coldeletediv)
				questionpage.headercol[coli-1].deletediv=coldeletediv
				
				coldeletediv.onclick = function(){
					let coli=cell.getcol()
					grid.removecol(coli)
						questionpage.tablequestion.cols.splice(coli-1,1)
						if (grid.ncol==3){
							questionpage.headercol[0].deletediv.style.display="None"
							questionpage.headercol[0].textdiv.style.display="None"
						}
					questionchange()
				}
				//colheader
			cell.draggable.div.ondrop= function(ev){
				console.log("on swapdrop")
				
				ev.preventDefault();
				ev.stopPropagation();
				//draggedeSg(dcontext)
				draggedelement=dcontext.selecteditems[0]
				console.log(dcontext.selecteditems)
				if (draggedelement==ev.target){
					console.log("dont drop")
					return false
				}
				console.log(draggedelement)
				console.log(cell)
				col1=grid.getcol(draggedelement)
				col2=grid.getcol(cell)
				grid.swapcolumns(col1,col2)
				questionchange()
				return false;
			}
			//cell.container.ondrop=null
			var headercol1=questionpage.headercol[0]
			headercol1.deletediv.style.display="inline"
			headercol1.textdiv.style.display="inline"
			
			return cell
		}
		function newrowdiv(cell,headertext,grid){
			cell.text=headertext
			
			let rowi=cell.getrow()
			questionpage.headerrow[rowi-1]={}
			
			var rowdiv=document.createElement('div')
					//rowdiv.id="row_"+rowi
					//rowdiv.style.cursor="move"
					//rowdiv.draggable="true"
			cell.draggable.div.appendChild(rowdiv)
			var rowtextdiv=document.createElement('span')
				rowtextdiv.innerHTML=headertext//"row "+grid.getrow(cell)
				//rowtextdiv.id="rowtext_"+rowi
				rowtextdiv.style.cursor="text"
				rowtextdiv.nodrag=true
				rowtextdiv.contentEditable="true"
				rowtextdiv.oninput=function(){
					
					cell.text=rowtextdiv.innerText
					//console.log(cell)
					questionchange()
				}
				rowdiv.appendChild(rowtextdiv)
			questionpage.headerrow[rowi-1].textdiv=rowtextdiv
			
			var rowspacerdiv=document.createElement('span')
			rowspacerdiv.innerHTML="  "
			rowdiv.appendChild(rowspacerdiv)
			
			var rowdeletediv=document.createElement('button')
			rowdeletediv.innerHTML="X"
			rowdeletediv.id="rowdelete_"//+rowi
			rowdiv.appendChild(rowdeletediv)
			questionpage.headerrow[rowi-1].deletediv=rowdeletediv
			rowdeletediv.onclick = function(){
			
				grid.removerow(grid.getrow(cell))
				console.log(grid.nrow)
				console.log(grid)
				questionpage.tablequestion.rows.splice(rowi-1,1)
				if (grid.nrow==3){
					var headerrow1=questionpage.headerrow[0]
					headerrow1.deletediv.style.display="None"
					headerrow1.textdiv.style.display="None"
				}
				questionchange()
			}
			cell.draggable.div.ondrop= function(ev){
				console.log("on swapdrop")
				
				ev.preventDefault();
				ev.stopPropagation();
				//draggedeSg(dcontext)
				draggedelement=dcontext.selecteditems[0]
				console.log(dcontext.selecteditems)
				if (draggedelement==ev.target){
					console.log("dont drop")
					return false
				}
				//console.log(draggedelement)
				//console.log(cell)
				row1=grid.getrow(draggedelement)
				row2=grid.getrow(cell)
				grid.swaprows(row1,row2)
				questionchange()
				return false;
			}
			
			var headerrow1=questionpage.headerrow[0]
			headerrow1.deletediv.style.display="inline"
			headerrow1.textdiv.style.display="inline"
			
			return cell
		}
		function addcol(){
			//console.log(grid)
			//console.log("addcol")
			grid.newcolumn(-2)
			var ncol=grid.ncol
			var nrow=grid.nrow
			cell=grid.getcell(0,-2)
			//console.log(grid.getcol(cell))
			//console.log(cell.i)
			var coldiv=newcolheader(cell,"col "+grid.getcol(cell),grid)
			
			//cell.draggable.div.appendChild(coldiv)
			//dragcol(grid.getcell(0,-2).div,ncol-2);
			for (let rowi = 1; rowi < (nrow-1); rowi++) {
				cell=grid.getcell(rowi,ncol-2)
				console.log(cell)
				newanswercell(cell,[])
				//cell.inner.div.appendChild(cell.inner.answersdiv)
			}
			tablequestion.cols[ncol-3]=""
		}
		function addrow(){
			//console.log(grid)
			//console.log("addrow")
			grid.newrow(-2)
			var ncol=grid.ncol
			var nrow=grid.nrow
			//console.log(nrow)
			cell=grid.getcell(-2,0)
			
			var rowdiv=newrowdiv(cell,"row "+grid.getrow(cell),grid)
			
			//cell.draggable.div.appendChild(rowdiv)
			//dragrow(grid.getcell(-2,0).div,nrow-2);
			for (let coli = 1; coli < (ncol-1); coli++) {
				cell=grid.getcell(nrow-2,coli)
				newanswercell(cell,[])
				//cell.inner.div.appendChild(cell.inner.answersdiv)
			}
			tablequestion.rows[nrow-3]=""
		}


		grid.container.draggroup=[]
		cell=grid.getcell(0,0).draggable.draggroup=[]
		for(let coli=1 ; coli <= ncol ;coli++) {
			cell=grid.getcell(0,coli)
			coltext=tablequestion.cols[coli-1].text
			coldiv=newcolheader(cell,coltext,grid)
			cell.draggable.draggroup=[draggroupcol]
			
			//cell.container.draggroup=[draggroupcol]
			//grid.getcell(0,coli).inner.div.appendChild(coldiv)
			//dragcol(grid.getcell(0,coli).div,coli);
			
		}
		if (grid.ncol==3){
			questionpage.headercol[0].deletediv.style.display="None"
			questionpage.headercol[0].textdiv.style.display="None"
		}
		/*
		for(let coli=1 ; coli < grid.ncol ;coli++) {
			//console.log(grid.nrow)
			cell=grid.getcell(grid.nrow-1,coli)
			cell.draggable.draggroup=[]
		}
		*/
		cell=grid.getcell(grid.nrow-1,0)
		cell.draggable.draggroup=[]
		var colbutton=document.createElement('button')
		colbutton.id="addcol"
		colbutton.innerHTML="add col"
		grid.getcell(0,-1).draggable.div.appendChild(colbutton)
		colbutton.onclick = function(){
			addcol()
			questionchange()
		}
		for(let rowi = 0; rowi < nrow; rowi++)  {
			//var rowdiv=document.createElement('div')
			cell=grid.getcell(rowi+1,0)
			//console.log(rowi)
			//console.log(tablequestion)
			rowtext=tablequestion.rows[rowi].text
			rowdiv=newrowdiv(cell,rowtext,grid)
			cell.draggable.draggroup=[draggrouprow]
			
			//console.log(ncol-1)
			//console.log(cell)
			
			//cell.container.div.ondragover=null
			//cell.container.draggroup=[draggrouprow]
			//grid.getcell(rowi,0).draggable.div.appendChild(rowdiv)
			//dragrow(grid.getcell(rowi,0).div,rowi);//add drag events to div
		}
		if (grid.nrow==3){
			questionpage.headerrow[0].deletediv.style.display="None"
			questionpage.headerrow[0].textdiv.style.display="None"
		}
		var rowbutton=document.createElement('button')
			rowbutton.innerHTML="add row"
		grid.getcell(-1,0).draggable.div.appendChild(rowbutton)
		rowbutton.onclick = function(){
			addrow()
			questionchange()
		}
		/*
		for(let rowi = 1; rowi < grid.nrow; rowi++)  {
			cell=grid.getcell(rowi,grid.ncol-1)
			cell.draggable.draggroup=[]
		}
		*/
		cell=grid.getcell(grid.nrow-1,0)
		cell.draggable.draggroup=[]
		//answergen=makeanswers()//cellgrid,

		//console.log(table)
		//console.log(tablequestion)
		initanswerstogrid2(grid,tablequestion.answers)
	}

	

	

	
	function newgrid(_tablequestion){
		if (questionpage.griddiv!=null){
			questionpage.griddiv.remove()
		}
		tablequestion=_tablequestion
		//console.log(questionpage)
		questionpage.swapdiv.checked = tablequestion.swap
		questionpage.dragrowdiv.checked = tablequestion.dragrow
		questionpage.dragcoldiv.checked = tablequestion.dragcol
		questionpage.randomrowdiv.checked = tablequestion.randomroworder
		questionpage.randomcoldiv.checked = tablequestion.randomcolorder
		//console.log(tablequestion)
		questionpage.tablequestion=_tablequestion
		questionpage.tablequestion.question=questionpage.question
		createtable()
		answercontainerdiv.appendChild(tablequestiondiv)
		//console.log(grid)
		questionpage.griddiv=grid.container.div
		//console.log(questionpage.q)
		questionpage.loadingdiv.remove()
		questionpage.gridwrapperdiv.appendChild(grid.container.div)
		
	}
	/*
	function gettablequestion(qid){
		var uri = api+'gettablequestion/'+qid;
		$.getJSON( uri, function( data ) {
			questionpage.tablequestion=data
			newgrid(data)
		});
	}
	*/
	


}

