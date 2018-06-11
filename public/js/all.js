$( document ).ready(function() {
	// Create custom delete alert when we click on a .button-delete
	// @author Dessaules Loïc
	// @modified by Dessauges Antoine
	$('.button-delete').click(function(){

		event.preventDefault(); // cancel the event click, needed to delte participant in team. Without the form is sumbit on icon click

		var type = $(this).data("type");
		var name = $(this).data("name");
		var title = '';
		var text = '';
		var form = $(this).parent();

		switch(type) {
		    case "sport":
		    	title = "Voulez-vous vraiment supprimer le sport \""+name+"\"?";
		        text = "La suppression de ce sport va entrainer la suppression des courts liés";
		        break;
	        case "court":
	        	title = "Voulez-vous vraiment supprimer le terrain \""+name+"\"?";
		        break;
		    case "tournament":
		    	title = "Voulez-vous vraiment supprimer le tournois \""+name+"\" ?";
		        break;
	      	case "teamMember":
		    	title = "Voulez-vous vraiment supprimer \""+name+"\" de cette équipe ?";
		        break;
		    case "memberTeam":
		    	title = "Voulez-vous vraiment retirer "+name+" ?";
		        break;
		}
		
		alertConfirm(form, title, text);

		});


		// Open confirm pop-up when select change
	  	// @author Dessauges Antoine
	  	$( ".addMember" ).change(function() {

			var name = $(this).find("option:selected").text();
			var form = $(this).parent();
			if($(this).attr("name") == "team")
				var title = "Voulez-vous ajouter ce participant à l'équipe \""+name+"\" ?";
			else
	  			var title = "Voulez-vous ajouter \""+name+"\" à l'équipe ?";

		  	alertConfirm(form, title, '');

		});


		// Display the popup
		function alertConfirm(form, title, text){
			swal({
		  	title: title,
		  	text: text,
		  	type: "warning",
		  	showCancelButton: true,
		  	cancelButtonText: "Annuler",
	  		confirmButtonColor: "#DD6B55",
		  	confirmButtonText: "Confirmer",
		  	closeOnConfirm: false
		},
		function(isConfirm){
			if(isConfirm){
				$(form).submit();
			}
			else{
				if ($(".addMember")[0]) //if class exit on this page
					$('.addMember').find("option")[0].selected = true;//display defaut select
			}

		});
	}

});

$( document ).ready(function() {
	// Shows dev on footer
	$('.show-devs').click(function() {
		if ($('.dev-names').hasClass('hide')) {
			$('.dev-names').removeClass('hide').addClass('show');
		}
		else {
			$('.dev-names').removeClass('show').addClass('hide');
		}
	});
});
$( document ).ready(function() {
	/* FORM VALIDATIONS */
	// @author Dessaules Loïc and Davide Carboni
	// @edit Davide Carboni

	$('.formSend').click(function(){
		var form = $(this).parent().parent();
		var formId = form.attr('id');
		var error = '';

		switch(formId) {
			/*
            case "formTeam":
                var nameValue = $('#formTeam #name').val();

                var patternName = /^[a-zA-Z0-9-_ ]{3,20}$/;

                if(!patternName.test(nameValue)){
                    error += 'Le champ Nom ne doit pas être vide et doit avoir entre 3 et 45 caractères.<br>';
                }
                break;*/

		    case "formSport":
		    	var nameValue = $('#formSport #name').val();
		    	var descriptionValue = $('#formSport #description').val();

		    	var patternName = /^[a-zA-Z0-9-_ ]{3,20}$/;
		    	var patternDecription = /^[a-zA-Z0-9-_ ]{0,45}$/;

		    	if(!patternName.test(nameValue)){
		    		error += 'Le champ Nom ne doit pas être vide et doit avoir entre 3 et 45 caractères.<br>';
		    	}
		    	if(!patternDecription.test(descriptionValue)){
		    		error += 'Le champ Description peut avoir maximum 45 caractères.<br>';
		    	}
		        break;

	        case "formCourt":
	        	var nameValue = $('#formCourt #name').val();
	        	var acronymValue = $('#formCourt #acronym').val();
		    	var sportValue = $('#formCourt #sport').val(); // '' = empty, 1-2-3-... = sport

		    	var patternName = /^[a-zA-Z0-9-_ ]{1,20}$/;
		    	var patternAcronym = /^[a-zA-Z0-9-_ ]{1,3}$/;
		    	var patternSport = /^[0-9]+$/;

		    	if(!patternName.test(nameValue)){
		    		error += 'Le champ Nom ne doit pas être vide et doit avoir entre 1 et 20 caractères.<br>';
		    	}
		    	if(!patternAcronym.test(acronymValue)){
		    		error += 'Le champ Acronyme ne doit pas être vide et doit avoir entre 1 et 3 caractères.<br>';
		    	}
		    	if(!patternSport.test(sportValue)){
		    		error += 'Aucun sport sélectionné.<br>';
		    	}
		        break;

		    case "formEvent":
	        	var nameValue = $('#formEvent #name').val();
	        	var imgValue = $('#formEvent #img').val();

		    	var patternName = /^[a-zA-Z0-9-_ ]{3,20}$/;

		    	if(!patternName.test(nameValue)){
		    		error += 'Le champ Nom ne doit pas être vide et doit avoir entre 3 et 20 caractères.<br>';
		    	}
		    	//if image is not empty but only if this is on the create event (edit event image can be null and conserve the oldest image)
		    	if(imgValue == '' && $('#formEvent').is('.add')){
		    		error += 'Le champ Image ne doit pas être vide.<br>';
		    	}

		        break;

		    case "formTournament":
		    	var nameValue = $('#formTournament #name').val();
		    	var sportValue = $('#formTournament #sport').val();
		    	var startDateValue = $('#formTournament #startDate').val();
		    	var startTimeValue = $('#formTournament #startTime').val();
		    	var imgValue = $('#formTournament #img').val();

		    	var patternName = /^[a-zA-Z0-9-_ ]{3,45}$/;
		    	var patternSport = /^[0-9]+$/; // '' = empty, 1-2-3-... = sport
		    	var patternDate = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
		    	var patternTime = /^([01]\d|2[0-3]):([0-5]\d)$/;

		    	if(!patternName.test(nameValue)){
		    		error += 'Le champ Nom ne doit pas être vide et doit avoir entre 3 et 45 caractères.<br>';
		    	}
		    	if(!patternSport.test(sportValue)){
		    		error += 'Aucun sport sélectionné.<br>';
		    	}
		    	if(!patternTime.test(startTimeValue)){
		    		error += 'Le champ Heure de début ne doit pas être vide et doit être sous la forme hh:mm.<br>';
		    	}
		    	if(!patternDate.test(startDateValue)){
		    		error += 'Le champ Date de début ne doit pas être vide et doit être sous la forme jj.mm.aaaa.<br>';
		    	}
		    	//if image is not empty but only if this is on the create event (edit event image can be null and conserve the oldest image)
		    	if(imgValue == '' && $('#formTournament').is('.add')){
		    		error += 'Le champ Image ne doit pas être vide.<br>';
		    	}
		    	break;
		}

		if(error == ''){
			form.submit();
		}else{
			$('.alert').remove();
			$('.alert-danger').remove();
			$('h1').after(
				'<div class="alert alert-danger">'
				+error
				+'</div>'
			);
		}

	});
});
$( document ).ready(function() {
    // Login popup
    $("#login_link").click(function() {
        $('#login_popup').modal();
        $("#login_popup .modal-body .error").remove();
    });

    // Set focus when the popup loaded
    $('#login_popup').on('shown.bs.modal', function(){
        $("#username").focus();
    })

    //Create the new user name in off-line version
    $("#login_popup .btn-login-form").click(function(event){
        event.preventDefault();
        var role = $("input:radio[name ='role']:checked").val();
        var username;

        switch(role) {
            case "administrator":
                username = "ADMIN" + " Tester";
                break;
            case "writer":
                username = "WRITER" + " Tester";
                break;
            case "participant":
                username = "PARTICIPANT" + " Tester";
                break;
            default:
        }

        //$("#login-form #username").val(username);
        //$("#login-form #password").val("none");
        var token = $("#login-form input[name=_token]").val();

        // Ajaj Posting data
        $.ajax({
            url         : '/admin',
            method      : 'POST',
            dataType    : 'html',
            headers		: {'X-CSRF-TOKEN': token},
            data        : {
                username: username,
                password: "none",
                role: role
            },
            success : function(data) {
                var res = data.split("::");
                if(res[0] == "accepted"){
                    window.location.href = res[1];

                }else{
                    var error = res[1];
                    $("#login_popup .modal-body .error").remove();
                    $("#login_popup .modal-body").append('<div class="error">'+error+'</div>');
                    $("#login-form #password").val("");
                }
            }
        });
    });
});
$( document ).ready(function() {
	/* Add multiple select chooser for the teams which participate on a tournament */
	// do this if we are on the good page (id of the select exists)
	if($('#multiple-teams-select').length){
		$("#multiple-teams-select").select2({
			placeholder: 'Choisir une équipe',
	  		allowClear: true
	  	});
	}
});
$( document ).ready(function() {

	// Search in a table and display only result who correspond to the search
  	// @author Dessauges Antoine
  	$('.search').on('input',function(e){

    	var search = $('.search').val().toLowerCase();

    	$('.searchIn tr, .searchIn .hideSearch').each( function() {

    		var teamName = $(this).find(".name").text().toLowerCase();

    		if(teamName.indexOf(search) < 0)
    			$(this).hide( "fast");
    		else
    			$(this).show( "fast");

    	});

    });


	// Init Datatable on our table -> https://datatables.net/
    // @author Dessaules Loïc
	var tableFrTranslateWithoutAllInfos = {
		"language": {
	        "decimal":        "",
		    "emptyTable":     "Aucune données disponible",
		    "info":           "_START_ à _END_ sur _TOTAL_ entrées",
		    "infoEmpty":      "0 à 0 sur 0 entrées",
		    "infoFiltered":   "(Total de _MAX_ total entrées)",
		    "infoPostFix":    "",
		    "thousands":      ",",
		    "lengthMenu":     "Voir _MENU_ entrée",
		    "loadingRecords": "Chargement...",
		    "processing":     "En traitement...",
		   	"search":         "",
		    "searchPlaceholder": "Recherche",
		    "zeroRecords":    "Aucune données trouvées",
		    "paginate": {
		        "first":      "Première",
		        "last":       "Dernière",
		        "next":       "Suivant",
		        "previous":   "Précédent"
		    }
	    },
	    "paging":   false,
        "info":     false,
        "searching":	false,
	};

	var tableFrTranslateWithoutEntries = {
		"language": {
	        "decimal":        "",
		    "emptyTable":     "Aucune données disponible",
		    "info":           "_START_ à _END_ sur _TOTAL_ entrées",
		    "infoEmpty":      "0 à 0 sur 0 entrées",
		    "infoFiltered":   "(Total de _MAX_ total entrées)",
		    "infoPostFix":    "",
		    "thousands":      ",",
		    "lengthMenu":     "Voir _MENU_ entrée",
		    "loadingRecords": "Chargement...",
		    "processing":     "En traitement...",
		    "search":         "",
		    "searchPlaceholder": "Recherche",
		    "zeroRecords":    "Aucune données trouvées",
		    "paginate": {
		        "first":      "Première",
		        "last":       "Dernière",
		        "next":       "Suivant",
		        "previous":   "Précédent"
		    }
	    },
        "bLengthChange":     false,
	};

	// Specific table without the top-left élément (nb x - y entries)
	$('#tournament-teams-table').DataTable(tableFrTranslateWithoutEntries);
	$('#teams-table').DataTable(tableFrTranslateWithoutEntries);
	$('#participants-table').DataTable(tableFrTranslateWithoutEntries);
	// All tables without all data, just the table
	$('.translate').DataTable(tableFrTranslateWithoutAllInfos);

	// datatables add a container fluid, I don't want that, so I delete the class
	$('.dataTables_wrapper').removeClass('container-fluid');

	// Redirect when click on a cell
	$('#pools-table td.clickable').on('click', function(){
		var tournament_id = $("#pools-table").data("tournament");
		var pool_id = $(this).data("id");
		window.location.href = tournament_id+"/pools/"+pool_id;
	});

	$('#teams-table').on('click', 'td.clickable', function(){
		var team_id = $(this).data("id");
		window.location.href = "teams/"+team_id;
	});

	$('#teams-show-table').on('click', 'td.clickable', function(){
		var participant_id = $(this).data("id");
		window.location.href = "/admin/participants/"+participant_id;
	});

	$('#participants-table').on('click', 'td.clickable', function(){
		var participant_id = $(this).data("id");
		window.location.href = "participants/"+participant_id;
	});

	$('#participants-show-table').on('click', 'td.clickable', function(){
		var team_id = $(this).data("id");
		window.location.href = "/admin/teams/"+team_id;
	});

	$('#tournament-teams-table').on('click', 'td.clickable', function(){
		var team_id = $(this).data("id");
		window.location.href = "/admin/teams/"+team_id;
	});
});

$(document).ready(function() {
    $('.big-screen').click(function(e) {
        e.preventDefault();

        console.log($(this).attr("href"));

        window.open($(this).attr("href"), "_blank", "height=" + screen.height +",width=" + screen.width + "");
    });
});

$(document).ready(function() {
    $('.return').each(function() {
        $(this).click(function(event) {
            event.preventDefault();
            history.back();
        });
    })
});

$( document ).ready(function() {
	$("table#matches td.action i.editScore").click(function() {
		unlockScore($(this));
	});

	function unlockScore(pencil){

		pencil.parent().children('.editTime').hide();

		var tdAction = pencil.parent();
		var tdScore1 = tdAction.parent().children("td.score1");
		var tdScore2 = tdAction.parent().children("td.score2");
		// Get scores of each team
		var score1 = tdScore1.text();
		var score2 = tdScore2.text();
		// Clear the TDs
		tdScore1.empty();
		tdScore2.empty();
		// Create form inputs
		var inputScore1 = document.createElement("input");
		inputScore1.setAttribute('type',"number");
		inputScore1.setAttribute('min',"0");
		inputScore1.setAttribute('value',score1);
		var inputScore2 = document.createElement("input");
		inputScore2.setAttribute('type',"number");
		inputScore2.setAttribute('min',"0");
		inputScore2.setAttribute('value',score2);
		// Append
		tdScore1.append(inputScore1);
		tdScore2.append(inputScore2);
		// Create and delete icons
		var checkSquare = document.createElement("i");
		checkSquare.className += "fa fa-lg fa-check-square-o";
		checkSquare.setAttribute('aria-hidden',"true");
		var cross = document.createElement("i");
		cross.className += "fa fa-lg fa-times";
		cross.setAttribute('aria-hidden',"true");
		pencil.after(checkSquare);
		checkSquare.after(cross);

		pencil.remove();

		// Discard all things
		$(cross).click(function(){

			//display edit score btn
			$(this).parent().children('.editTime').show();

			// Remove square and cross icons and recreate pencil icon
			tdAction.append(pencil);
			checkSquare.remove();
			cross.remove();

			// Remove inputs
			inputScore1.remove();
			inputScore2.remove();
			// Place old score on the TDs
			tdScore1.append(score1);
			tdScore2.append(score2);

			// Add listener to new pencil recreate
			pencil.click(function(){
				unlockScore($(this));
			});

		});

		$(checkSquare).click(function(){
			// Success
			if(valid($(inputScore1).val(), $(inputScore2).val())){
				ajaxCall(tdAction);
			}
			// Error
			else{
				displayAlert("danger", "Format de score invalide");
			}
		});
	}

	function displayAlert(type, message){
		$(".alert").remove();

		switch(type) {

	    	case "danger":

				var errorAlert = $("<div class='alert alert-danger' role='alert'>"+message+"</div>");
				$("#match-block").prepend(errorAlert);
				// After 2sec, the alert will disappear
				disappear(errorAlert);
		        break;

		    case "success":

				var success = $("<div class='alert alert-success' role='alert'>"+message+"</div>");
				$("#match-block").prepend(success);
				// After 2sec, the alert will disappear
				disappear(success);
		        break;
		}
	}

	function valid(score1, score2){
		var patternNumeric = /^[0-9]{1,3}$/;
		if(!patternNumeric.test(score1) || !patternNumeric.test(score2)){
    		return false;
    	}else{
    		return true;
    	}
	}

	function disappear(alert){
		alert.fadeTo(3000, 500).slideUp(500, function(){
		    alert.slideUp(500);
		});
	}

	function ajaxCall(tdAction){

		var tournamentId = $("table#matches").data("tournament");
		var poolId = $("table#matches").data("pool");
		var gameId = tdAction.parent().data("game");

		// Create the loader
		var opac = document.createElement("div");
		opac.id += "opac";
		var imgLoader = document.createElement('img');
		imgLoader.className += "loader";
		imgLoader.src = '/images/loader.gif';
		opac.prepend(imgLoader);
		document.body.prepend(opac);

		$.ajax({
            url         : '/admin/tournaments/'+tournamentId+'/pools/'+poolId+'/games/'+gameId+'',
            method      : 'PUT',
            dataType    : 'json',
            context     : this,
            cache       : false,
            headers     : {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data        : {
        		score1 : tdAction.parent().children("td.score1").children("input").val(),
        		score2 : tdAction.parent().children("td.score2").children("input").val()
            },
            error : function(xhr, options, ajaxError) {
            	if(xhr.status != 200){
            		displayAlert("danger", "Une erreur est survenue ...");
            	}
            	// Remove loader
				opac.remove();
            },
            success : function(data) {
            	// Create new pencil icon
            	var pencil = document.createElement("i");
				pencil.className += "fa fa-lg fa-trophy";
				pencil.setAttribute('aria-hidden',"true");

				// Create variable i will use
				var tdScore1 = tdAction.parent().children("td.score1");
				var tdScore2 = tdAction.parent().children("td.score2");
				var pencil = $(pencil);
                var checkSquare = tdAction.children("i.fa-check-square-o");
                var cross = tdAction.children("i.fa-times");

                // Remove time and display "-"
                checkSquare.parent().parent().children(".separator").text("-");
                checkSquare.parent().parent().children(".separator").removeClass("sepTime");

				// Remove square and cross icons and add pencil icon
				checkSquare.parent().children(".editTime").remove(); //delete pencil edit time
				tdAction.append(pencil);
				checkSquare.remove();
				cross.remove();

				// Place new score on the TDs
				tdScore1.append(tdScore1.children("input").val());
				tdScore2.append(tdScore2.children("input").val());

				// Remove inputs
				tdScore1.children("input").remove();
				tdScore2.children("input").remove();

				// Add listener to new pencil recreate
				pencil.click(function(){
					unlockScore($(this));
				});

				if ($('.sepTime').length == 0) {
					if ($('.close-pool-btn').length == 0) {
						$('h1').append('<a class="greenBtn close-pool-btn">Terminer la poule</a>');
						closePool();
					}
				}


				// Update the rankings table
				updateRankingstable(data);

				// Display success message
				displayAlert("success", "Changement effectué et classement mis à jour")

				// Remove loader
				opac.remove();

            }
        });
	}

	function updateRankingstable(rankings){
		// Clear the Tbdy and rebuilt it
		var tBody = $("#pool-rankings-table tbody");
		tBody.empty();
		for (var i = 0; i < rankings.length; i++) {
			// tr = document.createElement("tr");
			tr = $('<tr data-id="' + rankings[i]["team_id"] + '" data-rank="' + (i + 1) + '"></tr>');
			allTds = '<td>'+(i+1)+'</td><td>'+rankings[i]["team"]+'</td><td>'+rankings[i]["score"]+'</td><td>'+rankings[i]["W"]+'</td><td>'+rankings[i]["L"]+'</td><td>'+rankings[i]["D"]+'</td><td>'+rankings[i]["+-"]+'</td>';
			tr.html(allTds);
			tBody.append(tr);
		}

	}


});

$( document ).ready(function() {

	$("#shiftMatch").click(function() {
		// Create the loader
		var opac = document.createElement("div");
		opac.id += "opac";
		var imgLoader = document.createElement('img');
		imgLoader.className += "loader";
		imgLoader.src = '/images/loader.gif';
		opac.prepend(imgLoader);
		document.body.prepend(opac);

		event.preventDefault(); // cancel the event
		shiftMatch($(this));
	});

	function shiftMatch(self){

		var shiftTime = $('#shiftTime').val();

		//if empty or not numeric
		if(!(shiftTime % 1 === 0 && shiftTime != '')){
			displayAlert("danger", "Le décalage doit être un numéro entier qui correspond à un temps en minute...");
			opac.remove();
			return;
		}

		var matches = $('#matches tr .sepTime');
		var tournamentId = $("table#matches").data("tournament");
		var poolId = $("table#matches").data("pool");

		matches.each(function()
		{
			var gameId = $(this).parent().data("game");

		    var oldTime = $(this).text();

			var tempTime = oldTime.split(':');
			var timeInSecond = tempTime[0] * 60 * 60 + tempTime[1] * 60 ; 

			//add time
			timeInSecond += (shiftTime * 60)
		
			//convert second in string HH:MM:SS
			var newDate = new Date(null);
			newDate.setTime( newDate.getTime() + newDate.getTimezoneOffset()*60*1000 ); // make timezone correcte
			newDate.setSeconds(timeInSecond); 
			var result = newDate.toISOString().substr(11, 8);

			// create var for the dom display and for the DB , the 0 add in start and the slice fix the number for having 14:05:00 instead of 14:5:0
			var timeDOM = ('0'+newDate.getHours()).slice(-2)+":"+('0'+newDate.getMinutes()).slice(-2);
			var timeDB = ('0'+newDate.getHours()).slice(-2)+":"+('0'+newDate.getMinutes()).slice(-2)+":"+('0'+newDate.getSeconds()).slice(-2);

			$.ajax({
	            url         : '/admin/tournaments/'+tournamentId+'/pools/'+poolId+'/games/'+gameId,
	            method      : 'PUT',
	            context     : this,
	            cache       : false,
	            headers     : {            
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')        
	            },
	            data        : {
	        		newTime : timeDB
	            },
	            error : function(xhr, options, ajaxError) {
	            	if(xhr.status != 200){
	            		displayAlert("danger", "Une erreur est survenue ...");
	            		// Remove loader
                        opac.remove();
	            	}
	            },
	            success : function(data) {
	            	$(this).text(timeDOM);

	            	// limit number of alerts to one. This is done because multiple request are made.
                    if (!$('.alert.alert-success').length) {
                        displayAlert("success", "Le décalage des heures a bien été effectué");
                    }

                    if($('#opac').length){
	                    // Remove loader
	                    opac.remove();
                	}
	            }
	        });

		});

	

	} //shiftMatch

	function displayAlert(type, message){	
		$(".alert").remove();

		switch(type) {

	    	case "danger":

				var errorAlert = $("<div class='alert alert-danger' role='alert'>"+message+"</div>");
				$("#match-block").prepend(errorAlert);
				// After 2sec, the alert will disappear
				disappear(errorAlert);
		        break;

		    case "success":

				var success = $("<div class='alert alert-success' role='alert'>"+message+"</div>");
				$("#match-block").prepend(success);
				// After 2sec, the alert will disappear
				disappear(success);
		        break;
		}
	}

	function disappear(alert){
		alert.fadeTo(3000, 500).slideUp(500, function(){
		    alert.slideUp(500);
		});
	}

	//EDIT TIME
	
	$("table#matches td.action i.editTime").click(function() {
		unlockTime($(this));
	});

	function unlockTime(pencil){

		pencil.parent().children('.editScore').hide();

		var tdAction = pencil.parent();
		var tdTime = tdAction.parent().children("td.separator");
		var hour = (tdTime.text()).split(":")[0]; 
		var minute = tdTime.text().split(":")[1];

		var form = '<input type="text" id="formHourTime" value="'+hour+'">:<input type="text" id="formMinuteTime" value="'+minute+'">';

		tdTime.text("");
		tdTime.append(form); 

		// Create and delete icons
		var checkSquare = document.createElement("i");
		checkSquare.className += "fa fa-lg fa-check-square-o";
		checkSquare.setAttribute('aria-hidden',"true");
		var cross = document.createElement("i");
		cross.className += "fa fa-lg fa-times";
		cross.setAttribute('aria-hidden',"true");
		pencil.after(checkSquare);
		checkSquare.after(cross);

		pencil.remove();
		// Discard all things
		$(cross).click(function(){


			//display edit score btn
			$(this).parent().children('.editScore').show();

			tdTime.text(hour+":"+minute);

			// Remove square and cross icons and recreate pencil icon
			tdAction.prepend(pencil);
			checkSquare.remove();
			cross.remove();

			// Add listener to new pencil recreate
			pencil.click(function(){
				unlockTime($(this));
			});
		});

		$(checkSquare).click(function(){

			// Create the loader
	        var opac = document.createElement("div");
	        opac.id += "opac";
	        var imgLoader = document.createElement('img');
	        imgLoader.className += "loader";
	        imgLoader.src = '/images/loader.gif';
	        opac.prepend(imgLoader);
	        document.body.prepend(opac);

			var newMinute = $("#formMinuteTime").val();
			var newHour = $("#formHourTime").val();
			
			// if not between 0 and 59, not numeric or empty
			if( newMinute >= 60 || newMinute < 0 || newMinute % 1 !== 0 || newMinute == ''){
				displayAlert("danger", "Format de temps invalide"); 
				return;
			}

			// if not between 0 and 59, not numeric or empty
			if( newHour >= 24 || newHour < 0 || newHour % 1 !== 0 || newHour == ''){
				displayAlert("danger", "Format de temps invalide"); 
				return;
			}

				

			var tournamentId = $("table#matches").data("tournament");
			var poolId = $("table#matches").data("pool");
			var gameId = $(this).parent().parent().data("game");
			var timeDB = newHour+":"+newMinute+":00";

			$.ajax({
	            url         : '/admin/tournaments/'+tournamentId+'/pools/'+poolId+'/games/'+gameId,
	            method      : 'PUT',
	            context     : this,
	            cache       : false,
	            headers     : {            
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')        
	            },
	            data        : {
	        		newTime : timeDB
	            },
	            error : function(xhr, options, ajaxError) {
	            	if(xhr.status != 200){
	            		displayAlert("danger", "Une erreur est survenue ...");
	            	}
	            	// Remove loader
                    opac.remove();
	            },
	            success : function(data) {
	            	  
	            	//display edit score btn
					$(this).parent().children('.editScore').show();

	            	if(newMinute.length == 1)
	            		newMinute = "0"+newMinute;

	            	if(newHour.length ==1)
	            		newHour = "0"+newHour;

	            	$(this).parent().parent().children(".separator").text(newHour+":"+newMinute);

					// Remove square and cross icons and recreate pencil icon
					tdAction.prepend(pencil);
					checkSquare.remove();
					cross.remove();

					// Add listener to new pencil recreate
					pencil.click(function(){
						unlockTime($(this));
					});

					displayAlert("success", "Changement d'heure effectué");

					// Remove loader
                    opac.remove();

	            }
	        });

		
		});

	}




});
$(document).ready(function() {
    $(".import").click(function() {
        $(this).parent().submit();
    });
});

$(document).ready(function() {
    closePool();
});


function closePool() {
    $('.close-pool-btn').click(function() {

        alertConfirmEndPool("Terminer la poule","Etes-vous sur de vouloir terminer la poule, le changement de score sera impossible après cette action !");

    });
}


// Display the popup
function alertConfirmEndPool(title, text) {
    swal({
        title: title,
        text: text,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Confirmer"
    },
    function(isConfirm){
        if(isConfirm) {


            // Create the loader
            var opac = document.createElement("div");
            opac.id += "opac";
            var imgLoader = document.createElement('img');
            imgLoader.className += "loader";
            imgLoader.src = '/images/loader.gif';
            opac.prepend(imgLoader);
            document.body.prepend(opac);


            var tournament_id = $("table#matches").data("tournament");
            var pool_id       = $("table#matches").data("pool");

            $("#pool-rankings-table tbody tr").each(function() {

                $.ajax({
                    url         : '/admin/tournaments/' + tournament_id + '/pools/' + pool_id,
                    method      : 'PUT',
                    dataType    : 'json',
                    cache       : false,
                    headers     : {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data        : {
                        team_id         : $(this).data("id"),
                        rank_in_pool    : $(this).data("rank")
                    },
                    success : function(data) {

                        // limit number of alerts to one. This is done because multiple request are made.
                        if (!$('.alert.alert-success.end-pool').length) {
                            // Display success message
                            var success = $("<div class='alert alert-success end-pool' role='alert'>Le poule à bien été terminée</div>");
                            $("#match-block").prepend(success);
                            // After 2sec, the alert will disappear
                            success.fadeTo(3000, 500).slideUp(500, function(){
                                success.slideUp(500);
                            });
                        }

                        $('.action i').each(function() {
                            $(this).remove();
                        });

                        $('.close-pool-btn').remove();

                        $('input#shiftTime').parent().remove();

                        // Remove loader
                        opac.remove();
                    },
                    error : function(xhr) {
                        console.error('readyState: ' + xhr.readyState);
                        console.error('status: ' + xhr.status);
                        console.error('responseText: ' + xhr.responseText);
                        // Remove loader
                        opac.remove();
                    }
                });

            });

        }

    });
}

$( document ).ready(function() {
	// Switch teams selecetion between a filed list and a text field
	// @author Davide Carboni

    $('#formProfile #switch').click(function() {
        //event.preventDefault(); // cancel the event click, needed to delte participant in team. Without the form is sumbit on icon click
        disableButtonValidate();
        CheckifCanSubmit();
        if ($('input[name="switch"]').is(':checked')){
            disableTeamsSelections();
            enabledTeamNew();
        }
        else
        {
            enableTeamsSelections();
            disableTeamNew();
        }
    });

    $('#formProfile #event').change(function (e) {
        e.preventDefault();
        var val =  $('#event option:selected').val();
        resetContent();
        disableTournamensSelections();
        disableTeamsSelections();
        disableTeamNew();
        disableSwitch();
        resetSwitch();
        disableButtonValidate();
        readListTournaments(val);
    });

    $('#formProfile #tournament').change(function (e) {
        e.preventDefault();
        var val =  $('#tournament option:selected').val();
        resetContent();
        disableTeamsSelections();
        disableTeamNew();
        enableSwitch();
        resetSwitch();
        disableButtonValidate();
        readListTeams(val);
    });

    $('#formProfile #teamSelected').change(function (e) {
        e.preventDefault();
        CheckifCanSubmit();
    });

    $("#formProfile #teamNew").on("change paste keyup", function() {
        CheckifCanSubmit();
    });

    // Read all tournaments for an events with ajax request
    function  readListTournaments(data) {
        $.ajax({
            type:'GET',
            url:'/events/' + data + '/tournaments',
            dataType    : 'json',
            context     : this,
            cache       : false,
            success:function(data){
                $( "#formProfile #tournament option" ).remove();
                $('#tournament').append('<option selected = "selected" disabled = "disabled" hidden="hidden">Sélectionner</option>'); // append an option tag for the array item
                for(var key in data) {
                    $('#tournament').append('<option value ="'+ key + '">' + data[key] + '</option>'); // append an option tag for the array item
                }
                enableTournamensSelections();
            }
        });
    }

    // Read all tems for an tournaments with ajax request
    function  readListTeams(data) {
        $.ajax({
            type:'GET',
            url:'/tournaments/' + data + '/teams',
            dataType    : 'json',
            context     : this,
            cache       : false,
            success:function(data){
                $( "#formProfile #teamSelected option" ).remove();
                $('#teamSelected').append('<option selected = "selected" disabled = "disabled"  hidden="hidden">Sélectionner</option>'); // append an option tag for the array item
                for(var key in data) {
                    $('#teamSelected').append('<option value ="'+ key + '">' + data[key] + '</option>'); // append an option tag for the array item
                }
                enableTeamsSelections();
            }
        });
    }

    // Read if the Teams already exsist
    function  TeamAlreadyExsist(data) {
        $.ajax({
            type:'GET',
            url:'/admin/teams/' + data,
            dataType    : 'json',
            context     : this,
            cache       : false,
            //data:{searchTerm:data},
            //headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success:function(data){
                if (data == '-1')
                {
                    enableButtonValidate();
                    errorMessage(false);
                }
                else {
                    disableButtonValidate();
                    errorMessage(true);
                }
            }
        });
    }

    // Check if the form is valid then enable then Button to Submit
    function CheckifCanSubmit()
    {
        if ($('input[name="switch"]').is(':checked')) {
            var val = $('#teamNew').val();
            if (val.length === 0)
                disableButtonValidate();
            else
                TeamAlreadyExsist(val);
        }
        else
        {
            var val = $('#teamSelected option:selected').val();
            var patternSelect = /^[0-9]+$/;
            if (patternSelect.test(val)) {
                enableButtonValidate();
            }
        }
    }

    // Enable-Disable the error message if the team already exsist
    function errorMessage(value)
    {
        if (value)
            $('#errorMessage').text(" - ATTENTION! Le noms de l'equipe est dèja utilisé");
        else
            $('#errorMessage').text("");
    }

    // Enabled button to validate the form
    function enableButtonValidate()
    {
        $('#formValidate').removeAttr('disabled','disabled');
    }

    // Enabled tournaments select input field
    function enableTournamensSelections()
    {
        $('#tournament').removeAttr('disabled','disabled');
    }

    // Enabled teams select input field
    function enableTeamsSelections()
    {
        $('#teamSelected').removeAttr('disabled','disabled');
    }

    // Enabled teamsNew text input field
    function enabledTeamNew() {
        $('#teamNew').removeAttr('disabled','disabled');
    }

    // Enable checkbox
    function enableSwitch() {
        $('#switch').removeAttr('disabled','disabled');
    }

    // Disable checkbox
    function disableSwitch() {
        $('#switch').attr('disabled','disabled');
    }

    // Disabled tournaments select input field
    function disableTournamensSelections()
    {
        $('#tournament').attr('disabled','disabled');
    }

    // Disabled teams new input text field
    function disableTeamNew()
    {
        $('#teamNew').attr('disabled','disabled');
    }

    // Disabled button to validate the form
    function disableButtonValidate()
    {
        $('#formValidate').attr('disabled','disabled');
    }

    // Disabled teams select input field
    function disableTeamsSelections()
    {
        $('#teamSelected').attr('disabled','disabled');
    }

    //Reset the checkbox switch
    function resetSwitch()
    {
        $('input[name="switch"]').prop('checked', false);
    }

    // reset content values in the input fields
    function resetContent(){
        $("#teamSelected option" ).remove();
        $("#teamNew").val("");
        $("#errorMessage").text("");
    }
});

$( document ).ready(function() {
    // Switch teams selecetion between a filed list and a text field
    // @author Davide Carboni

    $('#formTeam #event').change(function (e) {
        e.preventDefault();
        var val =  $('#event option:selected').val();
        resetContent();
        disableTournamensSelections();
        disableTeamNew();
        disableButtonValidate();
        readListTournaments(val);
    });

    $('#formTeam #tournament').change(function (e) {
        e.preventDefault();
        var val =  $('#tournament option:selected').val();
        resetContent();
        enabledTeamNew();
        disableButtonValidate();
    });

    $("#formTeam #name").on("change paste keyup", function() {
        CheckifCanSubmit();
    });

    // Read all tournaments for an events with ajax request
    function  readListTournaments(data) {
        $.ajax({
            type:'GET',
            url:'/events/' + data + '/tournaments',
            dataType    : 'json',
            context     : this,
            cache       : false,
            success:function(data){
                $( "#formProfile #tournament option" ).remove();
                $('#tournament').append('<option selected = "selected" disabled = "disabled" hidden="hidden">Sélectionner</option>'); // append an option tag for the array item
                for(var key in data) {
                    $('#tournament').append('<option value ="'+ key + '">' + data[key] + '</option>'); // append an option tag for the array item
                }
                enableTournamensSelections();
            }
        });
    }

    // Read if the Teams already exsist
    function  TeamAlreadyExsist(data) {
        $.ajax({
            type:'GET',
            url:'/admin/teams/' + data,
            dataType    : 'json',
            context     : this,
            cache       : false,
            //data:{searchTerm:data},
            //headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success:function(data){
                if (data == '-1')
                {
                    enableButtonValidate();
                    errorMessage(false);
                }
                else {
                    disableButtonValidate();
                    errorMessage(true);
                }
            }
        });
    }

    // Check if the form is valid then enable then Button to Submit
    function CheckifCanSubmit()
    {
        var val = $('#name').val();
        TeamAlreadyExsist(val);
    }

    // Enable-Disable the error message if the team already exsist
    function errorMessage(value)
    {
        if (value)
            $('#errorMessage').text(" - ATTENTION! Le noms de l'equipe est dèja utilisé");
        else
            $('#errorMessage').text("");
    }

    // Enabled button to validate the form
    function enableButtonValidate()
    {
        $('#formValidate').removeAttr('disabled','disabled');
    }

    // Enabled tournaments select input field
    function enableTournamensSelections()
    {
        $('#tournament').removeAttr('disabled','disabled');
    }

    // Enabled teams select input field
    function enableTeamsSelections()
    {
        $('#teamSelected').removeAttr('disabled','disabled');
    }

    // Enabled teamsNew text input field
    function enabledTeamNew() {
        $('#name').removeAttr('disabled','disabled');
    }

    // Disabled tournaments select input field
    function disableTournamensSelections()
    {
        $('#tournament').attr('disabled','disabled');
    }

    // Disabled teams new input text field
    function disableTeamNew()
    {
        $('#name').attr('disabled','disabled');
    }

    // Disabled button to validate the form
    function disableButtonValidate()
    {
        $('#formValidate').attr('disabled','disabled');
    }

    // reset content values in the input fields
    function resetContent(){
        $("#name").val("");
        $("#errorMessage").text("");
    }
});

//# sourceMappingURL=all.js.map
