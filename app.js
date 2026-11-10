(function(){
var CFG=window.AZ_CONFIG||{},sb=null;
try{if(CFG.url&&CFG.key&&window.supabase)sb=window.supabase.createClient(CFG.url,CFG.key)}catch(e){}
var $=function(i){return document.getElementById(i)};
function esc(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function okU(u){return/^https:\/\//.test(u||"")}
var SUBJ=["Mathematics","English","Kiswahili","Biology","Chemistry","Physics","Computer Studies","French","Home Science","Building & Construction"],LV=["Form 3","Form 4","Grade 10"];
var LBL={web_admin:"Web administrator",school_admin:"School admin",teacher:"Teacher"};
var ME=null,SET={site_enabled:true,message:""},POSTS=[],RES=[],VL=[];
function opts(a){return a.map(function(s){return"<option>"+esc(s)+"</option>"}).join("")}
function fl(l,x){return"<label>"+l+"</label>"+x}
function fd(s){return new Date(s).toLocaleDateString("en-KE",{day:"numeric",month:"short",year:"numeric"})}
function wa(s,b){window.open("https://wa.me/254728646984?text="+encodeURIComponent(s+"\n\n"+b),"_blank","noopener")}
function room(){return"https://meet.jit.si/AzielSmart-"+crypto.randomUUID().slice(0,8)}
function att(u){if(!okU(u))return"";return/\.(png|jpe?g|webp|gif)(\?|$)/i.test(u)?'<img src="'+esc(u)+'" alt="" style="max-width:100%;border-radius:10px;margin-top:8px">':'<p><a href="'+esc(u)+'" target="_blank" rel="noopener">Open attachment →</a></p>'}
function rm(a){return'<button class="btn alt" '+a+' type="button" style="color:var(--pri);padding:4px 12px">Remove</button>'}
function cd(t,x,id,l,x2){return'<div class="card"><h3>'+t+'</h3>'+x+'<div class="row"><button class="btn" id="'+id+'" type="button">'+l+'</button>'+(x2||"")+'</div></div>'}
var ROW=' class="item" style="padding:6px 0;border-bottom:1px solid var(--line)"';
["ns","vs"].forEach(function(i){$(i).innerHTML=opts(["All subjects"].concat(SUBJ))});

/* ---------- public pages ---------- */
function rNews(){var L=POSTS.filter(function(p){return p.type!=="timetable"});
$("annList").innerHTML=L.length?L.map(function(p){return'<div class="card"><span class="tag">'+esc(p.type)+' · '+fd(p.created_at)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.body)+'</p>'+att(p.file_url)+'</div>'}).join(""):'<p class="note">No announcements yet.</p>'}
function rLive(){var C=RES.filter(function(r){return r.kind==="class"}),T=POSTS.filter(function(p){return p.type==="timetable"});
$("schedList").innerHTML=C.length?C.map(function(c){return'<div class="card"><span class="tag live">● ONLINE CLASS</span><h3>'+esc(c.title)+'</h3><div class="meta">'+esc(c.subject)+' · '+esc(c.level)+(c.teacher?' · '+esc(c.teacher):'')+'</div><p><b>'+esc(c.when_text)+'</b></p>'+(okU(c.url)?'<a class="btn" href="'+esc(c.url)+'" target="_blank" rel="noopener">Join Class</a>':"")+'</div>'}).join(""):'<p class="note">No online classes scheduled yet.</p>';
$("liveList").innerHTML=T.length?T.map(function(p){return'<div class="card"><span class="tag">Posted '+fd(p.created_at)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.body)+'</p>'+att(p.file_url)+'</div>'}).join(""):'<p class="note">The timetable has not been posted yet.</p>'}
function rNotes(){var q=$("nq").value.toLowerCase(),s=$("ns").value;
var L=RES.filter(function(r){return r.kind==="note"&&(s==="All subjects"||r.subject===s)&&r.title.toLowerCase().indexOf(q)>-1});
$("noteList").innerHTML=L.length?L.map(function(n){return'<div class="card item"><div><span class="tag">'+esc(n.subject)+'</span><h3>'+esc(n.title)+'</h3><div class="meta">'+fd(n.created_at)+'</div></div>'+(okU(n.url)?'<a class="btn" href="'+esc(n.url)+'" target="_blank" rel="noopener">Download</a>':"")+'</div>'}).join(""):'<p class="note">No notes yet.</p>'}
function rVids(){var s=$("vs").value;VL=RES.filter(function(r){return r.kind==="video"&&(s==="All subjects"||r.subject===s)});
$("vidList").innerHTML=VL.length?VL.map(function(v,i){return'<div class="card"><div class="thumb" data-v="'+i+'">▶</div><span class="tag">'+esc(v.subject)+'</span><h3>'+esc(v.title)+'</h3></div>'}).join(""):'<p class="note">No videos yet.</p>'}
$("nq").oninput=rNotes;$("ns").onchange=rNotes;$("vs").onchange=rVids;
$("vidList").onclick=function(e){var t=e.target.closest("[data-v]");if(!t)return;var v=VL[t.getAttribute("data-v")];if(!okU(v.url))return;
if(v.url.indexOf("/storage/v1/object/public/files/")>-1){$("dt").textContent=v.title;$("dv").innerHTML='<video controls autoplay playsinline src="'+esc(v.url)+'"></video>';$("dlg").showModal()}else window.open(v.url,"_blank","noopener")};
function closeD(){$("dv").innerHTML="";$("dlg").close()}
$("dx").onclick=closeD;$("dlg").addEventListener("click",function(e){if(e.target===$("dlg"))closeD()});

/* ---------- admissions, fees, contact (WhatsApp) ---------- */
var V=function(i){return $(i).value.trim()};
$("rsend").onclick=function(){if(!V("rn")||!V("rd")||!V("rp")||!V("rph")){$("rmsg").textContent="Please fill in all fields marked *.";return}
var ref="APP-"+Date.now().toString().slice(-6);wa("Admission application "+ref,"Reference: "+ref+"\nStudent: "+V("rn")+"\nDOB: "+V("rd")+"\nGender: "+V("rg")+"\nClass: "+V("rc")+"\nPrevious school: "+V("rs")+"\nElective: "+V("rel")+"\nParent: "+V("rp")+"\nPhone: "+V("rph")+"\nEmail: "+V("re"));
$("rmsg").innerHTML='<span class="ok">WhatsApp has opened with application '+ref+'. Press Send to complete it.</span>'};
$("fsend").onclick=function(){if(!V("fa")||!V("fm")||!V("fc"))return alert("Please fill in all three fields.");wa("Fee payment notice - "+V("fa"),"Student: "+V("fa")+"\nAmount: KES "+V("fm")+"\nCode: "+V("fc"))};
$("send").onclick=function(){wa("Enquiry – Aziel Smart Learning","Name: "+$("cn").value+"\nContact: "+$("ce").value+"\n\n"+$("cm").value)};

/* ---------- staff area ---------- */
async function up(id){var f=$(id).files[0];if(!f)return"";var n=Date.now()+"-"+f.name.replace(/[^\w.\-]+/g,"_");var r=await sb.storage.from("files").upload(n,f);if(r.error)throw r.error;return sb.storage.from("files").getPublicUrl(n).data.publicUrl}
async function ins(t,row){var r=await sb.from(t).insert(row);if(r.error)throw r.error}
async function del(t,c,v){var r=await sb.from(t).delete().eq(c,v).select();if(r.error)throw r.error;if(!r.data.length)throw new Error("You are not allowed to remove this.")}
function loadStaff(){Promise.all([sb.from("profiles").select("*").order("created_at"),sb.from("staff_invites").select("*")]).then(function(a){var web=ME.role==="web_admin",h="<h3>Current staff</h3>";
(a[0].data||[]).forEach(function(p){h+="<div"+ROW+"><span>"+esc(p.email)+' <span class="tag">'+LBL[p.role]+"</span></span>"+((web||p.role==="teacher")&&p.id!==ME.id?rm('data-sp="'+esc(p.id)+'"'):"")+"</div>"});
var iv=a[1].data||[];if(iv.length){h+="<h3>Waiting to create an account</h3>";iv.forEach(function(x){h+="<div"+ROW+"><span>"+esc(x.email)+' <span class="tag">'+LBL[x.role]+"</span></span>"+(web||x.role==="teacher"?rm('data-si="'+esc(x.email)+'"'):"")+"</div>"})}
var e=$("stfl");if(e)e.innerHTML=h})}
function rStaff(){var b=$("stbody");
if(!sb){b.innerHTML='<div class="card"><p>The staff system is not connected yet. Follow README.md to connect the backend.</p></div>';return}
if(!ME){b.innerHTML='<div class="card" style="max-width:400px"><h3>Staff sign in</h3>'+fl("Email",'<input id="se" type="email">')+fl("Password",'<input id="sp" type="password">')+'<div class="row"><button class="btn" id="sin" type="button">Sign in</button><button class="btn alt" id="sup" type="button" style="color:var(--pri)">Create account</button></div><p class="meta" id="sm"></p><p class="meta">First time? The administrator must add your email first, then use Create account with that email.</p></div>';
var go=async function(u){var e=$("se").value.trim().toLowerCase(),p=$("sp").value;if(!e||p.length<6){$("sm").textContent="Enter your email and a password of 6+ characters.";return}
var r=u?await sb.auth.signUp({email:e,password:p}):await sb.auth.signInWithPassword({email:e,password:p});if(r.error){$("sm").textContent=r.error.message;return}
if(!r.data.session){$("sm").textContent="Check your email to confirm your account, then sign in.";return}await boot()};
$("sin").onclick=function(){go(false)};$("sup").onclick=function(){go(true)};return}
var out='<button class="btn alt" id="sout" type="button" style="color:var(--pri)">Sign out</button>';
var so=function(){$("sout").onclick=async function(){await sb.auth.signOut();ME=null;await boot()}};
if(!ME.role){b.innerHTML='<div class="card"><h3>No staff access</h3><p>'+esc(ME.email)+' has not been added as staff. Ask the administrator to add this email, then sign out and sign in again.</p>'+out+'</div>';so();return}
var R=ME.role,adm=R!=="teacher",web=R==="web_admin";
var rl=(web?["teacher","school_admin","web_admin"]:["teacher"]).map(function(r){return'<option value="'+r+'">'+LBL[r]+"</option>"}).join("");
var h='<div class="card item"><div><h3>'+esc(ME.email)+'</h3><span class="tag">'+LBL[R]+"</span></div>"+out+'</div><p class="meta" id="stmsg"></p><div class="grid" style="margin-top:12px">'
+cd("Upload notes",fl("Subject",'<select id="ns2">'+opts(SUBJ)+"</select>")+fl("Title",'<input id="nt">')+fl("File",'<input id="nf" type="file">')+fl("or link",'<input id="nl" placeholder="https://">'),"nb","Add note")
+cd("Add a video",fl("Subject",'<select id="vs2">'+opts(SUBJ)+"</select>")+fl("Title",'<input id="vt">')+fl("Video file",'<input id="vf" type="file" accept="video/*">')+fl("or link (YouTube, Drive…)",'<input id="vl" placeholder="https://">'),"vb","Add video")
+cd("Host an online class",fl("Subject",'<select id="cs">'+opts(SUBJ)+"</select>")+fl("Level",'<select id="clv">'+opts(LV)+"</select>")+fl("Topic",'<input id="ct">')+fl("When",'<input id="cd" placeholder="e.g. Mon 10 Nov, 4:00 PM">')+fl("Teacher",'<input id="cw">')+fl("Meeting link (optional)",'<input id="cl" placeholder="Empty = free Jitsi room">'),"cb","Schedule class",'<button class="btn alt" id="ci" type="button" style="color:var(--pri)">Start instant class</button>');
if(adm)h+=cd("Post to the website",fl("Type",'<select id="pt"><option value="announcement">Announcement</option><option value="event">Event</option><option value="timetable">Timetable</option><option value="other">Other</option></select>')+fl("Title",'<input id="ptl">')+fl("Message",'<textarea id="pb2" rows="4"></textarea>')+fl("Attachment (image or PDF)",'<input id="pf" type="file">'),"pb","Publish");
h+="</div>";
if(adm)h+='<div class="card" style="margin-top:16px"><h3>Staff</h3><div class="two">'+fl("Email",'<input id="ie" type="email">')+fl("Role",'<select id="ir">'+rl+"</select>")+'</div><div class="row"><button class="btn" id="ib" type="button">Add staff</button></div><p class="meta">They then open the Staff page and use Create account with this email.</p><div id="stfl"></div></div>';
if(web)h+=cd("Website status",'<p>Status: <b>'+(SET.site_enabled?"ONLINE":"OFF for visitors")+"</b></p>"+fl("Message shown while off",'<textarea id="sm2" rows="2">'+esc(SET.message)+"</textarea>"),"stg",SET.site_enabled?"Turn site OFF":"Turn site ON").replace('<div class="card">','<div class="card" style="margin-top:16px">');
var M=POSTS.map(function(x){return["posts",x]}).concat(RES.map(function(x){return["resources",x]})).filter(function(m){return adm||(m[0]==="resources"&&m[1].created_by===ME.id)});
h+='<div class="card" style="margin-top:16px"><h3>Manage content</h3>'+(M.map(function(m){return"<div"+ROW+"><span>"+esc(m[1].title)+' <span class="meta">· '+esc(m[1].type||m[1].kind)+"</span></span>"+rm('data-del="'+m[0]+":"+m[1].id+'"')+"</div>"}).join("")||'<p class="meta">Nothing yet.</p>')+"</div>";
b.innerHTML=h;so();
var run=async function(fn){$("stmsg").textContent="Working…";try{await fn();await boot();var m=$("stmsg");if(m)m.textContent="Done ✓"}catch(e){$("stmsg").textContent=(e&&e.message)||"Something went wrong."}};
var link=async function(li,fi){var l=V(li);if(l){if(!okU(l))throw new Error("Link must start with https://");return l}var u=await up(fi);if(!u)throw new Error("Choose a file or paste a link.");return u};
$("nb").onclick=function(){run(async function(){if(!V("nt"))throw new Error("Add a title.");await ins("resources",{kind:"note",subject:V("ns2"),title:V("nt"),url:await link("nl","nf")})})};
$("vb").onclick=function(){run(async function(){if(!V("vt"))throw new Error("Add a title.");await ins("resources",{kind:"video",subject:V("vs2"),title:V("vt"),url:await link("vl","vf")})})};
$("cb").onclick=function(){run(async function(){if(!V("ct")||!V("cd"))throw new Error("Add a topic and a time.");var l=V("cl");if(l&&!okU(l))throw new Error("Link must start with https://");await ins("resources",{kind:"class",subject:V("cs"),level:V("clv"),title:V("ct"),when_text:V("cd"),teacher:V("cw"),url:l||room()})})};
$("ci").onclick=function(){window.open(room(),"_blank","noopener")};
if(adm){$("pb").onclick=function(){run(async function(){if(!V("ptl"))throw new Error("Add a title.");var f=await up("pf");await ins("posts",{type:V("pt"),title:V("ptl"),body:$("pb2").value.trim(),file_url:f||null})})};
$("ib").onclick=function(){run(async function(){var e=V("ie").toLowerCase();if(!/^\S+@\S+\.\S+$/.test(e))throw new Error("Enter a valid email.");await ins("staff_invites",{email:e,role:V("ir")})})};loadStaff()}
if(web)$("stg").onclick=function(){run(async function(){var r=await sb.from("site_settings").update({site_enabled:!SET.site_enabled,message:$("sm2").value.trim()}).eq("id",1).select();if(r.error)throw r.error;if(!r.data.length)throw new Error("Not allowed.")})};
b.onclick=function(e){var d=e.target.getAttribute("data-del"),p=e.target.getAttribute("data-sp"),i=e.target.getAttribute("data-si");
if(d){var a=d.split(":");if(confirm("Remove this item?"))run(function(){return del(a[0],"id",a[1])})}
else if(p){if(confirm("Remove this person's staff access?"))run(function(){return del("profiles","id",p)})}
else if(i)run(function(){return del("staff_invites","email",i)})};
}

/* ---------- boot, routing, shutdown overlay ---------- */
async function boot(){
if(sb){try{var s=(await sb.auth.getSession()).data.session;ME=null;
if(s){await sb.rpc("claim_invite");var q=await sb.from("profiles").select("*").eq("id",s.user.id).maybeSingle();ME=q.data||{id:s.user.id,email:s.user.email,role:null}}
var a=await sb.from("site_settings").select("*").eq("id",1).maybeSingle();if(a.data)SET=a.data;
var p=await sb.from("posts").select("*").order("created_at",{ascending:false}),r=await sb.from("resources").select("*").order("created_at",{ascending:false});POSTS=p.data||[];RES=r.data||[]}catch(e){}}
var down=!SET.site_enabled&&!(ME&&ME.role==="web_admin");
$("down").style.display=down?"grid":"none";$("dmsg").textContent=SET.message||"";
rNews();rLive();rNotes();rVids();rStaff()}
$("dgo").onclick=async function(){if(!sb)return;var r=await sb.auth.signInWithPassword({email:V("de").toLowerCase(),password:$("dp").value});if(r.error){$("dm").textContent=r.error.message;return}
await boot();if(!(ME&&ME.role==="web_admin")){await sb.auth.signOut();ME=null;$("dm").textContent="Only the web administrator can sign in while the site is off.";await boot()}};
var names=["home","live","notes","videos","admissions","fees","staff","news","about","contact"];
function route(){var h=(location.hash||"#home").slice(1);if(names.indexOf(h)<0)h="home";
names.forEach(function(n){$(n).classList.toggle("on",n===h)});
[].forEach.call($("nav").children,function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+h)});window.scrollTo(0,0)}
window.addEventListener("hashchange",route);route();boot();
})();
