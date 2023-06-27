function astablequestion(testquestion){
	//console.log(testquestion)
	testquestion.grid=undefined
	var tablequestion=testquestion.tablequestiondata
	testquestion.creatediv=function(questiondiv){
		testtablequestion(questiondiv,tablequestion)
	}
	testquestion.showcorrectanswers=function showcorrectanswers(correctanswerlist){
		//console.log("showcorrectanswers")
		//console.log(correctanswerlist)
		//console.log(testquestion)
		var correctanswers=[]
		//console.log(tablequestion.rowstart)
		//console.log(tablequestion.colstart)
		var rowstart = tablequestion.rowstart
		var colstart = tablequestion.colstart
		var nrow=testquestion.tablequestiondata.rows.length
		var ncol=testquestion.tablequestiondata.cols.length
		if (ncol==0){
			ncol=1
		}
		if (nrow==0){
			nrow=1
		}
		for(let rowi = rowstart; rowi < nrow+rowstart; rowi++)  {
			correctanswers[rowi-rowstart]=[]
			for(let coli=colstart ; coli < ncol+colstart ;coli++) {
				correctanswers[rowi-rowstart][coli-colstart]={}
			}
		}
		//console.log(correctanswers)
		//console.log(nrow)
		//console.log(rowstart)
		for(let i=0 ; i < correctanswerlist.length ;i++) {
			answer=correctanswerlist[i]
			//console.log(answer)
			correctanswers[answer.rid][answer.cid][answer.aid]={}
			correctanswers[answer.rid][answer.cid][answer.aid].text=answer.text
		}
		//console.log(correctanswers)
		//console.log(testquestion)
		//console.log(correctanswers[1])
		//console.log(correctanswers[1][1])
		//console.log(correctanswers[1][1][2])
		for(let rowi = rowstart; rowi < nrow+rowstart; rowi++)  {
					//console.log("fhdj")
			for(let coli=colstart ; coli < ncol+colstart ;coli++) {
				//console.log(rowi)
				//console.log(coli)
				//console.log(testquestion)
				//console.log(testquestion.grid)
				var cell=testquestion.grid.getcell(rowi,coli)
				let rowj=0
				if (testquestion.tablequestiondata.rows.length>0){
					rowj= testquestion.tablequestiondata.rows[rowi-rowstart].i
				}
				let colj=0
				if (testquestion.tablequestiondata.cols.length>0){
					colj= testquestion.tablequestiondata.cols[coli-colstart].i
				}
				//console.log(cell)
				var answerlist=cell.container.list
				var correctdic=correctanswers[rowj][colj]
				for(let i=0 ; i < answerlist.length ;i++) {
					var answer=answerlist[i]
					if (answer.aid in correctdic){
						answer.draggable.div.style.background='lightgreen'
					}else{
						answer.draggable.div.style.background='red'
						//console.log(answer)
						//console.log(answer.draggable.div.style)
					}
					answer.draggable.div.draggable=false
					delete correctdic[answer.aid]
				}
				//console.log(correctdic)
				for(var aid in correctdic) {
					//console.log(aid)
					if (correctdic.hasOwnProperty(aid)) {  
						correctanswer=correctdic[aid]
						var div=document.createElement('div')
						cell.container.div.appendChild(div)
						div.innerText=correctanswer.text
						div.style.background='yellow'
					}
				}
			}
		}
	}
	function testtablequestion(questiondiv,tablequestion){
		//console.log(tablequestion)
		var qid=tablequestion.question.id
		
		var nrow=tablequestion.rows.length
		var ncol=tablequestion.cols.length
		var rowstart=0
		var colstart=0
		if (nrow<=1){
			nrow=1
		}else{
			colstart=1
		}
		if (ncol<=1){
			ncol=1
		}else{
			rowstart=1
		}
		tablequestion.rowstart=rowstart
		tablequestion.colstart=colstart
		//var rowstart = tablequestion.rowstart
		//console.log(rowstart)
		//var colstart = tablequestion.colstart
		//console.log(tablequestion.rowstart)
		//console.log(tablequestion.colstart)
		//console.log(nrow)
		//console.log(ncol)
		//console.log(nrow+tablequestion.rowstart)
		//console.log(ncol+tablequestion.colstart)
		var gridwrapperdiv=document.createElement('div');
		gridwrapperdiv.classList.add("gridwrapper")
		var grid=creategrid(nrow+tablequestion.rowstart,ncol+tablequestion.colstart)
		grid.container.div.classList.add("grid")
		grid.container.div.style.gridTemplateColumns= "auto-fit ".repeat(grid.ncol)
		//console.log(grid.container.div.style.gridTemplateColumns)
		testquestion.grid=grid
		var questiondata=tablequestion.question
		var textarea=document.createElement('textarea');
			textarea.id='textarea'+qid
			textarea.value=tablequestion.question.text
			textarea.className='question'
			textarea.setAttribute('readonly', true);
			questiondiv.appendChild(textarea);
		
		
		if (questiondata.image.length>0){
			for (let i = 0; i< questiondata.image.length;i++){
				let filename=questiondata.image[i].imagename
				//var imageelement=document.createElement('img');
				//imageelement.setAttribute('src', './image/'+filename);
				//imagediv.appendChild(imageelement);
			
				var imagediv=document.createElement('div');
				imagediv.id='imagediv_'+qid+"_"+filename
				imagediv.className='imagediv'
				var img=document.createElement('img');
				img.id='image_'+qid+"_"+filename
				img.className='imagediv2'
				//console.log('./image/'+question.image)
				img.setAttribute('src', './image/'+filename);

				//img.style.overflowclipmargin="0px"
				questiondiv.appendChild(imagediv);
				imagediv.appendChild(img);
				//$('.ui-resizable-se').css({'height':'32px', 'width':'32px'});
			}
		}
		questiondiv.appendChild(gridwrapperdiv)	
		gridwrapperdiv.appendChild(grid.container.div)		
				
		function rowheaderdiv (cell,text){
			//console.log(text)
			cell.draggable.div.innerText=text
			cell.draggable.draggroup=[]
			cell.setdraggable(false)
			//console.log(cell.draggable.div.style.cursor)
			cell.draggable.div.classList.add("tableheader")
		}
		function colheaderdiv (cell,text){
			cell.draggable.div.innerText=text
			cell.draggable.draggroup=[]
			cell.setdraggable(false)
			//console.log(cell.draggable.div.style.cursor)
			cell.draggable.div.classList.add("tableheader")
		}
		/*
		function celldiv (cell){
			//var cediv=document.createElement('div')
			dcontext.ascontainer(cell,cell.draggable.div,null)
		}
		*/
		/*
		function answediv(answer){
			dcontext.ascontainer(answer,null,null)
			answer.draggable.div.innerText=answer.text
		}
		*/
		grid.container.draggroup=[]
		//var cell;
		if (tablequestion.colstart==1 && tablequestion.rowstart==1){
			grid.getcell(0,0).draggable.draggroup=[]
			grid.getcell(0,0).setdraggable(false)
		}
		if (ncol >1){
			for(let coli=colstart ; coli < ncol+colstart ;coli++) {
				let cell=grid.getcell(0,coli)
				//console.log(grid)
				//console.log(coli)
				//console.log(cell)
				let coltext=tablequestion.cols[coli-colstart].text
				coldiv=colheaderdiv(cell,coltext)
				//cell.draggable.draggroup=null//[draggroupcol]
			}
		}
		if (nrow >1){
			//console.log(tablequestion.rowstart)
			for(let rowi = rowstart; rowi < nrow+rowstart; rowi++)  {
				//var rowdiv=document.createElement('div')
				let cell=grid.getcell(rowi,0)
				let rowtext=tablequestion.rows[rowi-rowstart].text
				let rowdiv=rowheaderdiv(cell,rowtext)
				//cell.draggable.draggroup=null//[draggrouprow]
			}
		}
		//console.log(rowstart)
		function initanswerstogrid(grid,answerstable){
			//console.log(rowstart)
			//console.log(tablequestion.rowstart)
			//console.log(nrow)
			//console.log(ncol)
			//console.log(answerstable)
			var dragrowcol={}
			var dragcol=[]
			var dragrow=[]
			var draggroup
			//console.log(grid.container)
			if (tablequestion.dragcol && !tablequestion.dragrow){
				
				for (let cid=colstart; cid<grid.ncol;cid++){
					dragcol.push('col' + String(cid))
				}
			}else if(!tablequestion.dragcol && tablequestion.dragrow){
				
				for (let rid=rowstart; rid<grid.nrow;rid++){
					dragrow.push("row"+rid)
				}
			}else{
				dragrowcol="rowcol"
			}
			//console.log(dragcol)
			//console.log(grid.nrow)
			//console.log(grid.ncol)
			//console.log(tablequestion.rowstart)
			//console.log(rowstart)
			//console.log(colstart)
			//console.log(tablequestion.dragcol)
			//console.log(tablequestion.dragrow)
			for (let rid=rowstart; rid<grid.nrow;rid++){
				//console.log(rid)
				for (let cid=colstart; cid<grid.ncol;cid++){
					//console.log(cid)
					var cell=grid.getcell(rid,cid)
					//if (!tablequestion.swap){
						if (tablequestion.dragcol && !tablequestion.dragrow){
							draggroup=[dragcol[cid-colstart]]
							//console.log("1")
							
							//console.log(draggroup)
							//console.log(dragcol)
							//console.log(cid-colstart)
						}
						else if (!tablequestion.dragcol && tablequestion.dragrow){
							draggroup=[dragrow[rid-rowstart]]
							//console.log("2")
						}
						else{
							draggroup=[dragrowcol]
							//console.log("3")
						}
						//
						//console.log(cell)
						//console.log(draggroup)
						//console.log(cell.container)
						//console.log(cell.container.draggroup)
						//cell.container.draggroup=
					//}
					dcontext.ascontainer(cell,cell.draggable.div,draggroup)
					cell.container.div.classList.add("tablecontainercell")
					cell.container.div.draggable=false
					if (tablequestion.swap){
						cell.container.ondragenter=cell.container.ondragenterswap
						cell.container.div.classList.add("tablecontainercellswap")
					//console.log(cell.container.draggroup)
					}
				}	
			}

			for( let i=0;i< answerstable.length;i++ ){
				//console.log(answerstable)
				var answer=answerstable[i]
				//console.log(answer)
				//var colstart=tablequestion.colstart
				//var rowstart=tablequestion.rowstart
				//console.log(rowstart)
				//console.log(colstart)
				var rid = answer.rid
				var cid = answer.cid
				//console.log(rid)
				//console.log(cid)
				var cell=grid.getcell(rid+rowstart,cid+colstart)
				//console.log(cell)
				var answerobj={}
				answerobj.text=answer.text
				answerobj.aid=answer.aid
				answerobj.selected=false;
				dcontext.asdraggable(answerobj,null,cell.container.draggroup)
				if (tablequestion.swap){
					answerobj.draggable.ondragenter=answerobj.draggable.ondragenterswap
					answerobj.draggable.div.classList.add("tableanswerswap")
				}
				answerobj.draggable.div.innerText=answer.text
				//console.log(cell)
				//console.log(answerobj)
				//console.log(cell.container.list)
				cell.container.insert(answerobj)
				answerobj.draggable.div.classList.add("tableanswer")
				answerobj.draggable.div.classList.add("tableanswerunmarked")
				function addonclick(answerobj){
					answerobj.draggable.div.onclick=function(ev){
						if (answerobj.selected==false){
							answerobj.selected=true
							answerobj.draggable.div.style.backgroundColor = "grey";
							answerobj.draggable.div.classList.add("tableanswermarked")
							answerobj.draggable.div.classList.remove("tableanswerunmarked")
						}
						else if (answerobj.selected==true){
							answerobj.selected=false
							answerobj.draggable.div.style.backgroundColor = null;
							answerobj.draggable.div.classList.remove("tableanswermarked")
							answerobj.draggable.div.classList.add("tableanswerunmarked")
						}
					}
				}
				 addonclick(answerobj)
				//console.log(cell.container.list)
				
			}
			//console.log(dcontext)
			for( let i=0;i<grid.container.list.length;i++ ){
				var cell=grid.container.list[i]
				cell.draggable.draggroup=[]
				//console.log(cell)
			}
			for (let rid=rowstart; rid<grid.nrow;rid++){
				for (let cid=colstart; cid<grid.ncol;cid++){
					var cell=grid.getcell(rid,cid)
					cell.container.sort((a, b) => (a.text > b.text) ? 1 : -1)
					
				}	
			}

		}
		//console.log(rowstart)
		initanswerstogrid(grid,tablequestion.answers)
		//console.log(tablequestion)
	}

}


