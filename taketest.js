
function taketest(){
	//taketestpage.div.style.display="inline"
	if (taketestpage.init==false){
		taketestpage.init=true
	}
	//console.log(taketestpage.testid)
	//console.log($.cookie('testid'))
	
	if (taketestpage.testid==undefined){
		taketestpage.testid=$.cookie('testid')
		//console.log(taketestpage.testid)
	}
	//console.log(taketestpage.testid)
	gettest(taketestpage.testid,function (data) {
		//console.log(data)
		taketestpage.testdata=data;
		receivedtest()
	})
}
function receivedtest(){
	
	taketestpage.testanswer={}
	taketestpage.testanswer.testid=taketestpage.testid
	taketestpage.testanswer.answers={}

	taketestpage.test={}
	taketestpage.test.testid=taketestpage.testid
	test=taketestpage.test
	test.testquestions=[]
	test.testtablequestions=[]

	taketestpage.test.answerlookup={}
	taketestpage.test.q={}

	if (taketestpage.div2){
		taketestpage.div2.remove()
		//taketestpage.div.removeChild(taketestpage.div2)
	}
	var div=document.createElement('div');
	taketestpage.div2=div
	for(var i = 0; i < taketestpage.testdata.question.length; i++) {
		test.testquestions[i]={}
		var question = taketestpage.testdata.question[i];
		test.testquestions[i].question=question
		test.testquestions[i].questiondata=question
		var qid=question.qid
		taketestpage.test.q[qid]={}
		var qdiv=document.createElement('div');
		qdiv.id='div'+qid
		div.appendChild(qdiv);
		qdiv.classList.add("testbackground")
		var questiondata = taketestpage.testdata.question[i];

			
		//console.log(test.testquestions[i])
		//console.log(questiondata)
		//console.log(question)
		//console.log(qid)
		//console.log(taketestpage.testdata)
		tablequestiondata=taketestpage.testdata.tablequestion[qid]
		//console.log(qid)
		//console.log(tablequestiondata)
		tablequestiondata.question=question
		test.testquestions[i].tablequestiondata=taketestpage.testdata.tablequestion[qid]
		astablequestion(test.testquestions[i])
		
		test.testquestions[i].creatediv(qdiv)
		test.testtablequestions.push(test.testquestions[i])
	
	}
	//for(var i = 0; i < taketestpage.testdata.question.length; i++) {
		//console.log(test.testquestions[i])
		//console.log(test.testquestions[i].grid)
		//console.log(test.testquestions[i].grid.getcell(1,0))
	//}
	var bsubmit = makebutton('button1','submit','Submit',function(event) {
		submitTest()
		var bback = makelink(browsepage,taketestpage)
		div.appendChild(bback)
		//console.log(bback)
		//taketestpage.div.appendChild(div);
		bsubmit.style.visibility = "hidden"
	});;
	taketestpage.div.appendChild(div);
	bsubmit.className+= " center";
	div.style.align="center"
	var div2=document.createElement('div');
	div2.appendChild(bsubmit)
	div.appendChild(div2);
	//div.appendChild(bsubmit)
}


function submitTest(){
	//var uri='/medtablesapi/api/values/submittest'
	var uri=api+'/submittest'
	//console.log(JSON.stringify(taketestpage.testanswer))
        $.ajax({
            url: uri,
            type: "Post",
            data: JSON.stringify(taketestpage.testanswer),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
				//console.log(data)
				
					//console.log(taketestpage.testdata.tablequestion)
					//console.log(taketestpage.test.testtablequestions)
				for(var i = 0; i < taketestpage.test.testtablequestions.length; i++) {
					testtablequestion=taketestpage.test.testtablequestions[i]
					//console.log(i)
					//console.log(testtablequestion)
					qid=testtablequestion.questiondata.qid
					//console.log(qid)
					//tablequestiondata=taketestpage.testdata.tablequestion[qid]
					correctanswers=data.tableanswers[qid]
					//console.log(i)
					//console.log(correctanswers)
					testtablequestion.showcorrectanswers(correctanswers)
				}
			},
            error: function () { console.log(data)}
        });
}