
function initpages(){
	
	homepage={'init':false,'id':"home",'func':home,'text':"Home"}
	loginpage={'init':false,'id':"login",'func':login,'text':"Login"}
	browsepage={'init':false,'id':"browse",'func':browse,'text':"Browse Tests"}
	taketestpage={'init':false,'id':"taketest",'func':taketest,'text':"Take Test"}
	testpage={'init':false,'id':"test",'func':test,'text':"Edit Tests"}
	questionpage={'init':false,'id':"question",'func':question,'text':"Question"}
	//currentpage=homepage
	pages={}
	pages[browsepage.id]=browsepage
	pages[homepage.id]=homepage
	pages[loginpage.id]=loginpage
	pages[taketestpage.id]=taketestpage
	pages[testpage.id]=testpage
	pages[questionpage.id]=questionpage

	var body=document.body
	var homediv=document.createElement('div');
	
	homediv.style.display="inline"
	homediv.id="home"
	homepage.div=homediv
	body.appendChild(homediv)
	
	var logindiv=document.createElement('div');
	logindiv.style.display="none"
	logindiv.id="login"
	loginpage.div=logindiv
	body.appendChild(logindiv)
	
	var browsediv=document.createElement('div');
	logindiv.style.display="none"
	logindiv.id="browse"
	browsepage.div=browsediv
	body.appendChild(browsediv)
	
	var taketestdiv=document.createElement('div');
	taketestdiv.style.display="none"
	taketestdiv.id="taketest"
	taketestpage.div=taketestdiv
	body.appendChild(taketestdiv)
	
	var testdiv=document.createElement('div');
	testdiv.style.display="none"
	testdiv.id="test"
	testpage.div=testdiv
	body.appendChild(testdiv)
	
	var questiondiv=document.createElement('div');
	questiondiv.style.display="none"
	questiondiv.id="question"
	questionpage.div=questiondiv
	body.appendChild(questiondiv)
	
	
}
function home(){
	//console.log('home')
	console.log(homepage.init)
	if (homepage.init==false){
		homepage.init=true
		//console.log(window.history)
		//window.history.replaceState(homepage.id, "")

		
		
		console.log(username)
		if (username==null || username==undefined){
			console.log("asdf")
			
		}else{

			
			b2=makebutton('button1','b2','Logout',function(event) {
				logout();
			});
			homepage.logout=b2
			homepage.div.appendChild(b2)
		}
		
		var createlink=makelink(testpage,homepage)
		homepage.div.appendChild(createlink)
		

		var loginlink=makelink(loginpage,homepage)
		homepage.div.appendChild(loginlink)
		homepage.loginlink=loginlink

		var browselink=makelink(browsepage,homepage)
		homepage.div.appendChild(browselink)
		//homepage.browselink=browselink
		
	}
	homepage.div.style.display="inline"
	if (userid==undefined){
		homepage.loginlink.style.display="inline"
		homepage.logout.style.display="none"
	}else{
		homepage.loginlink.style.display="None"
		homepage.logout.style.display="inline"
	}
	
	//console.log(listbox)
}
function login(){
	loginpage.div.style.display="inline"
	//root=newpage()
	//var body= document.body;
	if (loginpage.init==false){
		loginpage.init=true
		iusername = document.createElement('input');
		iusername.id='username'

		b1 = document.createElement('button');
		b1.className='button1'
		b1.id='b1'
		var t = document.createTextNode("login");
		b1.appendChild(t);
		b1.addEventListener('click', function(event) {
   			login2(iusername.value);
			if (username != ""){
				//home();
			}
  		});

		loginpage.div.appendChild(iusername)
		loginpage.div.appendChild(b1)
	}
	loginpage.div.style.display="inline"
		//body.appendChild(root)
}
var username=null;

function login2(_username){
	if (_username != "" && _username != undefined ){
		var uri=api+'/login'
		logininfo={}
		logininfo.name=_username
		logininfo.password=null
		let data=JSON.stringify({'name':_username,'password':null})
		//let data=JSON.stringify(logininfo)
		console.log(data)

		$.ajax({
			url: uri,
			type: "Post",
			timeout: 3000
			, 'data':data
			,contentType: 'application/json; charset=utf-8'
			,success: function( data ) {
			if (!isNaN(parseFloat(data))){
				username=_username;
				document.cookie="username="+username;
				userid=data
				console.log('userid '+userid);
				console.log('username '+username);
				loginpage.div.style.display="none"
				window.location="#home"
				home();
			}else{
				username=_username;
				userid=data
				console.log('userid '+userid);
				console.log('username '+username);
			}
		}
		,error: function (xhr,status,error) {
			console.log(xhr)
			var err = JSON.parse(xhr.responseText);
			alert(err.ExceptionMessage) }
		,dataType: 'json'});
		
	}
	//console.log(username);
}

function logout(){
	username=undefined;
	userid=undefined;
	$.removeCookie("username");
	homepage.logout.style.display="none"
	login()
}


username=$.cookie("username");
userid=$.cookie("userid");
//getstate();
initpages()
loadsection()