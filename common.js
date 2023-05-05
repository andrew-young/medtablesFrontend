var username=undefined
var userid=undefined
var rooturl =""
var api="/medtables/api/values/"

function makebutton(classname,id,text,click){
	b1 = document.createElement('button');
	b1.className=classname
	b1.id=id
	var t = document.createTextNode(text);
	b1.appendChild(t);
	b1.addEventListener('click', click);
	return b1
}
function makelink(targetpage,_currentpage,func,text){
	var link1=document.createElement('a');
		link1.href="#"+targetpage.id
		if (text){
			link1.innerText=text
		}else{
			link1.innerText=targetpage.text
		}
		link1.className='button1'
		link1.onclick=function(ev){
			
			if (func){
				let b=func()
				if (b==false){//if func returns false dont go to link
					return false;
				}
			}
			_currentpage.div.style.display="none"
			//targetpage.func() //done by loadsection()
			targetpage.div.style.display="inline"
			//console.log(targetpage)
			//console.log(targetpage.div.style.display)
			//lastpage=_currentpage
			//currentpage=targetpage
		}
		return link1
}

function hidedivs(){
	browsepage.div.style.display="none"
	homepage.div.style.display="none"
	loginpage.div.style.display="none"
	taketestpage.div.style.display="none"
	testpage.div.style.display="none"
	questionpage.div.style.display="none"
}


function loadsection(){
	let splits=window.location.href.split('#');
	let currentpage=homepage
	if (splits.length>1){
		let pageid=splits[1]
		//console.log(pageid)
		if(pageid){
			currentpage=pages[pageid]
		}
	}
	hidedivs()
	//console.log(currentpage)
	currentpage.div.style.display="inline"
	currentpage.func()
}

window.onpopstate = function(e) {
	loadsection()
}

function gettest(tid,successfunc){
	//console.log('gettestdata')
	uri=api+'gettest/'+tid
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
function gettestbyuserid(userid,successfunc){
	console.log('gettestdata')
	uri=api+'gettestbyuserid/'+userid
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

function gettestquestionbyuserid(userid,successfunc){
	//console.log("gettestquestionbyuserid")
	uri=api+'/gettestquestionbyuserid/'+userid
	$.ajax({
			url: uri,
			type: "Get",
			timeout: 3000,
			success: successfunc,
			error: function (xhr,status,error) { 
			var err = JSON.parse(xhr.responseText);
			console.log(err);
			alert(err.ExceptionMessage) }
			,dataType: 'json'
		});
}
