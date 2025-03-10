var protractorInstance,
	protractObj;

protractorData = {
		canvasHtml : '',
		canvasContext : '',
		toLeft : 80,
		toTop : 80,
		prevX : 0,
    	prevY : 0,
    	offX : 0,
    	offY : 0,
    	cX : 0,
    	cY : 0,
    	angle : 0,
    	clickAngle : 0,
    	displayDegree : 0
	};

linesData = {
		canvasHtml : '',
		canvasContext : '',
		toLeft : 80,
		toTop : 80,
		prevX : 0,
    	prevY : 0,
    	offX : 0,
    	offY : 0,
    	cX : 0,
    	cY : 0,
    	angle : 0,
    	clickAngle : 0,
    	newX : 0,
    	newY : 0,
    	transX : 0,
    	transY : 0,
    	radius : 0,
    	lineLeft : 0,
    	lineTop : 0
	};

topData = {
		canvasHtml : '',
		canvasContext : '',
		toLeft : 80,
		toTop : 80,
		prevX : 0,
    	prevY : 0,
    	offX : 0,
    	offY : 0,
    	cX : 0,
    	cY : 0,
    	angle : 0,
    	clickAngle : 0,
    	newX : 0,
    	newY : 0,
    	transX : 0,
    	transY : 0,
    	radius : 0,
    	lineLeft : 0,
    	lineTop : 0
	};

imgData = {
	imgWd : 0,
	imgHt : 0,
	aspectRatio : 0
};

$(document).ready(function() {
	Protractor(
	{
		// encodedString : "%7B%22PathPoints%22%3A%5B%5B%7B%22x%22%3A707.6666666666666%2C%22y%22%3A294.66666666666663%7D%2C%7B%22x%22%3A952.9591397849462%2C%22y%22%3A294.66666666666663%7D%5D%2C%5B%7B%22x%22%3A707.6666666666666%2C%22y%22%3A294.66666666666663%7D%2C%7B%22x%22%3A544.1266801830832%2C%22y%22%3A476.82900278513813%7D%5D%5D%2C%22toolData%22%3A%7B%22toLeft%22%3A480%2C%22toTop%22%3A67%2C%22leftAngle%22%3A0%2C%22topAngle%22%3A3.873174666310197%2C%22proAngle%22%3A1.7117991731494968%7D%2C%22actionFlag%22%3A%22Update%22%2C%22id%22%3A%221234%22%7D"
	});
	// protractorInstance = new Protractor({
	// 	// iframeData :{
	// 	// 	isPartOfIframe : true,
	// 	// 	iframeId : '.iAmIframe'
	// 	// }
	// 	// encodedString : "%7B%22PathPoints%22%3A%5B%5B%7B%22x%22%3A707.6666666666666%2C%22y%22%3A294.66666666666663%7D%2C%7B%22x%22%3A952.9591397849462%2C%22y%22%3A294.66666666666663%7D%5D%2C%5B%7B%22x%22%3A707.6666666666666%2C%22y%22%3A294.66666666666663%7D%2C%7B%22x%22%3A544.1266801830832%2C%22y%22%3A476.82900278513813%7D%5D%5D%2C%22toolData%22%3A%7B%22toLeft%22%3A480%2C%22toTop%22%3A67%2C%22leftAngle%22%3A0%2C%22topAngle%22%3A3.873174666310197%2C%22proAngle%22%3A1.7117991731494968%7D%2C%22actionFlag%22%3A%22Update%22%2C%22id%22%3A%221234%22%7D"
	// });

	$('.btnSave').on('click',onSaveBtnClick);
	$('.btnClosed').on('click',onCloseBtnClick);

	$(window).on('resize', function(event) {
		protractObj.appendCanvas();
		protractObj.loadProtractor();
    });
});

function onSaveBtnClick() {
	var arrPathPoints = [
		[
			{
				'x':linesData.transX,
				'y':linesData.transY
			},
			{
				'x':linesData.lineLeft,
				'y':linesData.lineTop
			}
		],
		[
			{
				'x':topData.transX,
				'y':topData.transY
			},
			{
				'x':topData.lineLeft,
				'y':topData.lineTop
			}
		]
	]

	var toolData = {
		toLeft : protractorData.toLeft,
		toTop : protractorData.toTop,
		leftAngle : linesData.angle,
		topAngle : topData.angle,
		proAngle : protractorData.angle,
		displayDegree : protractorData.displayDegree
	}

	if(protractObj.actionFlag == 'Update')
	{
		protractObj.actionFlag = 'Edit';
	}
	else {
		protractObj.actionFlag = 'Add';
	}

	var metaString = {
			// "LineColor" : "#FF0000",
			"PathPoints" : arrPathPoints,
			"toolData" : toolData,
			"actionFlag" : protractObj.actionFlag,
			"id" : protractObj.id
		};

		var encodedString = encodeURIComponent(JSON.stringify(metaString));
		nativeCallback(encodedString);		
};

function nativeCallback(encodedString) {
	var userAgent = window.navigator.userAgent;

	if(userAgent.indexOf('Android') !== -1)
    {
      window.android.getProtractorData(encodedString);
    }
    else if((userAgent.indexOf('iPad')!==-1 || userAgent.indexOf('iPhone')!==-1) || ((navigator.platform === 'MacIntel') && (navigator.maxTouchPoints > 1)))
    {
      window.location ="getProtractorData:"+encodedString;
    }
    else {
      // if(window.external.notify)
      // {
        window.external.notify(encodedString);
      // }
    }
};

function onCloseBtnClick() {
	var metaString = {
			"actionFlag" : 'Close'
		};
		var encodedString = encodeURIComponent(JSON.stringify(metaString));
		nativeCallback(encodedString);		
};

function onDeleteBtnClick() {
	$('.yesClick').on('click',onDelYesClick);
	$('#delete-popup').modal('show');
};

function onDelYesClick() {
	protractObj.decodeStr.actionFlag = 'Delete';
	var encodedString = encodeURIComponent(JSON.stringify(protractObj.decodeStr));
	nativeCallback(encodedString);	
};

function Protractor(toolDefaults) {
	protractObj = this;
	if(toolDefaults == undefined) {
		toolDefaults = {};
	}
	if(toolDefaults.encodedString)
	{
		this.decodeStr = JSON.parse(decodeURIComponent(toolDefaults.encodedString));
		this.toolData = this.decodeStr.toolData
		this.actionFlag = this.decodeStr.actionFlag;
		this.dataPoints = this.decodeStr.PathPoints;
		this.id = this.decodeStr.id;
	}
	
	this.toolHolder = toolDefaults.toolHolder;
	this.iframeData = toolDefaults.iframeData;
	this.canvasHtml = $('<canvas id="protractorCanvas"></canvas>');
	this.canvasContext = this.canvasHtml[0].getContext("2d");

	this.lineCanvas = $('<canvas id="lineCanvas"></canvas>');
	this.lineContext = this.lineCanvas[0].getContext("2d");

	if(this.toolHolder == undefined) {
		this.toolHolder = 'body';
	}
	if(this.iframeData == undefined) {
		this.iframeData = {};
		this.iframeData.isPartOfIframe = false;
	}

	this.appendCanvas = function() {
		if(this.iframeData && this.iframeData.isPartOfIframe == true) {
			$(this.iframeData.iframeId).contents().find(this.toolHolder).append(this.canvasHtml);
			$(this.iframeData.iframeId).contents().find(this.toolHolder).append(this.lineCanvas);
		}
		else {
			$(this.toolHolder).append(this.canvasHtml);
			$(this.toolHolder).append(this.lineCanvas);
		}

		protractorData.canvasHtml = $('#protractorCanvas');
		protractorData.canvasContext = document.getElementById("protractorCanvas").getContext("2d");

		linesData.canvasHtml = $('#lineCanvas');
		linesData.canvasContext = document.getElementById("lineCanvas").getContext("2d");

		protractorData.canvasHtml[0].setAttribute('width', protractorData.canvasHtml.parent().width());
		protractorData.canvasHtml[0].setAttribute('height', protractorData.canvasHtml.parent().height());

		linesData.canvasHtml[0].setAttribute('width', linesData.canvasHtml.parent().width());
		linesData.canvasHtml[0].setAttribute('height', linesData.canvasHtml.parent().height());
	};

	this.loadProtractor = function() {
		var ctx = protractorData.canvasContext,
			cnv = protractorData.canvasHtml;
		img = new Image();
		// protractorData.angle = 0;
		img.addEventListener('load' , function() {
			imgData.imgWd = 279;
			imgData.imgHt = 150;
			imgData.aspectRatio = getAspect(cnv.parent().width()/2);

			if(protractObj.actionFlag == 'Update')
			{
				$('.withSaveDelete').show();
				$('.roundSave').hide();

				var toolData = protractObj.toolData;
				protractorData.angle = toolData.proAngle;
				protractorData.toLeft = toolData.toLeft;
				protractorData.toTop = toolData.toTop;

				linesData.angle = toolData.leftAngle;
				linesData.toLeft = toolData.toLeft;
				linesData.toTop = toolData.toTop;

				topData.angle = toolData.topAngle;
				topData.toLeft = toolData.toLeft;
				topData.toTop = toolData.toTop;
			}
			else {
				$('.withSaveDelete').show();
				$('.roundSave').hide();

			}
		    
		    updateProtractorImg(cnv[0],ctx,protractorData.angle,protractorData.toLeft,protractorData.toTop);
		    redrawDrawing();

		    var proImgWidth = imgData.imgWd * imgData.aspectRatio,
	    		proImgHeight = (imgData.imgHt * imgData.aspectRatio) - (imgData.imgHt * imgData.aspectRatio) * 0.072;


		    $( "#resizable" ).css({
		    	'left' : protractorData.toLeft,
		    	'top' : protractorData.toTop,
		    	'width' : proImgWidth,
		    	'height' : proImgHeight + (imgData.imgHt * imgData.aspectRatio) * 0.072
		    });
		    
		    $( "#resizable" ).resizable({
		    	minHeight: 160,
	  			minWidth: 300,
	  			maxWidth: 828,
	  			maxHeight: 445,
      			aspectRatio: proImgWidth / (proImgHeight + ((imgData.imgHt * imgData.aspectRatio) * 0.072)),
      			start : function(event,ui) {
     
      			},
      			 create: function (event, ui) {
		            $(this).parent().on('resize', function (e) {
		                e.stopPropagation();
		            });
        		},
      			resize : function(event, ui) {	
  					var ctx = protractorData.canvasContext,
						cnv = protractorData.canvasHtml;

					linesData.canvasContext.clearRect(0, 0, linesData.canvasHtml[0].width, linesData.canvasHtml[0].height);

      				imgData.imgWd = $(this).width();
					imgData.imgHt = $(this).height();
					imgData.aspectRatio = 1;

					protractorData.toLeft = parseFloat($(this).css('left'), 10);
					protractorData.toTop = parseFloat($(this).css('top'), 10);

					linesData.toLeft = protractorData.toLeft;
					linesData.toTop = protractorData.toTop;
					topData.toLeft = protractorData.toLeft;
					topData.toTop = protractorData.toTop;

					updateProtractorImg(cnv[0],ctx,protractorData.angle,protractorData.toLeft,protractorData.toTop);
      			},
      			stop : function(event,ui) {
      				redrawDrawing();
      			}
    		});
		});
		img.src = "images/protractor-vector.svg";
	};

	var redrawDrawing = function() {
		$('.rotate-protractor').show();

	    var proImgWidth = imgData.imgWd * imgData.aspectRatio,
	    	proImgHeight = (imgData.imgHt * imgData.aspectRatio) - (imgData.imgHt * imgData.aspectRatio) * 0.072;

	    $('.rotate-protractor').css({
	    	'left' : protractorData.transX,
	    	'top' : protractorData.transY,
	    	'width' : proImgWidth,
	    	'height' : proImgHeight,
	    	'border-top-left-radius' : proImgHeight,
	    	'border-top-right-radius' : proImgHeight
	    });

	    $('.move-protractor').css({
	    	'left' : protractorData.transX + proImgWidth * 0.23,
	    	'top' : protractorData.transY + proImgHeight * 0.41,
	    	'width' : proImgWidth * 0.54,
	    	'height' : proImgHeight * 0.60,
	    	'border-top-left-radius' : proImgHeight * 0.70,
	    	'border-top-right-radius' : proImgHeight * 0.70
	    });

	    protractorData.prevX = protractorData.transX + proImgWidth * 0.23;
	    protractorData.prevY = protractorData.transY + proImgHeight * 0.41;

	    drawFirstLines.call(this);

	    var secLeft = linesData.transX+linesData.radius*Math.cos(linesData.angle),
	    	secTop =  linesData.transY+linesData.radius*Math.sin(linesData.angle),
	    	wdHalf = $('.sec-top').width() / 2;

	    linesData.lineLeft = secLeft;
	    linesData.lineTop = secTop;

	    $('.sec-top').css({
	    	'left' : secLeft - wdHalf,
	    	'top' : secTop - wdHalf
	    });

	    var firLeft = (topData.newX - topData.transX)*Math.cos(topData.angle) - (topData.newY - topData.transY)*Math.sin(topData.angle) + topData.transX,
			firTop = (topData.newX - topData.transX)*Math.sin(topData.angle) + (topData.newY - topData.transY)*Math.cos(topData.angle) + topData.transY;
			
		topData.lineLeft = firLeft;
		topData.lineTop = firTop;

		$('.fir-top').css({
	    	'left' : firLeft - wdHalf,
	    	'top' : firTop - wdHalf
	    });
	};

	var drawFirstLines = function() {
		var ctx = linesData.canvasContext,
			cnv = linesData.canvasHtml;

		// linesData.angle = 0;

		drawLines(cnv[0],ctx,'vertical');
		drawLines(cnv[0],ctx,'horizontal');
	}

	var updateProtractorImg = function(cnv,ctx,ang,left,top) {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
        cnv.width = cnv.width;
        
        protractorData.offX = cnv.offsetLeft;
        protractorData.offY = cnv.offsetTop;

        ctx.save();
        var x = left;
        var y = top;
        
        // var width = $(cnv).parent().width()/3;
        // var height = $(cnv).parent().height()/2.75;

        var width = imgData.imgWd * imgData.aspectRatio;
        var height = imgData.imgHt * imgData.aspectRatio;

        protractorData.cX = x + width*0.5;
        protractorData.cY = y + height*0.5;
        ctx.translate(x + .5*width, y + 0.93*height);
        ctx.rotate(ang);
        
        ctx.drawImage(img, -0.5*width, -1*height+(height * 0.072), width, height);
       
        protractorData.transX = (x + .5*width) + (-0.5*width);
        protractorData.transY = (y + 0.93*height) + (-1*height+(height * 0.072));

        ctx.restore();
	}

	getAspect = function(canWd) {
		return canWd / imgData.imgWd;
	}

	var drawLines = function(cnv,ctx,static) {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
        cnv.width = cnv.width;

	    var top = topData.angle * (180 / Math.PI),
	    	hori = linesData.angle * (180 / Math.PI),
	    	displayDegree,
	    	xPos,yPos;

	    // console.log('top '+top);
	    // console.log('hori '+hori);

	    // First Try
	    // if(hori >= 0)
	    // {
	    // 	displayDegree = 90 - top + hori;
	    // 	if(displayDegree <= -1)
	    // 	{
	    // 		displayDegree = 360 - top + hori + 90;
	    // 	}
	    // }
	    // else if(hori < 0)
	    // {
    	// 	displayDegree = 90 - top + (360 + hori);
    	// 	if(displayDegree >= 360)
    	// 	{
    	// 		displayDegree = 90 - top + (hori);
    	// 	}
	    // }

	    // Second Try
        if(hori < 0) {
        	if(hori <= -360){
        		hori = 360 + hori;
        	}
        	if(90 - top + (360 + hori) <= 360) {
        		if(top <= 0) {
        			displayDegree = 90 - top + (360 + hori);	
        		}
        		else {
        			if(360 + (90 - top + (360 + hori)) <= 360) {
        				displayDegree = 360 + (90 - top + (360 + hori));
        				if(displayDegree < 0)
        				{
        					displayDegree = 360 + displayDegree;
        				}	
        			}
        			else
        			{
        				displayDegree = 360 + (90 + hori - top);
        			}
        		}
			} else {
				displayDegree = 90 + hori - top;
			}
    	} else if(hori >= 0) {
    		if(top >= 90) {
    			if(360 + (90 - top + hori) <= 360)
    			{
    				displayDegree = 360 + (90 - top + hori);
    			}
    			else{
    				displayDegree = 90 - top + hori;
    			}
    		} else {
    			if(90 - top + hori <= 360) {
    				displayDegree = 90 - top + hori;
    			}
    			else
    			{
    				displayDegree = 360 - (90 - top + hori);
    				displayDegree = Math.abs(displayDegree);
    			}
    		}
    	} 

    	if(displayDegree.toString().indexOf('.') > -1) {
        	displayDegree = Number(displayDegree.toString().slice(0,displayDegree.toString().indexOf('.')));	
        }

        if(displayDegree == 0)
        {
        	displayDegree = 360;
        }

        if(displayDegree > 360)
        {
        	displayDegree = displayDegree - 360;
        }

        if(static == 'vertical')
        {

	        linesData.offX = cnv.offsetLeft;
	        linesData.offY = cnv.offsetTop;

	        topData.offX = cnv.offsetLeft;
	        topData.offY = cnv.offsetTop;

	        // var width = $(cnv).parent().width()/3;
	        // var height = $(cnv).parent().height()/2.75;
	        var width = imgData.imgWd * imgData.aspectRatio;
        	var height = imgData.imgHt * imgData.aspectRatio;

			ctx.save();
	        linesData.cX = linesData.toLeft + width*0.5;
	        linesData.cY = linesData.toTop + height*0.5;
	        //horizontal line
	        ctx.translate(linesData.toLeft + .5*width, linesData.toTop + 0.93*height);
	        ctx.rotate(linesData.angle);
	        ctx.beginPath();
	        ctx.strokeStyle="#FF0000";
        	ctx.lineWidth = 3;
	        ctx.moveTo(0, 0);
	        ctx.lineTo(0.5*width + (height * 0.2), 0);
	        ctx.stroke();
	        //horizontal line arc
	        ctx.beginPath()
	        ctx.strokeStyle="#0000ff";
	        ctx.lineWidth = 1;
	        ctx.arc(0.5*width + (height * 0.2), 0,10,0,2*Math.PI);
	        ctx.stroke();

	        //horizontal data
	        linesData.transX = (linesData.toLeft + .5*width);
	        linesData.transY = linesData.toTop + 0.93*height;
	        linesData.newX = linesData.transX + (0.5*width + (height * 0.2));
	        linesData.newY = linesData.transY;
	        linesData.radius = linesData.newX - linesData.transX;

	        ctx.restore();

	        ctx.beginPath();
	        ctx.strokeStyle="#FF0000";
        	ctx.lineWidth = 2;
		    ctx.arc(linesData.transX, linesData.transY,50,4.71239 + topData.angle,4.71239 + topData.angle + (displayDegree/180*Math.PI),false);
		    ctx.stroke();
	        
	        //vertical line
	        ctx.save();
	        topData.cX = topData.toLeft + width*0.5;
	        topData.cY = topData.toTop + height*0.5;
	        ctx.translate(topData.toLeft + .5*width, topData.toTop + 0.93*height);
	        ctx.rotate(topData.angle);
	        ctx.beginPath();
	        ctx.strokeStyle="#FF0000";
	        ctx.lineWidth = 3;
	        ctx.moveTo(0, 0);
	        ctx.lineTo(0, -1.1*height);
	        ctx.stroke();
	        //vertical line arc
	        ctx.beginPath()
	        ctx.strokeStyle="#0000ff";
	        ctx.lineWidth = 1;
	        ctx.arc(0, -1.1*height,10,0,2*Math.PI);

	        topData.newX = topData.toLeft + .5*width;
	        topData.newY = topData.toTop + 0.93*height -1.1*height;

	        ctx.stroke();

	        xPos = topData.toLeft + .5*width + 0.02*width;
	        yPos = topData.toTop + 0.93*height - 0.05*height;
    		
	        ctx.restore();
        }
        
        if(static == 'horizontal')
        {
        	topData.offX = cnv.offsetLeft;
	        topData.offY = cnv.offsetTop;

	        linesData.offX = cnv.offsetLeft;
	        linesData.offY = cnv.offsetTop;

	        // var width = $(cnv).parent().width()/3;
	        // var height = $(cnv).parent().height()/2.75;
	        var width = imgData.imgWd * imgData.aspectRatio;
        	var height = imgData.imgHt * imgData.aspectRatio;

			ctx.save();
	        topData.cX = topData.toLeft + width*0.5;
	        topData.cY = topData.toTop + height*0.5;
	        ctx.translate(topData.toLeft + .5*width, topData.toTop + 0.93*height);
	        ctx.rotate(topData.angle);
	        ctx.beginPath();
	        ctx.strokeStyle="#FF0000";
	        ctx.lineWidth = 3;
	        ctx.moveTo(0, 0);
	        ctx.lineTo(0, -1.1*height);
	        ctx.stroke();

	        ctx.beginPath()
	        ctx.strokeStyle="#0000ff";
	        ctx.lineWidth = 1;
	        ctx.arc(0, -1.1*height,10,0,2*Math.PI);
	        ctx.stroke();

	        topData.transX = (topData.toLeft + .5*width);
	        topData.transY = topData.toTop + 0.93*height;
	        topData.newX = topData.transX;
	        topData.newY = topData.transY + (-1.1*height);
	        topData.radius = topData.transY - topData.newY;

	        ctx.restore();

		    ctx.beginPath();
		    ctx.strokeStyle="#FF0000";
        	ctx.lineWidth = 2;
        	if(displayDegree == 360) {
        		ctx.arc(topData.transX, topData.transY,50,0 + linesData.angle,(360/180*Math.PI) + linesData.angle - (0/180*Math.PI),true);
        	}
        	else {
        		ctx.arc(topData.transX, topData.transY,50,0 + linesData.angle,(360/180*Math.PI) + linesData.angle - (displayDegree/180*Math.PI),true);
        	}
		    ctx.stroke();

	        ctx.save();
	        linesData.cX = linesData.toLeft + width*0.5;
	        linesData.cY = linesData.toTop + height*0.5;
	        ctx.translate(linesData.toLeft + .5*width, linesData.toTop + 0.93*height);
	        ctx.rotate(linesData.angle);
	        ctx.beginPath();
	        ctx.strokeStyle="#FF0000";
	        ctx.lineWidth = 3;
	        ctx.moveTo(0, 0);
	        ctx.lineTo(0.5*width + (height * 0.2), 0);
	        ctx.stroke();

	        ctx.beginPath()
	        ctx.strokeStyle="#0000ff";
	        ctx.lineWidth = 1;
	        ctx.arc(0.5*width + (height * 0.2), 0,10,0,2*Math.PI);
	        ctx.stroke();

	        xPos = topData.toLeft + .5*width + 0.02*width;
	        yPos = topData.toTop + 0.93*height - 0.05*height;

	        ctx.restore();
        }

        ctx.beginPath();
	    ctx.font = "20px OpenSans";
       	// ctx.fillStyle = "pink";
       	// ctx.fillRect(xPos - 5, yPos - 20,50,25);
       	ctx.fillStyle = "#FF0000";
       	ctx.fillText(displayDegree+'°', xPos, yPos);
    	ctx.stroke();

    	protractorData.displayDegree = displayDegree;
	}

	this.makeProtractorDrag = function() {
		$('.move-protractor').draggable({
			scroll:false,
			containment : $(this.toolHolder),
			start : function(event,ui) {
				$('.rotate-protractor').hide();

				var left = parseFloat($(this).css('left'), 10);
	            left = isNaN(left) ? 0 : left;
	            var top = parseFloat($(this).css('top'), 10);
	            top = isNaN(top) ? 0 : top;
	            recoupLeft = left - ui.position.left;
	            recoupTop = top - ui.position.top;

	            var cnv = linesData.canvasHtml,
					ctx = linesData.canvasContext;

					ctx.clearRect(0, 0, cnv[0].width, cnv[0].height);
			},
			drag : function(event,ui) {
				$('.rotate-protractor').hide();
				var cnv = protractorData.canvasHtml[0],
					ctx = protractorData.canvasContext;

				ui.position.left += recoupLeft;
            	ui.position.top += recoupTop;

				if( protractorData.prevX>0 || protractorData.prevY>0 ){
	                protractorData.toLeft += ui.position.left - protractorData.prevX;
	                protractorData.toTop += ui.position.top - protractorData.prevY;
	            }
	            protractorData.prevX = ui.position.left;
	            protractorData.prevY = ui.position.top;

				updateProtractorImg(cnv,ctx,protractorData.angle,protractorData.toLeft,protractorData.toTop);

				$('.rotate-protractor').css({
					'top':ui.position.top +125,
					'left':ui.position.left
				});
			},
			stop : function(event) {
				$('.rotate-protractor').show();
				$('.rotate-protractor').css('left',protractorData.transX);
			    $('.rotate-protractor').css('top',protractorData.transY);

			    $('#resizable').css('left',protractorData.transX);
			    $('#resizable').css('top',protractorData.transY);

			    var cnv = linesData.canvasHtml,
					ctx = linesData.canvasContext;

					linesData.toLeft = protractorData.toLeft;
					linesData.toTop = protractorData.toTop;
					topData.toLeft = protractorData.toLeft;
					topData.toTop = protractorData.toTop;

            	drawLines(cnv[0],ctx,'vertical');
            	drawLines(cnv[0],ctx,'horizontal');

            	$('.sec-top').css('left',linesData.transX+linesData.radius*Math.cos(linesData.angle) - $('.sec-top').width() / 2);
			    $('.sec-top').css('top',linesData.transY+linesData.radius*Math.sin(linesData.angle) - $('.sec-top').width() / 2);

			    linesData.lineLeft = linesData.transX+linesData.radius*Math.cos(linesData.angle);
		    	linesData.lineTop = linesData.transY+linesData.radius*Math.sin(linesData.angle);

		    	var left = (topData.newX - topData.transX)*Math.cos(topData.angle) - (topData.newY - topData.transY)*Math.sin(topData.angle) + topData.transX;
				var top = (topData.newX - topData.transX)*Math.sin(topData.angle) + (topData.newY - topData.transY)*Math.cos(topData.angle) + topData.transY;
				
				topData.lineLeft = left;
				topData.lineTop = top;

				$('.fir-top').css('left',left - $('.fir-top').width() / 2);
				$('.fir-top').css('top',top - $('.fir-top').width() / 2);

				// box = $('.move-protractor');
				// boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];
			}
		});
	};

	this.makeProtractorRotate = function() {
		$('.rotate-protractor').draggable({
			scroll:false,
			containment : $(this.toolHolder),
			start : function(event) {
				protractorData.clickAngle = getAngle( protractorData.cX + protractorData.offX, protractorData.cY + protractorData.offY, event.clientX, event.clientY  ) - protractorData.angle;
			},
			drag : function(event, ui) {
				var cnv = protractorData.canvasHtml,
					ctx = protractorData.canvasContext;

				protractorData.angle =  ( getAngle( protractorData.cX + protractorData.offX, protractorData.cY + protractorData.offY, event.clientX, event.clientY  ) - protractorData.clickAngle);
            	updateProtractorImg(cnv[0],ctx,protractorData.angle,protractorData.toLeft,protractorData.toTop);
			},
			stop : function(event,ui) {
				$('.move-protractor,.rotate-protractor').css({ "-webkit-transform-origin": "50% 100%" ,"-webkit-transform": 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});    
			    $('.move-protractor,.rotate-protractor').css({ "-moz-transform-origin": "50% 100%" ,'-moz-transform': 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});
			    $('.move-protractor,.rotate-protractor').css({ "transform-origin": "50% 100%" ,'transform': 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});

			    $('.rotate-protractor').css('left',protractorData.transX);
			    $('.rotate-protractor').css('top',protractorData.transY);

			    $('#resizable').css({ "-webkit-transform-origin": "50% 93%" ,"-webkit-transform": 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});    
			    $('#resizable').css({ "-moz-transform-origin": "50% 93%" ,'-moz-transform': 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});
			    $('#resizable').css({ "transform-origin": "50% 93%" ,'transform': 'rotate(' + protractorData.angle * (180 / Math.PI) + 'deg)'});
			}
		});
	};

	this.makeSecondTopRotate = function() {
		$('.sec-top').draggable({
                                scroll:false,
			containment : $(this.toolHolder),
			start : function(event) {
				linesData.clickAngle = getAngle( linesData.cX + linesData.offX, linesData.cY + linesData.offY, event.clientX, event.clientY  ) - linesData.angle;
			},
			drag : function(event, ui) {
				var cnv = linesData.canvasHtml,
					ctx = linesData.canvasContext;

				globalX = event.clientX;
				globalY = event.clientY;

				linesData.angle =  (getAngle( linesData.cX + linesData.offX, linesData.cY + linesData.offY, event.clientX, event.clientY  )  - linesData.clickAngle);
            	drawLines(cnv[0],ctx,'vertical');
			},
			stop : function(event,ui) {
			    $(this).css('left',linesData.transX+linesData.radius*Math.cos(linesData.angle) - $(this).width() / 2);
			    $(this).css('top',linesData.transY+linesData.radius*Math.sin(linesData.angle) - $(this).width() / 2);

			    linesData.lineLeft = linesData.transX+linesData.radius*Math.cos(linesData.angle);
		    	linesData.lineTop = linesData.transY+linesData.radius*Math.sin(linesData.angle);
			}
		});
	};

	this.makeFirstTopRotate = function() {
		$('.fir-top').draggable({
                                scroll:false,

			containment : $(this.toolHolder),
			start : function(event) {
				topData.clickAngle = getAngle( topData.cX + topData.offX, topData.cY + topData.offY, event.clientX, event.clientY  ) - topData.angle;
			},
			drag : function(event, ui) {
				var cnv = linesData.canvasHtml,
					ctx = linesData.canvasContext;

				topData.angle =  ( getAngle( topData.cX + topData.offX, topData.cY + topData.offY, event.clientX, event.clientY  ) - topData.clickAngle);
            	drawLines(cnv[0],ctx,'horizontal');
			},
			stop : function(event) {
				var left = (topData.newX - topData.transX)*Math.cos(topData.angle) - (topData.newY - topData.transY)*Math.sin(topData.angle) + topData.transX;
				var top = (topData.newX - topData.transX)*Math.sin(topData.angle) + (topData.newY - topData.transY)*Math.cos(topData.angle) + topData.transY;
				
				topData.lineLeft = left;
				topData.lineTop = top;

				$(this).css('left',left - $(this).width() / 2);
				$(this).css('top',top - $(this).width() / 2);
			}
		});
	};

	function getAngle( cX, cY, mX, mY ){
	    var angle = Math.atan2(mY - cY, mX - cX) * (180 / Math.PI);
	    if (angle < 0) angle += 360;
	    angle = angle * (Math.PI / 180);

	    return angle;
	}

	// appendCanvas.call(this);
	this.appendCanvas();
	// loadProtractor.call(this);
	this.loadProtractor();
	// makeProtractorDrag.call(this);
	this.makeProtractorDrag();
	// makeProtractorRotate.call(this);
	this.makeProtractorRotate();
	// makeSecondTopRotate.call(this);
	this.makeSecondTopRotate();
	// makeFirstTopRotate.call(this);
	this.makeFirstTopRotate();
};

Protractor.prototype.setToolHolder = function(toolHolder) {
	this.toolHolder = toolHolder;
};

Protractor.prototype.getToolHolder = function() {
	return this.toolHolder;
};
