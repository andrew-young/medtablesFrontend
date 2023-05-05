function creategrid(_nrow,_ncol,_name="grid"){
	var name=_name
	var grid={}
	//grid.grid=grid
	grid.ncol=_ncol
	grid.nrow=_nrow
	//console.log(grid.nrow)
	//var outercellgrid=[]
	var cellgrid=[]
	function newcell(rowi,coli){
		var cell = {}
		//cell.container={}
		//cell.draggable={}
		//cell.ri=rowi
		//cell.ci=coli
		var celldiv=document.createElement('div')
		celldiv.id="celldiv_"+rowi+"_"+coli
		celldiv.style.border="solid 1px"
		celldiv.classList.add("gridcell");
		//cellgrid[rowi][coli]=celldiv
		/*var innercelldiv=document.createElement('div')
		innercelldiv.id="innercelldiv"
		//celldiv.style.border="solid"
		//celldiv.classList.add("gridcell");
		celldiv.appendChild(innercelldiv)*/
	

		//cell.inner={}
		
		//cellgrid[rowi][coli]=cell
		
		dcontext.asdraggable(cell,celldiv,null)
		/*cell.setcontainerdiv =function (div){
			cell.containerdiv=div
			dcontext.ascontainer(cell)
		}*/
		cell.getrow=function(){return getrow(cell)}
		cell.getcol=function(){return getcol(cell)}
		
		cell.setdraggable=function(drag){
		if (drag != true && drag!=false){
			throw "drag ["+drag+"] must equal true or false"
		}
		var celldiv=cell.draggable.div
		celldiv.draggable=drag
		if (drag==true){
			celldiv.style.cursor="pointer"
		}else{
			celldiv.style.cursor="auto"
		}
	}
		return cell
	}

	


	function checkcolumn(ci){
		
		if (ci<0){
			ci=grid.ncol+ci
			if (ci < -grid.ncol-1){
				throw "column "+ci+" < -"+(grid.ncol+1)
			}
		}
		if (ci>=grid.ncol){
			throw "column "+ci+" >= "+grid.ncol
		}
		return ci
	}
	function checkrow(ri){
		//console.log(ri)
		if (ri<0){
			ri=grid.nrow+ri
			if (ri < -grid.nrow-1){
				throw "row "+ri+" < -"+(grid.nrow+1)
			}
		}
		if (ri>=grid.nrow){
			throw "row "+ri+" >= "+grid.nrow
		}
		return ri
	}
	
	
	function newcolumn(ci){

		if (ci<0){
			if (ci < -grid.ncol-1){
				throw "column < -"+(grid.ncol+1)
			}
			ci=grid.ncol+1+ci
		}
		if (ci>=grid.ncol){
			throw "column > "+grid.ncol
		}
		console.log(ci)
		for (let ri = grid.nrow-2; ri >=0;ri--){
			//after=getcell(ri+1,0)
			var cell=newcell(ri,grid.ncol-2)
			var i=getindex(ri,ci)
			//console.log(i)
			//console.log(cell)
			grid.container.insert(cell,i)
			//console.log(after)
		}
		var cell=newcell(grid.nrow-1,grid.ncol)
		grid.container.insert(cell,-1)
	
		grid.ncol++
		//grid.ncol=ncol
		tablecontainerdiv.style.gridTemplateColumns= "auto ".repeat(grid.ncol)
		//console.log("end newcol")
	}
	
	
	function newrow(ri){

		if (ri<0){
			ri=grid.nrow+1+ri
			if (ri < -grid.nrow-1){
				throw "row < -"+(grid.nrow+1)
			}
		}
		if (ri>=grid.nrow){
			throw "row > "+grid.nrow
		}
		//addnew outerdivs
		//console.log(ri)
		
		//console.log(grid.nrow)
		//cellgrid.push([])
		for (let ci = 0; ci < grid.ncol;ci++){
			var cell=newcell(grid.nrow-2,ci)
			var i=getindex(ri,ci)
			//console.log(i)
			grid.container.insert(cell,i)
		}
		console.log(grid.nrow)
		//console.log(grid.nrow)
		grid.nrow++
		//grid.nrow=nrow
		tablecontainerdiv.style.gridTemplateRows= "auto ".repeat(grid.nrow)
		//console.log("end newrow")
	}
	
	function swapcolumns(ci1,ci2){
		console.log("swap columns")
		for (let ri = 0; ri < grid.nrow;ri++){
			var cell1=getcell(ri,ci1)
			var cell2=getcell(ri,ci2)
			grid.container.swap(cell1,cell2)
		}
	}
	function swaprows(ri1,ri2){
		for (let ci = 0; ci <grid.ncol ;ci++){//
			var cell1=getcell(ri1,ci)
			var cell2=getcell(ri2,ci)
			grid.container.swap(cell1,cell2)
		}
	}

	function getindex(ri,ci){	
		var index=ri*grid.ncol+ci
		return index
	}
	function getrow(cell){
		var index=cell.draggable.i
		var remainder = index % grid.ncol;
		var quotient =  (index - remainder) / grid.ncol;
		return quotient
	}
	function getcol(cell){
		var index=cell.draggable.i
		var remainder = index % grid.ncol;
		var quotient =  (index - remainder) / grid.ncol;
		return remainder
	}
	function getcell(ri,ci){
		var ci=checkcolumn(ci)
		var ri=checkrow(ri)
		//console.log(ri*grid.ncol+ci)
		//console.log(grid.container.list)
		//console.log(grid)
		return grid.container.list[ri*grid.ncol+ci]
	}

	function removerow(ri){
		var ri=checkrow(ri)
		for (let ci = grid.ncol-1; ci >=0;ci--){
			var cell=getcell(ri,ci)
			cell.draggable.remove()	
		}
		grid.nrow--;
		tablecontainerdiv.style.gridTemplateRows= "auto ".repeat(grid.nrow)
	}
	function removecol(ci){
		ci=checkrow(ci)
		for (let ri = grid.nrow-1; ri >=0;ri--){
			var cell=getcell(ri,ci)
			cell.draggable.remove()	
		}
		grid.ncol--;
		tablecontainerdiv.style.gridTemplateColumns= "auto ".repeat(grid.ncol)
	}
	function setdraggable(drag,ri,ci){
		if (drag !== "true" && drag!="false"){
			throw "drag ["+drag+"] must equal true or false"
		}
		var celldiv=getcell(ri,ci).draggable.div
		celldiv.draggable=drag
		if (drag=="true"){
			celldiv.style.cursor="pointer"
		}else{
			celldiv.style.cursor=""
		}
	}
	grid.getcol=getcol
	grid.getrow=getrow
	grid.getrow=getrow
	grid.getcell=getcell
	//grid.getoutercell=getoutercell
	grid.newcolumn=newcolumn
	grid.removecol=removecol
	grid.newrow=newrow
	grid.removerow=removerow
	grid.swapcolumns=swapcolumns
	grid.swaprows=swaprows
	grid.setdraggable=setdraggable
	
	var tablecontainerdiv=document.createElement('div')
	tablecontainerdiv.style.display="grid"
	//console.log(tablecontainerdiv.style)
	tablecontainerdiv.style.gridTemplateRows= "auto ".repeat(grid.nrow)
	tablecontainerdiv.style.gridTemplateColumns= "auto ".repeat(grid.ncol)
	tablecontainerdiv.style.border="solid 1px"
	tablecontainerdiv.id="tablecontainerdiv"
	//console.log(dcontext)
	dcontext.ascontainer(grid,tablecontainerdiv)
	grid.container.div.ondragover=null
	for (let ri = 0; ri < grid.nrow;ri++){
		//cellgrid.push([])
		for (let ci = 0; ci < grid.ncol;ci++){
			var cell=newcell(ri,ci)
			//dcontext.asdraggable(cell)
			grid.container.insert(cell,-1)
			tablecontainerdiv.appendChild(cell.draggable.div)
		}
	}
	return grid
}