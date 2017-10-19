export function heng_2017_sept(): string {
        return `<table cellspacing="0" cellpadding="0" width="100%" border="0" id="notDisplay"> 
  <tbody> 
    <tr class="utarbgcolor"> 
      <td width="70" class="utar_logo"> </td> 
      <td width="693" valign="bottom"><div class="topmenu">&nbsp;</div> 
        <table height="23" cellspacing="0" cellpadding="0" border="0"> 
          <tbody> 
            <tr class="utarbgcolor"> 
               
	  
              <td class="tab_back_on"> <a class="tab-on" onmouseover="window.status='Done'; return true;" href="#"> <span class="tab-on">Home</span></a> </td> 
              <td width="7" class="tab_right_on"></td> 
              <td width="7"><img height="23" hspace="0" src="https://unitreg.utar.edu.my/portal/courseRegStu/images/tab_left_off.gif" width="7" border="0"><br></td> 
			  <td align="center" nowrap="" background="https://unitreg.utar.edu.my/portal/courseRegStu/images/tab_back_off.gif" bgcolor="#21455a">&nbsp;&nbsp; 
			  <a class="tab-off" href="#" onclick="logout('https://unitreg.utar.edu.my/portal/courseRegStu/','logout.jsp');"> <span class="tab-off">Log Out</span></a>&nbsp;&nbsp;</td> 
              <td width="7"><img height="23" hspace="0" src="https://unitreg.utar.edu.my/portal/courseRegStu/images/tab_right_off.gif" width="7" border="0"><br></td> 
            </tr> 
          </tbody> 
        </table></td> 
    </tr> 
    <tr> 
      <td colspan="2" nowrap="" class="menubgcolor">&nbsp; </td> 
    </tr> 
  </tbody> 
</table> 
<table width="100%" height="530" border="0" cellpadding="0" cellspacing="0"> 
<tbody><tr>
	<td>Welcome, HENG AIK KEE (15UEB01196)
	<img src="../images/help_icon.gif" border="0" style="margin-left:5em "> <a href="../GD-ICTC-001.pdf" target="_blank">User Guide</a>
	</td>
</tr>
<tr> 
 




 
	
								
																

	






<td width="100%" valign="top">
	<table width="100%" height="520" border="0" cellpadding="0" cellspacing="0">        			
		<tbody><tr>
			<td width="100%" valign="top">					
				<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">            				
					<tbody><tr>
						<td>						
<!--  Start Content -->
<script language="javascript">
	function changePage(pageNo){
		document.frmRefresh.reqCPage.value=pageNo;
		document.frmRefresh.submit();	
	}	
	
	function checkUnit(){
		
		try{
		
			if(!validateSpecialChar(document.frmParam.reqUnit, "Unit")){
				return false;
			}
			
			if("Any"==document.frmParam.reqFrom.value && "Any"!=document.frmParam.reqTo.value){
				alert("Please select from time");
				return false;
			}
			
			if("Any"!=document.frmParam.reqFrom.value && "Any"==document.frmParam.reqTo.value){
				alert("Please select to time");
				return false;
			}		
			
			if("Any"!=document.frmParam.reqFrom.value && "Any"!=document.frmParam.reqTo.value){
				if(!checkFTtime(document.frmParam.reqFrom,document.frmParam.reqTo))
					return false
			}
			
			document.frmParam.search.disabled = true;
			return true;
		}catch(e){alert(e);}		
	}	

	function validateSpecialChar(objectField, msg){
	
		var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
		
		for (var i = 0; i < objectField.value.length; i++) {
			if (iChars.indexOf(objectField.value.charAt(i)) != -1) {
				alert ("Your "+msg+" has special characters. \nThese are not allowed.\n Please remove them and try again.");
				return false;
			}
		}
		return true;
	}	
	

	function checkFTtime(objFrom,objTo)
	{
		if (objTo.value != "" && objFrom.value!=""){	
			if (objFrom.value == objTo.value){
				alert('Cant be the same time');
				return false;
			} else {
				var Fh=0, Fhh=0,Fmm=0;
				var Fmin=0;
				Fhh = objFrom.value.substr(0,objFrom.value.indexOf(":"));
				Fmm = objFrom.value.substr(objFrom.value.indexOf(":")+1,2);
				if ((objFrom.value.indexOf("PM") > 2) && Fhh < 12)
					{Fh=12;}
				Fmin=(((Fhh-0)+Fh)*60)+(Fmm-0);
				
				var Th=0, Thh=0,Tmm=0;
				var Tmin=0;
				Thh = objTo.value.substr(0,objTo.value.indexOf(":"));
				Tmm = objTo.value.substr(objTo.value.indexOf(":")+1,2);
				if ((objTo.value.indexOf("PM") > 2) && Thh < 12){
					Th=12;
				}
				Tmin=(((Thh-0)+Th)*60)+(Tmm-0);
				
				if (Fmin > Tmin){
					alert("(From time) can't bigger than the (To time)");
					return false;
				}
				return true;
			}
		}
	}	
	
	function viewUnit(){
		document.getElementById('unit').style.display='';	
	}
</script>



<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> 
	<tbody><tr>
		<td class="dotted"><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" height="1px" width="1px"></td>
	</tr>								
	<tr>
		<td width="100%">
			<h2><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/link1.gif"> Course Timetable Preview</h2> 
		</td>
	</tr>
	<tr>
		<td class="dotted"><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" height="1px" width="1px"></td>
	</tr>								
</tbody></table>
<table id="notDisplay" cellspacing="0" cellpadding="0" border="0">
 <tbody>
  <tr>
   <td class="tab-selected"><img height="19" alt="" src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" width="9"></td>
   <td class="tab-selected">
    <a class="tab-link-selected" href="https://unitreg.utar.edu.my/portal/courseRegStu/schedule/masterSchedule.jsp">Course Timetable Preview
    </a></td>
   <td class="tab-mid2">
    <img height="8" alt="" src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" width="30">
   </td>
   <td class="tab-unselected">
    <a class="tab-link-unselected" href="https://unitreg.utar.edu.my/portal/courseRegStu/registration/studentRegistration.jsp">My Course Registration
    </a></td>
   <td class="tab-mid-end">
    <img height="8" alt="" src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" width="30">
   </td>
  </tr>
 </tbody>
</table>
<table id="notDisplay" width="100%" height="6" border="0" cellpadding="0" cellspacing="0">
 <tbody>
  <tr>
   <td class="tab-dblue-table"><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" height="4" width="1"></td>
  </tr>
  <tr>
   <td class="tab-dwhite-table"><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" height="4" width="1"></td>
  </tr>
  </tbody>
</table>


<div>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="normal">
		<tbody><tr>
			<td class="normalTbl-subheader">Session</td>
			<td>201710</td>
				
			<td class="normalTbl-subheader">Class Type</td>
			<td>Full-time</td>			
			<td class="normalTbl-subheader">Faculty</td>
			<td>LKC FES</td>		
					
			<td class="normalTbl-subheader">Campus</td>
			<td>Sungai Long Campus</td>		
			<td class="normalTbl-subheader">Duration (Weeks)</td>				
			<td>16/10/2017 - 03/12/2017 (7)</td>					
		</tr>
	</tbody></table>
</div>
<div id="debugSql"></div>

<br>


<div align="center">	
	<table id="tblGrid" width="60%" class="normal">			
	<form name="frmParam" action="masterSchedule.jsp" method="POST" onsubmit="return checkUnit();"></form>
		<input type="hidden" name="act" value="view">
		<tbody><tr>
			<td align="left" class="normalTbl-subheader" width="35%">Course</td>
			<td align="left">
				<input type="text" id="reqUnit" name="reqUnit" value="" maxlength="15" size="17" class="iform">
				<input type="submit" name="search" value="Search" class="button">
			</td>
		</tr>		
		<tr>
			<td align="left" class="normalTbl-subheader">Day</td>
			<td align="left">
				<select name="reqDay" class="iform">
<option value="" selected="">Any</option>
<option value="1">Mon</option>
<option value="2">Tue</option>
<option value="3">Wed</option>
<option value="4">Thu</option>
<option value="5">Fri</option>
<option value="6">Sat</option>
<option value="7">Sun</option>
</select>

			</td>					
		</tr>
		<tr>
			<td align="left" class="normalTbl-subheader">Duration</td>
			<td align="left">
				From<select name="reqFrom" class="iform">
<option value="Any" selected="">Any</option>
<option value="7:00 AM">7:00 AM</option>
<option value="7:30 AM">7:30 AM</option>
<option value="8:00 AM">8:00 AM</option>
<option value="8:30 AM">8:30 AM</option>
<option value="9:00 AM">9:00 AM</option>
<option value="9:30 AM">9:30 AM</option>
<option value="10:00 AM">10:00 AM</option>
<option value="10:30 AM">10:30 AM</option>
<option value="11:00 AM">11:00 AM</option>
<option value="11:30 AM">11:30 AM</option>
<option value="12:00 PM">12:00 PM</option>
<option value="12:30 PM">12:30 PM</option>
<option value="1:00 PM">1:00 PM</option>
<option value="1:30 PM">1:30 PM</option>
<option value="2:00 PM">2:00 PM</option>
<option value="2:30 PM">2:30 PM</option>
<option value="3:00 PM">3:00 PM</option>
<option value="3:30 PM">3:30 PM</option>
<option value="4:00 PM">4:00 PM</option>
<option value="4:30 PM">4:30 PM</option>
<option value="5:00 PM">5:00 PM</option>
<option value="5:30 PM">5:30 PM</option>
<option value="6:00 PM">6:00 PM</option>
<option value="6:30 PM">6:30 PM</option>
<option value="7:00 PM">7:00 PM</option>
<option value="7:30 PM">7:30 PM</option>
<option value="8:00 PM">8:00 PM</option>
<option value="8:30 PM">8:30 PM</option>
<option value="9:00 PM">9:00 PM</option>
<option value="9:30 PM">9:30 PM</option>
<option value="10:00 PM">10:00 PM</option>
<option value="10:30 PM">10:30 PM</option>
<option value="11:00 PM">11:00 PM</option>
</select>

				To<select name="reqTo" class="iform">
<option value="Any" selected="">Any</option>
<option value="7:00 AM">7:00 AM</option>
<option value="7:30 AM">7:30 AM</option>
<option value="8:00 AM">8:00 AM</option>
<option value="8:30 AM">8:30 AM</option>
<option value="9:00 AM">9:00 AM</option>
<option value="9:30 AM">9:30 AM</option>
<option value="10:00 AM">10:00 AM</option>
<option value="10:30 AM">10:30 AM</option>
<option value="11:00 AM">11:00 AM</option>
<option value="11:30 AM">11:30 AM</option>
<option value="12:00 PM">12:00 PM</option>
<option value="12:30 PM">12:30 PM</option>
<option value="1:00 PM">1:00 PM</option>
<option value="1:30 PM">1:30 PM</option>
<option value="2:00 PM">2:00 PM</option>
<option value="2:30 PM">2:30 PM</option>
<option value="3:00 PM">3:00 PM</option>
<option value="3:30 PM">3:30 PM</option>
<option value="4:00 PM">4:00 PM</option>
<option value="4:30 PM">4:30 PM</option>
<option value="5:00 PM">5:00 PM</option>
<option value="5:30 PM">5:30 PM</option>
<option value="6:00 PM">6:00 PM</option>
<option value="6:30 PM">6:30 PM</option>
<option value="7:00 PM">7:00 PM</option>
<option value="7:30 PM">7:30 PM</option>
<option value="8:00 PM">8:00 PM</option>
<option value="8:30 PM">8:30 PM</option>
<option value="9:00 PM">9:00 PM</option>
<option value="9:30 PM">9:30 PM</option>
<option value="10:00 PM">10:00 PM</option>
<option value="10:30 PM">10:30 PM</option>
<option value="11:00 PM">11:00 PM</option>
</select>

			</td>					
		</tr>	
									
	
	</tbody></table>		
</div>	

<div><blockquote>During the pre-registration period, it is highly recommended that you <u>plan
carefully by referring to the programme structure of your programme</u> and <u>seek
the advice and guidance of your <strong>Academic Advisor</strong></u> in registering units for
the following trimester. It is your responsibility to ensure that you fulfil
all requirements and conditions of your programme for graduation.<br></blockquote></div>


<br>
<div id="overviewSector">

	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="normal">
		<form name="frmSummary" action="masterSchedulePro.jsp" method="post"></form>
		<input type="hidden" name="act" value="">
		<tbody><tr align="center"> 
			<td width="3%" class="normalTbl-subheader">No</td>
			<td width="3%" class="normalTbl-subheader">Type</td>
			<td width="5%" class="normalTbl-subheader">Group</td>
			<td width="5%" class="normalTbl-subheader">Class Size</td>
			<td width="4%" class="normalTbl-subheader">Day</td>
			<td width="14%" class="normalTbl-subheader">Time</td>
			<td width="5%" class="normalTbl-subheader">Hour</td>
			<td width="10%" class="normalTbl-subheader">Week</td>
			<td width="15%" class="normalTbl-subheader">Room</td>		
			<td width="5%" class="normalTbl-subheader">Remark</td>		
		</tr>
<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU3113 - HUBUNGAN ETNIK (FOR LOCAL STUDENTS) [3.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">1</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">90</td>
					
							
							<td>Mon</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB207</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222676">
						<td>Thu</td>
						<td>02:00 PM - 05:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB207</td>
					</tr>
					
					<tr align="center">
						<td rowspan="2">2</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">90</td>
					
							
							<td>Mon</td>
							<td>02:00 PM - 05:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB207</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222677">
						<td>Thu</td>
						<td>08:00 AM - 11:00 AM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB208</td>
					</tr>
					
					<tr align="center">
						<td rowspan="2">3</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">90</td>
					
							
							<td>Tue</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB208</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222680">
						<td>Thu</td>
						<td>02:00 PM - 05:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB209</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU3123 - TAMADUN ISLAM DAN TAMADUN ASIA (TITAS) [3.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">4</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">110</td>
					
							
							<td>Mon</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB209</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222667">
						<td>Tue</td>
						<td>02:00 PM - 05:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB209</td>
					</tr>
					
					<tr align="center">
						<td rowspan="2">5</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">110</td>
					
							
							<td>Tue</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB209</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222668">
						<td>Thu</td>
						<td>02:00 PM - 05:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB208</td>
					</tr>
					
					<tr align="center">
						<td rowspan="2">6</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">110</td>
					
							
							<td>Tue</td>
							<td>02:00 PM - 05:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB207</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222669">
						<td>Thu</td>
						<td>08:00 AM - 11:00 AM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB207</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU3143 - BAHASA MELAYU KOMUNIKASI 2 [3.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">7</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">10</td>
					
							
							<td>Tue</td>
							<td>08:30 AM - 11:30 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB312</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_225701">
						<td>Thu</td>
						<td>02:00 PM - 05:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB311</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU3173 - MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS) [3.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">8</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">10</td>
					
							
							<td>Tue</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB201</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_223028">
						<td>Fri</td>
						<td>02:30 PM - 05:30 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB201</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU32013 - BAHASA KEBANGSAAN A [3.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">9</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">30</td>
					
							
							<td>Tue</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB204</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_223026">
						<td>Wed</td>
						<td>08:00 AM - 11:00 AM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB201</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU34022 - ARTS AND CULTURAL PERFORMANCE [2.00]</td></tr>
				
					<tr align="center">
						<td rowspan="2">10</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">60</td>
					
							
							<td>Mon</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB210</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222472">
						<td>Wed</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>
					
					<tr align="center">
						<td rowspan="2">11</td>	
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">60</td>
					
							
							<td>Tue</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB211</td>

							<td rowspan="2"></td>
						</tr>			
	
					<tr align="center" id="subRow_222473">
						<td>Thu</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU34032 - COMMUNITY PROJECT [2.00]</td></tr>

					<tr align="center">
						<td rowspan="2">12</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">70</td>


							<td>Tue</td>
							<td>11:00 AM - 01:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222474">
						<td>Thu</td>
						<td>11:00 AM - 01:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB204</td>
					</tr>

					<tr align="center">
						<td rowspan="2">13</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">60</td>


							<td>Tue</td>
							<td>11:00 AM - 01:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222664">
						<td>Fri</td>
						<td>10:30 AM - 12:30 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB208</td>
					</tr>

					<tr align="center">
						<td rowspan="2">14</td>
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">60</td>


							<td>Tue</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222665">
						<td>Fri</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB208</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">MPU34152 - LEADERSHIP AND TEAMBUILDING [2.00]</td></tr>

					<tr align="center">
						<td rowspan="2">15</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">70</td>


							<td>Mon</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB210</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222470">
						<td>Wed</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB211</td>
					</tr>

					<tr align="center">
						<td rowspan="2">16</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">60</td>


							<td>Tue</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB316</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222471">
						<td>Thu</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB211</td>
					</tr>

					<tr align="center">
						<td rowspan="2">17</td>
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">60</td>


							<td>Tue</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB211</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222666">
						<td>Thu</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UALB1003 - INTRODUCTION TO GERMAN LANGUAGE [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">18</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">35</td>


							<td>Mon</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222458">
						<td>Wed</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB323</td>
					</tr>

					<tr align="center">
						<td rowspan="2">19</td>
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">30</td>


							<td>Mon</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB316</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222460">
						<td>Wed</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB301</td>
					</tr>

					<tr align="center">
						<td rowspan="2">20</td>
						<td rowspan="2">L</td>
						<td rowspan="2">4</td>
						<td align="right" rowspan="2">35</td>


							<td>Tue</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222461">
						<td>Thu</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB322</td>
					</tr>

					<tr align="center">
						<td rowspan="2">21</td>
						<td rowspan="2">T</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB320</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222462">
						<td>Wed</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">22</td>
						<td rowspan="2">T</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>05:00 PM - 06:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB320</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222463">
						<td>Wed</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">23</td>
						<td rowspan="2">T</td>
						<td rowspan="2">5</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB316</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222466">
						<td>Wed</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>

					<tr align="center">
						<td rowspan="2">24</td>
						<td rowspan="2">T</td>
						<td rowspan="2">6</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>05:00 PM - 06:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB316</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222467">
						<td>Wed</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>

					<tr align="center">
						<td rowspan="2">25</td>
						<td rowspan="2">T</td>
						<td rowspan="2">7</td>
						<td align="right" rowspan="2">20</td>


							<td>Tue</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB326</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222468">
						<td>Thu</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>

					<tr align="center">
						<td rowspan="2">26</td>
						<td rowspan="2">T</td>
						<td rowspan="2">8</td>
						<td align="right" rowspan="2">15</td>


							<td>Tue</td>
							<td>05:00 PM - 06:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB326</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222469">
						<td>Thu</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UALF1003 - INTRODUCTION TO FRENCH [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">27</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">35</td>


							<td>Mon</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB322</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222432">
						<td>Wed</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>

					<tr align="center">
						<td rowspan="2">28</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">35</td>


							<td>Mon</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222435">
						<td>Tue</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB323</td>
					</tr>

					<tr align="center">
						<td rowspan="2">29</td>
						<td rowspan="2">T</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB321</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222433">
						<td>Wed</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>

					<tr align="center">
						<td rowspan="2">30</td>
						<td rowspan="2">T</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB321</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222434">
						<td>Wed</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB210</td>
					</tr>

					<tr align="center">
						<td rowspan="2">31</td>
						<td rowspan="2">T</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB319</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222436">
						<td>Tue</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>

					<tr align="center">
						<td rowspan="2">32</td>
						<td rowspan="2">T</td>
						<td rowspan="2">4</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>05:00 PM - 06:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB319</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222437">
						<td>Tue</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB319</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UALJ2013 - INTRODUCTION TO JAPANESE [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">33</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">35</td>


							<td>Mon</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB323</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222441">
						<td>Wed</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB301</td>
					</tr>

					<tr align="center">
						<td rowspan="2">34</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>02:00 PM - 04:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB323</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222442">
						<td>Thu</td>
						<td>02:00 PM - 04:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB300</td>
					</tr>

					<tr align="center">
						<td rowspan="2">35</td>
						<td rowspan="2">T</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB325</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222443">
						<td>Wed</td>
						<td>11:00 AM - 12:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">36</td>
						<td rowspan="2">T</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB325</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222444">
						<td>Wed</td>
						<td>10:00 AM - 11:00 AM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">37</td>
						<td rowspan="2">T</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">7</td>


							<td>Mon</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB323</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222445">
						<td>Thu</td>
						<td>05:00 PM - 06:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB300</td>
					</tr>

					<tr align="center">
						<td rowspan="2">38</td>
						<td rowspan="2">T</td>
						<td rowspan="2">4</td>
						<td align="right" rowspan="2">8</td>


							<td>Mon</td>
							<td>05:00 PM - 06:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB323</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222446">
						<td>Thu</td>
						<td>04:00 PM - 05:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB300</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UEGE3114 - INDUSTRIAL TRAINING [4.00]</td></tr>

					<tr align="center">
						<td>39</td>
						<td>P</td>
						<td>5</td>
						<td align="right">200</td>


							<td>Sun</td>
							<td>08:00 AM - 12:00 PM</td>
							<td>4.0</td>
							<td>1-7</td>
							<td>To be arranged</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>40</td>
						<td>P</td>
						<td>7</td>
						<td align="right">200</td>


							<td>Sun</td>
							<td>08:00 AM - 12:00 PM</td>
							<td>4.0</td>
							<td>1-7</td>
							<td>To be arranged</td>

							<td></td>
						</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UEMK4343 - ENGINEERING ECONOMICS [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">41</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">150</td>


							<td>Tue</td>
							<td>11:00 AM - 02:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB207</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_223849">
						<td>Wed</td>
						<td>03:00 PM - 06:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB209</td>
					</tr>

					<tr align="center">
						<td>42</td>
						<td>T</td>
						<td>1</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>08:00 AM - 09:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB326</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>43</td>
						<td>T</td>
						<td>2</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>09:00 AM - 10:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB326</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>44</td>
						<td>T</td>
						<td>3</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>03:00 PM - 04:00 PM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB318</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>45</td>
						<td>T</td>
						<td>4</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>04:00 PM - 05:00 PM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB318</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>46</td>
						<td>T</td>
						<td>5</td>
						<td align="right">25</td>


							<td>Thu</td>
							<td>08:00 AM - 09:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB325</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>47</td>
						<td>T</td>
						<td>6</td>
						<td align="right">25</td>


							<td>Thu</td>
							<td>09:00 AM - 10:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB325</td>

							<td></td>
						</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UEMX2313 - STRUCTURAL ANALYSIS I [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">48</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">50</td>


							<td>Wed</td>
							<td>11:00 AM - 02:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB210</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_223629">
						<td>Fri</td>
						<td>08:00 AM - 11:00 AM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB301</td>
					</tr>

					<tr align="center">
						<td>49</td>
						<td>T</td>
						<td>1</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB320</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>50</td>
						<td>T</td>
						<td>2</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB320</td>

							<td></td>
						</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UEMX3653 - WATER AND WASTEWATER TREATMENT [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">51</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">175</td>


							<td>Tue</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB208</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_223621">
						<td>Thu</td>
						<td>11:00 AM - 02:00 PM</td>
						<td>3.0</td>
						<td>1-7</td>
						<td>KB209</td>
					</tr>

					<tr align="center">
						<td>52</td>
						<td>T</td>
						<td>1</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB326</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>53</td>
						<td>T</td>
						<td>2</td>
						<td align="right">25</td>


							<td>Tue</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB326</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>54</td>
						<td>T</td>
						<td>3</td>
						<td align="right">25</td>


							<td>Wed</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB319</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>55</td>
						<td>T</td>
						<td>5</td>
						<td align="right">25</td>


							<td>Thu</td>
							<td>08:00 AM - 09:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB319</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>56</td>
						<td>T</td>
						<td>6</td>
						<td align="right">25</td>


							<td>Thu</td>
							<td>09:00 AM - 10:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB319</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>57</td>
						<td>T</td>
						<td>7</td>
						<td align="right">25</td>


							<td>Thu</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>2-7</td>
							<td>KB323</td>

							<td></td>
						</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UJLL1093 - INTRODUCTION TO KOREAN [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">58</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222447">
						<td>Thu</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB300</td>
					</tr>

					<tr align="center">
						<td rowspan="2">59</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">35</td>


							<td>Mon</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222456">
						<td>Wed</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB211</td>
					</tr>

					<tr align="center">
						<td rowspan="2">60</td>
						<td rowspan="2">L</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">35</td>


							<td>Wed</td>
							<td>08:00 AM - 10:00 AM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222453">
						<td>Thu</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB301</td>
					</tr>

					<tr align="center">
						<td rowspan="2">61</td>
						<td rowspan="2">T</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">10</td>


							<td>Mon</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB318</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222449">
						<td>Thu</td>
						<td>11:00 AM - 12:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">62</td>
						<td rowspan="2">T</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">10</td>


							<td>Mon</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB318</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222450">
						<td>Thu</td>
						<td>10:00 AM - 11:00 AM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB320</td>
					</tr>

					<tr align="center">
						<td rowspan="2">63</td>
						<td rowspan="2">T</td>
						<td rowspan="2">3</td>
						<td align="right" rowspan="2">20</td>


							<td>Mon</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222451">
						<td>Wed</td>
						<td>11:00 AM - 12:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB325</td>
					</tr>

					<tr align="center">
						<td rowspan="2">64</td>
						<td rowspan="2">T</td>
						<td rowspan="2">4</td>
						<td align="right" rowspan="2">15</td>


							<td>Mon</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222452">
						<td>Wed</td>
						<td>10:00 AM - 11:00 AM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB325</td>
					</tr>

					<tr align="center">
						<td rowspan="2">65</td>
						<td rowspan="2">T</td>
						<td rowspan="2">5</td>
						<td align="right" rowspan="2">15</td>


							<td>Wed</td>
							<td>10:00 AM - 11:00 AM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB326</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222454">
						<td>Thu</td>
						<td>11:00 AM - 12:00 PM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB325</td>
					</tr>

					<tr align="center">
						<td rowspan="2">66</td>
						<td rowspan="2">T</td>
						<td rowspan="2">6</td>
						<td align="right" rowspan="2">20</td>


							<td>Wed</td>
							<td>11:00 AM - 12:00 PM</td>
							<td>1.0</td>
							<td>1-7</td>
							<td>KB326</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222455">
						<td>Thu</td>
						<td>10:00 AM - 11:00 AM</td>
						<td>1.0</td>
						<td>1-7</td>
						<td>KB325</td>
					</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UKMM1011 - SUN ZI'S ART OF WAR AND BUSINESS STRATEGIES [1.00]</td></tr>

					<tr align="center">
						<td>67</td>
						<td>L</td>
						<td>1</td>
						<td align="right">80</td>


							<td>Mon</td>
							<td>04:00 PM - 06:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB208</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>68</td>
						<td>L</td>
						<td>2</td>
						<td align="right">80</td>


							<td>Wed</td>
							<td>10:00 AM - 12:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB211</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>69</td>
						<td>L</td>
						<td>3</td>
						<td align="right">80</td>


							<td>Thu</td>
							<td>10:00 AM - 12:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>70</td>
						<td>L</td>
						<td>4</td>
						<td align="right">80</td>


							<td>Mon</td>
							<td>10:00 AM - 12:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>71</td>
						<td>L</td>
						<td>5</td>
						<td align="right">80</td>


							<td>Tue</td>
							<td>01:00 PM - 03:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB208</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>72</td>
						<td>L</td>
						<td>6</td>
						<td align="right">70</td>


							<td>Wed</td>
							<td>12:00 PM - 02:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB300</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>73</td>
						<td>L</td>
						<td>7</td>
						<td align="right">80</td>


							<td>Wed</td>
							<td>04:00 PM - 06:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB301</td>

							<td></td>
						</tr>
	<tr><td class="normalTbl-sub3header" colspan="10" height="15px">UKMM1043 - BASIC ECONOMICS, ACCOUNTING AND MANAGEMENT [3.00]</td></tr>

					<tr align="center">
						<td rowspan="2">74</td>
						<td rowspan="2">L</td>
						<td rowspan="2">1</td>
						<td align="right" rowspan="2">155</td>


							<td>Mon</td>
							<td>11:00 AM - 01:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB209</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222943">
						<td>Wed</td>
						<td>08:00 AM - 10:00 AM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB207</td>
					</tr>

					<tr align="center">
						<td rowspan="2">75</td>
						<td rowspan="2">L</td>
						<td rowspan="2">2</td>
						<td align="right" rowspan="2">160</td>


							<td>Tue</td>
							<td>11:00 AM - 01:00 PM</td>
							<td>2.0</td>
							<td>1-7</td>
							<td>KB208</td>

							<td rowspan="2"></td>
						</tr>

					<tr align="center" id="subRow_222944">
						<td>Wed</td>
						<td>12:00 PM - 02:00 PM</td>
						<td>2.0</td>
						<td>1-7</td>
						<td>KB207</td>
					</tr>

					<tr align="center">
						<td>76</td>
						<td>T</td>
						<td>1</td>
						<td align="right">20</td>


							<td>Mon</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB517</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>77</td>
						<td>T</td>
						<td>2</td>
						<td align="right">20</td>


							<td>Mon</td>
							<td>01:00 PM - 04:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB318</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>78</td>
						<td>T</td>
						<td>3</td>
						<td align="right">25</td>


							<td>Mon</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB326</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>79</td>
						<td>T</td>
						<td>4</td>
						<td align="right">20</td>


							<td>Tue</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB517</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>80</td>
						<td>T</td>
						<td>5</td>
						<td align="right">20</td>


							<td>Tue</td>
							<td>01:00 PM - 04:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB517</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>81</td>
						<td>T</td>
						<td>6</td>
						<td align="right">20</td>


							<td>Wed</td>
							<td>10:00 AM - 01:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB516</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>82</td>
						<td>T</td>
						<td>7</td>
						<td align="right">25</td>


							<td>Wed</td>
							<td>12:00 PM - 03:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB325</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>83</td>
						<td>T</td>
						<td>8</td>
						<td align="right">25</td>


							<td>Wed</td>
							<td>01:00 PM - 04:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB516</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>84</td>
						<td>T</td>
						<td>9</td>
						<td align="right">25</td>


							<td>Wed</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB321</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>85</td>
						<td>T</td>
						<td>10</td>
						<td align="right">20</td>


							<td>Thu</td>
							<td>08:00 AM - 11:00 AM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB321</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>86</td>
						<td>T</td>
						<td>11</td>
						<td align="right">20</td>


							<td>Thu</td>
							<td>10:00 AM - 01:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB319</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>87</td>
						<td>T</td>
						<td>12</td>
						<td align="right">20</td>


							<td>Thu</td>
							<td>01:00 PM - 04:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB321</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>88</td>
						<td>T</td>
						<td>13</td>
						<td align="right">25</td>


							<td>Fri</td>
							<td>09:30 AM - 12:30 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB318</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>89</td>
						<td>T</td>
						<td>14</td>
						<td align="right">25</td>


							<td>Fri</td>
							<td>09:30 AM - 12:30 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB319</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>90</td>
						<td>T</td>
						<td>15</td>
						<td align="right">18</td>


							<td>Wed</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB325</td>

							<td></td>
						</tr>

					<tr align="center">
						<td>91</td>
						<td>T</td>
						<td>17</td>
						<td align="right">25</td>


							<td>Mon</td>
							<td>03:00 PM - 06:00 PM</td>
							<td>3.0</td>
							<td>1-7</td>
							<td>KB516</td>

							<td>CI Y1T1</td>
						</tr>


	</tbody></table>


<br><br><br>
</div>
<form name="frmRefresh" action="masterSchedule.jsp" method="get">
	<input type="hidden" name="reqCPage" value="1">
	<input type="hidden" name="reqUnit" value="">
	<input type="hidden" name="reqDay" value="">
	<input type="hidden" name="reqFrom" value="Any">
	<input type="hidden" name="reqTo" value="Any">
</form>





<div>
<font color="black" id="notDisplay">Page Loaded In 328 miliseconds </font>
</div>

<!-- End Content -->
							</td>
  						</tr>
          			</tbody></table>
				</td>
          		<td width="10" rowspan="2"><img src="https://unitreg.utar.edu.my/portal/courseRegStu/images/clear.gif" width="10px"></td>
        	</tr>
		</tbody></table>
	</td>
  </tr>

<!--<script src="https://unitreg.utar.edu.my/portal/publicFunction.js"></script>-->
<tr id="notDisplay">
  <td valign="top" class="footerFont">
	<hr align="center" width="99%" size="1" noshade="">
	Copyright © 2017, Universiti Tunku Abdul Rahman. All rights reserved. <br>
	Info Optimized for  Internet Explorer 5.0 and above. Best viewed with 1024 x 768 pixels.<br>
	Terms of Usage

	</td>

  </tr>
</tbody></table>`;
}
