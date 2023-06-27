function question(){

	if (questionpage.init==false){
		questionpage.init=true

		var grouplink=makelink(testpage,questionpage)
			questionpage.div.appendChild(grouplink)	
		var homelink=makelink(homepage,questionpage)
			questionpage.div.appendChild(homelink)
					
		var div2=document.createElement('div');
		
		var newquestionbutton=makebutton('button1','newquestion','New Question',function(){
			//
			newquestion()
			replacequestion()
		})
		//newquestionbutton.classList.add("block");
		newquestionbutton.style.display="block"
		//console.log(newquestionbutton.class)
		div2.appendChild(newquestionbutton);
		
		var questioninput=document.createElement('textarea');
		questioninput.id='question'
		//questioninput.value=questionpage.question.text
		div2.appendChild(questioninput);
		questionpage.div.appendChild(div2);
		questionpage.questioninput=questioninput
		
		

		var divimageupload=document.createElement('div');
		divimageupload.id='divimageupload';
		questionpage.div.appendChild(divimageupload);
		
		makeimageupload(questionpage.question)
	////////////////////////////////////////////////////////////////////////
	//console.log(question)

		var tablediv=document.createElement('div');
		questionpage.div.appendChild(tablediv)
		questionpage.tablediv=tablediv
		
		var imagediv=document.createElement('div');
	//		console.log('./image/'+question.image)
		imagediv.id='imagediv'
		questionpage.div.appendChild(imagediv);
		questionpage.imagediv=imagediv
	}
	//console.log(questionpage.question)
	if (questionpage.question==undefined || questionpage.tablequestion==undefined){
		let qid=undefined
		if (questionpage.question==undefined){
			qid=$.cookie('qid')
			//console.log(qid)
		}else{
			qid=questionpage.question.qid
		}
		//console.log(qid)
		if (qid!=undefined && qid!=-1){
			gettablequestion(qid)
			return //wait for questiondata
		}
		
	}
	//console.log(questionpage.question)
	//console.log(questionpage.tablequestion)
	if (questionpage.question == null){
		newquestion()
	}
	//console.log(questionpage.oldid)
	//console.log(questionpage.question.qid)
	//console.log(questionpage.question)
	//console.log(questionpage.oldid!=questionpage.question.qid)
	if (questionpage.oldid!=questionpage.question.qid){
		replacequestion()
	}
	


	function addimages(filenames){
		//questionpage.div.appendChild(document.createElement('br'));
		//console.log(filenames)
		if (questionpage.question.image.length==0){
			questionpage.imagediv.style.display="None"
		}else{
			questionpage.imagediv.style.display="block"
			for (let i = 0; i< filenames.length;i++){
				let filename=filenames[i].imagename
				//console.log(filename)
				var imageelement=document.createElement('img');
				imageelement.setAttribute('src', './image/'+filename);
				questionpage.imagediv.appendChild(imageelement);
				//console.log(imagediv)
			}
		}
	}
	function makeimageupload(question){
		
		 $('#divimageupload').jqxFileUpload({ width: 300, uploadUrl: 'scripts/upload.php', fileInputName: 'fileToUpload' ,
			renderFiles: function (fileName) {
				var stopIndex = fileName.indexOf('.');
				var name = fileName.slice(0, stopIndex);
				var extension = fileName.slice(stopIndex);
				
				
				return name + '<strong>' + extension + '</strong>';
				
			}
		}); 
		$('#divimageupload').on('uploadEnd', function (event) {
			var args = event.args;
			var fileName = args.file;
			console.log(args)
			console.log(args.response)
			var serverResponce = JSON.parse(args.response);
			console.log(serverResponce)
			// Your code here.
			let img={imagename:'temp/'+serverResponce.filename, note:null}
			//console.log(questionpage.question)
			questionpage.question.image.push(img)
			//console.log([img])
			addimages([img])
			//question.temp='temp/'
			questionpage.question=question;
	//		console.log(questionpage.question.temp)
			//createQuestion();
		});
	}


	function newquestion(){
		questionpage.question={}
		questionpage.question.text='Question?';
		questionpage.question.userid=userid;
		questionpage.question.image=[]//↓ ↑
		questionpage.question.qid=-1
		questionpage.oldid=-2
		questionpage.tablequestion=null
		$.removeCookie("qid")
	}
	function replacequestion(){
		questionpage.imagediv.remove()
		var imagediv=document.createElement('div');
		imagediv.id='imagediv'
	//		console.log('./image/'+question.image)
		questionpage.div.appendChild(imagediv);
		questionpage.imagediv=imagediv
		addimages(questionpage.question.image)
			
		questionpage.tablediv.remove()
		var tablediv=document.createElement('div');
		tablediv.id='tablediv'
		questionpage.div.appendChild(tablediv)
		questionpage.tablediv=tablediv
		//console.log(tablediv)
		questionpage.questioninput.value=questionpage.question.text
		maketablesection(tablediv,questionpage.questioninput)
		
		questionpage.oldid=questionpage.question.qid
	}
	/*
	function getquestion(qid,successfunc){
		console.log('gettestdata')
		uri=api+'getquestion/'+qid
		$.ajax({
				url: uri,
			type: "Get",
			timeout: 3000,
			'success': successfunc,
			error: function (xhr,status,error) { 
				var err = JSON.parse(xhr.responseText);
				console.log(err);
				alert(err.ExceptionMessage) }
			//,dataType: 'json'
		});
	}
	*/
	function gettablequestion(qid){
		var uri =api+'gettablequestion/'+qid;
		$.ajax({
				url: uri,
			type: "Get",
			timeout: 3000,
			'success': function(data){
				questionpage.tablequestion=data
				questionpage.question=data.question
				console.log(questionpage.question)
				console.log(questionpage.tablequestionquestion)
				replacequestion()
			}
			,error: function (xhr,status,error) { 
				var err = JSON.parse(xhr.responseText);
				console.log(err);
				//alert(err.ExceptionMessage) 
				newquestion()
				replacequestion()
			}
			//,dataType: 'json'
		});
	}
}

