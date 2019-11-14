const scriptName = "main.js";
// test.js -> main.js

var preChat = null;
var preChat_delay = 10;
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


var getDB = DataBase.getDataBase("op_list");

var op_list;

if (getDB === "") {
    op_list = ["엘또/남", "복실/남"];
} else {
    op_list = getDB.split(",");
}
//var op_list = ["어미새 / 남", "추노꾼/남", "뺌/남", "홍냥/여", "엘또/남"];
var op_com_list = ["목록", "추가", "해제"];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

//    if(preChat == msg) {
    if (preChat_flag === true && preChat_flag2 === true) {
        return;
    }
    preChat = msg;
    preChat_flag = true;

    // 채팅방 필터
    if (room === "KEF" || room === "Test") {

        // 운영진 목록에 있는지 확인
        if (op_list.indexOf(sender) !== -1) {
            
            ////////// 도움말 호출
            if (msg === "/?" || msg === "/명령어" || msg === "/help") {
                command_explain(replier);
            }
            //////////// 올바른 포맷의 명령어일 경우
            else if (msg.indexOf("/") === 0) {
                // // 2019.11.13 박상현 수정 : command_list 에서 msg 값에 따라 메세지 값 리턴
                replier.reply(command_list(msg));
                preChat_flag2 = true;
            }
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
    replier.reply("없는 명령어입니다.[] 는 변수입니다.\n명령어 목록 :\n" +
        "운영진\n" +
        "-목록\n" +
        "-추가 [닉네임]\n" +
        "-제거 [닉네임]\n" +
        "안내\n" +
        "-외국인\n" +
        "공지\n\n" +
        "예시:\n" +
        "/운영진-목록\n" +
        "/운영진-추가 엘또/남"
    );
}

function command_explain(replier) {
    replier.reply("명령어 안내창입니다. .[] 는 변수입니다.\n명령어 목록 :\n" +
        "운영진\n" +
        "   -목록\n" +
        "   -추가 [닉네임]\n" +
        "   -제거 [닉네임]\n" +
        "안내\n" +
        "   -외국인\n" +
        "공지\n\n" +
        "예시:\n" +
        "/운영진-목록\n" +
        "/운영진-추가 엘또/남"
    );
}

// 2019.11.13 박상현 추가 : msg에 따른 리턴데이터 함수화
function command_list(msg) {
    var return_msg = "";
    switch(msg) {
        case "/공지" :
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

        break;
        case "/페스티벌 안내" :
            var fes_msg = "";
            var numbering = 0;

            for(i=0; i<fes_list.length; i++) {
                numbering = i+1;
                fes_msg += numbering+". "+fes_list[i][0]+"\n";
                fes_msg += " - 후원사 : "+fes_list[i][1]+"\n";
                fes_msg += " - 장소 : "+fes_list[i][2]+"\n";
                fes_msg += " - 일자 : "+fes_list[i][3]+"\n\n";
            }

            return_msg = fes_msg;
        break;
        case "/외국인 안내":
            return_msg = "한국인을 위한 페스티벌 방이므로\n한국어를 사용하지 못한다면\n이 방에서 활동하실 수가 없습니다.\n----------------------------------\n" +
                                    "This GroupChat is For People\nWho Can Speak Korean.\n\nIf You Can't Speak Korean,\n" +
                                    "You Can't Hang out Here.\n\nI'm Sorry, But Plz Leave This Chat";
        break;
        default :
            return_msg = "없는 명령어입니다.[] 는 변수입니다.\n명령어 목록 :\n" +
                "공지\n" +
                "페스티벌 안내\n" +
                "외국인 안내\n\n" +
                "예시:\n" +
                "/공지\n";
        break;
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