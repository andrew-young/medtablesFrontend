function test(){

	//console.log(testpage.test)
	if (!testpage.test){
		testpage.test={}
		testpage.test.name="New Test"
		testpage.test.userid=userid
		testpage.test.tid=-1
		testpage.test.questions=[]
	}
	if (testpage.init==false){
		testpage.init=true
		gettestquestionbyuserid(userid,function (data) {
				testpage.tests=data
				//console.log(data)
				settestcombobox()
			})
		getquestions()
		createTest()
	}
	//console.log(testpage.test)

	//console.log(testpage.test)
}

function getquestions(){

	uri=api+'getquestionbyuserid/'+userid
	$.ajax({
			url: uri,
			type: "Get",
			timeout: 3000,
			success: function (data) {
				testpage.questions=data
				//console.log(data)
				setquestionboxsource()
			},
			error: function (xhr,status,error) { 
			var err = JSON.parse(xhr.responseText);
			console.log(err);
			alert(err.ExceptionMessage) }
			,dataType: 'json'
		});
	
	
}

function createquestionbox(div){
	$("#"+div.id).jqxListBox({ width: '200px', height: '250px',
		theme: 'energyblue',
		allowDrag: true,
		allowDrop: true,
		displayMember: 'name',
		valueMember:'qid'
	});
	testpage.testquestion1=$("#"+div.id)
	$("#"+div.id).on('select', function (event) {
			console.log(event.args.item.value)
			selectitem(event.args.item.value)
	})
}
function setquestionboxsource(){
	var data=testpage.questions
//console.log('start')
	//console.log(data)
	
	var source2=[]

	//console.log('mid')
	//console.log(data)
	var keys=Object.keys(data)
	for (var j=0;j<keys.length;j++){
		var key=keys[j];
		var q=data[key];
		q.name=q.qid+"-"+q.text
		source2.push(q);
		//source2.push(q);
	}
	
	//console.log(source)
	//console.log(source2)
	
	
	$("#questionbox2").jqxListBox({ source: source2})
}
function settestquesetionboxsource(){
	var source=[]
	testpage.test
	//console.log()
	if (testpage.test.tid!=null){

		for (var j=0;j<testpage.test.questions.length;j++){
			//console.log(testpage.test.questions)
			var question=testpage.test.questions[j]
			
			var qid=testpage.test.questions[j].qid
			//console.log(qid)
			//console.log(testpage.questions)
			question.name=question.qid+"-"+question.text
			//console.log(question)

			source.push(question);
			//delete data[qid];
		}	
	}
	//console.log(source)
	$("#questionbox1").jqxListBox({ source: source})
}
function createquestionbox2(div){
	$("#"+div.id).jqxListBox({ source: testpage.questions, width: '200px', height: '250px',
		theme: 'energyblue',
		allowDrag: true,
		allowDrop: true,
		displayMember: 'text',
		valueMember:'qid'
	});
	$("#"+div.id).on('select', function (event) {
		var args = event.args;
		if (args) {
			var item = args.item;
			var value = item.value;
			selectitem(value)
		}
	});
	
}
function settestcombobox(){
	var source=[]
	var tests=testpage.tests
	keys=Object.keys(tests)
	for(var i in keys) {
		key=keys[i]
    	var test = tests[key];
		source.push(test)
		//console.log(test)
	}
	testpage.testbox.jqxComboBox({'source': source});
}

function createtestcombobox(div){
		var source=[]
	
	//console.log(source)
	testpage.testbox=$("#"+div.id)
	testpage.testbox.jqxComboBox({ source: source, width: '200px', height: '25px',
		theme: 'energyblue',
		displayMember: 'name',
		valueMember:'tid'
	});
	
	$("#"+div.id).jqxComboBox('open')
	$("#"+div.id).on('select', function (event) {
		//console.log(event)
		var args = event.args;
		if (args) {
			var args = event.args;
			if (args.item){
				var label = args.item.label;
				var value = args.item.value;
				//var originalEvent = args.originalEvent;
				//testpage.test.tid=value;
				//testpage.test.name=label;
				//console.log(testpage.tests)
				//console.log(value)
				//testpage.test.questions=testpage.tests[value].questions;
				testpage.test=testpage.tests[value];
				//testpage.test
				//console.log(testpage.test)
				testpage.rename.style.display="none"
				testpage.nameinput.value=label
				settestquesetionboxsource()
				//console.log(value)
				//console.log(testpage.test.questions)
				
			}
			$("#testboxg").jqxComboBox('open')
		}
	});
	$("#testboxg input").on('keydown', function (event) {
        //console.log(event)
		//console.log(testpage.test)
		comboboxname=$("#testboxg").jqxComboBox('val');
		//testpage.test.name=$("#testboxg").jqxComboBox('val');
		
		
		//console.log(testpage.test.name)
    });
	//console.log(testpage.test)
	if (testpage.test.tid>0){
		var item=$("#testboxg").jqxComboBox('getItemByValue',testpage.test.tid);
		$("#testboxg").jqxComboBox('selectItem',item);
	}else if (testpage.test.name!= undefined) {
		$("#testboxg").jqxComboBox('val',testpage.test.name);
	}
}

function createTest(){
	/*
	if (testpage.test==undefined){
		testpage.test={}
		testpage.test.userid=userid
	}*/
	
	//divmenu=createmenu('test');
	//testpage.div.appendChild(divmenu);
	

	var questionlink=makelink(questionpage,testpage)
		testpage.div.appendChild(questionlink)	
	var homelink=makelink(homepage,testpage)
		testpage.div.appendChild(homelink)	
		
	var div1=document.createElement('div');

	div1.className='container'
	
	var nameinput=document.createElement('input');
	nameinput.value=testpage.test.name
	nameinput.onchange = function(){
		newname=nameinput.value
		console.log(newname)
		if (newname!= testpage.test.name){// && testpage.test.tid>0
			testpage.test.name=newname
			testpage.newname=newname
			console.log(testpage.test.name)
			renamebutton=testpage.rename
			console.log(renamebutton)

			renamebutton.style.display="inline-block"
			renamebutton.innerText="Rename Test"
		}
	};
	nameinput.style.height="30px"
	testpage.nameinput=nameinput
	div1.appendChild(nameinput);
	
	var testbox=document.createElement('div');
	testbox.id='testboxg'

	div1.appendChild(testbox);
	testpage.testbox=testbox
	
	var questionbox=document.createElement('div');
	questionbox.id='questionbox1'
	div1.appendChild(questionbox);
	
	var questionbox2=document.createElement('div');
	questionbox2.id='questionbox2'
	div1.appendChild(questionbox2);
	
	testpage.div.appendChild(div1);
	
	var div2=document.createElement('div');
	var change=makebutton('button1','change','Change Test',function (event){
		addtest()
	})
	div2.appendChild(change)
	
	var rename=makebutton('button1','rename','Rename Test',function (event){
		renametest(testpage.test.tid,testpage.newname)
	})
	
	rename.style.display = "none"
	testpage.rename=rename
	
	var deletebutton=makebutton('button1','delete','Delete Question',function (event){
		//onsole.log(testpage.testquestion1)
		//console.log(testpage.testquestion1.jqxListBox('getSelectedItem'))
		//var qid=testpage.testquestion1.jqxListBox('getSelectedItem').value
		console.log(testpage.selectedqid)
		deletequestion(testpage.selectedqid)
	})
	
	deletebutton.style.display = "none"
	testpage.deletebutton=deletebutton
	
	div2.appendChild(deletebutton)
	
	var edit=makelink(questionpage,testpage,editbutton,'Edit Question')

	div2.appendChild(edit)
	var createtestbutton=document.createElement('button');
		createtestbutton.onclick=function(){
			console.log(testpage.test)
			name=testpage.test.name
			testpage.test.tid=-1
			addtest()
		}
		createtestbutton.innerText="Create Test"
		div2.appendChild(createtestbutton)
	testpage.div.appendChild(div2);

	
	createtestcombobox(testbox)
	createquestionbox(questionbox)
	createquestionbox2(questionbox2)
	//console.log("ccreate test")
	//setquestionboxsource()
}
function editbutton(){
	var item=$('#questionbox1').jqxListBox('getSelectedItem');
	if (item!=null){
		
		var value=item.value;

	}else{
		var item=$('#questionbox2').jqxListBox('getSelectedItem');
		if (item!=null){
			var value=item.value;
		}
	}
	var value=testpage.selectedqid
	//console.log(value)
	//console.log(item)
	if (value!=null){
		//questionpage.q=testpage.questions[value]
		questionpage.question=testpage.questions[value]
		console.log(value)
		console.log(questionpage.question)
		$.cookie('qid',value)
		//console.log(value)
		//createQuestion()
	}else{
		return false;
	}
}
	

function addtest (){//changetest
	
		var items=$("#questionbox1").jqxListBox('getItems');
		testpage.test.questions=[];
		if (items){
			for (var j=0;j<items.length;j++){
				var qid=items[j].value
				testpage.test.questions.push(qid)
			}
		}
		//console.log(JSON.stringify(testpage.test))
	var uri=api+'addtest'
        $.ajax({
            url: uri,
            type: "Post",
            data: JSON.stringify(testpage.test),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
				//console.log(data)
				//getmydata(function(){createTest()})
				},
            error: function () { alert('error'); }
        });
}

function renametest (id,name){
	rename=testpage.rename
	rename.style.display = "inline-block"
	rename.textContent="updating"
	data={'id':id,'name':name}
	console.log(data)
	var uri=api+'renametest'
        $.ajax({
            url: uri,
            type: "Post",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
				console.log(data)
				rename.textContent="success"},
            error: function  (xhr, ajaxOptions, thrownError) { alert(xhr.status);
        alert(thrownError);rename.textContent="error" }
        });
	//createQuestion()
	
}

function deletequestion (id){
	deletebutton=testpage.deletebutton
	deletebutton.style.display = "inline-block"
	deletebutton.textContent="deleting"
	data=id//{'qid':id}
	console.log(data)
	var uri=api+'fullremovetablequestion'
        $.ajax({
            url: uri,
            type: "Post",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
				console.log(data)
				deletebutton.textContent="deleted"},
            error: function  (xhr, ajaxOptions, thrownError) { 
				alert(xhr.status);
				alert(thrownError);
				deletebutton.textContent="error" }
        });
	//createQuestion()
	
}
function selectitem(qid){
	testpage.selectedqid=qid
	testpage.deletebutton.style.display="inline-block"
	testpage.deletebutton.innerText="Delete Question"
}
/*
function uploadnewtest(test){//(name,userid){
	console.log("upload new test")

	console.log(name)
	console.log(JSON.stringify({'userid':userid,'name':name}))
	var uri=api+'addtest'
	$.ajax({
		url: uri,
		type: "Post",
		timeout: 3000,
		//'data': JSON.stringify({'userid':userid,'name':name}),
		'data': JSON.stringify(testpage.test),
		contentType: 'application/json; charset=utf-8',
		success: function (data) {
			console.log(data)
			//getmydata(createTest)
		},
		error: function (xhr,status,error) { 
			var err = JSON.parse(xhr.responseText);
			console.log(err);
			alert(err.ExceptionMessage) }
		,dataType: 'json'
	});
		//testpage.question.tid=null
	//createQuestion()
}
*/