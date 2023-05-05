function allowDrop(ev) {
		console.log('allowdrop')
	console.log(ev)
    ev.preventDefault();
}

function drag(ev) {
	console.log('drag')
	console.log(ev)
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
		console.log('drop')
	console.log(ev)
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


function createlistbox(parameters){
	var div=document.createElement('input');
	var height=25px
	var width=200px
	var source=[]

	div.ondragstart="drag(event)"
	div.ondrop="drop(event)" 
	div.ondragover="allowDrop(event)"
	div.setsource=function(data){
		console.log('setsource')
		console.log(data)
		source=data;
	}
	if (parameters['source']!=undefined){
		this.setsource(parameters['source'])
		for (var i=0;i<source.length;i++){
			var item=source[i]
			var itemdiv=document.createElement('div');
			item.innertext='a'
			item.appendChild(itemdiv)
		}
	}
	/*
	div.setsource=function(data){
			var source =
			{
				localdata: data,
				datatype: "array"
			};
			var dataAdapter = new $.jqx.dataAdapter(source, {
				loadComplete: function (data) { },
				loadError: function (xhr, status, error) { }    
			});

			$('#listbox_'+id).jqxGrid({'source': dataAdapter});
		}
		*/
}
	/*
		var input=document.createElement('input');
		input.id='input_'+id
		div.appendChild(input)
		console.log('input_'+id)
		console.log($('#input_'+id))
		$('#input_'+id).jqxInput({ width: '200px', height: '25px'});
		
		var listbox=document.createElement('div');
		listbox.id='listbox_'+id
		div.appendChild(listbox)
				console.log('listbox_'+id)
		console.log($('#listbox_'+id))
		columns= [{ text: 'name', datafield: 'label', width: 200 }]

		var cb=$('#listbox_'+id).jqxGrid({ width: '200px', height: '220px',
			theme: 'energyblue',
			'columns':columns,
			'showheader':false,
			filterable: true,
			//displayMember: 'name',
			//valueMember:'id'
			}
		)
	
		var inputfuncdefault=function (event)
			{
				console.log('change')
				var label = this.value
				console.log(label)

			$("#listbox_"+id).jqxGrid('clearfilters');
			var filtergroup = new $.jqx.filter();
			var filter = filtergroup.createfilter('stringfilter', label, 'contains');
			filtergroup.addfilter(1, filter);
			$("#listbox_"+id).jqxGrid('addfilter', 'label', filtergroup, true);
		}
		var inputfunccustom=undefined
		 
		
		$("#listbox_"+id).on('rowclick', function (event) {
			var index = $("#listbox_"+id).jqxGrid('getselectedrowindex');
			var clickedIndex = event.args.rowindex;
			if (clickedIndex == index) {
				setTimeout(function () {
					$("#listbox_"+id).jqxGrid('clearselection');
				}, 10);
				
			}else{
				var index = args.index;
				var item = args.row.bounddata;
				console.log(item)
				var label = item.label;
				var value = item.value;
				$('#input_'+id).jqxInput('val',label);
				$('#input_'+id).trigger('input')
				console.log(label)
			}
		});

		div.val=function(value){
			console.log(value)
			if (value==undefined){
				console.log($('#input_'+id).val())
				return $('#input_'+id).val()
			}else{
				return $('#input_'+id).val(value)
			}
			;
		}
		div.on=function(type,func){
			console.log('set func '+type)
			if (type=='input'){
				inputfunccustom=func
				$('#input_'+id).on('input', function (event){
					inputfuncdefault(event)
					if (inputfunccustom!=undefined){
						inputfunccustom(event)
					}
				});
			}else if (type=='select'){
				wrapperdiv.fselect=func
			}
		}
		
		div.setsource=function(data){
			var source =
			{
				localdata: data,
				datatype: "array"
			};
			var dataAdapter = new $.jqx.dataAdapter(source, {
				loadComplete: function (data) { },
				loadError: function (xhr, status, error) { }    
			});

			$('#listbox_'+id).jqxGrid({'source': dataAdapter});
		}
		
		return div
	}
	*/