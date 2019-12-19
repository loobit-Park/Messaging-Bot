const scriptName = "main.js";
const Jsoup = org.jsoup.Jsoup;
// test.js -> main.js

var preChat = null;
var preChat_delay = 3;
var preChat_flag = false;
var preChat_flag2 = false;

const fes_list = Array(
    Array('존나페', 'Vagagee VIPHEX13', '성수 S Factory', '2019.11.16'),
    Array('하드샷', 'Zayda', 'VOFOL', '2019.11'),
    Array('월드카운트다운', 'Cass', 'DDP', '2019.12.31'),
    Array('UMF', 'Richard Kim', '서울', '2020.06.20'),
    Array('벡터', 'Daegu', '대구스타디움', '2020.05.09'),
    Array('오타디움', 'Mercedes-Benz', '', '2020.06.27'),
    Array('워터밤서울', 'Sprite', '서울', '2020.07.17-19'),
    Array('워터밤인천', 'Paradise City', '인천', '2020.08.08')
);

// 전체보기 변수
var allsee = "\u200b".repeat(500); 

var getDB = DataBase.getDataBase("op_list");

var op_list;

if (getDB === "") {
    op_list = ["엘또/남", "복실/남", "미래/여"];
} else {
    op_list = getDB.split(",");
}
//var op_list = ["어미새 / 남", "추노꾼/남", "뺌/남", "홍냥/여", "엘또/남"];
var op_com_list = ["목록", "추가", "해제"];

// Python Sever API 호출 
// 페스티벌 정보 호출 API
function callMemberBirthDay() {
    var resp = JSON.parse(Jsoup.connect("http://106.10.33.142:18080/memberBirthDayAll").ignoreContentType(true).get().text());
    return resp;
}

// Python Server API 호출
function callFestivalInfo() {
    var resp = JSON.parse(Jsoup.connect("http://106.10.33.142:18080/FestivalInfo").ignoreContentType(true).get().text());
    return resp;
}


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

//    if(preChat == msg) {
    if (preChat_flag === true && preChat_flag2 === true) {
        return;
    }
    preChat = msg;
    preChat_flag = true;

    // 채팅방 필터
    if (room === "Main" || room === "Test") {
         
        ////////// 도움말 호출
        if (msg === "/?" || msg === "/명령어" || msg === "/help") {
            command_explain(replier);
        }
        //////////// 올바른 포맷의 명령어일 경우
        else if (msg.indexOf("/") === 0) {
             Log.info(room);
            // // 2019.11.13 박상현 수정 : command_list 에서 msg 값에 따라 메세지 값 리턴
            replier.reply(command_list(msg, sender));
             Log.info("Send Success");
            preChat_flag2 = true;
        }

    }

    java.lang.Thread.sleep(preChat_delay * 1000);
    preChat = null;
    preChat_flag = false;
    preChat_flag2 = false;
} // 함수 종료

function getDate() {
    var d = new Date();
    var currentDate = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDay() + "일";
    var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 " + d.getSeconds() + "초";
    return currentDate + " " + currentTime;
}


function getRandom(percent) {
    var random = Math.floor(Math.random() * percent) + 1;
    Log.info(random);
    
    return random;
}

function command_error(replier) {
    replier.reply("없는 명령어입니다.\n명령어 목록 :\n\n" +
        "-- 운영진 전용 --\n" +
        "/공지\n" +
        "/외국인 안내\n" +
        "-- 공용 --\n" +
        "/페스티벌 안내\n" +
        "/멤버 생일"
    );
}

function command_explain(replier) {
    replier.reply("명령어 안내창입니다.\n명령어 목록 :\n\n" +
        "-- 운영진 전용 --\n" +
        "/공지\n" +
        "/외국인 안내\n" +
        "-- 공용 --\n" +
        "/페스티벌 안내\n" +
        "/멤버 생일"
    );
}

// 2019.11.13 박상현 추가 : msg에 따른 리턴데이터 함수화
function command_list(msg, sender) {
    var return_msg = "";
        Log.info(sender + " : " + msg);
        // 운영진 목록에 있는지 확인
        if (op_list.indexOf(sender) !== -1) {
            if(msg == "/공지") {
                return_msg = "❣공지 필독❣닉네임양식 (닉네임/성별)\n\n" +
                            "👉닉네임양식대로 안할시 강퇴\n" +
                            "👉미성년자 참여 강퇴\n" +
                            "👉현금거래 금지(이득을 취하는 것)\n" +
                            "👉티켓 양도/거래 책임은 본인의 몫\n" +
                            "👉홍보는 강퇴\n" +
                            "👉상대지목성 욕설은 강퇴(싸움 or 트러블 발생 시)\n" +
                            "👉말 곱게 안써도 강퇴\n" +
                            "    (친분도 없는데 하면 사람들 빡친다)\n" +
                            "👉파벌형성이나 파벌유도시 강퇴\n" +
                            "👉개인간 트러블은 당사자들끼리 해결 할 것\n" +
                            "    (3자 개입하여 문제발생시 강퇴)"

                // return_msg = "❣️공지 필독❣️닉네임양식 (닉네임/성별)\n\n" +
                //                 "👉닉네임양식대로 안할시 강퇴\n" +
                //                 "👉미성년자 참여 강퇴\n" +
                //                 "👉현금거래 금지(이득을 취하는 것)\n" +
                //                 "👉티켓 양도/거래 책임은 본인의 몫\n" +
                //                 "👉홍보는 강퇴\n" +
                //                 "👉상대지목성 욕설은 강퇴(싸움 or 트러블 발생 시)\n" +
                //                 "👉말 곱게 안써도 강퇴\n" +
                //                 "    (친분도 없는데 하면 사람들 빡친다)\n" +
                //                 "👉파벌형성이나 파벌유도시 강퇴\n" +
                //                 "👉개인간 트러블은 당사자들끼리 해결 할 것\n" +
                //                 "    (3자 개입하여 문제발생시 강퇴)\n" +
                //                 "👉7일간 생존투표를 진행하여 투표 미참여자 강퇴\n" +
                //                 "    (인싸,존버,눈팅 세개 아무거나 선택하면됨)";

            } else if(msg == "/외국인 안내") {
                return_msg = "한국인을 위한 페스티벌 방이므로\n한국어를 사용하지 못한다면\n이 방에서 활동하실 수가 없습니다.\n----------------------------------\n" +
                                        "This GroupChat is For People\nWho Can Speak Korean.\n\nIf You Can't Speak Korean,\n" +
                                        "You Can't Hang out Here.\n\nI'm Sorry, But Plz Leave This Chat";
            }
            
        }
            
        if(msg == "/페스티벌 안내") {
            var resp = callFestivalInfo();            
            var resp_msg = "§페스티벌 안내§" + allsee;

            for(resp_obj in resp) {
                resp_msg += "\n\n";

                var short_name = resp[resp_obj].short_name;                 // 페벌 짦은 명(오타디움, 벡터, 움프 등)
                var venue = resp[resp_obj].venue;                           // 장소
                var venue_addr = resp[resp_obj].venue_addr;                 // 주소
                var first_start_date = resp[resp_obj].first_start_date;     // 첫째날 시작 일시
                var first_end_date = resp[resp_obj].first_end_date;         // 첫째날 종료 일시
                var second_start_date = resp[resp_obj].second_start_date;   // 둘째날 시작 일시
                var second_end_date = resp[resp_obj].second_end_date;       // 둘째날 종료 일시
                var third_start_date = resp[resp_obj].third_start_date;     // 셋째날 시작 일시
                var third_end_date = resp[resp_obj].third_end_date;         // 셋째날 종료 일시

                var fest_sponsor1 = resp[resp_obj].fest_sponsor1;           // 메인 스폰서
                var fest_sponsor2 = resp[resp_obj].fest_sponsor2;           // 서브 스폰서
                var first_office_name = resp[resp_obj].first_office_name;   // 판매처명
                var first_office_url = resp[resp_obj].first_office_url;     // 판매처 주소
                var second_office_name = resp[resp_obj].second_office_name; // 판매처명
                var second_office_url = resp[resp_obj].second_office_url;   // 판매처 주소


                resp_msg += resp_obj + ". " + short_name + "\n" +
                    "후원사 : " + fest_sponsor1 + ", " + fest_sponsor2 +"\n" +
                    "장소 : " + venue + "\n" + 
                    "주소 : " + venue_addr + "\n" +
                    "첫째날 일자 : " + first_start_date + " ~ " + first_end_date + "\n";

                if(second_start_date != "No Data") {
                    resp_msg += "둘째날 일자 : " + second_start_date + " ~ " + second_end_date + "\n";
                }
                if(third_start_date != "No Data") {
                    resp_msg += "셋째날 일자 : " + third_start_date + " ~ " + third_end_date + "\n"; 
                }
                
                resp_msg += "판매처명1 : " + first_office_name + "\n판매처1 주소 : " +  first_office_url + "\n";
                if(second_office_name != "No Data") {
                    resp_msg += "판매처명2 : " + second_office_name + "\n판매처2 주소 : " + second_office_url +"\n";
                }

            }
            return_msg = resp_msg;

        } else if(msg == "/멤버 생일"){
            var resp = callMemberBirthDay();            
            var resp_msg = "§멤버 생일§" + allsee;

            for(resp_obj in resp) {
                resp_msg = resp_msg +"\n\n";

                var nick = resp[resp_obj].member_nick;
                var birth_month = resp[resp_obj].member_birth_month;
                var birth_day = resp[resp_obj].member_birth_day;
                var d_day = resp[resp_obj].d_day;


                var birth = birth_month + "월 " + birth_day + "일";

                resp_msg = resp_msg + "닉네임 : " + nick +"\n생일 : " + birth + "\nD-Day : " + d_day + "일";
            }
            return_msg = resp_msg;
        } 
        
        if(return_msg == "") {
            return_msg = "없는 명령어입니다.\n명령어 목록 :\n\n" +
            "-- 운영진 전용 --\n" +
            "/공지\n" +
            "/외국인 안내\n" +
            "-- 공용 --\n" +
            "/페스티벌 안내\n" +
            "/멤버 생일";
        }

    return return_msg;
}

function onStartCompile() {
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var layout = new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt = new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}

function onResume(activity) {
}

function onPause(activity) {
}

function onStop(activity) {
}