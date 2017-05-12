$(document).ready(function(){function e(e,t,a){swal({title:t,text:a,type:"warning",showCancelButton:!0,cancelButtonText:"Annuler",confirmButtonColor:"#DD6B55",confirmButtonText:"Confirmer",closeOnConfirm:!1},function(t){t?$(e).submit():$(".addMember")[0]&&($(".addMember").find("option")[0].selected=!0)})}$(".button-delete").click(function(){event.preventDefault();var t=$(this).data("type"),a=$(this).data("name"),r="",o="",n=$(this).parent();switch(t){case"sport":r='Voulez-vous vraiment supprimer le sport "'+a+'"?',o="La suppression de ce sport va entrainer la suppression des courts liés";break;case"court":r='Voulez-vous vraiment supprimer le terrain "'+a+'"?';break;case"tournament":r='Voulez-vous vraiment supprimer le tournois "'+a+'" ?';break;case"teamMember":r='Voulez-vous vraiment supprimer "'+a+'" de cette équipe ?';break;case"memberTeam":r="Voulez-vous vraiment retirer "+a+" ?"}e(n,r,o)}),$(".addMember").change(function(){var t=$(this).find("option:selected").text(),a=$(this).parent();if("team"==$(this).attr("name"))var r="Voulez-vous ajouter ce participant à l'équipe \""+t+'" ?';else var r='Voulez-vous ajouter "'+t+"\" à l'équipe ?";e(a,r,"")})}),$(document).ready(function(){$(".show-devs").click(function(){$(".dev-names").hasClass("hide")?$(".dev-names").removeClass("hide").addClass("show"):$(".dev-names").removeClass("show").addClass("hide")})}),$(document).ready(function(){$(".formSend").click(function(){var e=$(this).parent().parent(),t=e.attr("id"),a="";switch(t){case"formSport":var r=$("#formSport #name").val(),o=$("#formSport #description").val(),n=/^[a-zA-Z0-9-_ ]{3,20}$/,i=/^[a-zA-Z0-9-_ ]{0,45}$/;n.test(r)||(a+="Le champ Nom ne doit pas être vide et doit avoir entre 3 et 45 caractères.<br>"),i.test(o)||(a+="Le champ Description peut avoir maximum 45 caractères.<br>");break;case"formCourt":var r=$("#formCourt #name").val(),s=$("#formCourt #sport").val(),n=/^[a-zA-Z0-9-_ ]{1,20}$/,c=/^[0-9]+$/;n.test(r)||(a+="Le champ Nom ne doit pas être vide et doit avoir entre 1 et 20 caractères.<br>"),c.test(s)||(a+="Aucun sport sélectionné.<br>");break;case"formEvent":var r=$("#formEvent #name").val(),d=$("#formEvent #img").val(),n=/^[a-zA-Z0-9-_ ]{3,20}$/;n.test(r)||(a+="Le champ Nom ne doit pas être vide et doit avoir entre 3 et 20 caractères.<br>"),""==d&&$("#formEvent").is(".add")&&(a+="Le champ Image ne doit pas être vide.<br>");break;case"formTournament":var r=$("#formTournament #name").val(),s=$("#formTournament #sport").val(),l=$("#formTournament #startDate").val(),m=$("#formTournament #startTime").val(),d=$("#formTournament #img").val(),n=/^[a-zA-Z0-9-_ ]{3,45}$/,c=/^[0-9]+$/,u=/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,p=/^([01]\d|2[0-3]):?([0-5]\d)$/;n.test(r)||(a+="Le champ Nom ne doit pas être vide et doit avoir entre 3 et 45 caractères.<br>"),c.test(s)||(a+="Aucun sport sélectionné.<br>"),p.test(m)||(a+="Le champ Heure de début ne doit pas être vide et doit être sous la forme hh:mm.<br>"),u.test(l)||(a+="Le champ Date de début ne doit pas être vide et doit être sous la forme jj.mm.aaaa.<br>"),""==d&&$("#formTournament").is(".add")&&(a+="Le champ Image ne doit pas être vide.<br>")}""==a?e.submit():($(".alert").remove(),$(".alert-danger").remove(),$("h1").after('<div class="alert alert-danger">'+a+"</div>"))})}),$(document).ready(function(){$("#login_link").click(function(){$("#login_popup").modal(),$("#login_popup .modal-body .error").remove()}),$("#login_popup").on("shown.bs.modal",function(){$("#username").focus()}),$("#login_popup .btn-login-form").click(function(e){e.preventDefault();var t=$("#login-form #username").val(),a=$("#login-form #password").val(),r=$("#login-form input[name=_token]").val();$.ajax({url:"/admin",method:"POST",dataType:"html",headers:{"X-CSRF-TOKEN":r},data:{username:t,password:a},success:function(e){var t=e.split("::");if("accepted"==t[0])window.location.href=t[1];else{var a=t[1];$("#login_popup .modal-body .error").remove(),$("#login_popup .modal-body").append('<div class="error">'+a+"</div>"),$("#login-form #password").val("")}}})})}),$(document).ready(function(){$("#multiple-teams-select").length&&$("#multiple-teams-select").select2({placeholder:"Choisir une équipe",allowClear:!0})}),$(document).ready(function(){$(".search").on("input",function(e){var t=$(".search").val().toLowerCase();$(".searchIn tr, .searchIn .hideSearch").each(function(){var e=$(this).find(".name").text().toLowerCase();e.indexOf(t)<0?$(this).hide("fast"):$(this).show("fast")})});var e={language:{decimal:"",emptyTable:"Aucune données disponible",info:"_START_ à _END_ sur _TOTAL_ entrées",infoEmpty:"0 à 0 sur 0 entrées",infoFiltered:"(Total de _MAX_ total entrées)",infoPostFix:"",thousands:",",lengthMenu:"Voir _MENU_ entrée",loadingRecords:"Chargement...",processing:"En traitement...",search:"",searchPlaceholder:"Recherche",zeroRecords:"Aucune données trouvées",paginate:{first:"Première",last:"Dernière",next:"Suivant",previous:"Précédent"}},paging:!1,info:!1,searching:!1},t={language:{decimal:"",emptyTable:"Aucune données disponible",info:"_START_ à _END_ sur _TOTAL_ entrées",infoEmpty:"0 à 0 sur 0 entrées",infoFiltered:"(Total de _MAX_ total entrées)",infoPostFix:"",thousands:",",lengthMenu:"Voir _MENU_ entrée",loadingRecords:"Chargement...",processing:"En traitement...",search:"",searchPlaceholder:"Recherche",zeroRecords:"Aucune données trouvées",paginate:{first:"Première",last:"Dernière",next:"Suivant",previous:"Précédent"}},bLengthChange:!1};$("#tournament-teams-table").DataTable(t),$("#teams-table").DataTable(t),$("#participants-table").DataTable(t),$(".translate").DataTable(e),$(".dataTables_wrapper").removeClass("container-fluid"),$("#pools-table tr td").click(function(){var e=$("#pools-table").data("tournament"),t=$(this).data("id");window.location.href=e+"/pools/"+t}),$("#teams-table tr td").click(function(){var e=$(this).data("id");window.location.href="teams/"+e}),$("#teams-show-table tr td").click(function(){var e=$(this).data("id");window.location.href="/admin/participants/"+e}),$("#participants-table tr td").click(function(){var e=$(this).data("id");window.location.href="participants/"+e}),$("#participants-show-table tr td").click(function(){var e=$(this).data("id");window.location.href="/admin/teams/"+e}),$("#tournament-teams-table tr td").click(function(){var e=$(this).data("id");window.location.href="/admin/teams/"+e})});