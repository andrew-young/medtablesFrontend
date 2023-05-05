
function browse(){
	//browsepage.div.style.display="inline"
	if (browsepage.init==false){
		browsepage.init=true
		var testbox=document.createElement('div');
		testbox.id='testbox'
		browsepage.div.appendChild(testbox)
		browsepage.testbox=testbox
		
		var taketestlink=makelink(taketestpage,browsepage,function(event) {
			taketestpage.testid=$("#testbox").jqxListBox('getSelectedItem').value;
			console.log(taketestpage.testid)
			$.cookie("testid", taketestpage.testid);
		})
		browsepage.div.appendChild(taketestlink)
		
		var homelink=makelink(homepage,browsepage)
		browsepage.div.appendChild(homelink)
		
		
		var loading=document.createElement('div');
		loading.style.display="inline"
		loading.innerText="Loading"
		browsepage.div.appendChild(loading)
		browsepage.loading=loading
		
		gettestbyuserid(userid,function (data) {
				//state.question.temp=''//fix  file name change
				console.log(data)
				browsepage.loading.style.display="none"
				browsepage.tests=data
				maketestbox2()
			})
		
	}
}
function maketestbox2(){
	let div=browsepage.testbox
	var source=[]
	var tests=browsepage.tests
	keys=Object.keys(tests)
	for(var i in keys) {
    		var key = keys[i];
		source.push(tests[key])
	}
	$("#"+div.id).jqxListBox({ source: source, width: '200px', height: '250px',
		theme: 'energyblue',
		displayMember: 'name',
		valueMember:'tid'
	});
//
}

